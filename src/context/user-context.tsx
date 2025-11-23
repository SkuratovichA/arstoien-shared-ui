import type { FC, PropsWithChildren } from 'react';
import { createContext, use } from 'react';
import type { AuthUser } from './auth-context';

interface UserContextType {
  user: AuthUser;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const CurrentUserProvider: FC<PropsWithChildren<UserContextType>> = ({
  children,
  user,
  logout,
}) => <UserContext.Provider value={{ user, logout }}>{children}</UserContext.Provider>;

export const useUser = () => {
  const context = use(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a CurrentUserProvider');
  }
  return context;
};
