import type { Client, Guild, Message, TextChannel } from 'discord.js';
import { User } from 'models/User-model.ts';

export default async (client: Client, server: Guild): Promise<void> => {
  const rulesChannel = <TextChannel | null>await server.channels.fetch('1168322918728597626');
  if (!rulesChannel) throw new Error('Verification channel not found');

  /**
   * See if a message contains the words "By reacting to this message, you agree to the rules."
   * If it doesn't exist create it.
   */
  const message =
    rulesChannel.messages.cache.find((m: Message) =>
      m.content.includes('By reacting to this message, you agree to the rules.'),
    ) ?? (await rulesChannel.send('By reacting to this message, you agree to the rules.'));
  /**
   * Add the reaction to the message
   */
  await message.react('✅');

  client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === rulesChannel.id) {
      if (reaction.emoji.name === '✅') {
        const member = await reaction.message.guild.members.fetch(user.id);
        await member.roles.add('1168412902143840276');
        if (!user.username && !user.id) throw new Error('User not found');

        await User.findOrCreate({
          where: { discordId: user.id },
          defaults: {
            discordId: user.id,
            password: 'password',
            discordUsername: user.username ?? '',
            discordDisplayname: user.globalName ?? '',
          },
        });

        const dm = await user.createDM();
        await dm.send(
          'Thank you for accepting the rules. For your free starter kit reply here with your in-game name. Please not that it is case sensitive and you can only do this once. Also only respond with your in-game name, nothing else.',
        );
      }
    }
  });

  client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === rulesChannel.id) {
      if (reaction.emoji.name === '✅') {
        const member = await reaction.message.guild.members.fetch(user.id);
        await member.roles.remove('1168412902143840276');
      }
    }
  });
};
