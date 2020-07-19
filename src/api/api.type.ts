export interface ApiResponse {
  data?: any;
  error?: any;
}

interface FromParsed {
  address: string;
  group: string;
  name: string;
}

export interface Email {
  to: string;
  date: number;
  from: string;
  html: string;
  text: string;
  subject: string;
  messageId: string;
  from_parsed: Array<FromParsed>;
}

export interface MailResponse {
  inbox: {
    count: number;
    result: string;
    emails: Array<Email>;
  };
}
