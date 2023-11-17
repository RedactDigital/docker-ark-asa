import type { Elysia } from 'elysia';
import authController, { authControllerDocs } from 'controllers/auth-controller/auth-controller.ts';

export default (app: Elysia): Elysia => app.post('/', <any>authController, authControllerDocs);
