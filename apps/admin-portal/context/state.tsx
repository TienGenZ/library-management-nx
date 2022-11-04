import { createContext } from 'react';
export interface ContextProps {
  toast: {
    isShow: boolean;
    severity?: 'success' | 'info' | 'warning' | 'error';
    title?: string;
    message?: string;
  };
  authorized?: boolean;
}

export const Context = createContext(null);
