import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import serviceAccount from '../utils/service-account.json';

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const getCalendarClient = (tokens:any) => {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  
    auth.setCredentials(tokens);
    return google.calendar({ version: 'v3', auth });
  };


 // Path to your downloaded key

export function getServiceAccountCalendar() {
  const jwtClient = new JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth: jwtClient });
}