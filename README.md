# Smart Utility Toolkit Mobile

A feature-based React Native utility app built with Expo and TypeScript for the HNG Mobile Stage 0 task.

## Features

- Unit Converter
  - Length
  - Temperature
  - Weight
- Notes
  - Create, edit, delete, and persist notes locally with AsyncStorage
- BMI Calculator
  - Metric-only BMI calculation with category guidance

## Tech Stack

- Expo
- React Native
- TypeScript
- React Navigation
- AsyncStorage

## Project Structure

```text
src/
  app/
    navigation/
    providers/
  features/
    converter/
    notes/
    bmi/
  shared/
    components/
    constants/
    theme/
    types/
    utils/
```

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Start the Expo development server

```bash
npm start
```

3. Run on Android

```bash
npm run android
```

## Submission Notes

- Repository is structured by feature ownership.
- Commits were pushed incrementally by feature.
- APK/Appetize publishing can be done after generating the Android build.
