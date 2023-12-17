import type { Client } from 'discord.js';
import { User } from 'models/User-model.ts';
import { Queue, QueueRequested } from 'models/Queue-model.ts';

export default async (client: Client): Promise<void> => {
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const user = await User.findOne({ where: { discordId: message.author.id } });
    if (!user) {
      const dm = await message.author.createDM();
      await dm.send(
        'Please verify yourself by reacting to the rules message in the #rules channel with a ✅. If you have any issues please contact a moderator.',
      );
      return;
    }

    if (user.starterPackRedeemed) {
      const dm = await message.author.createDM();
      await dm.send('You have already redeemed your starter pack.');
      return;
    }

    await Queue.create({
      userId: Number(user.id),
      queueRequested: QueueRequested.STARTER_KIT,
    });

    await user.update({
      discordUsername: message.author.username,
      discordDisplayname: message.author.globalName ?? '',
      starterPackRedeemed: true,
      survivorName: message.content,
    });

    const dm = await message.author.createDM();
    await dm.send(
      'You have been added to the queue for a starter kit. This can take up to 10-20 minutes to process from the time you next log in.',
    );
  });
};
