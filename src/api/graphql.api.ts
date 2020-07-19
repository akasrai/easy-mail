import { GraphQLClient } from '@testmail.app/graphql-request';

const apiClient = new GraphQLClient(
  process.env.REACT_APP_TEST_MAIL_API_BASE_URL || '',
  {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TEST_MAIL_API_KEY}`,
    },
  }
);

export default apiClient;
