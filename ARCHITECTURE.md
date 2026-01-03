# Kuota - Architecture Documentation

## Overview

Kuota is a modern React Native education platform built with Expo, designed specifically for the Algerian market. The application connects students with teachers through live sessions, subscriptions, and learning materials.

## Technology Stack

### Core
- **React Native 0.81.5** - Cross-platform mobile framework
- **Expo ~54.0** - Development platform and tooling
- **TypeScript 5.9** - Type safety and better developer experience

### State Management
- **Redux Toolkit 2.11** - Global state management
- **React Redux 9.2** - React bindings for Redux

### Navigation
- **React Navigation 7.x** - Navigation library
  - Stack Navigator - For auth flows and nested navigation
  - Bottom Tabs Navigator - For main student/teacher interfaces
  - Drawer Navigator - For additional navigation options

### Internationalization
- **i18n-js 4.5** - Translation management
- **expo-localization 17.0** - Device locale detection
- Supports: Arabic (RTL) and French

### Utilities
- **date-fns 4.1** - Date manipulation and formatting
- **expo-notifications 0.32** - Push notifications
- **expo-constants 18.0** - App constants and configuration
- **expo-device 8.0** - Device information

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## Architecture Patterns

### 1. Feature-Based Organization
The project is organized by features and layers:
```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── navigation/     # Navigation configuration
├── store/          # Redux state management
├── services/       # API and external services
├── theme/          # Design system
├── i18n/           # Translations
├── types/          # TypeScript types
└── utils/          # Utility functions
```

### 2. State Management Architecture

#### Redux Slices
- **authSlice** - Authentication state (user, token, isAuthenticated)
- **userProfileSlice** - User profile data (student/teacher)
- **sessionsSlice** - Session management (current, upcoming, past)
- **subscriptionsSlice** - Student subscriptions
- **uiSlice** - UI state (theme, language, notifications)

#### State Flow
1. User actions trigger Redux actions
2. Reducers update the state immutably
3. Components react to state changes via selectors
4. Side effects handled via async thunks (to be implemented)

### 3. Navigation Architecture

#### Root Navigator
- Checks authentication state
- Routes to AuthNavigator or role-based navigator

#### Auth Navigator (Stack)
- Login Screen
- Register Screen
- Role Selection Screen

#### Student Navigator (Bottom Tabs)
- Home - Dashboard and quick actions
- Teachers - Browse and search teachers
- Subscriptions - Manage subscriptions
- Sessions - Upcoming and past sessions
- Library - Learning materials
- Profile - Settings and account

#### Teacher Navigator (Bottom Tabs)
- Dashboard - Statistics and overview
- Sessions - Session management
- Students - Student list and management
- Materials - Upload and manage content
- Announcements - Post updates
- Profile - Settings and account

### 4. Component Architecture

#### Component Hierarchy
```
Common Components (Atomic Design)
├── Button - Configurable button with variants
├── Card - Container with elevation
├── Input - Text input with validation
└── ... (to be extended)

Feature Components
├── student/
│   ├── TeacherCard - Teacher preview card
│   ├── SessionCard - Session display card
│   └── ... (to be extended)
├── teacher/
│   └── ... (to be implemented)
└── live/
    └── ... (to be implemented)
```

#### Component Props Pattern
- Strict TypeScript interfaces for all props
- Optional props with sensible defaults
- Style props for customization

### 5. Design System

#### Theme Structure
- **Colors** - Light and dark mode palettes
- **Typography** - Font sizes, weights, and line heights
- **Spacing** - Consistent spacing scale (base 8px)
- **Shadows** - Elevation system
- **Border Radius** - Rounded corner values

#### Design Tokens
All values are defined in theme files and referenced throughout the app. No magic numbers or hardcoded values in components.

### 6. Data Flow

#### API Service Pattern
```
Component → Service → API → Backend
                ↓
           Redux Store
                ↓
           Component
```

1. Component calls service function
2. Service makes API request
3. Response updates Redux store
4. Component reacts to state change

#### Mock Data Strategy
During development, services return mock data until backend is ready. API endpoints are defined but not yet connected.

### 7. Type System

#### Model Types
All data structures have TypeScript interfaces defined in `src/types/models.ts`:
- User, Student, Teacher
- Session, Subscription
- Material, Review
- Notification, Announcement

