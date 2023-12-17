/* eslint-disable @typescript-eslint/naming-convention */
declare module 'bun' {
  interface LogEnv {
    /**
     * This defaults to `info` if not set.
     */
    LOG_LEVEL?: string;

    /**
     * This defaults to `console` if not set.
     * You can add multiple transports by separating them with a comma.
     * For example: `LOG_TRANSPORTS=console,datadog,file`
     */
    LOG_TRANSPORTS?: 'console' | 'datadog' | 'file';

    /**
     * This defaults to `./storage/logs/app.log` if not set.
     */
    LOG_FILE?: string;

    /**
     * This is unused if you don't add `datadog` to `LOG_TRANSPORTS`.
     * If you use `datadog` as a transport, you must set this.
     */
    LOG_DATADOG_API_KEY?: string;
  }

  interface RCONEnv {
    ARK_ADMIN_PASSWORD: string;

    ISLAND_HOST: string;
    ISLAND_RCON_PORT: number;
  }

  interface DatabaseEnv {
    /**
     * This defaults to `localhost` if not set.
     */
    DATABASE_HOST?: string;

    /**
     * This defaults to `3306` if not set.
     */
    DATABASE_PORT?: number;

    /**
     * This defaults to `root` if not set.
     */
    DATABASE_USERNAME?: string;

    /**
     * This defaults to `root` if not set.
     */
    DATABASE_PASSWORD?: string;

    /**
     * This defaults to `elysia` if not set.
     */
    DATABASE_NAME: string;

    /**
     * This defaults to `redis` if not set.
     */
    REDIS_HOST?: string;

    /**
     * This defaults to `6379` if not set.
     */
    REDIS_PORT?: number;

    /**
     * This defaults to `password` if not set.
     */
    REDIS_PASSWORD?: string;

    /**
     * This defaults to `root` if not set.
     */
    REDIS_USER?: string;
  }

  interface AuthEnv {
    SALT_ROUNDS: number;
    JWT_SECRET: string;
    JWT_ALGORITHM: string;
  }

  interface APIKeysEnv {
    STEAM_API_KEY: string;
    DISCORD_TOKEN: string;
    STRIPE_API_KEY: string;
  }

  export interface Env extends LogEnv, RCONEnv, DatabaseEnv, APIKeysEnv, AuthEnv {
    /**
     * This defaults to `development` if not set.
     */
    NODE_ENV?: string;

    APP_PORT?: number;

    API_URL?: string;

    APP_URL?: string;
  }
}
