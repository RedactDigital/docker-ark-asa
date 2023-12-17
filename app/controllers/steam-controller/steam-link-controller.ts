import { t } from 'elysia';
import SteamAPI from 'steamapi';
import type { OpenAPIV3 } from 'openapi-types';
import type { ReturnResponse } from 'types/response-types.ts';
import { User } from 'models/User-model.ts';
import type { BunContext } from 'root/index.ts';

export default async ({ query, set }: BunContext): Promise<ReturnResponse> => {
  let steamId = query['openid.identity'];
  if (!steamId) return { success: false, error: 'Invalid steam id' };
  steamId = steamId.replace('https://steamcommunity.com/openid/id/', '');

  const steam = new SteamAPI(Bun.env.STEAM_API_KEY, {
    enabled: true,
  });

  const steamUser = await steam.getUserSummary(steamId);

  const user = await User.findOne({
    where: {
      id: 1,
    },
  });

  if (!user) {
    set.status = 404;
    return { success: false, error: 'User not found' };
  }

  await user.update({
    steamId: steamUser.steamID,
    steamName: steamUser.nickname,
    avatar: steamUser.avatar.large,
    country: steamUser.countryCode ?? '',
    steamUrl: steamUser.url,
  });

  return {
    success: true,
    data: {
      user,
    },
  };
};

export const steamLinkDocs = {
  query: t.Object({
    'openid.identity': t.String(),
  }),
  response: t.Object({
    success: t.Boolean(),
    data: t.Object({
      user: t.Object({
        id: t.Number(),
        email: t.String(),
        steamId: t.String(),
        steamName: t.String(),
        avatar: t.String(),
        country: t.String(),
        steamUrl: t.String(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      }),
    }),
  }),
  detail: <OpenAPIV3.OperationObject>{
    tags: ['Steam'],
    summary: 'Link steam account to user profile',
  },
};
