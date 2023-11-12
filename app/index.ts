import type { Context } from 'elysia';
import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import type { JWTPayloadSpec } from '@elysiajs/jwt';
import { jwt } from '@elysiajs/jwt';
import log from 'utils/log-utils.ts';
import { sequelize } from 'models/index-models.ts';
import steamRoutes from 'root/routes/steam-routes.ts';
import authRoutes from 'root/routes/auth-routes.ts';

await sequelize.authenticate();
const app = new Elysia();

export interface BunContext extends Context {
  accessToken: {
    sign: (payload: JWTPayloadSpec) => Promise<string>;
    verify: (payload: string) => Promise<JWTPayloadSpec | false>;
  };
}

app
  .onError(({ error }) => {
    log.error('Error', error);
  })
  .use(cors())
  .use(
    jwt({
      name: 'accessToken',
      secret: Bun.env.JWT_SECRET,
      exp: '1h',
      iss: Bun.env.API_URL,
      aud: Bun.env.APP_URL,
      alg: Bun.env.JWT_ALGORITHM,
    }),
  )
  .use(
    swagger({
      path: '/swagger',
      autoDarkMode: true,
      documentation: {
        info: {
          title: 'Yinzers.io',
          description: 'Yinzers.io API Documentation',
          version: '1.0.0',
        },
        tags: [
          {
            name: 'Auth',
            description: 'Register and login to Yinzers.io',
          },
          {
            name: 'Steam',
            description: 'Link your Steam account to Yinzers.io',
          },
        ],
      },
    }),
  )
  .group(<''>'/auth', authRoutes)
  .group(<''>'/steam', steamRoutes)
  .listen(Bun.env.APP_PORT ?? 5000);

if (app.server) log.info(`🦊 Elysia is running at ${app.server.hostname}:${app.server.port}`);
