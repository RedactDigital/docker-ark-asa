import type { Client, Guild, Message, TextChannel } from 'discord.js';

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
