import { Link } from 'react-router-dom';
import React, { useContext } from 'react';

import MainLayout from 'ui/main.layout';

import { ROUTE } from 'app/app.route-path';
import { AuthContext } from 'app/app.context';
import CreateEmail from './components/create-email.component';
import { WarningAlert } from 'ui/alert/inline-alert';

const HomePage = () => {
  const { isAuthenticated, email } = useContext(AuthContext);

  return (
    <MainLayout>
      <div className="col-md-5 p-0 m-auto">
        {isAuthenticated && (
          <div className="alert alert-info p-2 mt-4 small">
            Hi! <strong>{email}</strong>.<br /> You are already loged in, click{' '}
            <Link className="bold mr-1" to={ROUTE.INBOX}>
              here
            </Link>
            to check your inbox.
          </div>
        )}
        <h3 className="text-center text-primary mt-5 mb-0">
          <i className="icon ion-md-construct mr-1" />
          Email Generator
        </h3>
        <span className="small text-center mb-4 d-block text-muted">
          All you need is enter a username and start receiving the emails right
          away. <br />
          Cheers ✨🎉
        </span>
      </div>
      <CreateEmail className="col-md-5 p-0 m-auto" />
    </MainLayout>
  );
};

export default HomePage;
