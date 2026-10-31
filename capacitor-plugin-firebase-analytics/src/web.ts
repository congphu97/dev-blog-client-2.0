import { WebPlugin } from '@capacitor/core';

import type {
  FirebaseAnalyticsPlugin,
  LogEventOptions,
  SetUserIdOptions,
  SetUserPropertyOptions,
  SetCurrentScreenOptions,
  SetAnalyticsCollectionEnabledOptions,
} from './definitions';

export class FirebaseAnalyticsWeb extends WebPlugin implements FirebaseAnalyticsPlugin {
  private collectionEnabled = true;

  async logEvent(options: LogEventOptions): Promise<void> {
    if (!this.collectionEnabled) return;

    // Hỗ trợ cả gtag.js nếu chạy trên trình duyệt web
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('event', options.name, options.params || {});
    }

    console.log(`[FirebaseAnalytics Web] 📊 logEvent:`, options.name, options.params);
  }

  async setUserId(options: SetUserIdOptions): Promise<void> {
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('set', { user_id: options.userId });
    }
    console.log(`[FirebaseAnalytics Web] 👤 setUserId:`, options.userId);
  }

  async setUserProperty(options: SetUserPropertyOptions): Promise<void> {
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('set', 'user_properties', { [options.name]: options.value });
    }
    console.log(`[FirebaseAnalytics Web] 🏷️ setUserProperty:`, options.name, options.value);
  }

  async setCurrentScreen(options: SetCurrentScreenOptions): Promise<void> {
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('event', 'screen_view', {
        screen_name: options.screenName,
        screen_class: options.screenClassOverride || options.screenName,
      });
    }
    console.log(`[FirebaseAnalytics Web] 📱 setCurrentScreen:`, options.screenName);
  }

  async resetAnalyticsData(): Promise<void> {
    console.log(`[FirebaseAnalytics Web] 🔄 resetAnalyticsData`);
  }

  async setAnalyticsCollectionEnabled(options: SetAnalyticsCollectionEnabledOptions): Promise<void> {
    this.collectionEnabled = options.enabled;
    console.log(`[FirebaseAnalytics Web] ⚙️ setAnalyticsCollectionEnabled:`, options.enabled);
  }
}
