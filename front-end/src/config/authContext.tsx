import { createContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login:(username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => Promise.resolve(),
  logout: () => {},
});

export default AuthContext;
