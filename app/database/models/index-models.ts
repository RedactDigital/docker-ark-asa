import { Sequelize } from '@sequelize/core';
import type { Options } from '@sequelize/core';
import { User } from 'models/User-model.ts';

const config: Options = {
  host: Bun.env.DATABASE_HOST ?? 'db',
  port: Bun.env.DATABASE_PORT ?? 3306,
  dialect: 'mysql',
  logging: false,
  // models: await importModels(`${import.meta.dir}/*.ts`),
  models: [User],
};

export const sequelize = new Sequelize(
  Bun.env.DATABASE_NAME,
  Bun.env.DATABASE_USERNAME ?? 'app',
  Bun.env.DATABASE_PASSWORD,
  config,
);
