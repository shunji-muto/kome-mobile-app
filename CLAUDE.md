# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application built with Expo SDK 53. The project is currently in early development with a basic starter template structure.

## Development Commands

- `npm start` - Start the Expo development server
- `npm run android` - Start the app on Android simulator/device
- `npm run ios` - Start the app on iOS simulator/device  
- `npm run web` - Start the app in web browser

## Architecture

- **Entry Point**: `index.ts` registers the root component using Expo's `registerRootComponent`
- **Main Component**: `App.tsx` contains the main application component with basic React Native structure
- **Configuration**: 
  - `app.json` - Expo configuration with app metadata and build settings
  - `tsconfig.json` - TypeScript configuration extending Expo's base config with strict mode enabled
  - New Architecture is enabled (`newArchEnabled: true` in app.json)

## Technology Stack

- **Framework**: React Native 0.79.4 with React 19.0.0
- **Development Platform**: Expo ~53.0.12
- **Language**: TypeScript with strict mode
- **UI**: React Native components with StyleSheet

## Project Structure

- Root-level app with main files at project root
- `assets/` directory contains app icons and splash screens
- Single `App.tsx` component currently displays placeholder text
- Standard Expo project structure with minimal customization