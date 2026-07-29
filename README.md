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

Build for production:
Execute: "npm run android:prod", this command will copy the contents of instant-buttons-memes/capacitor.config.prod.json into instant-buttons-memes\capacitor.config.json. This command is used whenever you need to publish and deploy a new production ready package. Make sure that android\app\src\main\assets\capacitor.config.json doesn't have a server property and only has a webDir pointing to dist.

How to run locally:
Execute "npm run debug:setup" to start the development server locally on port 8080
Open a second console CLI: Execute "npm run android:dev" to copy the contents of instant-buttons-memes\capacitor.config.dev.json into the actual capacitor file and expose a server url. This will also execute "npx cap run android --livereload --external --port=8080", this will prompt you to choose a virtual device - with android studio opened, you should see the app pop up without the need of doing any action in android studio. To finish debugging, just close the app in the virtual device.
Navigate to chrome://inspect/#devices, Discover USB devices should be checked and, if everything went well, you should see the virtual device there, click on inspect and add debuggers in vscode (red circle icon, not the keyword 'debugger').
