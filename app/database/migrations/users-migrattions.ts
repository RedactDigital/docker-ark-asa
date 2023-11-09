import { DataTypes } from '@sequelize/core';
import { sequelize } from 'root/database/models/index-models.ts';

await sequelize.queryInterface.createTable(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    steamId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    steamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
    },
    steamUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {},
);
