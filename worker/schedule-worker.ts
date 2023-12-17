import { cronUtil } from 'utils/cron-utils.ts';
import { JobName, dispatch } from 'utils/dispatch-utils.ts';

/**
 * Keep in mind all cron jobs are in UTC time.
 */

export default async (): Promise<void> => {
  await dispatch(JobName.SERVER_UPDATE, {}, { priority: 3, repeat: { cron: cronUtil.everyMinute } });
  await dispatch(JobName.QUEUE_PROCESS, {}, { priority: 3, repeat: { cron: cronUtil.everyFifteenSeconds } });
};
