# Testing Documentation for use-drive

This document describes how to run tests for the use-drive library, which provides a simple interface for interacting with Google Drive.

## Prerequisites

Before running the tests, you need to:

1. Have a Google Cloud project with the Drive API enabled
2. Create OAuth 2.0 credentials (client ID and client secret)
3. Configure a redirect URI
4. Set up environment variables

## Setting Up Environment Variables

Create a `.env` file in the root directory with the following variables:

## Running Tests

The tests are organized into two main parts:

1. **Authentication Tests**: Handle OAuth 2.0 authentication with Google
2. **File Operation Tests**: Test file listing, uploading, and deletion

### Run All Tests

To run all tests in sequence:

```bash
npm test
```

### Run Specific Test

To run a specific test, you can use the following command:

```bash
npm test -- --testPathPattern <test-file-name>
```

## Troubleshooting

### Missing Environment Variables

If you get an error about missing environment variables, make sure you have set up the `.env` file correctly.

### Authentication Issues

If you encounter authentication issues, ensure that:

1. The OAuth 2.0 credentials are correct
2. The redirect URI is properly configured
3. The access token is valid

### File Operations Issues

If you encounter issues with file operations, verify that:

1. The file paths are correct
2. The file exists
3. You have the necessary permissions

## Contributing

For more information on contributing to the project, see the [Contributing Guidelines](./contributing.md).
