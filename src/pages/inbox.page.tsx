import React, { useState, useEffect, useContext } from 'react';

import { Flex } from 'ui/flex';
import MainLayout from 'ui/main.layout';

import { AuthContext } from 'app/app.context';

import { MailResponse, Email } from 'api/api.type';
import { getMails, listenIncomingMails } from 'api/request.api';

import EmailList from './components/email-list.component';
import SingleView, { Empty } from './components/view-email.component';

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
      selectEmail(undefined);
      setEmails([...mails.inbox.emails]);
      setLoading(false);
    };

    if (!synced) fetchOldMails();
    if (synced && currentUser === userEmailId) subscribeLiveMails();
    if (synced && currentUser !== userEmailId) fetchOldMails();
    if (currentUser !== userEmailId) setCurrentUser(userEmailId);
  }, [emails, synced, currentUser, userEmailId]);

  return (
    <MainLayout>
      <Flex className="justify-content-between">
        <div className="col-md-4 p-0 p-sticky">
          <EmailList
            emails={emails}
            loading={loading}
            viewEmailById={viewEmailById}
          />
        </div>
        <div className="col-md-8 p-0">
          {selectedEmail ? (
            <SingleView email={selectedEmail} />
          ) : (
            <Empty message="No Email Selected" />
          )}
        </div>
      </Flex>
    </MainLayout>
  );
};

export default InboxPage;
