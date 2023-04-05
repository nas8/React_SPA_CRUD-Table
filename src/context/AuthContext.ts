import { createContext } from 'react';

interface AuthContext {
  isAuthor: boolean;
  setIsAuthor: (isAuthor: boolean) => void;
}

export const AuthContext = createContext<any>({});
