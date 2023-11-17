import dayjs from 'dayjs';
import type { Guild, TextChannel } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

export default async (server: Guild): Promise<void> => {
  const aboutChannel = <TextChannel | null>await server.channels.fetch('1168456964116840580');
  if (!aboutChannel) throw new Error('Rules channel not found');

  const embed = new EmbedBuilder()
    .setColor('#ff8f00')
    .setTitle('Game Config')
    .setDescription(
      `
*Last Updated: ${dayjs().tz('America/New_York').format('MMMM D h:mm A')} - EST/EDT*\n
**Max Wild Dinos** - Level 150
**Max Player Level** - Level 135

**4x** Number of Dinos
**10x** Harvest
**25x** Tame Speed

**Tribe Limit** - 8 Players

- Autosave every 15 Minutes
- Auto unlock all engrams
- Specific dinos have increased spawn chance
- Breeding and Hatching intervals are significantly shortened
- Spoil timers slightly increased
        `,
    );

  const messages = await aboutChannel.messages.fetch();
  const message = messages.get('1173437452510298172');
  if (!message) throw new Error('Discord message not found');
  await message.edit({
    content: `
This is a vibrant community for those passionate about the online survival game, Ark.
We host servers with curated rules and settings to provide enjoyable gameplay with a focus on fair PvP. We also offer different donor tiers with various perks to support the server. Whether you're a beginner or an experienced survivor, you're welcome to join us, participate in discussions, and contribute to our growing community.
  `,
    embeds: [embed],
  });
};