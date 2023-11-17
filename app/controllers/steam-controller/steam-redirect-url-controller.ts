import { t } from 'elysia';
import SteamAuth from 'node-steam-openid';
import type { OpenAPIV3 } from 'openapi-types';
import type { ReturnResponse } from 'types/response-types.ts';

export default async (): Promise<ReturnResponse> => {
  const steam = new SteamAuth({
    realm: Bun.env.APP_URL ?? 'http://localhost:8080',
    returnUrl: `${Bun.env.APP_URL ?? 'http://localhost:8080'}/steam/linkProfile`,
    apiKey: Bun.env.STEAM_API_KEY,
  });

  const redirectUrl = await steam.getRedirectUrl();

  if (!redirectUrl) return { success: false };

  return {
    success: true,
    data: { redirectUrl },
  };
};

export const steamRedirectDocs = {
  response: t.Object({
    success: t.Boolean(),
    data: t.Object({
      redirectUrl: t.String(),
    }),
  }),
  detail: <OpenAPIV3.OperationObject>{
    tags: ['Steam'],
    summary: 'Get steam redirect url',
  },
};
