# capacitor-plugin-firebase-analytics

Capacitor custom plugin for Google Analytics 4 (GA4) with Firebase Analytics

## Install

To use npm

```bash
npm install capacitor-plugin-firebase-analytics
````

To use yarn

```bash
yarn add capacitor-plugin-firebase-analytics
```

Sync native files

```bash
npx cap sync
```

## API

<docgen-index>

* [`logEvent(...)`](#logevent)
* [`setUserId(...)`](#setuserid)
* [`setUserProperty(...)`](#setuserproperty)
* [`setCurrentScreen(...)`](#setcurrentscreen)
* [`resetAnalyticsData()`](#resetanalyticsdata)
* [`setAnalyticsCollectionEnabled(...)`](#setanalyticscollectionenabled)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### logEvent(...)

```typescript
logEvent(options: LogEventOptions) => Promise<void>
```

Gửi một custom event lên GA4 Firebase

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#logeventoptions">LogEventOptions</a></code> |

--------------------


### setUserId(...)

```typescript
setUserId(options: SetUserIdOptions) => Promise<void>
```

Thiết lập User ID để theo dõi hành vi xuyên suốt các phiên

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#setuseridoptions">SetUserIdOptions</a></code> |

--------------------


### setUserProperty(...)

```typescript
setUserProperty(options: SetUserPropertyOptions) => Promise<void>
```

Thiết lập thuộc tính tùy chỉnh của người dùng (ví dụ: role = 'vip', account_type = 'premium')

| Param         | Type                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setuserpropertyoptions">SetUserPropertyOptions</a></code> |

--------------------


### setCurrentScreen(...)

```typescript
setCurrentScreen(options: SetCurrentScreenOptions) => Promise<void>
```

Ghi nhận màn hình hiện tại (Screen View Tracking)

| Param         | Type                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcurrentscreenoptions">SetCurrentScreenOptions</a></code> |

--------------------


### resetAnalyticsData()

```typescript
resetAnalyticsData() => Promise<void>
```

Xóa toàn bộ dữ liệu phân tích đã lưu tạm của thiết bị (reset analytics data)

--------------------


### setAnalyticsCollectionEnabled(...)

```typescript
setAnalyticsCollectionEnabled(options: SetAnalyticsCollectionEnabledOptions) => Promise<void>
```

Bật hoặc tắt thu thập dữ liệu (dùng cho tính năng người dùng từ chối thu thập Cookie/Privacy)

| Param         | Type                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setanalyticscollectionenabledoptions">SetAnalyticsCollectionEnabledOptions</a></code> |

--------------------


### Interfaces


#### LogEventOptions

| Prop         | Type                                                                                 | Description                                                            |
| ------------ | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **`name`**   | <code>string</code>                                                                  | Tên sự kiện GA4 (ví dụ: 'login', 'share', 'view_item', 'click_button') |
| **`params`** | <code><a href="#record">Record</a>&lt;string, string \| number \| boolean&gt;</code> | Tham số đi kèm sự kiện (Event Parameters key-value)                    |


#### SetUserIdOptions

| Prop         | Type                        | Description                                                   |
| ------------ | --------------------------- | ------------------------------------------------------------- |
| **`userId`** | <code>string \| null</code> | ID người dùng duy nhất (null nếu muốn xóa ID khi user logout) |


#### SetUserPropertyOptions

| Prop        | Type                        | Description                                           |
| ----------- | --------------------------- | ----------------------------------------------------- |
| **`name`**  | <code>string</code>         | Tên thuộc tính người dùng (User property name)        |
| **`value`** | <code>string \| null</code> | Giá trị thuộc tính (null nếu muốn xóa thuộc tính này) |


#### SetCurrentScreenOptions

| Prop                      | Type                | Description                                                         |
| ------------------------- | ------------------- | ------------------------------------------------------------------- |
| **`screenName`**          | <code>string</code> | Tên màn hình / page hiện tại (ví dụ: 'BlogListPage', 'LoginScreen') |
| **`screenClassOverride`** | <code>string</code> | Class name của màn hình (tùy chọn)                                  |


#### SetAnalyticsCollectionEnabledOptions

| Prop          | Type                 | Description                                       |
| ------------- | -------------------- | ------------------------------------------------- |
| **`enabled`** | <code>boolean</code> | Bật hoặc tắt tính năng thu thập sự kiện phân tích |


### Type Aliases


#### Record

Construct a type with a set of properties K of type T

<code>{ [P in K]: T; }</code>

</docgen-api>
