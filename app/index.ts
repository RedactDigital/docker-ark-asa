import { RconClient } from 'rconify';
import { CronJob } from 'cron';
import log from 'utils/log-utils.ts';
import { cronUtil } from 'utils/cron-utils.ts';

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
      host: Bun.env.THE_ISLAND_HOST,
      password: Bun.env.ARK_ADMIN_PASSWORD,
      port: Number(Bun.env.THE_ISLAND_PORT),
      ignoreInvalidAuthResponse: false,
    }),
  },
};

// const job = new CronJob(cronUtil.everyMinute, async () => {
for (const server of Object.values(servers)) {
  await server.client.connect();
  const response = await server.client.sendCommand('listplayers');
  log.info(response);
}
// });

// job.start();
