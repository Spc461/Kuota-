# Contributing to Kuota

Thank you for your interest in contributing to Kuota! This document provides guidelines and instructions for contributing to the project.

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- Git
- Expo CLI (`npm install -g expo-cli`)
- A code editor (VS Code recommended)

### Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Run on your device or emulator

## Development Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Production hotfix branches

### Making Changes

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the code style guidelines below
   - Write meaningful commit messages
   - Keep commits focused and atomic

3. **Test your changes**
   - Test on both iOS and Android if possible
   - Run linting: `npm run lint`
   - Run type checking: `npm run type-check`
   - Format code: `npm run format`

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. **Push and create a pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style Guidelines

### TypeScript
- Use strict TypeScript mode
- Define interfaces for all props and data structures
- Use explicit return types for functions
- Avoid `any` type - use `unknown` if needed
- Prefer `interface` over `type` for object shapes

### React Components
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    color: lightColors.text,
  },
});

export default MyComponent;
```

### Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Functions**: camelCase (`getUserData()`)
- **Constants**: UPPER_SNAKE_CASE (`API_TIMEOUT`)
- **Interfaces**: PascalCase with descriptive names (`UserProfileProps`)
- **Files**: Match component name or use camelCase for utilities

### File Organization
- One component per file
- Group related files in folders
- Export from index files for cleaner imports
- Keep files under 300 lines (split if larger)

### Styling
- Always use `StyleSheet.create()`
- Avoid inline styles (use theme values)
- Use theme constants for colors, spacing, typography
- Group related styles together
- Order: layout → dimensions → spacing → typography → colors

### State Management
- Use Redux for global state
- Use local state for UI-only concerns
- Create selectors for derived data
- Keep actions and reducers focused
- Use async thunks for side effects

### Internationalization
- All user-facing text must use i18n
- Add translations to both `ar.json` and `fr.json`
- Use meaningful translation keys
- Group translations by feature

```typescript
// Good
<Text>{i18n.t('auth.login')}</Text>

// Bad
<Text>Login</Text>
```

### Error Handling
- Always handle errors gracefully
- Provide user-friendly error messages
- Log errors appropriately (not with console.log)
- Use try-catch for async operations

### Comments
- Write self-documenting code
- Add comments for complex logic only
- Use JSDoc for public APIs
- Keep comments up to date

## Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Examples
```bash
feat(auth): add phone number login
fix(sessions): resolve crash on session end
docs(readme): update installation instructions
style(theme): format color definitions
refactor(navigation): simplify navigator structure
perf(list): optimize teacher list rendering
test(auth): add login flow tests
chore(deps): update expo to v54
```

## Pull Request Process

1. **Before submitting**
   - Update documentation if needed
   - Add tests if applicable
   - Run all checks: lint, type-check, format
   - Test on both platforms if possible
   - Rebase on latest develop branch

2. **PR Title**
   - Follow commit message format
   - Be descriptive and clear

3. **PR Description**
   - Explain what changes were made and why
   - Include screenshots/videos for UI changes
   - List any breaking changes
   - Reference related issues

4. **Review Process**
   - Address review comments promptly
   - Keep discussions respectful and constructive
   - Request re-review after changes

5. **After Approval**
   - Squash commits if needed
   - Merge using the project's preferred method

## Testing

### Manual Testing
- Test on both iOS and Android
- Test in different screen sizes
- Test with both Arabic and French languages
- Test with light and dark themes
- Test edge cases and error scenarios

### Automated Testing (Future)
- Write unit tests for utilities and services
- Write integration tests for critical flows
- Write E2E tests for main user journeys

## Performance Guidelines

- Optimize images (use appropriate sizes)
- Use FlatList for long lists
- Memoize expensive computations
- Avoid unnecessary re-renders
- Profile before optimizing
- Keep bundle size in check

## Accessibility

- Use semantic elements
- Provide proper labels for interactive elements
- Ensure sufficient color contrast
- Support screen readers
- Make interactive elements large enough
- Test with accessibility tools

## Documentation

When adding new features:
- Update README if needed
- Add inline documentation for complex logic
- Update ARCHITECTURE.md for structural changes
- Add examples for new components

## Questions?

If you have questions or need help:
- Check existing documentation
- Search closed issues
- Ask in team chat
- Create a new issue with the `question` label

## Code of Conduct

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the project
- Show empathy towards others
- Communicate clearly and professionally

Thank you for contributing to Kuota! 🎓
