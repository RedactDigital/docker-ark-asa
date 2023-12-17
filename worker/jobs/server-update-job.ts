import { exec } from 'child_process';
import log from 'utils/log-utils.ts';

export default {
  name: 'serverUpdateJob',
  async process(): Promise<void> {
    // const sshConnection = exec(
    //   `/opt/steamcmd/steamcmd.sh +force_install_dir /opt/arkserver +login anonymous +app_status 2430930 +quit`,
    // );
    // const sshConnection = exec(
    //   `ssh -i /usr/keys/id_rsa bun@island '/opt/steamcmd/steamcmd.sh +force_install_dir /opt/arkserver +login anonymous +app_status 2430930 +quit'`,
    // );
    // if (!sshConnection.stdout || !sshConnection.stderr) {
    //   log.error('Failed to connect to server');
    //   return;
    // }
    // sshConnection.stderr.on('data', (data) => {
    //   log.error(`stderr: ${data}`);
    // });
    // sshConnection.stdout.on('data', (data) => {
    //   log.info(`stdout: ${data}`);
    // });
  },
};
