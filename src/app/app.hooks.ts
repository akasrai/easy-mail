import React from 'react';

import { AuthState } from './app.type';
import { initialState } from './app.state';

const useAuth = (): AuthState => {
  const [auth, setAuth] = React.useState<AuthState>(initialState);

  const setCurrentAuth = React.useCallback((currentAuth: AuthState): void => {
    setAuth({ ...currentAuth });
  }, []);

  return {
    ...auth,
    setCurrentAuth,
  };
};

export default useAuth;
