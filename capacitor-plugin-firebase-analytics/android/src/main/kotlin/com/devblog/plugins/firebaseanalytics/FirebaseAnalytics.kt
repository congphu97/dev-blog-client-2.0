package com.devblog.plugins.firebaseanalytics

import com.getcapacitor.Logger

class FirebaseAnalytics {

    fun echo(value: String): String {
        Logger.info("Echo", value)

        return value
    }
}
