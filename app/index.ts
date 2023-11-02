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
      host: 'island',
      password: 'TheAdminPass',
      port: 32330,
      ignoreInvalidAuthResponse: false,
    }),
  },
};

const job = new CronJob(cronUtil.everyMinute, async () => {
  for (const server of Object.values(servers)) {
    await server.client.connect();
    const response = await server.client.sendCommand('listplayers');
    log.info(response);
  }
});

job.start();
