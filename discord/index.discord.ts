import { Client, EmbedBuilder, GatewayIntentBits } from 'discord.js';
import type { TextChannel } from 'discord.js';
import dayjs from 'dayjs';
import log from 'utils/log-utils.ts';

const intents: Array<GatewayIntentBits> = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
];

const aboutEmbed = async (channel: TextChannel): Promise<void> => {
  const embed = new EmbedBuilder()
    .setColor('#ff8f00')
    .setTitle('Game Config')
    .setDescription(
      `
*Last Updated: ${dayjs().format('MMMM D h:mm A')} - UTC*\n
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

  const messages = await channel.messages.fetch();
  const message = messages.get('1173437452510298172');
  if (!message) throw new Error('Discord message not found');
  await message.edit({
    content: `This is a vibrant community for those passionate about the online survival game, Ark.
  We host servers with curated rules and settings to provide enjoyable gameplay with a focus on fair PvP. We also offer different donor tiers with various perks to support the server. Whether you're a beginner or an experienced survivor, you're welcome to join us, participate in discussions, and contribute to our growing community.`,
    embeds: [embed],
  });
};

try {
  const client = new Client({ intents });
  await client.login(Bun.env.DISCORD_TOKEN);

  const server = await client.guilds.fetch({ guild: '706560580244471929' });

  const rulesChannel = <TextChannel | null>await server.channels.fetch('1168322918728597626');
  if (!rulesChannel) throw new Error('Rules channel not found');

  const aboutChannel = <TextChannel | null>await server.channels.fetch('1168456964116840580');
  if (!aboutChannel) throw new Error('Rules channel not found');

  await aboutEmbed(aboutChannel);
} catch (error) {
  log.error('Error:', error);
}
