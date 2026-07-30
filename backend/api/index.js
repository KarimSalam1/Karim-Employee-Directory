// Vercel serverless entry point.
//
// Bootstraps the compiled Nest app once per container, caches it on
// globalThis, and hands every request to the underlying Express instance.
// The Mongoose connection lives inside the Nest app, so warm invocations
// reuse it instead of reconnecting. This file is plain JS on purpose:
// Vercel's TypeScript bundler (esbuild) does not emit the decorator
// metadata Nest's DI depends on, so we require the tsc build output from
// dist/ (produced by `npm run build` during the Vercel build step).
//
// There is intentionally no app.listen() reachable from this file.
const { createApp } = require('../dist/src/create-app');

let cached = globalThis.__nestAppCache;
if (!cached) cached = globalThis.__nestAppCache = { handler: null, promise: null };

async function getHandler() {
  if (cached.handler) return cached.handler;
  if (!cached.promise) {
    cached.promise = (async () => {
      const app = await createApp();
      await app.init();
      return app.getHttpAdapter().getInstance();
    })();
  }
  try {
    cached.handler = await cached.promise;
  } catch (err) {
    cached.promise = null; // let the next request retry the bootstrap
    throw err;
  }
  return cached.handler;
}

module.exports = async (req, res) => {
  const handler = await getHandler();
  return handler(req, res);
};
