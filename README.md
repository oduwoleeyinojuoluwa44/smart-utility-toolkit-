# Smart Utility Toolkit Mobile

A feature-based React Native utility app built with Expo and TypeScript for the HNG Mobile Stage 0 task.

## 🛠️ Features

- 📏 **Unit Converter**: Quickly convert commonly used units like Length, Weight, and Temperature inline.
- ✅ **Task Checklist (Stage 1)**: Robust local-first task manager allowing you to create, edit, mark complete, and delete daily tasks safely synced to your device completely offline.
- 📝 **Quick Notes**: Securely store light text snippets and ideas, auto-saved to your device locally.
- 💪 **BMI Calculator**: Generate quick body mass index readings with visual status color indications.

## 🗂️ Project Structure
We utilize a clean architectural model separated by feature domain:
- `src/features/` - Domain modules like `tasks`, `converter`, `notes`, `bmi`. Each containing its own isolated Components, Hooks, and Storage mechanics to promote reusability and scalability.
- `src/shared/` - Core UI components and the classic visual styling.
- `src/app/` - Central application assembly like Navigation.

## Tech Stack

- Expo
- React Native
- TypeScript
- React Navigation
- AsyncStorage

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
