import type { Elysia } from 'elysia';
import updateController, { updateServerDocs } from 'controllers/management-controller.ts/update-controller.ts';
import getPlayersController, { getPlayersDocs } from 'controllers/management-controller.ts/getPlayers-controller.ts';

export default (app: Elysia): Elysia =>
  app
    .post('/update', <any>updateController, updateServerDocs)
    .post('/players', <any>getPlayersController, getPlayersDocs);
