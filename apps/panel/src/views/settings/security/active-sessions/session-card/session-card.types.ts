import type { ActiveSession } from '../active-sessions.types';

export interface SessionCardProps {
  /**
   * The session to display in the card.
   */
  session: ActiveSession;

  /**
   * Callback function to call when the session is revoked.
   */
  onRevoked?: () => void;
}
