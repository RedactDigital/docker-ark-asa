/* eslint-disable new-cap */
import type { CreationOptional, InferAttributes, InferCreationAttributes } from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import { Attribute, AutoIncrement, PrimaryKey, Table } from '@sequelize/core/decorators-legacy';

@Table({ tableName: 'users', defaultScope: { attributes: { exclude: ['password'] } } })
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.BIGINT)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  declare email: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  set password(value: string) {
    if (!Bun.env.SALT_ROUNDS) throw new Error('Salt rounds not found');
    this.setDataValue(
      'password',
      Bun.password.hashSync(value, {
        algorithm: 'bcrypt',
        cost: Number(Bun.env.SALT_ROUNDS),
      }),
    );
  }

  @Attribute(DataTypes.STRING)
  declare steamId: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare steamName: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare steamUrl: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare discordId: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare discordUsername: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare discordDisplayname: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare survivorName: CreationOptional<string>;

  @Attribute(DataTypes.BOOLEAN)
  declare starterPackRedeemed: CreationOptional<boolean>;

  @Attribute(DataTypes.STRING)
  declare avatar: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare country: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare verificationCode: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare verifiedAt: CreationOptional<string>;
}
