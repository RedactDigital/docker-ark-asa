import dayjs from 'dayjs';
import type { Guild, TextChannel } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

export default async (server: Guild): Promise<void> => {
  const rulesChannel = <TextChannel | null>await server.channels.fetch('1168322918728597626');
  if (!rulesChannel) throw new Error('Rules channel not found');

  const embedIntro = new EmbedBuilder()
    .setColor('#18D93F')
    .setTitle('Discord and Game Rules')
    .setDescription(
      `
    Our server staff will unequivocally enforce all rules, issuing appropriate punishments for any violations. Rest assured, our approach will be judicious, considering both your intent and overall conduct. While some infractions will result in a warning, others may warrant an immediate ban. We strongly recommend adherence to all rules for a trouble-free experience!
    `,
    );

  const embedOne = new EmbedBuilder()
    .setColor('#ff8f00')
    .setTitle('1 - Rules of Conduct')
    .setDescription(
      `
    *Last Updated: ${dayjs().tz('America/New_York').format('MMMM D h:mm A')} - EST/EDT*

    **1a -** We maintain a zero-tolerance policy for toxic behavior in all Yinzers platforms. Unlawful, harmful, abusive, defamatory, vulgar, hateful, homophobic, or racially offensive language is not allowed. Trash-talking in PvP environments is monitored and acted upon if it crosses boundaries.

    **1b -** Names for characters, tribes, and dinos must use the standard English alphabet.

    **1c -** Using names like "Human", "Survivor", "Player", "123", "321", "OneTwoThree", etc., is forbidden.

    **1d -** Impersonation or disrespect of server staff is unacceptable.
    `,
    );

  const embedTwo = new EmbedBuilder()
    .setColor('#0D90D9')
    .setTitle('Discord and Game Rules')
    .setDescription(
      `
*Last Updated: ${dayjs().tz('America/New_York').format('MMMM D h:mm A')} - EST/EDT*

**2a -** No player should be confined for over 30 minutes, including sleepers.

**2b -** Griefing and toxicity are not tolerated. Enjoy fair PvP gameplay.

**2c -** Trading scams are prohibited.

**2d -** Insiding is punishable if a written agreement, confirmed by all members, is breached. Proof of agreement is required. Forging evidence results in a ban.
    `,
    );

  const embedThree = new EmbedBuilder()
    .setColor('#ff2f00')
    .setTitle('Discord and Game Rules')
    .setDescription(
      `
    *Last Updated: ${dayjs().tz('America/New_York').format('MMMM D h:mm A')} - EST/EDT*

    **3a -** Structures must be visible and damageable.

    **3b -** Building in hard-to-access areas needing unusual methods (e.g., fast travel, ziplines, unconsciousness) is forbidden.

    **3c -** Misusing no-collision building to hide or immobilize players is prohibited.

    **3d -** Exploiting building mechanics to raid by creating tunnels or pathways to bypass defenses is banned.

    **3e** - Excessive or unnecessary structures, especially those causing lag, may be wiped.
    `,
    );

  const embedFour = new EmbedBuilder()
    .setColor('#74388F')
    .setTitle('Discord and Game Rules')
    .setDescription(
      `
*Last Updated: ${dayjs().tz('America/New_York').format('MMMM D h:mm A')} - EST/EDT*

**4a -** "Popcorning" items is allowed, except during raids to prevent base looting - no exceptions.

**4b -** Mesh striking is absolutely not allowed, whether you're on foot or riding dinos.

**4c -** Using boxed-in/armored dinos, rafts, or skiffs for raids or PvP is a hard no. Meshing structures/turrets through an enemy's base is out of the question. You can block the rider, but the dino must remain vulnerable to damage.

**4d -** No "teaming" during PvP, period. Coordinated attacks, joint raids, and mutual defenses are not acceptable. While counter raiding is permitted, all players at the counter attack must be treated as enemies. Any hint of teaming will be thoroughly investigated and, if confirmed, will result in a structure wipe.`,
    );

  const messages = await rulesChannel.messages.fetch();
  const message = messages.get('1173435641170755707');
  if (!message) throw new Error('Discord message not found');
  await message.edit({
    content: ``,
    embeds: [embedIntro, embedOne, embedTwo, embedThree, embedFour],
  });
};
