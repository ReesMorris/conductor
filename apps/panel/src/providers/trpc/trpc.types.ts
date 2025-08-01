export interface TRPCProviderProps {
  /**
   * The API URL for tRPC requests
   */
  apiUrl: string;

  /**
   * The children to render within the TRPCProvider.
   */
  children: React.ReactNode;
}
