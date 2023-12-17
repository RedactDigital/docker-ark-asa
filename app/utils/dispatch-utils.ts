import Bull from 'bull';
import { redis } from 'worker/index-worker.ts';

enum JobName {
  SERVER_UPDATE = 'serverUpdateJob',
  QUEUE_PROCESS = 'queueProcessJob',
}

const dispatch = async (name: JobName, data: Record<string, any>, opts: Bull.JobOptions): Promise<void> => {
  if (Bun.env.NODE_ENV === 'test') return;

  // Construct the queue into a bull accepted object
  const queue = new Bull(name, {
    redis,
    prefix: name,
    settings: {
      maxStalledCount: 3,
    },
  });

  // Add the job to the queue in redis
  await queue.add(data, {
    priority: opts.priority,
    attempts: opts.attempts ?? 1,
    timeout: opts.timeout ?? 10000,
    delay: opts.delay ?? undefined,
    repeat: opts.repeat ?? undefined,
    backoff: opts.backoff ?? undefined,
  });
};

export { dispatch, JobName };
