import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { sequelize } from 'models/index.ts';
import { app } from 'root/index.ts';

describe('steam', () => {
  beforeAll(async () => {
    // global setup
  });
  afterAll(async () => {
    // global setup
    await sequelize.close();
    await app.stop();
  });

  test('steamlink 200', async () => {
    const res = await app.handle(
      new Request(
        'localhost:5000/steam/linkProfile?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=id_res&openid.op_endpoint=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Flogin&openid.claimed_id=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Fid%2F76561198040742599&openid.identity=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Fid%2F76561198040742599&openid.return_to=http%3A%2F%2Flocalhost%3A8080%2Fsteam%2FlinkProfile&openid.response_nonce=2023-11-14T20%3A10%3A29ZD%2Be6moRO42iT0FtMkeq%2BULMOyOM%3D&openid.assoc_handle=1234567890&openid.signed=signed%2Cop_endpoint%2Cclaimed_id%2Cidentity%2Creturn_to%2Cresponse_nonce%2Cassoc_handle&openid.sig=7IYqwI3VaTmq9Ya6dOzN4n4QSOE%3D',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    const body = await res.json();

    expect(res.status).toEqual(200);
    expect(body.success).toEqual(true);
    expect(body.data).toHaveProperty('user');
  });
});
