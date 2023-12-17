import { DataTypes } from '@sequelize/core';
import { sequelize } from 'models/index.ts';
import log from 'utils/log-utils.ts';

await (async (): Promise<void> => {
  await sequelize.queryInterface.createTable(
    'users',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
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
      discordId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      discordUsername: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      discordDisplayname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      survivorName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      starterPackRedeemed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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

  log.info('🦊 Created users table');
  process.exit(0);
})();
