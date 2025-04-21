import dotenv from "dotenv";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import fs from "fs";

dotenv.config();

export interface GoogleCredentials {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

let oauth2Client: OAuth2Client;

/**
 * Initialize the Google Drive API with credentials
 * @param credentials - Google OAuth credentials object
 * @returns The configured OAuth2Client
 */
export function initDrive(credentials: GoogleCredentials): OAuth2Client {
  const { clientId, clientSecret, redirectUri } = credentials;
  oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  return oauth2Client;
}

/**
 * Generate the authorization URL
 * @param credentials - Google OAuth credentials (optional if already initialized)
 * @returns The authorization URL
 */
export function getAuthUrl(credentials?: GoogleCredentials): string {
  if (credentials && !oauth2Client) {
    initDrive(credentials);
  }

  if (!oauth2Client) {
    throw new Error("Drive API not initialized. Call initDrive first.");
  }

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive"],
  });
}

/**
 * Get tokens from the authorization code
 * @param code - The authorization code
 * @param credentials - Google OAuth credentials (optional if already initialized)
 * @returns The OAuth tokens
 */
export async function getTokens(
  code: string,
  credentials?: GoogleCredentials
): Promise<any> {
  if (credentials && !oauth2Client) {
    initDrive(credentials);
  }

  if (!oauth2Client) {
    throw new Error("Drive API not initialized. Call initDrive first.");
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
  } catch (error) {
    console.error("Error retrieving access token", error);
    throw error;
  }
}

/**
 * Set credentials directly if you already have tokens
 * @param tokens - OAuth tokens
 * @param credentials - Google OAuth credentials (optional if already initialized)
 */
export function setCredentials(
  tokens: any,
  credentials?: GoogleCredentials
): void {
  if (credentials && !oauth2Client) {
    initDrive(credentials);
  }

  if (!oauth2Client) {
    throw new Error("Drive API not initialized. Call initDrive first.");
  }

  oauth2Client.setCredentials(tokens);
}

/**
 * List files from Google Drive
 * @returns Array of file objects
 */
export async function listFiles(): Promise<DriveFile[]> {
  if (!oauth2Client) {
    throw new Error("Drive API not initialized. Call initDrive first.");
  }

  try {
    const drive = google.drive({ version: "v3", auth: oauth2Client });
    const res = await drive.files.list({
      fields: "nextPageToken, files(id, name, mimeType)",
    });

    const files = res.data.files;

    if (!files || files.length === 0) {
      return [];
    }

    return files.map((file) => ({
      id: file.id!,
      name: file.name!,
      mimeType: file.mimeType!,
    }));
  } catch (err) {
    console.error("Error listing files:", err);
    throw err;
  }
}

/**
 * Upload a file to Google Drive
 * @param filePath - Path to the file
 * @param fileName - Name for the file in Drive
 * @param mimeType - MIME type of the file
 * @returns ID of the uploaded file
 */
export async function uploadFile(
  filePath: string,
  fileName: string,
  mimeType: string
): Promise<string> {
  if (!oauth2Client) {
    throw new Error("Drive API not initialized. Call initDrive first.");
  }

  try {
    const drive = google.drive({ version: "v3", auth: oauth2Client });
    const res = await drive.files.create({
      media: {
        mimeType: mimeType,
        body: fs.createReadStream(filePath),
      },
      requestBody: {
        name: fileName,
      },
      fields: "id",
    });

    return res.data.id!;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
}

/**
 * Delete a file from Google Drive
 * @param fileId - ID of the file to delete
 */
export async function deleteFile(fileId: string): Promise<void> {
  if (!oauth2Client) {
    throw new Error("Drive API not initialized. Call initDrive first.");
  }

  try {
    const drive = google.drive({ version: "v3", auth: oauth2Client });
    await drive.files.delete({
      fileId: fileId,
    });
  } catch (err) {
    console.error(`Error deleting file with ID ${fileId}:`, err);
    throw err;
  }
}
