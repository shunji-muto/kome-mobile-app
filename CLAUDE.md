# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application built with Expo SDK 53. The project is in early development stage with a basic starter template structure and includes a custom joystick component.

## Development Commands

- `npm start` - Start Expo development server
- `npm run android` - Launch app on Android simulator/device
- `npm run ios` - Launch app on iOS simulator/device
- `npm run web` - Launch app in web browser (requires web dependencies: `npx expo install react-dom react-native-web @expo/metro-runtime`)
- `npm run prepare` - Setup Husky hooks

## Architecture

- **Entry Point**: `index.ts` registers root component using Expo's `registerRootComponent` - **Note**: Currently imports from `./App` (root level) but App.tsx is located in `src/` directory
- **Main Component**: `src/App.tsx` contains the main application component
- **Component Structure**: Components are organized under `src/component/` directory
- **Configuration**: 
  - `app.json` - Expo configuration with app metadata and build settings
  - `tsconfig.json` - TypeScript configuration extending Expo's base with strict mode
  - New Architecture enabled (`newArchEnabled: true` in `app.json`)
  - Husky + Commitlint for conventional commits

## Important Note

The `index.ts` file currently imports `./App` but the actual App.tsx file is located at `src/App.tsx`. This import path needs to be updated to `./src/App` for the project to work correctly.

## Technology Stack

- **Framework**: React Native 0.79.4 with React 19.0.0
- **Platform**: Expo ~53.0.12  
- **Language**: TypeScript (strict mode)
- **UI**: React Native components with StyleSheet
- **Gesture Handling**: react-native-gesture-handler
- **Code Quality**: Prettier, Husky, Commitlint with conventional commits

## Custom Components

### Joystick Component (`src/component/joystick/`)

A fully customizable joystick component with gesture handling:

- **joy-stick.tsx** - Main joystick component using react-native-gesture-handler
  - Customizable color and size
  - Real-time position, angle, and force calculations
  - Platform-specific adjustments (especially for web compatibility)
  - Supports onStart, onMove, onStop callbacks

- **types.ts** - TypeScript interface definitions for event data and component props
- **utils.ts** - Mathematical utility functions for distance, angle, and coordinate calculations

Usage:
```typescript
import { ReactNativeJoystick } from './src/component/joystick/joy-stick';

<ReactNativeJoystick
  radius={100}
  color="#0066CC"
  onMove={(event) => {
    console.log('Position:', event.position);
    console.log('Angle:', event.angle.degree);
    console.log('Force:', event.force);
  }}
/>
```

## Development Guidelines

- Use TypeScript strict mode
- Components documented in Japanese
- Pay attention to platform-specific adjustments (especially web support)
- Use react-native-gesture-handler for gesture processing
- Follow conventional commits format