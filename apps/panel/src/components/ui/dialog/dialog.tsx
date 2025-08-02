import { DialogAction } from './dialog-action';
import { DialogCancel } from './dialog-cancel';
import { DialogContent } from './dialog-content';
import { DialogDescription } from './dialog-description';
import { DialogFooter } from './dialog-footer';
import { DialogHeader } from './dialog-header';
import { DialogRoot } from './dialog-root';
import { DialogTitle } from './dialog-title';
import { DialogTrigger } from './dialog-trigger';

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Cancel: DialogCancel,
  Action: DialogAction
};
