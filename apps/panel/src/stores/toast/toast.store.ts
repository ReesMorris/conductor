import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ToastState } from './toast.types';

let toastId = 0;
const initialState: Pick<ToastState, 'toasts'> = {
  toasts: []
};

export const useToastStore = create<ToastState>()(
  devtools(
    set => ({
      ...initialState,

      addToast: toast => {
        const id = String(toastId++);
        set(state => ({
          toasts: [...state.toasts, { ...toast, id }]
        }));
        return id;
      },

      removeToast: id =>
        set(state => ({
          toasts: state.toasts.filter(t => t.id !== id)
        })),

      removeAllToasts: () => set({ toasts: [] })
    }),
    {
      name: 'toast-store'
    }
  )
);