#### State Types
Redux state types defined in `src/store/types.ts`

#### Component Props
All component props have explicit interfaces

## Key Features Implementation

### Authentication Flow
1. User lands on Login screen
2. Can choose email or phone login
3. After successful login, token stored in Redux
4. Navigate to role-based navigator
5. Auth state persisted (to be implemented with AsyncStorage)

### Role-Based Access
- Student role → Student Navigator
- Teacher role → Teacher Navigator
- Different UI and features for each role

### Internationalization
- All user-facing strings use i18n
- Language can be switched in settings
- RTL support for Arabic

### Push Notifications
- Configured for iOS and Android
- Permission requested on app launch
- Handlers set up for received notifications
- Ready for backend integration

## Code Quality Standards

### TypeScript
- Strict mode enabled
- No implicit any
- Explicit return types for functions
- Interface over type when possible

### ESLint Rules
- React Native best practices
- No console.logs in production
- Unused variables not allowed
- Proper imports and exports

### Code Style
- Prettier for formatting
- 2 spaces indentation
- Single quotes
- Semicolons required
- Trailing commas in ES5

### Component Guidelines
- Functional components only
- React.FC type annotation
- Props interface above component
- Styles defined with StyleSheet.create
- No inline styles (warning only)

## Performance Considerations

### Optimization Strategies
1. **Navigation** - Lazy loading screens (built-in)
2. **Images** - Use optimized formats, proper sizing
3. **Lists** - Use FlatList for large lists
4. **Memoization** - React.memo for expensive components
5. **State** - Keep local state when possible

### Mobile-First
- Design for low/medium internet connections
- Implement offline capabilities (future)
- Optimize bundle size
- Lazy load heavy features

## Security Considerations

### Current Implementation
- Token-based authentication
- Secure token storage (to be implemented)
- API service with token header injection
- No sensitive data in logs

### Future Enhancements
- Implement secure storage (expo-secure-store)
- Add refresh token mechanism
- Implement biometric authentication
- Add certificate pinning

## Testing Strategy (To Be Implemented)

### Unit Tests
- Redux reducers and actions
- Utility functions
- Service functions

### Integration Tests
- Navigation flows
- Authentication flow
- API integration

### E2E Tests
- Critical user journeys
- Student booking flow
- Teacher session creation

## Deployment

### Build Configuration
- Separate configurations for dev/staging/production
- Environment variables for API URLs
- EAS Build for cloud builds

### Platforms
- Android APK via EAS Build
- iOS App via EAS Build
- Both from single codebase

## Future Roadmap

### Phase 1 (Current - Foundation)
- ✅ Project setup
- ✅ Navigation structure
- ✅ State management
- ✅ Design system
- ✅ Basic screens

### Phase 2 (Next - Core Features)
- [ ] Complete screen implementations
- [ ] Backend API integration
- [ ] Authentication persistence
- [ ] Real-time features setup

### Phase 3 (Video & Payments)
- [ ] WebRTC integration for live sessions
- [ ] Payment gateway integration (CIB/Edahabia)
- [ ] Recording capabilities
- [ ] Screen sharing

### Phase 4 (Enhancement)
- [ ] Offline mode
- [ ] Analytics
- [ ] Performance optimization
- [ ] Advanced features

## Development Workflow

### Starting Development
1. `npm install` - Install dependencies
2. `npm start` - Start Expo dev server
3. Scan QR code or use emulator

### Code Quality Checks
1. `npm run lint` - Check code quality
2. `npm run type-check` - Check TypeScript
3. `npm run format:check` - Check formatting

### Before Commit
1. `npm run lint:fix` - Fix linting issues
2. `npm run format` - Format code
3. `npm run type-check` - Verify types
4. Test on device/emulator

## Troubleshooting

### Common Issues

**Metro bundler cache issues:**
```bash
npx expo start -c
```

**Node modules issues:**
```bash
rm -rf node_modules
npm install
```

**Type errors after package update:**
```bash
npm run type-check
```

**iOS build issues:**
```bash
cd ios && pod install && cd ..
```

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Native](https://reactnative.dev/)

## Contributors

Built for the Algerian education community.
