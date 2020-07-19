import React, { useState, useEffect, useContext } from 'react';

import { FlexRow } from 'ui/flex';
import MainLayout from 'ui/main.layout';

import { AuthContext } from 'app/app.context';

import { MailResponse, Email } from 'api/api.type';
import { getMails, listenIncomingMails } from 'api/request.api';

import EmailList from './components/email-list.component';
import SingleView, { Empty } from './components/view-email.component';
import { isMobileScreen } from 'helper/device-helper';

interface InboxPageProps {
  loading: boolean;
  emails: Array<Email>;
  selectedEmail: Email | undefined;
  viewEmailById: (id: string) => void;
  selectEmail: (email: Email | undefined) => void;
}

const getUserName = (email: string) => {
  const nameSpace = process.env.REACT_APP_TEST_MAIL_NAMESPACE || '';

  return email.split('@')[0].replace(`${nameSpace}.`, '');
};

const InboxPage = () => {
  const userEmailId = useContext(AuthContext).email;
  const [synced, setSynced] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedEmail, selectEmail] = useState<Email>();
  const [emails, setEmails] = useState<Array<Email>>([]);
  const [currentUser, setCurrentUser] = useState<string>(userEmailId);

  const viewEmailById = (messageId: string) => {
    const email = emails.find((email) => email.messageId === messageId);
    selectEmail(email);
  };

  useEffect(() => {
    const subscribeLiveMails = async () => {
      const mails: MailResponse = (await listenIncomingMails(
        getUserName(userEmailId)
      )) as MailResponse;

      setEmails([...mails.inbox.emails, ...emails]);
    };

    const fetchOldMails = async () => {
      setLoading(true);
      const mails: MailResponse = (await getMails(
        getUserName(userEmailId)
      )) as MailResponse;

      setSynced(true);
      setLoading(false);
      selectEmail(undefined);
      setCurrentUser(userEmailId);
      setEmails([...mails.inbox.emails]);
    };

    if (!synced) fetchOldMails();
    if (synced && currentUser === userEmailId) subscribeLiveMails();
    if (synced && currentUser !== userEmailId) fetchOldMails();
  }, [emails, userEmailId]);

  if (isMobileScreen())
    return (
      <MobilePage
        emails={emails}
        loading={loading}
        selectEmail={selectEmail}
        viewEmailById={viewEmailById}
        selectedEmail={selectedEmail}
      />
    );

  return (
    <WebPage
      emails={emails}
      loading={loading}
      selectEmail={selectEmail}
      viewEmailById={viewEmailById}
      selectedEmail={selectedEmail}
    />
  );
};

const MobilePage = (props: InboxPageProps) => {
  const { emails, loading, selectEmail, viewEmailById, selectedEmail } = props;

  return (
    <MainLayout>
      {selectedEmail ? (
        <SingleView selectEmail={selectEmail} email={selectedEmail} />
      ) : (
        <EmailList
          emails={emails}
          loading={loading}
          viewEmailById={viewEmailById}
        />
      )}
    </MainLayout>
  );
};

const WebPage = (props: InboxPageProps) => {
  const { emails, loading, selectEmail, viewEmailById, selectedEmail } = props;

  return (
    <MainLayout>
      <FlexRow className="justify-content-between">
        <div className="col-md-4 p-0">
          <EmailList
            emails={emails}
            loading={loading}
            viewEmailById={viewEmailById}
          />
        </div>
        <div className="col-md-8 p-0">
          {selectedEmail ? (
            <SingleView selectEmail={selectEmail} email={selectedEmail} />
          ) : (
            <Empty message="No Email Selected" />
          )}
        </div>
      </FlexRow>
    </MainLayout>
  );
};

export default InboxPage;
