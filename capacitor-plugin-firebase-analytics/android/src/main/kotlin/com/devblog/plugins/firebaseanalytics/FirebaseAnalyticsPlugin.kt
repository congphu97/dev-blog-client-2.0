package com.devblog.plugins.firebaseanalytics

import android.os.Bundle
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.google.firebase.analytics.FirebaseAnalytics

@CapacitorPlugin(name = "FirebaseAnalytics")
class FirebaseAnalyticsPlugin : Plugin() {

    private lateinit var firebaseAnalytics: FirebaseAnalytics

    override fun load() {
        super.load()
        firebaseAnalytics = FirebaseAnalytics.getInstance(context)
    }

    @PluginMethod
    fun logEvent(call: PluginCall) {
        val name = call.getString("name")
        if (name.isNullOrEmpty()) {
            call.reject("Event name is required")
            return
        }

        val paramsObject = call.getObject("params")
        val bundle = Bundle()

        if (paramsObject != null) {
            val iterator = paramsObject.keys()
            while (iterator.hasNext()) {
                val key = iterator.next()
                val value = paramsObject.opt(key)
                when (value) {
                    is String -> bundle.putString(key, value)
                    is Int -> bundle.putInt(key, value)
                    is Long -> bundle.putLong(key, value)
                    is Double -> bundle.putDouble(key, value)
                    is Boolean -> bundle.putBoolean(key, value)
                    else -> bundle.putString(key, value?.toString() ?: "")
                }
            }
        }

        firebaseAnalytics.logEvent(name, bundle)
        call.resolve()
    }

    @PluginMethod
    fun setUserId(call: PluginCall) {
        val userId = call.getString("userId")
        firebaseAnalytics.setUserId(userId)
        call.resolve()
    }

    @PluginMethod
    fun setUserProperty(call: PluginCall) {
        val name = call.getString("name")
        if (name.isNullOrEmpty()) {
            call.reject("Property name is required")
            return
        }

        val value = call.getString("value")
        firebaseAnalytics.setUserProperty(name, value)
        call.resolve()
    }

    @PluginMethod
    fun setCurrentScreen(call: PluginCall) {
        val screenName = call.getString("screenName")
        if (screenName.isNullOrEmpty()) {
            call.reject("screenName is required")
            return
        }

        val screenClass = call.getString("screenClassOverride") ?: screenName

        // Với Firebase Analytics GA4 hiện đại: sử dụng logEvent(FirebaseAnalytics.Event.SCREEN_VIEW)
        val bundle = Bundle().apply {
            putString(FirebaseAnalytics.Param.SCREEN_NAME, screenName)
            putString(FirebaseAnalytics.Param.SCREEN_CLASS, screenClass)
        }
        firebaseAnalytics.logEvent(FirebaseAnalytics.Event.SCREEN_VIEW, bundle)
        call.resolve()
    }

    @PluginMethod
    fun resetAnalyticsData(call: PluginCall) {
        firebaseAnalytics.resetAnalyticsData()
        call.resolve()
    }

    @PluginMethod
    fun setAnalyticsCollectionEnabled(call: PluginCall) {
        val enabled = call.getBoolean("enabled", true) ?: true
        firebaseAnalytics.setAnalyticsCollectionEnabled(enabled)
        call.resolve()
    }
}
