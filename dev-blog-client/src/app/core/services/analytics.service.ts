import { Injectable } from '@angular/core';
import { FirebaseAnalytics } from 'capacitor-plugin-firebase-analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  /**
   * Theo dõi một sự kiện tùy chỉnh (Custom Event)
   * @param eventName Tên sự kiện (ví dụ: 'view_blog', 'login_success', 'click_share')
   * @param params Các thông số đính kèm
   */
  async logEvent(eventName: string, params?: Record<string, string | number | boolean>): Promise<void> {
    try {
      await FirebaseAnalytics.logEvent({
        name: eventName,
        params: params
      });
      console.log(`[Analytics] 📊 Event sent: ${eventName}`, params);
    } catch (error) {
      console.error(`[Analytics] ❌ Failed to log event: ${eventName}`, error);
    }
  }

  /**
   * Theo dõi khi người dùng chuyển màn hình / xem trang
   * @param screenName Tên trang (ví dụ: 'BlogDetailPage', 'LoginPage')
   */
  async setCurrentScreen(screenName: string): Promise<void> {
    try {
      await FirebaseAnalytics.setCurrentScreen({
        screenName: screenName
      });
      console.log(`[Analytics] 📱 Screen view: ${screenName}`);
    } catch (error) {
      console.error(`[Analytics] ❌ Failed to set current screen: ${screenName}`, error);
    }
  }

  /**
   * Gắn User ID khi người dùng đăng nhập thành công
   * @param userId Mã định danh người dùng (truyền null nếu đăng xuất)
   */
  async setUserId(userId: string | null): Promise<void> {
    try {
      await FirebaseAnalytics.setUserId({ userId });
      console.log(`[Analytics] 👤 User ID set: ${userId}`);
    } catch (error) {
      console.error(`[Analytics] ❌ Failed to set User ID`, error);
    }
  }

  /**
   * Gắn thuộc tính người dùng (User Properties)
   * @param name Tên thuộc tính (ví dụ: 'role', 'subscription_plan')
   * @param value Giá trị
   */
  async setUserProperty(name: string, value: string | null): Promise<void> {
    try {
      await FirebaseAnalytics.setUserProperty({ name, value });
      console.log(`[Analytics] 🏷️ User Property: ${name} = ${value}`);
    } catch (error) {
      console.error(`[Analytics] ❌ Failed to set User Property: ${name}`, error);
    }
  }

  /**
   * Reset dữ liệu Analytics (khi logout hoặc đổi tài khoản)
   */
  async reset(): Promise<void> {
    try {
      await FirebaseAnalytics.resetAnalyticsData();
      console.log(`[Analytics] 🔄 Reset analytics data complete`);
    } catch (error) {
      console.error(`[Analytics] ❌ Failed to reset analytics data`, error);
    }
  }
}

