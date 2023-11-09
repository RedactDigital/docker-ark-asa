import type { Elysia } from 'elysia';
import steamAuthController, { steamAuthDocs } from 'controllers/auth-controller/steam-auth-controller.ts';
import steamRedirectUrlController, {
  steamRedirectDocs,
} from 'controllers/auth-controller/steam-redirect-url-controller.ts';

export default (app: Elysia): Elysia =>
  app
    .get('/steam', <any>steamRedirectUrlController, { detail: steamRedirectDocs })
    .get('/steam/return', <any>steamAuthController, { detail: steamAuthDocs });
