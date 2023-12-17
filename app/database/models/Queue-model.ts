/* eslint-disable new-cap */
import type { CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import { Attribute, AutoIncrement, BelongsTo, PrimaryKey, Table } from '@sequelize/core/decorators-legacy';
import { User } from 'models/User-model.ts';

enum QueueRequested {
  STARTER_KIT = 'starterKit',
}

@Table({ tableName: 'queues' })
class Queue extends Model<InferAttributes<Queue>, InferCreationAttributes<Queue>> {
  @Attribute(DataTypes.BIGINT)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.BIGINT)
  declare userId: number;

  @Attribute(DataTypes.STRING)
  declare queueRequested: QueueRequested;

  @BelongsTo(User, 'userId')
  declare user: NonAttribute<User>;
}

export { QueueRequested, Queue };
