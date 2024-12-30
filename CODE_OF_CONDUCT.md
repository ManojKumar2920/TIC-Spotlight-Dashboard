# Code of Conduct and Project Guidelines

## 1. Project Structure & Folder Organization
As a team, we must adhere to a clean, scalable, and maintainable folder structure. The following structure is the standard for all Next.js projects:

### Folder Structure:

.
├── app/
│   ├── admin/
│   │   └── dashboard
│   ├── auth/
│   │   ├── signin
│   │   └── signup
│   ├── invoice
│   ├── profile
│   └── settings
├── assets
├── components/
│   └── ReusableComponents
├── fonts
└── public


### Description of Folders:

- **`/app/`**: Contains all the main app pages and routes organized into different sections:
  - **`/admin/`**: Holds admin-specific pages and features.
  - **`/auth/`**: Contains authentication-related pages like Sign-in and Sign-up.
  - **`/invoice/`**: Pages or components related to invoices.
  - **`/profile/`**: Contains pages and components related to the user profile.
  - **`/settings/`**: Pages for user settings and configurations.

- **`/assets/`**: Stores all static assets such as images, icons, and other media files.

- **`/components/`**: This is the folder for all components, which can be used across different parts of the app.
  - **`/ReusableComponents/`**: Contains individual UI components like buttons, inputs, modals, etc.

- **`/fonts/`**: Contains any custom fonts used in the project.

- **`/public/`**: Contains static files (accessible publicly) like images, icons, and other assets that don’t need processing.

This folder structure will help keep the project organized and maintainable as it grows.


## 1. Component Guidelines

Components are the foundation of our application. Follow these guidelines to ensure consistency, reusability, and maintainability:

### Component Structure:
- **Single Responsibility**: Each component should have one responsibility. If a component is handling multiple concerns, break it down into smaller, more manageable components.
- **File Naming**: Use PascalCase for component file names and component function names. For example, `Button.tsx` or `UserProfileCard.tsx`.
- **Props**:
  - Define clear prop types (using TypeScript) to ensure type safety.
  - Avoid excessive props drilling. Use context or state management libraries for global state.
- **Reusability**: Components should be reusable across different parts of the application. Make them flexible by accepting props for dynamic data and customization.
- **Styling**:
  - Use CSS-in-JS libraries (like `styled-components`), Tailwind CSS, or CSS modules for styling.
  - Avoid inline styles unless absolutely necessary for dynamic styles.
- **Avoid Hardcoding**: Do not hardcode data. Always pass data to components via props or use context/state to retrieve data.
- **Performance**: 
  - Use `React.memo()` for components that don’t need to re-render unless their props change.
  - Use `useMemo()` or `useCallback()` to optimize expensive computations or functions that don’t need to be recalculated on every render.

### Example of Reusable Component:
```tsx
// /components/ReusableComponents/Button.tsx
import React from 'react';

// Button component
const Button: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
```


# Using `use client` 

In Next.js, we differentiate between server-side rendering (SSR) and client-side rendering (CSR). The `use client` directive is used to opt into **client-side rendering** for components that require browser-specific functionality.

## When to Use `use client`:

### 1. Client-Side Features:
Use the `use client` directive if the component relies on features that are only available on the client-side, such as:
- **`window`**: The browser window object (e.g., `window.innerWidth`, `window.localStorage`).
- **`document`**: DOM manipulation features (e.g., querying DOM elements).
- **`localStorage` or `sessionStorage`**: To store data locally in the browser.
- When using the react hooks such as **`useState`, `useEffect`, `useMemo`, `useCallback`**
- **Third-party browser-specific libraries**: If your component uses libraries that depend on the browser environment.

### 2. Avoid Overuse:
- **Use sparingly**: Only use the `use client` directive when absolutely necessary.
- **Performance Considerations**: Overusing `use client` can lead to performance degradation. It prevents Next.js from performing server-side rendering (SSR), which may negatively impact:
  - **SEO**: Search engines will not index the initial HTML if it is rendered client-side.
  - **Performance**: Client-side rendering requires additional JavaScript to be loaded, which can delay the initial page load.


## Code Quality & Best Practices

Maintaining high-quality code is crucial for the scalability, maintainability, and readability of our project. Below are the best practices to follow to ensure that our code stays clean, efficient, and easy to collaborate on.

### 1. Code Formatting

- **Use Prettier**: Ensure consistent code formatting across the project by using Prettier. It helps in automatically formatting the code when saving files, making code review easier, and preventing inconsistencies.
  - Configure Prettier to format on save and ensure consistency between team members.
- **Use ESLint**: Set up ESLint to enforce coding standards and catch common errors.
  - Use the `eslint-config-airbnb` or a similar base configuration for common style and best practices.
  - Use the TypeScript plugin for linting TypeScript files if applicable.


## Naming Conventions

Maintaining consistent naming conventions is essential for code clarity and collaboration. Below are the guidelines to follow:

### 1. Variables & Functions
- **Use camelCase** for variable names and function names.
  - Example: `handleSubmit`, `userList`, `fetchData`
  
### 2. React Components
- **Use PascalCase** for component names and their corresponding filenames.
  - Example: `Button.tsx`, `UserProfile.tsx`, `ProductCard.tsx`
  
### 3. File Names
- File names should match their component name.
  - Example: `Button.tsx` for a `Button` component.
- For files containing utility functions or helpers, use descriptive names in **camelCase**.
  - Example: `useFetchData.ts`, `formatDate.ts`

### 4. CSS Class Names
- Use **kebab-case** for CSS or SCSS class names to maintain consistency with the HTML structure.
  - Example: `.main-header`, `.card-item`, `.user-profile-form`
  
---

## Code Readability

Clear and readable code ensures that anyone working on the project can easily understand the logic and intentions behind the code. Follow these practices to enhance readability:

### 1. Descriptive Names
- Choose **clear and descriptive names** for variables, functions, components, and classes.
  - Avoid single-letter names (e.g., `x`, `y`) or overly generic names (e.g., `temp`).
  - Example: Use `userList` instead of `list` and `fetchData` instead of `data`.

### 2. Break Down Complex Logic
- **Break down complex logic** into smaller, more manageable functions or components to improve readability and maintainability.
  - Example: If a function has multiple responsibilities, extract them into helper functions.

### 3. Use Comments Wisely
- Add comments to explain **why** certain decisions were made, especially for complex or non-obvious code.
- Avoid redundant comments that describe what the code is doing when it is clear from the code itself.
  
**Example**:
```tsx
// Good: Explains why the function is used
const handleResize = () => {
  // Updating window size on resize event
  setWindowWidth(window.innerWidth);
};

// Avoid: Comments that are redundant
const calculateTotal = (a, b) => {
  return a + b; // Adding a and b
};
```

By adhering to these  guidelines, we ensure that our codebase remains clean, easy to understand, and maintainable, making it easier development and build new features.