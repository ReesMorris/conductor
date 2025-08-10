import { router } from '../../trpc';
import { deployServer } from './deploy-server.route';

export const serversRouter = router({
  deploy: deployServer
});
