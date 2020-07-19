import React, { Suspense } from 'react';

import Routes from './app.routes';
import useAuth from './app.hooks';
import { AuthContextProvider } from './app.context';
import GithubCornerLink from 'ui/icons/github-link-icon';

const GettingThingsReady = () => {
  return (
    <div className="container-loader w-100">
      <h5 className="mt-5 pt-5 text-blink text-center text-muted">
        Getting things Ready!
      </h5>
    </div>
  );
};

function App() {
  const currentAuth = useAuth();

  return (
    <Suspense fallback={<GettingThingsReady />}>
      <AuthContextProvider value={currentAuth}>
        <Routes />
        <GithubCornerLink />
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;
