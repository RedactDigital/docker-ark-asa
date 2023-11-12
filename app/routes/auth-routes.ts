import type { Elysia } from 'elysia';
import authController, { authDocs } from 'controllers/auth-controller/auth-controller.ts';

export default (app: Elysia): Elysia => app.post('/register', <any>authController, { detail: authDocs });
