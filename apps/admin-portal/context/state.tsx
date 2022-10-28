import { createContext } from 'react';
export interface ContextProps {
  toast: {
    isShow: boolean;
    severity?: 'success' | 'info' | 'warning' | 'error';
    title?: string;
    message?: string;
  };
}

export const Context = createContext(null);
