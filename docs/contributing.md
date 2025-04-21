# Contributing to use-drive

Thank you for your interest in contributing to use-drive! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md) to foster an open and welcoming environment.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/YOUR-USERNAME/use-drive.git
   cd use-drive
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Set up environment variables**
   - Create a `.env` file in the root directory with your Google API credentials
   ```
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   GOOGLE_REDIRECT_URI=your-redirect-uri
   ```

## Development Workflow

1. **Create a branch** for your feature or bugfix
   ```bash
   git checkout -b feature/your-feature-name
   ```
   or
   ```bash
   git checkout -b fix/issue-you-are-fixing
   ```

2. **Make your changes** and commit them with clear, descriptive commit messages
   ```bash
   git commit -m "Add feature: your feature description"
   ```

3. **Run tests** to ensure your changes don't break existing functionality
   ```bash
   npm test
   ```

4. **Push your branch** to your fork
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** from your fork to the main repository

## Pull Request Process

1. Ensure your code follows the project's coding standards
2. Update documentation as necessary
3. Include tests for new features or bug fixes
4. Make sure all tests pass
5. Your PR will be reviewed by maintainers who may request changes
6. Once approved, your PR will be merged

## Coding Standards

- Follow the TypeScript coding style used throughout the project
- Use meaningful variable and function names
- Write clear comments for complex logic
- Keep functions small and focused on a single responsibility
- Use async/await for asynchronous operations

### Naming Conventions

- Use camelCase for variables and functions
- Use PascalCase for classes and interfaces
- Use UPPER_CASE for constants

## Testing

- Write tests for all new features and bug fixes
- Ensure all tests pass before submitting a PR
- Follow the existing test patterns in the `tests` directory
- See [Testing Documentation](./test.md) for more details on running tests

## Documentation

- Update documentation for any changes to the API or functionality
- Document all public functions, classes, and interfaces
- Use JSDoc comments for code documentation
- Keep README and other documentation files up to date

## Versioning

We use [Semantic Versioning](https://semver.org/) for releases:

- MAJOR version for incompatible API changes
- MINOR version for new functionality in a backward-compatible manner
- PATCH version for backward-compatible bug fixes

## Questions?

If you have any questions or need help, please open an issue on GitHub or reach out to the maintainers.

Thank you for contributing to use-drive!