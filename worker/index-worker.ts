import os from 'os';
import fs from 'fs';
import Bull from 'bull';
import scheduleWorker from 'worker/schedule-worker.ts';
import log from 'utils/log-utils.ts';
import { rconInit } from 'utils/rcon-utils.ts';
import { sequelize } from 'models/index.ts';

interface RedisOptions {
  port: number;
  host: string;
  password: string;
  user: string;
}

export const redis: RedisOptions = {
  host: Bun.env.REDIS_HOST ?? 'redis',
  port: Bun.env.REDIS_PORT ?? 6379,
  password: Bun.env.REDIS_PASSWORD ?? 'password',
  user: Bun.env.REDIS_USER ?? 'root',
};

const eventListeners = {
  process: (job: Bull.Job): void => {
    log.info(`Processing job ${job.id}`);
  },
  completed: (job: Bull.Job): void => {
    log.info(`Job ${job.id} completed on host ${os.hostname()}`);
  },
  stalled: (job: Bull.Job): void => {
    log.warn(`Job ${job.id} stalled`);
  },
  failed: (job: Bull.Job, error: any): void => {
    log.error(`Job ${job.id} failed with error ${error.message}`, error);
  },
  error: (error: any): void => {
    log.error(`Queue error ${error.message}`, error);
  },
  progress: (job: Bull.Job, progress: number): void => {
    /* eslint-disable-next-line */
    console.log(`Job ${job.id} is ${progress}% complete`);
  },
};

const queuesObject = async (): Promise<Array<{ queue: Bull.Queue; name: string; action: any }>> => {
  const queues = [];

  const files = fs.readdirSync(`${import.meta.dir}/jobs`);

  for (const file of files) {
    const job = await import(`${import.meta.dir}/jobs/${file}`);
    queues.push({
      queue: new Bull(job.default.name, { redis, prefix: job.default.name, settings: { maxStalledCount: 3 } }),
      name: job.default.name,
      action: job.default.process,
    });
  }

  return queues;
};

// eslint-disable-next-line max-statements
await (async (): Promise<void> => {
  await rconInit();
  await sequelize.authenticate();
  const queues = await queuesObject();
  for (const { queue, action } of queues) {
    queue.on('process', eventListeners.process);
    queue.on('completed', eventListeners.completed);
    queue.on('stalled', eventListeners.stalled);
    queue.on('failed', eventListeners.failed);
    queue.on('error', eventListeners.error);
    queue.on('progress', eventListeners.progress);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    queue.process(action);
  }

  /**
   * Start the schedule of jobs to run
   */
  await scheduleWorker();

  log.info(`Worker started on host ${os.hostname()}`);

  return void 0;
})();
