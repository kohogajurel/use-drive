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
import UseDrive from 'use-drive';

// initialize
const drive = new UseDrive(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URI'
);

const authUrl = drive.getAuthUrl();
console.log('Authorize this app by visiting:', authUrl);

async function handleAuthCode(code) {
  const tokens = await drive.getTokens(code);
  
  // list files
  const files = await drive.listFiles();
  console.log('Your files:', files);
  
  // upload a file
  const fileId = await drive.uploadFile(
    '/path/to/your/file.jpg',
    'my-uploaded-image.jpg',
    'image/jpeg'
  );
  
  // delete a file
  await drive.deleteFile(fileId);
}

// If you already have tokens, you can set them directly
drive.setCredentials({
  access_token: 'YOUR_ACCESS_TOKEN',
  refresh_token: 'YOUR_REFRESH_TOKEN',
  // other token properties
});
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