/* eslint-disable new-cap */
import type { CreationOptional, InferAttributes, InferCreationAttributes } from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import { Attribute, AutoIncrement, NotNull, PrimaryKey, Table } from '@sequelize/core/decorators-legacy';

@Table({ tableName: 'users', defaultScope: { attributes: { exclude: ['password'] } } })
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare email: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  set password(value: string) {
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
  declare avatar: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare country: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare verificationCode: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare verifiedAt: CreationOptional<string>;
}
