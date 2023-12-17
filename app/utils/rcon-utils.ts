import { Rcon } from 'rcon-client';
import log from 'utils/log-utils.ts';

const servers: Record<
  'theIsland',
  {
    serverName: string;
    client: Rcon;
  }
> = {
  theIsland: {
    serverName: 'TheIsland',
    client: new Rcon({
      host: 'island',
      port: Number(Bun.env.ISLAND_RCON_PORT),
      password: Bun.env.ARK_ADMIN_PASSWORD,
    }),
  },
};

const rconInit = async (): Promise<void> => {
  for (const server of Object.values(servers)) {
    server.client.on('authenticated', () => {
      log.info(`Authenticated to ${server.serverName}`);
    });

    server.client.on('error', (error: Error) => {
      log.error(`Error with ${server.serverName}`, error);
    });

    server.client.on('end', () => {
      log.info(`Connection to ${server.serverName} closed`);
    });

    await server.client.connect();
  }
};

export { servers, rconInit };
