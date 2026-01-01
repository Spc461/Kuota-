# Kuota - Algerian Education Platform

A modern React Native education application built with Expo, designed specifically for the Algerian market. This application connects students with teachers through live video sessions, subscriptions, and comprehensive learning materials.

## 🎯 Features

### For Students
- Browse and search for qualified teachers
- Subscribe to teachers for regular sessions
- Join live video/voice sessions
- Access digital library (BEM/BAC resources)
- Study planner with exam countdown
- Real-time notifications
- Bilingual interface (Arabic & French)

### For Teachers
- Dashboard with earnings and statistics
- Create and manage live sessions
- Upload and share learning materials
- Post announcements to students
- Schedule builder for availability
- Student management system

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- For iOS development: Xcode (macOS only)
- For Android development: Android Studio

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kuota
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## 📱 Running the App

### Development Mode

**On Android:**
```bash
npm run android
```

**On iOS (macOS only):**
```bash
npm run ios
```

**On Web:**
```bash
npm run web
```

**Using Expo Go App:**
1. Install Expo Go on your mobile device from App Store or Google Play
2. Scan the QR code from the terminal after running `npm start`

## 🏗️ Project Structure

```
kuota/
├── src/
│   ├── navigation/          # Navigation configuration
│   │   ├── RootNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── StudentNavigator.tsx
│   │   └── TeacherNavigator.tsx
│   ├── screens/             # Screen components
│   │   ├── auth/           # Authentication screens
│   │   ├── student/        # Student-specific screens
│   │   ├── teacher/        # Teacher-specific screens
│   │   └── live/           # Live session screens
│   ├── components/          # Reusable components
│   │   ├── common/         # Shared components (Button, Card, Input)
│   │   ├── auth/           # Auth-specific components
│   │   ├── student/        # Student components
│   │   ├── teacher/        # Teacher components
│   │   └── live/           # Live session components
│   ├── store/               # Redux state management
│   │   ├── slices/         # Redux slices
│   │   ├── index.ts        # Store configuration
│   │   └── types.ts        # State types
│   ├── services/            # API and external services
│   │   ├── api.ts          # API service
│   │   ├── auth.ts         # Authentication service
│   │   └── notifications.ts # Push notifications
│   ├── theme/               # Design system
│   │   ├── colors.ts       # Color palette
│   │   ├── typography.ts   # Typography system
│   │   ├── spacing.ts      # Spacing and shadows
│   │   └── index.ts        # Theme exports
│   ├── i18n/                # Internationalization
│   │   ├── ar.json         # Arabic translations
│   │   ├── fr.json         # French translations
│   │   └── index.ts        # i18n configuration
│   ├── types/               # TypeScript types
│   │   └── models.ts       # Data models
│   ├── utils/               # Utility functions
│   │   ├── constants.ts    # App constants
│   │   └── helpers.ts      # Helper functions
│   └── App.tsx              # Root component
├── assets/                  # Static assets
├── app.json                 # Expo configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── .eslintrc.js            # ESLint configuration
├── .prettierrc             # Prettier configuration
└── README.md               # This file
```

## 🛠️ Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 🎨 Design System

### Colors
- **Primary:** Deep Blue (#1e3a8a)
- **Secondary:** Light Blue (#60a5fa)
- **Success:** Green (#10b981)
- **Warning:** Orange (#f59e0b)
- **Error:** Red (#ef4444)

### Typography
- Uses system fonts with proper weight scaling
- Sizes: xs (12), sm (14), base (16), lg (18), xl (20), 2xl (24), 3xl (30), 4xl (36), 5xl (48)

### Spacing
- Base unit: 8px
- Scale: xs (4), sm (8), md (16), lg (24), xl (32), 2xl (40), 3xl (48), 4xl (64)

## 🌍 Internationalization

The app supports Arabic and French languages with RTL support for Arabic:

```typescript
import i18n from './src/i18n';

// Use translations
i18n.t('auth.login');
i18n.t('navigation.home');
```

## 🔐 State Management

The app uses Redux Toolkit for state management with the following slices:
- **Auth:** User authentication and token management
- **User Profile:** Student/Teacher profile data
- **Sessions:** Live and past sessions
- **Subscriptions:** Student subscriptions to teachers
- **UI:** Theme, language, notifications

## 📡 API Integration

API service is configured and ready for backend integration:

```typescript
import apiService from './src/services/api';

// Set auth token
apiService.setToken(token);

// Make requests
const response = await apiService.get('/endpoint');
```

## 🔔 Push Notifications

Push notifications are configured for both iOS and Android using Expo Notifications:

```typescript
import { notificationService } from './src/services/notifications';

// Register for notifications
const token = await notificationService.registerForPushNotifications();
```

## 🔒 Environment Variables

Create a `.env` file for environment-specific configuration:

```
EXPO_PUBLIC_API_URL=https://api.kuota.dz
```

## 🏗️ Building for Production

### Android APK
```bash
eas build --platform android
```

### iOS App
```bash
eas build --platform ios
```

### Both Platforms
```bash
eas build --platform all
```

Note: You need to configure EAS Build and have an Expo account.

## 📚 Technologies Used

- **React Native & Expo** - Mobile framework
- **TypeScript** - Type safety
- **React Navigation** - Navigation library
- **Redux Toolkit** - State management
- **i18n-js** - Internationalization
- **Expo Notifications** - Push notifications
- **date-fns** - Date manipulation
- **ESLint & Prettier** - Code quality

## 🧪 Code Quality

The project uses:
- **TypeScript** in strict mode for type safety
- **ESLint** with React Native best practices
- **Prettier** for consistent code formatting
- Pre-configured rules to ensure production-ready code

## 🚦 Development Guidelines

1. **Component Structure:** Follow the folder-based component organization
2. **Naming Conventions:** Use PascalCase for components, camelCase for functions
3. **State Management:** Use Redux for global state, local state for UI-only state
4. **Styling:** Use the theme system, avoid hardcoded values
5. **Translations:** Always use i18n for user-facing strings
6. **Type Safety:** Define proper TypeScript interfaces for all data structures

## 🔮 Future Roadmap

- [ ] Implement live video/voice sessions with WebRTC
- [ ] Add payment integration (CIB/Edahabia)
- [ ] Implement real-time chat
- [ ] Add offline mode for materials
- [ ] Implement analytics and tracking
- [ ] Add student performance tracking
- [ ] Implement exam preparation modules
- [ ] Add parent monitoring dashboard

## 📝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit your changes: `git commit -m 'Add amazing feature'`
3. Push to the branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 👥 Support

For support, email support@kuota.dz or join our Slack channel.

## 🙏 Acknowledgments

Built with ❤️ for the Algerian education community.
