/* eslint-disable new-cap */
import type { CreationOptional, InferAttributes, InferCreationAttributes } from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import { Attribute, AutoIncrement, NotNull, PrimaryKey, Table } from '@sequelize/core/decorators-legacy';

@Table({ tableName: 'users' })
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare steamId: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare steamName: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare avatar: string;

  @Attribute(DataTypes.STRING)
  declare country: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare steamUrl: string;
}
