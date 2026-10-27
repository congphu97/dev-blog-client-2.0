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

### ios sync_cap

```sh
[bundle exec] fastlane ios sync_cap
```

Build Angular app and sync web assets to Capacitor iOS

### ios install_pods

```sh
[bundle exec] fastlane ios install_pods
```

Install CocoaPods dependencies

### ios build_adhoc

```sh
[bundle exec] fastlane ios build_adhoc
```

Build Ad-Hoc IPA (for Diawi, Firebase App Distribution, registered devices)

### ios build_dev

```sh
[bundle exec] fastlane ios build_dev
```

Build Development IPA

### ios build_appstore

```sh
[bundle exec] fastlane ios build_appstore
```

Build App Store IPA

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Build and upload to TestFlight

### ios firebase

```sh
[bundle exec] fastlane ios firebase
```

Build Ad-Hoc IPA and upload to Firebase App Distribution

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
