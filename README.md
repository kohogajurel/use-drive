# use-drive

A lightwieght wrapper for Google Drive API that makes file managment super easy!

## Instalation

```bash
npm install use-drive
# or
yarn add use-drive
# or
pnpm add use-drive
```

## Features

- Simple OAuth2 authentication
- List files from your Drive
- Upload files to Drive
- Delete files from Drive
- Strongly typed with TypeScript
- Minimal dependencys

## Usage

```typescript
import {
  initDrive,
  getAuthUrl,
  getTokens,
  setCredentials,
  listFiles,
  uploadFile,
  deleteFile,
} from "use-drive";

const oauth2Client = initDrive({
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  redirectUri: "YOUR_REDIRECT_URI",
});

async function authenticate() {
  const authUrl = getAuthUrl();
  console.log("Please authorize this app by visiting:", authUrl);

  const code = "AUTHORIZATION_CODE_FROM_REDIRECT";

  try {
    const tokens = await getTokens(code);
    console.log("Authentication successful!");
    return true;
  } catch (error) {
    console.error("Authentication failed:", error);
    return false;
  }
}

function useExistingTokens() {
  setCredentials({
    access_token: "YOUR_ACCESS_TOKEN",
    refresh_token: "YOUR_REFRESH_TOKEN",
    expiry_date: 1234567890000,
  });
}

async function listAllFiles() {
  try {
    const files = await listFiles();
    console.log("Files in your Drive:", files);
    /* Example output:
    [
      { id: '1abc...', name: 'document.pdf', mimeType: 'application/pdf' },
      { id: '2def...', name: 'image.jpg', mimeType: 'image/jpeg' }
    ]
    */
  } catch (error) {
    console.error("Error listing files:", error);
  }
}

async function uploadFileExample() {
  try {
    const fileId = await uploadFile(
      "/local/path/to/file.pdf",
      "uploaded-document.pdf",
      "application/pdf"
    );

    console.log("File uploaded successfully with ID:", fileId);
    return fileId;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
}

async function deleteFileExample(fileId: string) {
  try {
    await deleteFile(fileId);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

async function exampleWorkflow() {
  if (await authenticate()) {
    await listAllFiles();
    const newFileId = await uploadFileExample();
    if (newFileId) {
      console.log(
        `File available at: https://drive.google.com/file/d/${newFileId}/view`
      );
      await deleteFileExample(newFileId);
    }
  }
}
```

### Environment Variables (Alternative Setup)

You can also use environment variables for configuration:

```typescript
import { initDrive } from "use-drive";

initDrive({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: process.env.GOOGLE_REDIRECT_URI!,
});
```

### Error Handling

```typescript
try {
  const files = await listFiles();
} catch (error) {
  if (error.message.includes("Drive API not initialized")) {
    console.error("API not initialized. Call initDrive first.");
  } else if (error.message.includes("auth")) {
    console.error("Authentication error. Please re-authenticate.");
  } else {
    console.error("Operation failed:", error);
  }
}
```

## API Reference

### Constructor

Creates a new UseDrive instance. You can either pass your OAuth credentials here or later using the configure method.

```typescript
constructor(clientId?: string, clientSecret?: string, redirectUri?: string)
```

### Configure

Sets up the OAuth2 client with your Google API credentials.

```typescript
configure(clientId: string, clientSecret: string, redirectUri: string): void
```

### Get Auth URL

Generates the authorization URL for OAuth2 flow.

```typescript
getAuthUrl(): string
```

### Get Tokens

Exchanges the authorization code for access tokens.

```typescript
getTokens(code: string): Promise<any>
```

### Set Credentials

Sets OAuth2 credentials if you already have tokens.

```typescript
setCredentials(tokens: any): void
```

### List Files

Lists all files in your Google Drive.

```typescript
listFiles(): Promise<{ id: string; name: string; mimeType: string }[]>
```

### Upload File

Uploads a file to Google Drive.

```typescript
uploadFile(filePath: string, fileName: string, mimeType: string): Promise<string>
```

### Delete File

Deletes a file from Google Drive.

```typescript
deleteFile(fileId: string): Promise<void>
```

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Author

Made with ❤️ by [Ankur Gajurel](https://github.com/ankurgajurel)
