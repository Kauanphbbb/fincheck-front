import { useQuery } from '@tanstack/react-query';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LaunchScreen } from '../../ui/components/LaunchScreen';
import { localStorageKeys } from '../config/localStorageKeys';
import { queryClient } from '../config/queryClient';
import { httpClient } from '../services/httpClient';
import { userService } from '../services/userService';

interface AuthContextValue {
  signedIn: boolean;
  authenticate: (accessToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return !!accessToken;
  });

  const { isError, isFetching, isSuccess } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => userService.me(),
    enabled: signedIn,
  });

  const authenticate = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    httpClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

    setSignedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    queryClient.removeQueries({ queryKey: ['users', 'me'] });
    setSignedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      logout();
    }
  }, [isError, logout]);

  return (
    <AuthContext.Provider
      value={{ signedIn: isSuccess && signedIn, authenticate, logout }}
    >
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
