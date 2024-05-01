fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android clean

```sh
[bundle exec] fastlane android clean
```

Android: clean project

### android increment_version

```sh
[bundle exec] fastlane android increment_version
```

Android: increment version

### android build

```sh
[bundle exec] fastlane android build
```

Android: build application

### android snapshots

```sh
[bundle exec] fastlane android snapshots
```

Android: update snapshots

### android beta

```sh
[bundle exec] fastlane android beta
```

Android: submit a new Beta Build to Google Play Beta

### android codepush

```sh
[bundle exec] fastlane android codepush
```

Android: deploy to CodePush

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
