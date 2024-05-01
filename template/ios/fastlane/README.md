fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios clean

```sh
[bundle exec] fastlane ios clean
```

iOS: clean build artifacts and derived data

### ios update_icon

```sh
[bundle exec] fastlane ios update_icon
```

iOS: update app icons

### ios snapshots

```sh
[bundle exec] fastlane ios snapshots
```

iOS: update snapshots

### ios increment_version

```sh
[bundle exec] fastlane ios increment_version
```

iOS: increment version

### ios build

```sh
[bundle exec] fastlane ios build
```

iOS: build application

### ios certificates

```sh
[bundle exec] fastlane ios certificates
```

iOS: fetch certificates

### ios beta

```sh
[bundle exec] fastlane ios beta
```

iOS: ship to Testflight

### ios deploy

```sh
[bundle exec] fastlane ios deploy
```

iOS: deploy to App Store

### ios codepush

```sh
[bundle exec] fastlane ios codepush
```

iOS: deploy to CodePush

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
