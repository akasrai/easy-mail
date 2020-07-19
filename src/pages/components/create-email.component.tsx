import React, { useState, useEffect, useReducer, useContext } from 'react';

import { Input } from 'ui/form/input';
import { Button } from 'ui/form/button';
import { ErrorAlert } from 'ui/alert/inline-alert';

import * as app from 'app/app.state';
import history from 'app/app.history';
import { LS_KEY } from 'app/app.constant';
import { ROUTE } from 'app/app.route-path';
import { AuthContext } from 'app/app.context';

import { ApiResponse } from 'api/api.type';

import { LS } from 'helper/local-storage-helper';

const addEmailToLS = (newEmail: string) => {
  const { data }: ApiResponse = LS.get(LS_KEY.EMAILS);
  const emails = Array.isArray(data) ? [...data, newEmail] : [newEmail];

  LS.set(LS_KEY.EMAILS, emails);
};

const emailExists = (newEmail: string) => {
  const { data }: ApiResponse = LS.get(LS_KEY.EMAILS);

  if (Array.isArray(data))
    return data.find((email: string) => email === newEmail);

  return false;
};

const CreateEmail = ({ className }: { className?: string }) => {
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<string>();
  const [checkAuth, setCheckAuth] = useState<boolean>(true);
  const { setCurrentAuth, isHandlingAuth } = useContext(AuthContext);
  const [authState, dispatch] = useReducer(app.reducer, app.initialState);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isEmailValid(email)) handleAuth();
  };

  const isEmailValid = (email: string) => {
    if (!/^\S*$/.test(email)) {
      setError('Username cannot contain white-spaces.');
      return false;
    }

    if (!email) {
      setError('Email is not yet generated.');
      return false;
    }

    if (emailExists(email)) {
      setError('Email already exists.');
      return false;
    }

    return true;
  };

  const handleAuth = () => {
    dispatch({ type: app.AUTH_ACTION_PENDING });
    setError('');
    addEmailToLS(email);

    dispatch({
      type: app.SIGN_IN_SUCCESS,
      payload: { email },
    });
  };

  const restoreAuthentication = () => {
    dispatch({ type: app.AUTH_ACTION_PENDING });
    const { data }: ApiResponse = LS.get(LS_KEY.CURRENT_USER);

    if (data) {
      setCurrentUser(data.email);

      return dispatch({
        type: app.SIGN_IN_SUCCESS,
        payload: { email: data.email },
      });
    }

    dispatch({ type: app.SIGN_IN_ERROR });
  };

  const generateEmail = (e: any) => {
    const username = e.target.value;
    const nameSpace = process.env.REACT_APP_TEST_MAIL_NAMESPACE;
    const generatedEmail = `${nameSpace}.${username}@inbox.testmail.app`;

    if (isEmailValid(generatedEmail)) {
      setError('');
      setEmail(generatedEmail);
    }
  };

  useEffect(() => {
    setCurrentAuth(authState);

    if (checkAuth) {
      setCheckAuth(false);
      restoreAuthentication();
    }

    if (authState.email && authState.email !== currentUser) {
      setCurrentUser(authState.email);
      history.push(ROUTE.INBOX);
    }
  }, [authState, setCurrentAuth, checkAuth, setCheckAuth, currentUser]);

  return (
    <form className={className} onSubmit={handleSubmit}>
      <ErrorAlert message={error} />
      <Input
        type="text"
        name="username"
        placeholder="username"
        onChange={generateEmail}
        className={`mail-username-input f-larger ${error && 'is-invalid'}`}
      />

      {email && (
        <div className="position-relative">
          <Input
            type="text"
            name="email"
            value={email}
            readonly={true}
            placeholder="email"
            className={`mail-username-input f-larger ${error && 'is-invalid'}`}
          />
          <span
            title="copy"
            className="copy-mail"
            onClick={() => navigator.clipboard.writeText(email)}
          >
            <i className="icon ion-md-copy f-larger" />
          </span>
        </div>
      )}

      <Button
        name="Create"
        className="md btn-danger"
        disabled={isHandlingAuth}
      />
    </form>
  );
};

export default CreateEmail;
