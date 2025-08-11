import { router } from '../../trpc';
import { listGames } from '../games/list-games.route';
import { deleteServer } from './delete-server.route';
import { deployServer } from './deploy-server.route';
import { getDeleteInfo } from './get-delete-info.route';
import { listServers } from './list-servers.route';
import { restartServer, startServer, stopServer } from './manage.route';
import { getServerStatus } from './status.route';

export const serversRouter = router({
  games: listGames,
  deploy: deployServer,
  list: listServers,
  status: getServerStatus,
  start: startServer,
  stop: stopServer,
  restart: restartServer,
  getDeleteInfo,
  delete: deleteServer
});
