import SteamAuth from 'node-steam-openid';
import type { OpenAPIV3 } from 'openapi-types';
import type { ReturnResponse } from 'types/response-types.ts';

export default async (): Promise<ReturnResponse> => {
  const steam = new SteamAuth({
    realm: 'http://localhost:5000',
    returnUrl: 'http://localhost:5000/auth/steam/return',
    apiKey: Bun.env.STEAM_API_KEY,
  });

  const redirectUrl = await steam.getRedirectUrl();

  if (!redirectUrl) return { success: false, redirectUrl: undefined };

  return {
    success: true,
    data: { redirectUrl },
  };
};

export const steamRedirectDocs: OpenAPIV3.OperationObject = {
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
                  redirectUrl: { type: 'string' },
                },
              },
            },
          },
          example: {
            success: true,
            data: {
              redirectUrl: 'https://steamcommunity.com/openid/login?...',
            },
          },
        },
      },
    },
  },
};
