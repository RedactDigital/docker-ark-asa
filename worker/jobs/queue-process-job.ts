import { Op } from '@sequelize/core';
import { Queue } from 'models/Queue-model.ts';
import log from 'utils/log-utils.ts';
import { servers } from 'utils/rcon-utils.ts';

export default {
  name: 'queueProcessJob',
  async process(): Promise<void> {
    log.info('Processing queue job');

    const island = servers.theIsland.client;
    // const response = await island.send('listplayers');

    // if (response === 'No Players Connected') return void 0;

    // const players = response.split('\n').slice(1, -1);

    // for (const player of players) {
    //   const playerObject = player.split(' ');
    //   const [, survivorName, steamId] = playerObject;
    //   if (!survivorName || !steamId) continue;

    //   const isInQueue = await Queue.findOne({
    //     where: { '$user.survivorName$': survivorName.split(',')[0] },
    //     include: ['user'],
    //   });

    //   if (!isInQueue) continue;

    const playerId = await island.send(`listplayers`);

    console.log(playerId);

    // const res = await island.send(
    //   `GiveItemToPlayer ${
    //     playerId.split('PlayerID: ')[1]
    //   } "Blueprint'/Game/PrimalEarth/CoreBlueprints/Items/Structures/Stone/PrimalItemStructure_StoneFloor.PrimalItemStructure_StoneFloor'" 1 1 false`,
    // );

    // await isInQueue.user.update({ steamId });
    // await Queue.destroy({ where: { id: isInQueue.id } });
    // }
  },
};
