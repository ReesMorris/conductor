import type { GameServer, GameServerConnection } from '@conductor/database';

export interface ServerListProps {
  servers: Array<
    GameServer & {
      connections?: GameServerConnection[];
    }
  >;
  onRefresh?: () => void;
}
