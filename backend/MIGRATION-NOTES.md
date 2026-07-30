# Render → Vercel migration notes (backend)

Migrated on branch `chore/vercel-migration`. The backend is **NestJS 11**, not
plain Express, so the serverless pattern was adapted rather than copied: the
compiled Nest app is bootstrapped once per container in `api/index.js`, cached
on `globalThis`, and every request is handed to its underlying Express
instance. `src/main.ts` remains the only file containing `listen()` and is used
for local dev only.

## Endpoints — before / after

| Method | Before (Render) | After (Vercel) | Notes |
|---|---|---|---|
| GET | `/` | `/` | unchanged ("Hello World!") |
| GET | `/employees` | `/employees` | unchanged (page/limit/filter/search) |
| GET | `/employees/filter-options` | `/employees/filter-options` | unchanged |
| GET | `/employees/:id` | `/employees/:id` | unchanged |
| POST | `/employees` | `/employees` | unchanged (multipart, optional `avatar`) |
| PATCH | `/employees/:id` | `/employees/:id` | unchanged |
| DELETE | `/employees/:id` | `/employees/:id` | unchanged |
| GET | — | `/api/health` | **new**, DB-free: `{ ok, env }` |

No paths, request shapes, or response shapes changed. Verified locally by
running `api/index.js` under a bare `http.createServer` and curling every
router.

## Environment variables to add in the Vercel dashboard

Add each to **Production, Preview, and Development**:

| Variable | Required | Value |
|---|---|---|
| `MONGODB_URI` | yes | the Atlas connection string |
| `IMGUR_CLIENT_ID` | yes | Imgur API client ID (avatar uploads) |
| `CORS_ORIGIN` | recommended | comma-separated allowed origins, e.g. the frontend's Vercel URL; unset = `*` |

`PORT` is local-only and ignored on Vercel.

## Serverless-incompatible patterns found, and what happened to them

1. **multer `diskStorage('./uploads')`** (POST and PATCH `/employees`) —
   Vercel's filesystem is read-only outside `/tmp`, so every avatar upload
   would have failed. Switched to `memoryStorage()`: the buffer goes straight
   to Imgur, nothing touches disk. Behavior-identical because the file was
   only ever a staging copy that got deleted after the Imgur upload anyway.
   The stray committed `uploads/*.png` were removed and the dir gitignored.
2. **Boot-time `MongooseModule.forRoot` connect** — replaced with
   `lazyConnection: true` + `serverSelectionTimeoutMS: 5000` +
   `bufferTimeoutMS: 5000` + `maxPoolSize: 5`. The function boots (and
   `/api/health` answers) even when Atlas is unreachable, and DB routes fail
   in ~5 s with a JSON 500 instead of hanging. **Caveat:** if a container's
   very first connect fails, mongoose does not retry it for that container;
   requests keep failing fast until a fresh cold start. Fine for telling
   "deploy broken" from "Atlas broken", which was the goal.
3. **Crash on failed lazy connect (found during testing)** — with
   `lazyConnection` nothing awaits the initial connection, and a failure
   killed the whole process via unhandled rejection. Fixed by attaching
   error handlers in `connectionFactory`. Note: `onConnectionCreate` does
   NOT work here — @nestjs/mongoose 11.0.3 returns lazy connections before
   invoking it.
4. **Old `vercel.json`** pointed `@vercel/node` at `src/main.ts`, which calls
   `app.listen()` unconditionally — the classic broken-deploy pattern.
   Replaced with a rewrites-only config targeting `api/index.js`.
5. **`"employee-directory-backend": "file:"` self-dependency** in
   package.json — circular self-install that can break `npm install` on build
   machines. Removed.
6. **Why `api/index.js` is plain JS requiring `dist/`**: Vercel compiles
   TypeScript functions with esbuild, which does not emit the decorator
   metadata Nest's DI needs. So the Vercel build runs `npm run build` (tsc
   via `nest build`) and the JS entry requires the compiled output.
7. **Imgur upload inside the request** — usually well under 10 s, but a slow
   Imgur response eats into the function's max duration. Left as-is; flagged.

## Things you still need to decide / know

- **DTO validation is inert** (pre-existing): `EmployeeCreateDto` uses
  class-validator decorators but no global `ValidationPipe` is registered, so
  nothing validates. Left untouched to preserve behavior exactly; enabling it
  would change response shapes (400s on bad input).
- **Multipart on Vercel**: Vercel's Node helpers pre-read request bodies. If
  avatar uploads misbehave after deploy (JSON routes will be fine), set the
  env var `NODEJS_HELPERS=0` on the project and redeploy — that hands the raw
  stream back to Express/multer.
- The GET-all response leaks `__v`/`_id` mongoose internals — pre-existing,
  unchanged.

## Remaining manual steps

1. **Atlas → Network Access**: allow `0.0.0.0/0` (Vercel egress IPs are not
   fixed).
2. **Vercel → Import project**: framework preset "Other",
   **Root Directory = `backend`** (this is a monorepo). Build command
   `npm run build` is picked up automatically; the empty `public/` dir
   satisfies the output check.
3. **Add the env vars above** against all three environments.
4. **Frontend**: set `NEXT_PUBLIC_API_BASE_URL` to the new backend domain
   (no trailing slash, no `/api` suffix — routes live at the root), and set
   `CORS_ORIGIN` on the backend to the frontend's origin.
5. After the first deploy, check `https://<backend>.vercel.app/api/health`
   (proves the function boots), then `/employees` (proves Atlas access).
