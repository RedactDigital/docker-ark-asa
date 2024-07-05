import { t } from 'elysia';
import type { Context } from 'elysia';
import type { OpenAPIV3 } from 'openapi-types';
import type { ReturnResponse } from 'types/response-types.ts';
import log from 'utils/log-utils.ts';

enum ServerName {
  SCORCHED_EARTH = 'scorchedEarth',
  THE_ISLAND = 'theIsland',
}

interface RegistrationRequest extends Context {
  body: {
    serverName: ServerName;
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async ({ body }: RegistrationRequest): Promise<ReturnResponse> => {
  try {
    const { serverName } = body;

    switch (serverName) {
      case ServerName.SCORCHED_EARTH:
        // Get current ark version

        break;
      case ServerName.THE_ISLAND:
        break;
      default:
        return {
          success: false,
          data: { error: 'Server not found' },
        };
    }

    return {
      success: true,
      data: { serverResponse: res },
    };
  } catch (error) {
    log.error('Error', error);
    return {
      success: false,
      data: { error },
    };
  }
};

const updateServerDocs = {
  body: t.Object({
    serverName: t.Enum(ServerName),
  }),
  response: t.Object(
    {
      success: t.Boolean(),
      data: t.Object({}),
    },
    { description: 'Success' },
  ),
  detail: <OpenAPIV3.OperationObject>{
    tags: ['Server Management'],
    summary: 'Authenticate or register a user',
  },
};

export { ServerName, updateServerDocs };
