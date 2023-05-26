import { createContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  errorMessage: string | null;
  login:(username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  errorMessage: null,
  login: () => Promise.resolve(),
  logout: () => {},
});

export default AuthContext;
