import { afterAll, beforeAll, expect, test } from 'bun:test';
import { sequelize } from 'models/index.ts';
import { app } from 'root/index.ts';

test('newUser', async () => {
  beforeAll(async () => {
    // global setup
  });
  afterAll(async () => {
    // global setup
    await sequelize.close();
    await app.stop();
  });

  const res = await app.handle(
    new Request('localhost:5000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'jondoe@test.com',
        password: 'password',
      }),
    }),
  );

  const body = await res.json();

  expect(res.status).toEqual(200);
  expect(body.success).toEqual(true);
  expect(body.data).toHaveProperty('accessToken');
});

test('wrongPassword', async () => {
  const res = await app.handle(
    new Request('localhost:5000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'jondoe@test.com',
        password: 'wrongpass',
      }),
    }),
  );

  const body = await res.json();
  expect(res.status).toEqual(401);
  expect(body.success).toEqual(false);
  expect(body.error).toEqual('Incorrect email or password');
});
