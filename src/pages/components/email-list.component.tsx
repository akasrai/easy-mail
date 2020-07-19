import moment from 'moment';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';

import { FlexRow } from 'ui/flex';
import { ListeningSignal } from 'ui/icons/loading-icon';

import { ROUTE } from 'app/app.route-path';
import { AuthContext } from 'app/app.context';

import { Email } from 'api/api.type';
import { Empty } from './view-email.component';

interface EmailListProps {
  emails: Array<Email>;
  viewEmailById: (param: string) => void;
}

const EmailListHeader = () => {
  const userEmailId = useContext(AuthContext).email;

  return (
    <FlexRow className="justify-content-between text-primary border-bottom pb-1">
      <div>
        <span className="title w-100">
          <span className="mr-1">Inbox</span>
          <ListeningSignal className="listening-signal" />
        </span>
        <span className="small user-email w-100">
          <i className="dot bg-success mr-1" />
          {userEmailId}
        </span>
      </div>
      <div className="new-email">
        <Link
          to={ROUTE.HOME}
          className="btn btn-md btn-outline-danger p-0 pl-3 pr-3"
        >
          <small>
            <i className="icon ion-md-add-circle-outline mr-1" />
            New
          </small>
        </Link>
      </div>
    </FlexRow>
  );
};

const EmailList = ({ emails, viewEmailById }: EmailListProps) => (
  <div className="col-md-12 p-0 inbox-sidebar">
    <EmailListHeader />
    <div className="inbox">
      {emails.length > 0 ? (
        emails.map((email, key) => (
          <div key={key} onClick={() => viewEmailById(email.messageId)}>
            <FlexRow className="inbox-row">
              <div className="col-md-9 p-0">
                <span className="d-block">
                  {email.from_parsed[0].name ||
                    email.from_parsed[0].address.split('@')[0]}
                </span>
                <span className="d-block small subject">{email.subject}</span>
              </div>
              <div className="col-md-3 p-0 pl-3 email-date-time">
                <span className="d-block">
                  {moment.utc(email.date).local().format('MMM DD, YYYY')}
                </span>
                <span className="d-block">
                  {moment.utc(email.date).local().format('h:mm A')}
                </span>
              </div>
            </FlexRow>
          </div>
        ))
      ) : (
        <Empty message="Your inbox is empty" />
      )}
    </div>
  </div>
);

export default EmailList;
