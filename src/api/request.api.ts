import apiClient from './graphql.api';

export const listenIncomingMails = (username: string) => {
  return apiClient
    .request(
      `{
        inbox (
          namespace:"${process.env.REACT_APP_TEST_MAIL_NAMESPACE}"
          tag:"${username}"
          timestamp_from:${Date.now()}
          livequery:true
          ) {
            result
            count
            emails {
              to
              date
              from
              html
              text
              subject
              messageId
              from_parsed{
                name
                group
                address
              }
            }
          }
        }`
    )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getMails = (username: string) => {
  return apiClient
    .request(
      `{
        inbox (
          namespace:"${process.env.REACT_APP_TEST_MAIL_NAMESPACE}"
          tag:"${username}"
          livequery:false
          limit:10
          advanced_sorts:[{
            field:timestamp,
            order:desc
          }]
          ) {
            result
            count
            emails {
              to
              date
              from
              html
              text
              subject
              messageId
              spam_score
              spam_report
              to_parsed{
                name
                group
                address
              }
              from_parsed{
                name
                group
                address
              }
            }
          }
        }`
    )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
