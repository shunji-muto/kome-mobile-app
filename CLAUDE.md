# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application built with Expo SDK 53. The project uses React Native's New Architecture and is organized with a modern src/ folder structure. Currently in early development with a custom joystick component as the main feature.

## Development Commands

- `npm start` - Start Expo development server
- `npm run android` - Launch app on Android simulator/device
- `npm run ios` - Launch app on iOS simulator/device
- `npm run web` - Launch app in web browser (requires web dependencies: `npx expo install react-dom react-native-web @expo/metro-runtime`)
- `npm run prepare` - Setup Husky hooks
- `npx tsc --noEmit` - TypeScript type checking without compilation

## Architecture

**Application Flow:**
- **Entry Point**: `index.ts` → imports `./src/App` → registers with Expo's `registerRootComponent`
- **Main Component**: `src/App.tsx` wrapped in `GestureHandlerRootView` for gesture support
- **Component Structure**: Organized under `src/components/` with proper separation of concerns

**Key Configurations:**
- **New Architecture**: Enabled in `app.json` (`newArchEnabled: true`) using React Native's new architecture
- **TypeScript**: Strict mode with path aliases configured:
  - `@/*` → `./src/*`
  - `@components/*` → `./src/components/*`
- **Code Quality**: Prettier + Husky + Commitlint with conventional commits

## Technology Stack

- **Framework**: React Native 0.79.4 with React 19.0.0
- **Platform**: Expo ~53.0.12  
- **Language**: TypeScript (strict mode)
- **Gesture Handling**: react-native-gesture-handler ^2.26.0
- **Code Quality**: Prettier 3.6.2, Husky 9.1.7, Commitlint

## Component Architecture

### Joystick Component (`src/components/joystick/`)

A production-ready joystick implementation with clean architecture:

**Structure:**
- **joy-stick.tsx** (208 lines) - Main component with gesture handling
- **types.ts** - Comprehensive TypeScript interfaces for events and props
- **utils.ts** - Mathematical utilities for position, angle, and force calculations

**Key Features:**
- Real-time position tracking with angle (degrees/radians) and force calculations
- Platform-specific adjustments (especially web compatibility using `Platform.OS`)
- Memoized calculations for performance (`useMemo`, `useCallback`)
- Customizable appearance (color, radius)
- Event callbacks: `onStart`, `onMove`, `onStop`

**Usage Pattern:**
```typescript
import { ReactNativeJoystick } from '@/components/joystick/joy-stick';
// or: import { ReactNativeJoystick } from './components/joystick/joy-stick';

<ReactNativeJoystick
  radius={100}
  color="#0066CC"
  onMove={(event) => {
    // event.position: {x, y}
    // event.angle: {degree, radian}
    // event.force: 0-1
  }}
/>
```

## Development Guidelines

- **Documentation**: Components documented in Japanese with comprehensive JSDoc
- **Platform Awareness**: Include platform-specific code for web compatibility using `Platform.OS`
- **Gesture Handling**: Use react-native-gesture-handler for all touch interactions
- **Type Safety**: Leverage strict TypeScript mode and define interfaces for all props/events
- **Path Imports**: Use configured path aliases (`@/` prefix) for cleaner imports
- **Performance**: Use React optimization patterns (memoization) for gesture-heavy components