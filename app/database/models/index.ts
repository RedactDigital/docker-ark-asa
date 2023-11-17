import { Sequelize, importModels } from '@sequelize/core';
import type { Options } from '@sequelize/core';

if (!Bun.env.DATABASE_NAME) throw new Error('DATABASE_NAME not set');
if (!Bun.env.DATABASE_PASSWORD) throw new Error('DATABASE_PASSWORD not set');
if (!Bun.env.DATABASE_USERNAME) throw new Error('DATABASE_USERNAME not set');

const config: Options = {
  host: Bun.env.DATABASE_HOST ?? 'db',
  port: Bun.env.DATABASE_PORT ?? 3306,
  dialect: 'mysql',
  logging: false,
  /**
   * It is important to make sure the index file (this file) does not contain the
   * word "model" in it. Otherwise, the importModels function will import this file
   * and cause an error.
   */
  models: await importModels(`${import.meta.dir}/*-model.ts`),
};

export const sequelize = new Sequelize(
  Bun.env.DATABASE_NAME,
  Bun.env.DATABASE_USERNAME,
  Bun.env.DATABASE_PASSWORD,
  config,
);
