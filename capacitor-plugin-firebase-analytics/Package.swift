// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorPluginFirebaseAnalytics",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "CapacitorPluginFirebaseAnalytics",
            targets: ["FirebaseAnalyticsPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0")
    ],
    targets: [
        .target(
            name: "FirebaseAnalyticsPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/FirebaseAnalyticsPlugin"),
        .testTarget(
            name: "FirebaseAnalyticsPluginTests",
            dependencies: ["FirebaseAnalyticsPlugin"],
            path: "ios/Tests/FirebaseAnalyticsPluginTests")
    ]
)