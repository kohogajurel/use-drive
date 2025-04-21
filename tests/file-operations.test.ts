import {
  initDrive,
  setCredentials,
  listFiles,
  uploadFile,
  deleteFile,
  GoogleCredentials,
} from "../src/index";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

describe("File Operation Tests", () => {
  const authFilePath = path.join(__dirname, "auth.json");

  const sampleFilePath = path.join(__dirname, "sample.txt");

  beforeAll(() => {
    if (!fs.existsSync(authFilePath)) {
      throw new Error(
        "auth.json file not found. Please run the authentication test first."
      );
    }

    if (!fs.existsSync(sampleFilePath)) {
      console.log("Creating sample.txt file for testing...");
      fs.writeFileSync(
        sampleFilePath,
        "This is a sample text file used for testing Google Drive API operations."
      );
    }

    const authData = JSON.parse(fs.readFileSync(authFilePath, "utf8"));

    if (!authData.accessToken) {
      throw new Error(
        "Access token not found in auth.json. Please run the authentication test first."
      );
    }

    const credentials: GoogleCredentials = {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      redirectUri: process.env.GOOGLE_REDIRECT_URI || "",
    };

    if (
      !credentials.clientId ||
      !credentials.clientSecret ||
      !credentials.redirectUri
    ) {
      throw new Error(
        "Missing Google API credentials in .env file. Please check your .env file."
      );
    }

    initDrive(credentials);

    setCredentials({ access_token: authData.accessToken });
  });

  it("should list files from Google Drive", async () => {
    const files = await listFiles();
    console.log("\n\nFiles in Google Drive:");
    files.forEach((file) => {
      console.log(`- ${file.name} (${file.id}) - ${file.mimeType}`);
    });

    expect(Array.isArray(files)).toBeTruthy();
  });

  it("should upload a file to Google Drive", async () => {
    const fileName = "sample.txt";
    const mimeType = "text/plain";

    console.log(`\n\nUploading ${fileName} to Google Drive...`);

    const fileId = await uploadFile(sampleFilePath, fileName, mimeType);

    console.log(`File uploaded with ID: ${fileId}`);

    fs.writeFileSync(path.join(__dirname, "uploaded-file-id.txt"), fileId);

    expect(fileId).toBeTruthy();
  });

  it("should delete a file from Google Drive", async () => {
    const uploadedFileIdPath = path.join(__dirname, "uploaded-file-id.txt");

    if (!fs.existsSync(uploadedFileIdPath)) {
      throw new Error(
        "uploaded-file-id.txt not found. Please run the upload test first."
      );
    }

    const fileId = fs.readFileSync(uploadedFileIdPath, "utf8");

    console.log(`\n\nDeleting file with ID: ${fileId} from Google Drive...`);

    await deleteFile(fileId);

    console.log("File deleted successfully");

    fs.unlinkSync(uploadedFileIdPath);
  });
});
