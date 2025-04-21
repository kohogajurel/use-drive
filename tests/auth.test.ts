import {
  initDrive,
  getAuthUrl,
  getTokens,
  GoogleCredentials,
} from "../src/index";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import readline from "readline";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const testCredentials: GoogleCredentials = {
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  redirectUri: process.env.GOOGLE_REDIRECT_URI || "",
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const extractCodeFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("code");
  } catch (error) {
    console.error("Invalid URL format");
    return null;
  }
};

describe("Authentication Tests", () => {
  beforeAll(() => {
    if (
      !process.env.GOOGLE_CLIENT_ID ||
      !process.env.GOOGLE_CLIENT_SECRET ||
      !process.env.GOOGLE_REDIRECT_URI
    ) {
      console.error(
        "\n\n⚠️ ERROR: Missing Google API credentials in .env file"
      );
      console.error("Please make sure your .env file contains:");
      console.error("GOOGLE_CLIENT_ID=your-client-id");
      console.error("GOOGLE_CLIENT_SECRET=your-client-secret");
      console.error("GOOGLE_REDIRECT_URI=your-redirect-uri\n\n");
    }
  });

  it("should generate auth URL, get code from user, and exchange for tokens", async () => {
    initDrive(testCredentials);

    const authUrl = getAuthUrl();

    console.log("\n\n=== AUTHENTICATION URL ===");
    console.log(authUrl);
    console.log("=========================");
    console.log("1. Open this URL in your browser");
    console.log("2. Sign in with your Google account");
    console.log("3. After authentication, you'll be redirected to a URL");
    console.log("4. Copy the ENTIRE redirect URL and paste it below\n");

    const redirectUrl = await prompt("Paste the redirect URL here: ");

    const code = extractCodeFromUrl(redirectUrl);

    if (!code) {
      throw new Error("Failed to extract authorization code from the URL");
    }

    console.log(`\nAuthorization code extracted: ${code}\n`);

    console.log("Exchanging code for access token...");
    const tokens = await getTokens(code);

    console.log("\n=== ACCESS TOKEN ===");
    console.log(tokens.access_token);
    console.log("=====================\n");

    fs.writeFileSync(
      path.join(__dirname, "auth.json"),
      JSON.stringify({ accessToken: tokens.access_token }, null, 2)
    );

    console.log(`Access token saved to: ${path.join(__dirname, "auth.json")}`);
    console.log("You can now run the file operation tests\n");

    rl.close();

    expect(tokens).toBeTruthy();
    expect(tokens.access_token).toBeTruthy();
  }, 60000);
});
