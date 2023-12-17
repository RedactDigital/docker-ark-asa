import { DataTypes } from '@sequelize/core';
import { sequelize } from 'models/index.ts';
import log from 'utils/log-utils.ts';

await (async (): Promise<void> => {
  await sequelize.queryInterface.createTable(
    'queues',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.BIGINT,
        references: {
          table: 'users',
          key: 'id',
        },
      },
      queueRequested: {
        type: DataTypes.STRING,
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

  log.info('🦊 Created queues table');
  process.exit(0);
})();
