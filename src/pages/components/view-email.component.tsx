import moment from 'moment';
import React, { Fragment, useContext } from 'react';

import Footer from 'ui/footer';
import { FlexRow } from 'ui/flex';

import { AuthContext } from 'app/app.context';

import { Email } from 'api/api.type';

interface SingleViewProps {
  email: Email;
  selectEmail: (email: Email | undefined) => void;
}

export const Empty = ({ message }: { message: string }) => (
  <FlexRow className="justify-content-center shake">
    <div className="row m-0 text-center empty-email-content">
      <div className="w-100">
        <span className="icon ion-logo-dropbox text-danger empty-icon"></span>
      </div>
      <span className="col-12 lead d-block text">{message}</span>
    </div>
    <div className="col-md-12 p-0 m-0">
      <Footer />
    </div>
  </FlexRow>
);

const SingleView = ({ email, selectEmail }: SingleViewProps) => {
  const toEmail = useContext(AuthContext).email;

  return (
    <Fragment>
      <div className="email-action">
        <i
          title="Back"
          className="icon ion-md-arrow-back"
          onClick={() => selectEmail(undefined)}
        />
      </div>
      <div className="col-md-12 p-3 pl-md-5 email-view">
        <div className="d-none d-md-block text-muted pl-5 p">
          {email.subject}
        </div>
        <div className="d-flex text-primary mb-4">
          <i className="icon ion-md-contact h1 mr-3" />
          <div>
            <a href="mailto:" className="lead d-block">
              {email.from}
            </a>
            <span className="d-block small text-muted">
              {moment.utc(email.date).local().format('MMM DD, YYYY h:mm A')}
            </span>
            <span className="d-block small text-muted">
              To: <a href="mailto:">{toEmail}</a>
            </span>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: email?.html || '' }} />
        <Footer />
      </div>
    </Fragment>
  );
};

export default SingleView;
