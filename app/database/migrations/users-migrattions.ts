import { DataTypes } from '@sequelize/core';
import { sequelize } from 'models/index.ts';

await sequelize.queryInterface.createTable(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    steamId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    steamName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    steamUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verificationCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verifiedAt: {
      type: DataTypes.STRING,
      allowNull: true,
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
