# 🚀 React Native boilerplate

## 🛠️ Installation

- [ ] Clone this repository
- [ ] Run `sh ./bin/setup`

## 🔑 Create accounts

- [ ] [AppStore Connect](https://appstoreconnect.apple.com/)
- [ ] [Google Play Console](https://play.google.com/apps/publish/)
- [ ] [CodePush](https://appcenter.ms/)
- [ ] [Firebase](https://firebase.google.com/)
- [ ] [Sentry](https://sentry.io/)

## 🎬 Get started

- [ ] Fill variables in `.env`
  - [ ] `APP_ID` => package name / app identifier (e.g. `com.companyname.appname`)
  - [ ] `APP_NAME` => application name (e.g. `MyApp`)
  - [ ] `API_URL` => API URL
  - [ ] `DEEP_LINK_HOST` => deep link host (e.g. `links.myapp.com`)
  - [ ] `DEEP_LINK_SCHEME` => deep link scheme (e.g. `myapp`)
- [ ] Init `Sentry` by running:

  ```bash
  npx @sentry/wizard -i reactNative
  ```

- Add your logo as a `1024x1024` PNG file name `logo.png` in `assets/images`

- Replace all occurrences of `boilerplate` with your app name in lower case (e.g. `myapp`)
- Replace all occurrences of `Boilerplate` with your app name in PascalCase (e.g. `MyApp`)
- Find all occurrences of `UPDATE_ME` and replace them with the correct value

- [ ] Android

  - [ ] In `android/app/build.gradle`
    - [ ] (Optional) Replace `MYAPP_` variables with your app name
  - [ ] Fill `android/app/src/main/java/com/boilerplate/MainApplication.java`
    - [ ] `getJSMainModuleName` with the package name
  - [ ] In `android/app/src/main/java/com/boilerplate/MainActivity.java`
    - [ ] `getMainComponentName` with the package name
  - [ ] - [ ] Setup signing by following the instructions [here](https://reactnative.dev/docs/signed-apk-android)

- [ ] iOS

  - [ ] Rename following files
    - [ ] `ios/Boilerplate/Boilerplate.entitlements`
    - [ ] `ios/BoilerplateUITests/BoilerplateUITests.swift`
    - [ ] `ios/Boilerplate.xcodeproj/xcshareddata/xcschemes/BoilerplateUITests.xcscheme`
  - [ ] Rename following folders
    - [ ] `ios/Boilerplate`
    - [ ] `ios/Boilerplate.xcodeproj`
    - [ ] `ios/Boilerplate.xcworkspace`
    - [ ] `ios/BoilerplateUITests`
  - [ ] Setup `fastlane`
    - [ ] Update `app_identifier`, `apple_id`, `itc_team_id` and `team_id` in `fastlane/Fastfile`
    - [ ] Setup `match
      - [ ] Run `fastlane match init`
      - [ ] Create a new git repository for certificates and profiles (e.g. `boilerplate-certificates`)
      - [ ] Follow the instructions [here](https://docs.fastlane.tools/actions/match/#setup)
      - [ ] Run `fastlane match appstore`
      - [ ] Run `fastlane match development`
    - [ ] Run `fastlane deliver init`

- [ ] Setup `CodePush`

  - [ ] Fill `CodePushDeploymentKey` value in `ios/Boilerplate/Info.plist`
  - [ ] Fill `CodePushDeploymentKey` value in `android/app/src/main/res/values/strings.xml`
  - [ ] Fill `AppSecret` value in `ios/Boilerplate/AppCenter-Config.plist`

- [ ] Setup deep links
  - [ ] Fill `DEEP_LINK_HOST` in `app.json`
  - [ ] Fill `scheme` in `android/app/src/main/AndroidManifest.xml`
  - [ ] Fill `scheme` in `ios/Boilerplate/Info.plist`
