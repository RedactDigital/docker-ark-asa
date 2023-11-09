import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import log from 'utils/log-utils.ts';
import { sequelize } from 'models/index-models.ts';
import authRoutes from 'root/routes/auth-routes.ts';

await sequelize.authenticate();
const app = new Elysia();

app
  .use(cors())
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
            description: 'Authentication routes',
          },
        ],
      },
    }),
  )
  .group(<''>'/auth', authRoutes)
  .listen(Bun.env.APP_PORT ?? 5000);

if (app.server) log.info(`🦊 Elysia is running at ${app.server.hostname}:${app.server.port}`);
