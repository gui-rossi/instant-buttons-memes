# Instant-Buttons-Memes
This project aims to aggregate all meme sounds into one single app.

## Structure
The application uses Vue.js as a desktop application with @Capacitor framework, which wrapps the app and compiles it to mobile devices.

## How to make a new release
Notes for future me:
Make sure you have botoes-memes-key.jks and private_key.pepk in the same folder as this project
These files are in guizo.rossi@gmail.com drive

Bump up package.json version
Bump up versionName in build.gradle
Bump up versionCode in build.gradle

Open In Android Studio
Build -> Generate Signed Bundle or APK
Use existing key with alias key0
Both passwords are the same as one of my e-mails

Submit to gui.rossi.apps@gmail.com account as a new release

## How to run
```
npm install

npm run serve

npx run android

or run npm run build to propagate changes to Android Studio
```
