export interface DeleteServerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  server: {
    id: string;
    name: string;
    gameId: string;
  };
  onSuccess?: () => void;
}
