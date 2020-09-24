import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext, useReducer } from 'react';

import { Flex } from './flex';

import * as app from 'app/app.state';
import { LS_KEY } from 'app/app.constant';
import { ROUTE } from 'app/app.route-path';
import { AuthContext } from 'app/app.context';

import { LS } from 'helper/local-storage-helper';
import history from 'app/app.history';
import { ApiResponse } from 'api/api.type';

const isPage = (page: string) => {
  const currentPage = window.location.pathname;

  return currentPage === page;
};

const SavedEmailList = () => {
  const [deleted, setDeleted] = useState<Boolean>(false);
  const [emails, setEmails] = useState<Array<string>>([]);
  const { email, setCurrentAuth } = useContext(AuthContext);
  const [authState, dispatch] = useReducer(app.reducer, app.initialState);

  const getEmails = () => {
    const { data, error } = LS.get(LS_KEY.EMAILS);

    if (error) return console.log('Error in accessing LS emails', error);

    setEmails(data);
  };

  const switchAuth = (email: string) => {
    dispatch({
      type: app.SIGN_IN_SUCCESS,
      payload: { email },
    });

    history.push(ROUTE.INBOX);
  };

  const removeEmail = (email: string) => {
    const { data }: ApiResponse = LS.get(LS_KEY.EMAILS);
    const emails = data.filter((e: string) => e !== email);

    LS.set(LS_KEY.EMAILS, emails);
    setDeleted(!deleted);
  };

  useEffect(() => {
    getEmails();
    if (authState.isAuthenticated) setCurrentAuth(authState);
  }, [authState, setCurrentAuth, email, deleted]);

  return (
    <div className="user-tool">
      <i className="icon ion-md-contact h3 m-0 pt-2 text-muted" />
      <button className="bold p user-tool-btn">
        <span className="d-inline d-md-none text-muted">
          {email.split('@')[0]}
        </span>
        <span className="d-none d-md-inline text-muted">{email}</span>
        <i className="icon ion-ios-arrow-down ml-2 text-primary" />
        <div className="dropdown text-muted">
          <div className="list">
            {isPage(ROUTE.INBOX) && (
              <Link
                to={ROUTE.HOME}
                className="w-100 btn btn-md btn-outline-danger p-1"
              >
                <span className="small">Create New</span>
              </Link>
            )}

            {isPage(ROUTE.HOME) && (
              <Link
                to={ROUTE.INBOX}
                className="w-100 btn btn-md btn-outline-danger p-1"
              >
                <span className="small">Inbox</span>
              </Link>
            )}
          </div>

          {emails.map((emailId, key) => (
            <div
              key={key}
              className="d-flex align-items-baseline justify-content-between"
            >
              <div className="list shake" onClick={() => switchAuth(emailId)}>
                <i className="icon ion-md-mail mr-2 m-0 d-inline-block" />
                {emailId}
              </div>
              {emailId !== email && (
                <i
                  title="Delete"
                  onClick={() => removeEmail(email)}
                  className="icon ion-md-trash m-0 d-inline-block pr-3 pl-2 delete-email"
                />
              )}
            </div>
          ))}
        </div>
      </button>
    </div>
  );
};

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <header className="col-md-12 p-3 pl-md-0 pr-md-0">
      <Flex className="justify-content-between text-white">
        <div className="col-md-3 p-0 pt-2">
          <Link to={ROUTE.HOME} className="d-flex text-primary">
            <i className="icon ion-md-mail-open lead mr-2 m-0" />
            <span className="lead">
              Easy<span className="bold">Mail</span>
            </span>
          </Link>
        </div>
        <div className="col-md-6 p-0 d-none d-md-block"></div>
        <div className="col-md-3 p-0 text-primary">
          {isAuthenticated && <SavedEmailList />}
        </div>
      </Flex>
    </header>
  );
};

export default Header;
