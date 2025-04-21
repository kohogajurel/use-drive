import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

export const oauth2Client: OAuth2Client = new google.auth.OAuth2();

export function configureOAuth2Client(
  clientId: string,
  clientSecret: string,
  redirectUri: string
): void {
  oauth2Client.setCredentials({});
  oauth2Client._clientId = clientId;
  oauth2Client._clientSecret = clientSecret;
  // oauth2Client._redirectUri = redirectUri;
}
