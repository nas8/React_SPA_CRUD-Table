import { createContext } from 'react';

interface AuthContextProps {
  isAuthor: boolean;
  setIsAuthor: (isAuthor: boolean) => void;
}

export const AuthContext = createContext<any>({});
