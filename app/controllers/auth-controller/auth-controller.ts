import { randomBytes } from 'crypto';
import type { Context } from 'elysia';
import type { OpenAPIV3 } from 'openapi-types';
import dayjs from 'dayjs';
import type { ReturnResponse } from 'types/response-types.ts';
import { User } from 'models/User-model.ts';
import type { BunContext } from 'root/index.ts';

interface RegistrationRequest extends Context {
  body: {
    email: string;
    password: string;
  };
}

export default async ({ body, accessToken, set }: BunContext): Promise<ReturnResponse> => {
  const { email, password } = <RegistrationRequest['body']>body;

  const [user, noUserExists] = await User.findOrCreate({
    where: {
      email,
    },
    defaults: {
      email,
      password,
    },
  });

  if (noUserExists) {
    const verificationCode = randomBytes(3).toString('hex').slice(0, 5);
    await user.update({ verificationCode, password });
  }

  if (!noUserExists && !(await Bun.password.verify(password, user.password))) {
    set.status = 401;
    return {
      success: false,
      error: 'Incorrect email or password',
    };
  }

  const token = await accessToken.sign({
    sub: String(user.id),
    iat: dayjs().unix(),
  });

  return {
    success: true,
    data: {
      user,
      accessToken: token,
    },
  };
};

export const authDocs: OpenAPIV3.OperationObject = {
  tags: ['Auth'],
  responses: {
    200: {
      description: 'Returns the user and access token',
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
                      id: { type: 'string' },
                      email: { type: 'string' },
                      verificationCode: { type: 'string' },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' },
                    },
                  },
                  accessToken: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
};
