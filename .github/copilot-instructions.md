# GitHub Copilot Instructions

## Project Overview

This repository, `math-muse`, is a web-based application designed to provide interactive math-related games and tools. The project is built using modern web technologies, including React, TypeScript, and Vite.

## Codebase Structure

The project follows a modular structure with the following key directories:

- **`src/`**: Contains the main application code, including components, pages, hooks, helpers, constants, and types.
  - **`components/`**: Reusable UI components such as `Header`, `SideBar`, `QuestionCard`, etc.
  - **`pages/`**: Page-level components for different routes like `Dashboard`, `Home`, `Settings`, etc.
  - **`router/`**: Application routing logic.
  - **`helpers/`**: Utility functions for general and storage-related tasks.
  - **`constants/`**: Static values like navigation items and paths.
  - **`hooks/`**: Custom React hooks, e.g., `useHistory`.
  - **`types/`**: TypeScript type definitions.
- **`public/`**: Static assets such as icons and the `404.html` file.
- **Configuration Files**: Includes `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, etc.

## GitHub Copilot Usage Guidelines

To maximize the benefits of GitHub Copilot in this project, follow these guidelines:

### General Tips

1. **Understand the Codebase**: Familiarize yourself with the project structure and existing code before using Copilot.
2. **Write Clear Comments**: Use descriptive comments to guide Copilot in generating relevant code snippets.
3. **Iterate and Refine**: Review and refine Copilot's suggestions to ensure they align with the project's requirements.

### Specific Scenarios

#### 1. Creating New Components

- Place new components in the `src/components/` directory.
- Follow the naming convention: `ComponentName/index.tsx`.
- Use TypeScript and ensure proper typing for props.

#### 2. Adding Pages

- Add new pages in the `src/pages/` directory.
- Update the `src/router/router.tsx` file to include the new route.

#### 3. Writing Utility Functions

- Place general-purpose utilities in `src/helpers/`.
- Use `src/constants/` for static values.

#### 4. Managing State

- Use React's Context API or custom hooks for state management.
- Place custom hooks in `src/hooks/`.

#### 5. Styling

- Use the `theme.ts` file for consistent styling.
- Follow the existing CSS-in-JS or styled-components approach.

### Best Practices

- **Type Safety**: Always use TypeScript for type safety and better Copilot suggestions.
- **Code Reviews**: Review Copilot's code for accuracy, performance, and security.
- **Testing**: Write tests for critical functionality. Use the `vitest` framework as configured in the project.

## Contribution Guidelines

1. **Branching**: Create a new branch for each feature or bug fix.
2. **Commits**: Write clear and concise commit messages.
3. **Pull Requests**: Ensure all tests pass before submitting a pull request.

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)

By following these instructions, you can effectively use GitHub Copilot to enhance your productivity while maintaining code quality in the `math-muse` project.
