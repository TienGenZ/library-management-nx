import { createContext } from 'react';
export interface ContextProps {
  toast: {
    isShow?: boolean;
    severity?: 'success' | 'info' | 'warning' | 'error';
    title?: string;
    message?: string;
  };
  authorized?: boolean;
  user: {
    name?: string;
    role?: string;
    email?: string;
    username?: string;
  };
}

export const Context = createContext(null);
