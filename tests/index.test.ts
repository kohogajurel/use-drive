/**
 * Main test file that runs all tests for use-drive
 * 
 * This file imports and re-exports the tests from auth.test.ts and file-operations.test.ts
 * to provide a single entry point for running all tests.
 */

// Import the tests from the individual test files
import './auth.test';
import './file-operations.test';

// This describe block is just a wrapper to organize the tests
describe('use-drive', () => {
  it('should have all tests loaded', () => {
    // This is a placeholder test to ensure the test suite is loaded correctly
    expect(true).toBe(true);
  });
});