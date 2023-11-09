import { RconClient } from 'rconify';
import log from 'utils/log-utils.ts';

const servers: Record<
  string,
  {
    serverName: string;
    client: RconClient;
  }
> = {
  theIsland: {
    serverName: 'TheIsland',
    client: new RconClient({
      host: 'island',
      password: Bun.env.ARK_ADMIN_PASSWORD,
      port: 27020,
      ignoreInvalidAuthResponse: false,
    }),
  },
};

for (const server of Object.values(servers)) {
  await server.client.connect();
  const response = await server.client.sendCommand('listplayers');
  log.info(response);
}
