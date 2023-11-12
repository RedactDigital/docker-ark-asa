import type { Elysia } from 'elysia';
import steamRedirectUrlController, {
  steamRedirectDocs,
} from 'controllers/steam-controller/steam-redirect-url-controller.ts';
import steamLinkController, { steamLinkDocs } from 'controllers/steam-controller/steam-link-controller.ts';

export default (app: Elysia): Elysia =>
  app
    .get('/redirectUrl', steamRedirectUrlController, { detail: steamRedirectDocs })
    .get('/linkProfile', steamLinkController, { detail: steamLinkDocs });
