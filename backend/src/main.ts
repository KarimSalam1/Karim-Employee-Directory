import { createApp } from './create-app';

// Local development entry point only. On Vercel the app is served by
// api/index.js, which must never reach an app.listen() call.
async function bootstrap() {
  const app = await createApp();

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
