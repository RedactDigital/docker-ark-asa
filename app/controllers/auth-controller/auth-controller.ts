import { randomBytes } from 'crypto';
import { t } from 'elysia';
import type { Context } from 'elysia';
import dayjs from 'dayjs';
import type { OpenAPIV3 } from 'openapi-types';
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
    attributes: {
      include: ['password'],
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

  const { password: _, ...userWithoutPassword } = user.toJSON();

  return {
    success: true,
    data: {
      user: userWithoutPassword,
      accessToken: token,
    },
  };
};

export const authControllerDocs = {
  body: t.Object({ email: t.String(), password: t.String() }),
  response: t.Object(
    {
      success: t.Boolean(),
      data: t.Object({
        user: t.Object({
          id: t.Number(),
          email: t.String(),
          verificationCode: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        }),
        accessToken: t.String(),
      }),
    },
    { description: 'Success' },
  ),
  detail: <OpenAPIV3.OperationObject>{
    tags: ['Auth'],
    summary: 'Authenticate or register a user',
  },
};
