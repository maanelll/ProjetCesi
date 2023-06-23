import { createContext } from 'react';
import { IUser } from '../types';


export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  errorMessage: string | null;
  role: string | null;
  loggedUser: IUser | null;
  login:(username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  errorMessage: null,
  role: null,
  loggedUser: null,
  login: () => Promise.resolve(),
  logout: () => {},
});

export default AuthContext;
