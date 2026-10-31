export interface LogEventOptions {
  /**
   * Tên sự kiện GA4 (ví dụ: 'login', 'share', 'view_item', 'click_button')
   */
  name: string;
  /**
   * Tham số đi kèm sự kiện (Event Parameters key-value)
   */
  params?: Record<string, string | number | boolean>;
}

export interface SetUserIdOptions {
  /**
   * ID người dùng duy nhất (null nếu muốn xóa ID khi user logout)
   */
  userId: string | null;
}

export interface SetUserPropertyOptions {
  /**
   * Tên thuộc tính người dùng (User property name)
   */
  name: string;
  /**
   * Giá trị thuộc tính (null nếu muốn xóa thuộc tính này)
   */
  value: string | null;
}

export interface SetCurrentScreenOptions {
  /**
   * Tên màn hình / page hiện tại (ví dụ: 'BlogListPage', 'LoginScreen')
   */
  screenName: string;
  /**
   * Class name của màn hình (tùy chọn)
   */
  screenClassOverride?: string;
}

export interface SetAnalyticsCollectionEnabledOptions {
  /**
   * Bật hoặc tắt tính năng thu thập sự kiện phân tích
   */
  enabled: boolean;
}

export interface FirebaseAnalyticsPlugin {
  /**
   * Gửi một custom event lên GA4 Firebase
   */
  logEvent(options: LogEventOptions): Promise<void>;

  /**
   * Thiết lập User ID để theo dõi hành vi xuyên suốt các phiên
   */
  setUserId(options: SetUserIdOptions): Promise<void>;

  /**
   * Thiết lập thuộc tính tùy chỉnh của người dùng (ví dụ: role = 'vip', account_type = 'premium')
   */
  setUserProperty(options: SetUserPropertyOptions): Promise<void>;

  /**
   * Ghi nhận màn hình hiện tại (Screen View Tracking)
   */
  setCurrentScreen(options: SetCurrentScreenOptions): Promise<void>;

  /**
   * Xóa toàn bộ dữ liệu phân tích đã lưu tạm của thiết bị (reset analytics data)
   */
  resetAnalyticsData(): Promise<void>;

  /**
   * Bật hoặc tắt thu thập dữ liệu (dùng cho tính năng người dùng từ chối thu thập Cookie/Privacy)
   */
  setAnalyticsCollectionEnabled(options: SetAnalyticsCollectionEnabledOptions): Promise<void>;
}
