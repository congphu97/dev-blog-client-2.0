import Foundation
import Capacitor
import FirebaseAnalytics

/**
 * Custom Capacitor Plugin for Firebase Analytics (GA4)
 */
@objc(FirebaseAnalyticsPlugin)
public class FirebaseAnalyticsPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "FirebaseAnalyticsPlugin"
    public let jsName = "FirebaseAnalytics"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "logEvent", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setUserId", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setUserProperty", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setCurrentScreen", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "resetAnalyticsData", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setAnalyticsCollectionEnabled", returnType: CAPPluginReturnPromise)
    ]

    @objc func logEvent(_ call: CAPPluginCall) {
        guard let name = call.getString("name"), !name.isEmpty else {
            call.reject("Event name is required")
            return
        }

        let params = call.getObject("params") ?? [:]
        Analytics.logEvent(name, parameters: params)
        call.resolve()
    }

    @objc func setUserId(_ call: CAPPluginCall) {
        let userId = call.getString("userId")
        Analytics.setUserID(userId)
        call.resolve()
    }

    @objc func setUserProperty(_ call: CAPPluginCall) {
        guard let name = call.getString("name"), !name.isEmpty else {
            call.reject("Property name is required")
            return
        }

        let value = call.getString("value")
        Analytics.setUserProperty(value, forName: name)
        call.resolve()
    }

    @objc func setCurrentScreen(_ call: CAPPluginCall) {
        guard let screenName = call.getString("screenName"), !screenName.isEmpty else {
            call.reject("screenName is required")
            return
        }

        let screenClass = call.getString("screenClassOverride") ?? screenName
        Analytics.logEvent(AnalyticsEventScreenView, parameters: [
            AnalyticsParameterScreenName: screenName,
            AnalyticsParameterScreenClass: screenClass
        ])
        call.resolve()
    }

    @objc func resetAnalyticsData(_ call: CAPPluginCall) {
        Analytics.resetAnalyticsData()
        call.resolve()
    }

    @objc func setAnalyticsCollectionEnabled(_ call: CAPPluginCall) {
        let enabled = call.getBool("enabled") ?? true
        Analytics.setAnalyticsCollectionEnabled(enabled)
        call.resolve()
    }
}
