import type { GameServer, GameServerConnection } from '@conductor/database';

export interface ServerCardProps {
  server: GameServer & {
    connections?: GameServerConnection[];
    connectionUrl?: string;
  };
  onRefresh?: () => void;
}
