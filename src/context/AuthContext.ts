import { createContext } from 'react';

interface AuthContext {
  user: string;
  setUser: (user: string) => void;
}

export const AuthContext = createContext<any>({});
