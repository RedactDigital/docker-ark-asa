import type { Context } from 'elysia';
import SteamAPI from 'steamapi';
import type { OpenAPIV3 } from 'openapi-types';
import type { ReturnResponse } from 'types/response-types.ts';
import { User } from 'models/User-model.ts';

export default async (ctx: Context): Promise<ReturnResponse> => {
  let steamId = ctx.query['openid.identity'];
  if (!steamId) return { success: false, error: 'Invalid steam id' };
  steamId = steamId.replace('https://steamcommunity.com/openid/id/', '');

  const steam = new SteamAPI(Bun.env.STEAM_API_KEY, {
    enabled: true,
  });

  const steamUser = await steam.getUserSummary(steamId);

  const [user] = await User.findOrCreate({
    where: {
      steamId,
    },
    defaults: {
      steamId,
      steamName: steamUser.nickname,
      avatar: steamUser.avatar.large,
      country: steamUser.countryCode,
      steamUrl: steamUser.url,
    },
  });

  return {
    success: true,
    data: {
      user,
    },
  };
};

export const steamAuthDocs: OpenAPIV3.OperationObject = {
  tags: ['Auth'],
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'number' },
                      steamId: { type: 'string' },
                      steamName: { type: 'string' },
                      avatar: { type: 'string' },
                      country: { type: 'string' },
                      steamUrl: { type: 'string' },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
          example: {
            success: true,
            data: {
              user: {
                id: 1,
                steamId: '76561198025050683',
                steamName: 'Yinzers.io',
                avatar:
                  'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/3e/3e9d0d4c0e9f4d1d7e0d3a1f1b2d4a9b6e0f4e0b_full.jpg',
                country: 'US',
                steamUrl: 'https://steamcommunity.com/id/yinzersio/',
                createdAt: '2021-08-09T02:27:33.000Z',
                updatedAt: '2021-08-09T02:27:33.000Z',
              },
            },
          },
        },
      },
    },
  },
};
