import { router } from '../../trpc';
import { deployServer } from './deploy-server.route';
import { listServers } from './list-servers.route';

export const serversRouter = router({
  deploy: deployServer,
  list: listServers
});
