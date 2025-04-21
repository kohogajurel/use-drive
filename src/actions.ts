import { google } from "googleapis";
import { oauth2Client } from "./config";
import fs from "fs";

async function listFiles(): Promise<
  {
    id: string;
    name: string;
    mimeType: string;
  }[]
> {
  try {
    const drive = google.drive({ version: "v3", auth: oauth2Client });
    const res = await drive.files.list({
      fields: "nextPageToken, files(id, name, mimeType)",
    });

    const files = res.data.files;

    if (!files) {
      console.log("No files found.");
      return [];
    }

    console.log("Files:");

    files.map((file) => {
      console.log(`${file.name} (${file.id}) - ${file.mimeType}`);
    });

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

async function uploadFile(
  filePath: string,
  fileName: string,
  mimeType: string
): Promise<string> {
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
    console.log("File uploaded with ID:", res.data.id);

    return res.data.id!;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
}

async function deleteFile(fileId: string) {
  try {
    const drive = google.drive({ version: "v3", auth: oauth2Client });
    await drive.files.delete({
      fileId: fileId,
    });
    console.log(`File with ID ${fileId} deleted successfully.`);
  } catch (err) {
    console.error(`Error deleting file with ID ${fileId}:`, err);
    throw err;
  }
}

export { listFiles, uploadFile, deleteFile };
