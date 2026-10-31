# CẨM NANG TOÀN DIỆN VỀ REACTJS: TỪ CƠ BẢN ĐẾN CHUYÊN SÂU
> **Dựa trên giáo trình chính thức React.dev:**
> 1. **Describing the UI** (Mô tả Giao diện)
> 2. **Adding Interactivity** (Thêm tính tương tác)
> 3. **Managing State** (Quản lý State)
> 4. **Escape Hatches** (Các lối thoát & Tương tác ngoại vi)

---

## MỤC LỤC TỔNG QUAN

- [PHẦN 1: DESCRIBING THE UI (MÔ TẢ GIAO DIỆN)](#phần-1-describing-the-ui-mô-tả-giao-diện)
  - [1.1 Component đầu tiên trong React](#11-component-đầu-tiên-trong-react)
  - [1.2 Import và Export Components](#12-import-và-export-components)
  - [1.3 Viết Markup với JSX](#13-viết-markup-với-jsx)
  - [1.4 Sử dụng JavaScript trong JSX với dấu ngoặc nhọn `{}`](#14-sử-dụng-javascript-trong-jsx-với-dấu-ngoặc-nhọn-)
  - [1.5 Truyền Props cho Component](#15-truyền-props-cho-component)
  - [1.6 Render có điều kiện (Conditional Rendering)](#16-render-có-điều-kiện-conditional-rendering)
  - [1.7 Render danh sách (Rendering Lists) & Khóa `key`](#17-render-danh-sách-rendering-lists--khóa-key)
  - [1.8 Giữ Component thuần khiết (Pure Components)](#18-giữ-component-thuần-khiết-pure-components)
- [PHẦN 2: ADDING INTERACTIVITY (THÊM TÍNH TƯƠNG TÁC)](#phần-2-adding-interactivity-thêm-tính-tương-tác)
  - [2.1 Xử lý sự kiện (Responding to Events)](#21-xử-lý-sự-kiện-responding-to-events)
  - [2.2 State: Bộ nhớ của Component (State: A Component's Memory)](#22-state-bộ-nhớ-của-component-state-a-components-memory)
  - [2.3 Render và Commit (Render and Commit)](#23-render-và-commit-render-and-commit)
  - [2.4 State như một Snapshot (State as a Snapshot)](#24-state-như-một-snapshot-state-as-a-snapshot)
  - [2.5 Xếp hàng cập nhật State (Queueing a Series of State Updates)](#25-xếp-hàng-cập-nhật-state-queueing-a-series-of-state-updates)
  - [2.6 Cập nhật Objects trong State (Updating Objects in State)](#26-cập-nhật-objects-trong-state-updating-objects-in-state)
  - [2.7 Cập nhật Arrays trong State (Updating Arrays in State)](#27-cập-nhật-arrays-trong-state-updating-arrays-in-state)
- [PHẦN 3: MANAGING STATE (QUẢN LÝ STATE)](#phần-3-managing-state-quản-lý-state)
  - [3.1 Phản ứng với Input bằng State](#31-phản-ứng-với-input-bằng-state-reacting-to-input-with-state)
  - [3.2 Chọn cấu trúc State (Choosing the State Structure)](#32-chọn-cấu-trúc-state-choosing-the-state-structure)
  - [3.3 Chia sẻ State giữa các Component (Lifting State Up)](#33-chia-sẻ-state-giữa-các-component-lifting-state-up)
  - [3.4 Bảo tồn và Đặt lại State (Preserving and Resetting State)](#34-bảo-tồn-và-đặt-lại-state-preserving-and-resetting-state)
  - [3.5 Trích xuất Logic State vào Reducer (Extracting State Logic into a Reducer)](#35-trích-xuất-logic-state-vào-reducer-extracting-state-logic-into-a-reducer)
  - [3.6 Truyền dữ liệu sâu với Context (Passing Data Deeply with Context)](#36-truyền-dữ-liệu-sâu-với-context-passing-data-deeply-with-context)
  - [3.7 Mở rộng quy mô với Reducer và Context (Scaling Up with Reducer and Context)](#37-mở-rộng-quy-mô-với-reducer-và-context-scaling-up-with-reducer-and-context)
- [PHẦN 4: ESCAPE HATCHES (CÁC LỐI THOÁT NGOẠI VI)](#phần-4-escape-hatches-các-lối-thoát-ngoại-vi)
  - [4.1 Tham chiếu giá trị với Refs (`useRef`)](#41-tham-chiếu-giá-trị-với-refs-useref)
  - [4.2 Thao tác DOM với Refs](#42-thao-tác-dom-với-refs)
  - [4.3 Đồng bộ hóa với Effects (`useEffect`)](#43-đồng-bộ-hóa-với-effects-useeffect)
  - [4.4 Bạn có thể không cần đến Effect](#44-bạn-có-thể-không-cần-đến-effect)
  - [4.5 Vòng đời của Reactive Effects](#45-vòng-đời-của-reactive-effects)
  - [4.6 Tách biệt Events khỏi Effects](#46-tách-biệt-events-khỏi-effects)
  - [4.7 Loại bỏ Dependencies không cần thiết của Effect](#47-loại-bỏ-dependencies-không-cần-thiết-của-effect)
  - [4.8 Tái sử dụng Logic với Custom Hooks](#48-tái-sử-dụng-logic-với-custom-hooks)
- [PHẦN 5: CHUYÊN ĐỀ REACT HOOKS TOÀN DIỆN & NGHỆ THUẬT TẠO CUSTOM HOOKS (REACT 16.8 – REACT 19)](#phần-5-chuyên-đề-react-hooks-toàn-diện--nghệ-thuật-tạo-custom-hooks-react-168--react-19)
  - [5.1 Bản chất cốt lõi của React Hooks (Under The Hood)](#51-bản-chất-cốt-lõi-của-react-hooks-under-the-hood)
  - [5.2 Bảng phân loại & So sánh toàn diện 16 Hooks chuẩn trong React](#52-bảng-phân-loại--so-sánh-toàn-diện-16-hooks-chuẩn-trong-react)
  - [5.3 Mổ xẻ chi tiết từng nhóm Hooks & Code minh họa chuyên sâu](#53-mổ-xẻ-chi-tiết-từng-nhóm-hooks--code-minh-họa-chuyên-sâu)
  - [5.4 Nghệ thuật thiết kế & Xây dựng Custom Hooks chuyên nghiệp](#54-nghệ-thuật-thiết-kế--xây-dựng-custom-hooks-chuyên-nghiệp)
  - [5.5 4 Bộ Custom Hooks thực chiến chuẩn Production (TypeScript)](#55-4-bộ-custom-hooks-thực-chiến-chuẩn-production-typescript)
  - [5.6 Các cạm bẫy (Anti-patterns) cần tránh khi viết Custom Hooks](#56-các-cạm-bẫy-anti-patterns-cần-tránh-khi-viết-custom-hooks)

---

# PHẦN 1: DESCRIBING THE UI (MÔ TẢ GIAO DIỆN)

React là một thư viện JavaScript chuyên dùng để xây dựng giao diện người dùng (UI). Trong React, mọi thứ bạn nhìn thấy trên màn hình đều được phân tách thành các khối nhỏ, độc lập và có thể tái sử dụng, gọi là **Components**.

---

### 1.1 Component đầu tiên trong React

#### 1. Component là gì?
Component là khối cơ bản nhất của ứng dụng React. Bản chất một Component trong React hiện đại là một **JavaScript function** trả về cú pháp **JSX** (mô tả những gì sẽ hiển thị trên màn hình).

> 💡 **Quy tắc vàng:** Tên của React Component **bắt buộc phải viết hoa chữ cái đầu tiên** (PascalCase - ví dụ `UserProfile`, `NavigationButton`). Nếu viết thường (`profile`), React sẽ xem đó là thẻ HTML thông thường.

#### 2. Cú pháp cơ bản
```tsx
// Profile.tsx
export default function Profile() {
  return (
    <article className="user-card">
      <img
        src="https://api.dicebear.com/7.x/bottts/svg?seed=Phu"
        alt="Avatar Phú Nguyễn"
      />
      <h3>Phú Nguyễn</h3>
      <p>Kỹ sư phần mềm Fullstack</p>
    </article>
  );
}
```

#### 3. Sử dụng và Lồng ghép Component
Bạn có thể gọi Component bên trong Component khác giống như thẻ HTML:

```tsx
// App.tsx
import Profile from './Profile';

export default function Gallery() {
  return (
    <section>
      <h1>Danh Sách Lập Trình Viên</h1>
      {/* Tái sử dụng component */}
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

> ⚠️ **Cảnh báo lỗi lồng định nghĩa Component:**
> **KHÔNG BAO GIỜ** định nghĩa một Component bên trong thân của Component khác!
> ```tsx
> // ❌ CỰC KỲ TỒI TỆ: Mỗi lần Parent render, Child bị tạo mới hoàn toàn => mất state, lag!
> function Parent() {
>   function Child() { return <div>Con</div>; }
>   return <Child />;
> }
> 
> // ✅ ĐÚNG: Luôn định nghĩa độc lập ở cấp cao nhất của file
> function Child() { return <div>Con</div>; }
> function Parent() { return <Child />; }
> ```

---

### 1.2 Import và Export Components

Trong dự án thực tế, bạn sẽ tách mỗi Component ra một file riêng để dễ bảo trì. JavaScript cung cấp 2 cơ chế chính: **Default Export** và **Named Export**.

| Đặc tính | Default Export (`export default`) | Named Export (`export ...`) |
| :--- | :--- | :--- |
| **Số lượng mỗi file** | Tối đa **1** export default | **Không giới hạn** |
| **Cú pháp export** | `export default function Button() {}` | `export function Button() {}` |
| **Cú pháp import** | `import Button from './Button'` | `import { Button } from './Button'` |
| **Đổi tên khi import** | Tự do đổi tên (ví dụ: `import MyBtn from ...`) | Phải dùng alias: `import { Button as MyBtn } from ...` |

```tsx
// components/Buttons.tsx
// 1. Named exports cho các nút nhỏ lẻ phụ trợ
export function DangerButton() {
  return <button className="btn-danger">Xoá vĩnh viễn</button>;
}

export function SuccessButton() {
  return <button className="btn-success">Thành công</button>;
}

// 2. Default export cho Component chủ đạo của file
export default function PrimaryButton() {
  return <button className="btn-primary">Nút hành động chính</button>;
}
```

```tsx
// App.tsx - Sử dụng kết hợp
import PrimaryButton, { DangerButton, SuccessButton } from './components/Buttons';
```

---

### 1.3 Viết Markup với JSX

**JSX (JavaScript XML)** là phần mở rộng cú pháp của JavaScript cho phép bạn viết cú pháp giống như HTML ngay bên trong code JS/TS.

#### 3 Quy tắc bắt buộc của JSX:

#### Quy tắc 1: Luôn chỉ trả về MỘT thẻ gốc (Single Root Element)
Component không thể trả về 2 thẻ đồng cấp lơ lửng. Muốn gom nhóm mà không thêm thẻ `<div>` thừa vào DOM, hãy dùng **Fragment (`<>...</>`)**:

```tsx
// ❌ SAI: Lỗi cú pháp JSX
return (
  <h1>Tiêu đề</h1>
  <p>Đoạn văn</p>
);

// ✅ ĐÚNG: Dùng Fragment
return (
  <>
    <h1>Tiêu đề</h1>
    <p>Đoạn văn</p>
  </>
);
```
*Tại sao?* Vì JSX dưới nền sẽ được chuyển hóa thành `React.createElement(...)` hoặc `_jsx(...)`. Một hàm JS chỉ có thể `return` một giá trị duy nhất.

#### Quy tắc 2: Đóng tất cả các thẻ (Close all tags)
Trong HTML, các thẻ như `<img>`, `<input>`, `<br>` có thể không cần thẻ đóng. Nhưng trong JSX, **mọi thẻ đều phải được đóng tự thân (self-closing)**:
```tsx
<img src="logo.png" alt="Logo" />
<input type="text" />
<br />
```

#### Quy tắc 3: Viết thuộc tính theo camelCase
JSX là JavaScript, và các từ khóa như `class` hoặc `for` là từ khóa dành riêng trong JS. Do đó:
- `class` đổi thành `className`
- `for` (trong thẻ label) đổi thành `htmlFor`
- `tabindex` đổi thành `tabIndex`
- `onclick` đổi thành `onClick`
- `style="background-color: red"` đổi thành `style={{ backgroundColor: 'red' }}`

---

### 1.4 Sử dụng JavaScript trong JSX với dấu ngoặc nhọn `{}`

Dấu ngoặc nhọn `{}` trong JSX là một "cửa sổ sổ sổ" (portal) cho phép bạn nhúng bất kỳ biểu thức JavaScript hợp lệ nào vào trực tiếp trong giao diện.

```tsx
export default function TodoList() {
  const author = 'Trần Công Phú';
  const avatarUrl = 'https://picsum.photos/100/100';
  const today = new Date();

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('vi-VN', { weekday: 'long' }).format(date);
  }

  return (
    <div>
      {/* 1. Nhúng biến trực tiếp vào văn bản */}
      <h2>Danh sách công việc của: {author}</h2>
      <p>Hôm nay là: {formatDate(today)}</p>

      {/* 2. Nhúng biến vào thuộc tính (Attributes) */}
      <img src={avatarUrl} alt={`Avatar của ${author}`} />

      {/* 3. Dấu ngoặc nhọn kép {{}} cho Style Inline hoặc Object */}
      {/* Ngoặc ngoài là cú pháp JSX {}, ngoặc trong là Object JS {} */}
      <div
        style={{
          backgroundColor: '#1e293b',
          color: '#38bdf8',
          padding: '16px',
          borderRadius: '8px'
        }}
      >
        Khối này được style inline bằng JS Object
      </div>
    </div>
  );
}
```

---

### 1.5 Truyền Props cho Component

**Props (viết tắt của Properties)** là cách các component trao đổi dữ liệu với nhau. Dữ liệu chỉ truyền một chiều: **từ Cha xuống Con (Unidirectional Data Flow)**.

#### 1. Nhận và Destructure Props
```tsx
interface AvatarProps {
  person: {
    name: string;
    imageId: string;
  };
  size?: number; // Optional prop
}

// Destructuring trực tiếp trong tham số, gán giá trị mặc định cho size = 100
export function Avatar({ person, size = 100 }: AvatarProps) {
  return (
    <img
      className="avatar"
      src={`https://i.imgur.com/${person.imageId}.jpg`}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```

#### 2. Prop đặc biệt: `children`
Khi bạn đặt nội dung bên trong cặp thẻ đóng mở của một Component, React sẽ tự động gom nội dung đó vào prop có tên là `children`. Đây là nền tảng để tạo các Layout, Card, Modal tái sử dụng:

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode; // Nhận mọi thứ: text, thẻ html, component khác
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h3 className="font-bold border-b pb-2 mb-3">{title}</h3>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Cách gọi:
export function App() {
  return (
    <Card title="Hồ sơ cá nhân">
      <p>Nội dung lồng bên trong này chính là children!</p>
      <button>Chỉnh sửa</button>
    </Card>
  );
}
```

> 💡 **Props là Read-Only (Bất biến - Immutable):**
> Component con **tuyệt đối không bao giờ được sửa trực tiếp giá trị của props** (`props.size = 200` ❌). Nếu muốn thay đổi giá trị theo tương tác người dùng, bạn cần dùng **State**.

---

### 1.6 Render có điều kiện (Conditional Rendering)

Trong React, bạn không dùng các cú pháp directive như `*ngIf` hay `v-if`, mà sử dụng trực tiếp sức mạnh của JavaScript:

#### 1. Sử dụng câu lệnh `if / else`
```tsx
interface ItemProps {
  name: string;
  isPacked: boolean;
}

function Item({ name, isPacked }: ItemProps) {
  if (isPacked) {
    return <li className="line-through text-gray-400">{name} ✔</li>;
  }
  return <li className="text-black">{name}</li>;
}
```

#### 2. Toán tử 3 ngôi (Ternary Operator `? :`)
Gọn gàng khi bạn muốn đổi một phần nội dung ngay trong JSX:
```tsx
function Item({ name, isPacked }: ItemProps) {
  return (
    <li>
      {name} {isPacked ? '✔' : '❌'}
    </li>
  );
}
```

#### 3. Toán tử Logic AND (`&&`)
Dùng khi bạn muốn hiển thị một phần tử khi điều kiện đúng, và không hiển thị gì khi sai:
```tsx
function Notification({ unreadCount }: { unreadCount: number }) {
  return (
    <div>
      <h3>Hộp thư đến</h3>
      {unreadCount > 0 && (
        <span className="badge">Bạn có {unreadCount} thông báo mới!</span>
      )}
    </div>
  );
}
```

> ⚠️ **Cạm bẫy với số 0 trong toán tử `&&`:**
> Nếu vế trái là số `0`, JavaScript coi `0` là falsy nhưng React vẫn sẽ render số `0` ra màn hình!
> ```tsx
> // ❌ SAI: Nếu count = 0, màn hình sẽ hiển thị số 0 đơn độc
> {count && <p>Có {count} bài viết</p>}
> 
> // ✅ ĐÚNG: Ép kiểu boolean rõ ràng
> {count > 0 && <p>Có {count} bài viết</p>}
> ```

---

### 1.7 Render danh sách (Rendering Lists) & Khóa `key`

Để hiển thị một mảng dữ liệu thành danh sách các thẻ HTML, phương pháp chuẩn mực nhất trong React là hàm `map()`.

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 'p1', name: 'Bàn phím cơ FL-Esports', price: 1500000 },
  { id: 'p2', name: 'Chuột không dây Logitech G Pro', price: 2100000 },
  { id: 'p3', name: 'Màn hình Dell UltraSharp 27"', price: 8900000 }
];

export function ProductList() {
  return (
    <ul>
      {products.map(item => (
        <li key={item.id} className="flex justify-between py-2 border-b">
          <span>{item.name}</span>
          <span className="font-semibold">{item.price.toLocaleString('vi-VN')} đ</span>
        </li>
      ))}
    </ul>
  );
}
```

#### Tại sao `key` lại tối quan trọng?
- **Khóa `key`** giúp React phân biệt danh sách các phần tử qua các lần re-render (biết chính xác phần tử nào bị thêm, xóa, hoặc đổi chỗ).
- **Quy tắc chọn key:**
  1. Key phải là **duy nhất** giữa các phần tử anh em (anh em cùng cấp).
  2. Key phải **ổn định** qua thời gian (không dùng `Math.random()`).
  3. **Hạn chế dùng index làm key:** Nếu mảng có hành động thêm ở đầu, xóa ở giữa hoặc sort, dùng index sẽ gây bug giật lag và giữ sai state của các input con.

---

### 1.8 Giữ Component thuần khiết (Pure Components)

Khái niệm này mượn từ **Functional Programming**:
1. **Hàm thuần khiết (Pure function):** Với cùng một đầu vào (input/props), nó luôn luôn trả về cùng một kết quả (UI).
2. **Không có Side Effects trong quá trình render:** Nó không thay đổi bất kỳ biến nào đã tồn tại trước khi nó được gọi.

```tsx
// ❌ KHÔNG THUẦN KHIẾT: Sửa biến ngoài trong lúc render
let guestCount = 0;
function BadCup() {
  guestCount = guestCount + 1; // ❌ Mutation biến toàn cục!
  return <h2>Tách trà dành cho khách số #{guestCount}</h2>;
}

// ✅ THUẦN KHIẾT: Đầu vào xác định đầu ra, truyền qua props
function GoodCup({ guest }: { guest: number }) {
  return <h2>Tách trà dành cho khách số #{guest}</h2>;
}
```

> 💡 **React StrictMode:**
> Ở môi trường Development (`localhost`), React sẽ tự động chạy mỗi component **2 lần liên tiếp**. Mục đích là để "bắt quả tang" những component có side effect vô ý làm thay đổi biến ngoài (nếu component pure, chạy 2 lần kết quả hiển thị vẫn y hệt nhau).

---

# PHẦN 2: ADDING INTERACTIVITY (THÊM TÍNH TƯƠNG TÁC)

Một giao diện tĩnh chỉ là một trang báo. Để biến trang web thành ứng dụng có khả năng phản hồi người dùng (nhập liệu, click nút, kéo thả), React cung cấp hệ thống **Event Handlers** và **State**.

---

### 2.1 Xử lý sự kiện (Responding to Events)

Trong React, bạn truyền trực tiếp một function vào prop sự kiện (như `onClick`, `onChange`, `onSubmit`...):

```tsx
export function ButtonToolbar() {
  // Định nghĩa hàm xử lý sự kiện
  function handleClick() {
    alert('Bạn vừa click vào nút!');
  }

  return (
    <div className="flex gap-2">
      {/* 1. Truyền tham chiếu function (Đúng) */}
      <button onClick={handleClick}>Bấm tôi</button>

      {/* 2. Viết inline arrow function */}
      <button onClick={() => alert('Inline click')}>Nút inline</button>

      {/* ❌ SAI PHỔ BIẾN: Gọi hàm ngay lập tức khi render */}
      {/* <button onClick={handleClick()}>Lỗi: Hàm sẽ tự chạy ngay khi trang vừa load!</button> */}
    </div>
  );
}
```

#### Ngăn chặn sự kiện lan truyền (Event Propagation)
Sự kiện trong trình duyệt sẽ nổi bọt (bubble) từ phần tử con lên phần tử cha. Nếu không muốn sự kiện của con kích hoạt hành động của cha:

```tsx
export function Toolbar() {
  return (
    <div
      className="p-4 bg-gray-200"
      onClick={() => alert('Click vùng Toolbar ngoài cùng')}
    >
      <button
        onClick={(e) => {
          e.stopPropagation(); // 🛑 Chặn lan truyền, chỉ popup của nút hiện lên!
          alert('Click nút Play!');
        }}
      >
        Play Movie
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault(); // 🛑 Ngăn chặn reload toàn bộ trang web
          console.log('Form submit!');
        }}
      >
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
}
```

---

### 2.2 State: Bộ nhớ của Component (State: A Component's Memory)

Biến thông thường trong JavaScript không thể dùng để lưu trữ dữ liệu UI tương tác vì:
1. **Biến cục bộ không tồn tại qua các lần render:** Khi React gọi lại Component, biến cục bộ bị khởi tạo lại từ đầu.
2. **Thay đổi biến cục bộ không kích hoạt Render:** React không hề biết biến của bạn thay đổi để mà vẽ lại giao diện.

Để khắc phục, React cung cấp Hook `useState`:

```tsx
import { useState } from 'react';

export function Counter() {
  // Cú pháp: const [stateValue, setStateFunction] = useState(initialValue);
  const [count, setCount] = useState<number>(0);

  function handleIncrement() {
    setCount(count + 1); // 1. Cập nhật giá trị mới; 2. Ra lệnh cho React re-render
  }

  return (
    <div className="p-4 text-center">
      <p className="text-2xl font-bold">Số lần bấm: {count}</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleIncrement}
      >
        Tăng số (+1)
      </button>
    </div>
  );
}
```

> 💡 **Tính độc lập của State:** Mỗi instance của component trên màn hình có vùng nhớ state **riêng biệt hoàn toàn**. Nếu bạn đặt 2 thẻ `<Counter />` cạnh nhau, bấm nút ở counter 1 không hề làm ảnh hưởng đến counter 2.

---

### 2.3 Render và Commit (Render and Commit)

Quá trình hiển thị giao diện của React diễn ra qua **3 bước tuần tự**:

```
[ 1. Trigger (Kích hoạt) ] ──> [ 2. Render (Tính toán) ] ──> [ 3. Commit (Ghi vào DOM) ]
```

1. **Bước 1: Trigger (Kích hoạt)**
   - Initial render khi ứng dụng vừa khởi động (`createRoot(...).render(<App />)`).
   - Hoặc Component vừa gọi hàm cập nhật State (`setCount`, `setName`...).
2. **Bước 2: Render (Tính toán giao diện)**
   - React gọi lại hàm Component của bạn.
   - React so sánh kết quả JSX mới với kết quả JSX lần trước (thuật toán Virtual DOM Diffing) để tính toán xem những gì thực sự thay đổi.
3. **Bước 3: Commit (Áp dụng vào DOM thật)**
   - Ở Initial render, React tạo các node DOM bằng `appendChild()`.
   - Ở các lần re-render sau, **React CHỈ sửa đúng những node DOM thật có sự thay đổi**. Nếu trong 1000 thẻ chỉ có 1 con số biến đổi từ 0 thành 1, React chỉ cập nhật đúng node text đó!

---

### 2.4 State như một Snapshot (State as a Snapshot)

Đây là một trong những khái niệm quan trọng nhất của React: **State không phải là một biến có thể thay đổi ngay lập tức, mà là một "ảnh chụp" (snapshot) của giao diện tại thời điểm render đó!**

Hãy xem ví dụ kinh điển sau:
```tsx
export function BuggyCounter() {
  const [number, setNumber] = useState(0);

  function handleClick() {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
  }

  return (
    <div>
      <h3>Giá trị: {number}</h3>
      <button onClick={handleClick}>+3 lần</button>
    </div>
  );
}
```
**Câu hỏi:** Sau khi bấm nút, `number` sẽ là `3` hay `1`?
**Đáp án:** Là `1`!
*Giải thích:*
- Trong lần render này, `number` đang có giá trị là `0`.
- Khi `handleClick` chạy:
  - `setNumber(0 + 1)`
  - `setNumber(0 + 1)`
  - `setNumber(0 + 1)`
- React ghi nhận yêu cầu: "Ở lần render tiếp theo, đổi `number` thành `1`". Trong suốt quá trình hàm chạy, `number` vẫn đóng băng ở mức `0`.

---

### 2.5 Xếp hàng cập nhật State (Queueing a Series of State Updates)

Để giải quyết bài toán trên (cần cập nhật state nhiều lần liên tiếp trước render tiếp theo), React cho phép bạn truyền vào một **Updater Function**:

```tsx
export function CorrectCounter() {
  const [number, setNumber] = useState(0);

  function handleClick() {
    // Truyền hàm callback nhận giá trị trước đó (prev / pending state)
    setNumber(prev => prev + 1);
    setNumber(prev => prev + 1);
    setNumber(prev => prev + 1);
  }

  return (
    <div>
      <h3>Giá trị: {number}</h3>
      <button onClick={handleClick}>+3 chính xác</button>
    </div>
  );
}
```
*Cách React xử lý hàng đợi (Queue):*
1. `prev => prev + 1`: Nhận `0`, trả về `1`.
2. `prev => prev + 1`: Nhận `1`, trả về `2`.
3. `prev => prev + 1`: Nhận `2`, trả về `3`.
Kết quả: `number` nhảy lên `3` chuẩn xác!

---

### 2.6 Cập nhật Objects trong State (Updating Objects in State)

State trong React phải được đối xử như là **Bất biến (Immutable)**. Bạn không bao giờ được sửa trực tiếp các thuộc tính của object trong state.

```tsx
interface UserProfile {
  name: string;
  email: string;
  address: {
    city: string;
    country: string;
  };
}

export function FormProfile() {
  const [person, setPerson] = useState<UserProfile>({
    name: 'Phú Nguyễn',
    email: 'phu@dev.com',
    address: { city: 'Hồ Chí Minh', country: 'Việt Nam' }
  });

  // ❌ SAI LẦM NGHIÊM TRỌNG: Mutate trực tiếp object
  function handleWrongUpdate() {
    person.name = 'John Doe'; // React không phát hiện được sự thay đổi tham chiếu!
    setPerson(person);        // Component sẽ KHÔNG re-render!
  }

  // ✅ ĐÚNG: Tạo một bản copy nông mới bằng Spread Operator (...)
  function handleUpdateName(newName: string) {
    setPerson({
      ...person,
      name: newName
    });
  }

  // ✅ ĐÚNG với Nested Object: Copy từng tầng
  function handleUpdateCity(newCity: string) {
    setPerson({
      ...person,
      address: {
        ...person.address,
        city: newCity
      }
    });
  }

  return (
    <div>
      <input
        value={person.name}
        onChange={e => handleUpdateName(e.target.value)}
      />
      <input
        value={person.address.city}
        onChange={e => handleUpdateCity(e.target.value)}
      />
    </div>
  );
}
```

---

### 2.7 Cập nhật Arrays trong State (Updating Arrays in State)

Tương tự như Object, mảng trong state cũng không được dùng các hàm gây đột biến tại chỗ (mutating methods) như `push()`, `pop()`, `splice()`, `reverse()`, `sort()`. Thay vào đó, hãy sử dụng các hàm trả về mảng mới như `concat()`, `filter()`, `map()`, hoặc cú pháp `[...spread]`:

| Thao tác | ❌ Tránh dùng (Mutate) | ✅ Nên dùng (Trả về mảng mới) |
| :--- | :--- | :--- |
| **Thêm phần tử** | `push()`, `unshift()` | `[...array, newItem]` hoặc `[newItem, ...array]` |
| **Xóa phần tử** | `pop()`, `shift()`, `splice()` | `array.filter(item => item.id !== idToDelete)` |
| **Sửa phần tử** | `array[index] = newValue` | `array.map(item => item.id === id ? { ...item, ...newValue } : item)` |
| **Sắp xếp mảng** | `array.sort()`, `array.reverse()` | `[...array].sort()` (Copy mảng trước rồi mới sort) |

#### Ví dụ thực chiến Quản lý danh sách công việc (Todo List):
```tsx
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoManager() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Học React Describing UI', completed: true },
    { id: 2, text: 'Làm chủ React State', completed: false }
  ]);
  const [inputText, setInputText] = useState('');

  // 1. Thêm mới (Thêm vào cuối mảng)
  function handleAdd() {
    if (!inputText.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setInputText('');
  }

  // 2. Xóa phần tử (Filter)
  function handleDelete(id: number) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  // 3. Đổi trạng thái hoàn thành (Map)
  function handleToggle(id: number) {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex gap-2 mb-4">
        <input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Nhập việc cần làm..."
          className="border p-2 flex-1"
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2">
          Thêm
        </button>
      </div>

      <ul>
        {todos.map(item => (
          <li key={item.id} className="flex justify-between items-center py-2 border-b">
            <span
              onClick={() => handleToggle(item.id)}
              className={`cursor-pointer ${item.completed ? 'line-through text-gray-400' : ''}`}
            >
              {item.text}
            </span>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              🗑️ Xoá
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---
## PHẦN 3: MANAGING STATE (Quản Lý State)

State là "bộ nhớ" của component — nơi lưu trữ dữ liệu có thể thay đổi theo thời gian và ảnh hưởng đến giao diện. Phần này sẽ đi sâu vào mọi khía cạnh của việc quản lý state trong React, từ cơ bản đến nâng cao.

---

### 3.1 Phản ứng với Input bằng State (Reacting to Input with State)

#### Declarative vs Imperative UI

Trong lập trình **imperative** (mệnh lệnh), bạn phải chỉ dẫn từng bước một: "Lấy nút này, disable nó, hiện spinner, ẩn form...". Giống như bạn ngồi trên taxi và phải chỉ đường từng ngã rẽ cho tài xế.

Trong lập trình **declarative** (khai báo), bạn chỉ cần mô tả "tôi muốn giao diện trông như thế nào ở mỗi trạng thái". Giống như bạn bảo tài xế "đưa tôi đến sân bay" — tài xế tự biết đường.

React sử dụng cách tiếp cận **declarative**. Bạn không trực tiếp thao tác DOM, mà bạn khai báo UI cho từng trạng thái, và React lo phần cập nhật.

```tsx
// ❌ Imperative (kiểu jQuery cũ)
function handleSubmit() {
  document.getElementById('btn').disabled = true;
  document.getElementById('spinner').style.display = 'block';
  document.getElementById('form').style.display = 'none';
  // ... rất dễ gây bug khi logic phức tạp
}

// ✅ Declarative (kiểu React)
function Form() {
  const [status, setStatus] = useState<'typing' | 'submitting' | 'success'>('typing');

  if (status === 'success') {
    return <h1>Cảm ơn bạn đã gửi!</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea disabled={status === 'submitting'} />
      <button disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Đang gửi...' : 'Gửi'}
      </button>
    </form>
  );
}
```

#### Tư duy theo trạng thái (Thinking in States)

Khi thiết kế UI, hãy nghĩ về tất cả các trạng thái có thể xảy ra, giống như một designer tạo mockup cho từng "cảnh" (scene):

1. **Empty** — Form rỗng, chưa nhập gì
2. **Typing** — Người dùng đang nhập liệu
3. **Submitting** — Đang gửi dữ liệu, chờ phản hồi
4. **Success** — Gửi thành công
5. **Error** — Có lỗi xảy ra

```tsx
// Ví dụ hoàn chỉnh: Form gửi bài viết
type FormStatus = 'empty' | 'typing' | 'submitting' | 'success' | 'error';

function SubmitArticleForm() {
  const [status, setStatus] = useState<FormStatus>('empty');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Xác định trạng thái giao diện dựa trên status
  const isDisabled = status === 'submitting';
  const showError = status === 'error' && error;
  const showSuccess = status === 'success';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    try {
      await submitArticle({ title, content });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Lỗi không xác định');
    }
  }

  if (showSuccess) {
    return (
      <div className="success">
        <h2>🎉 Bài viết đã được đăng!</h2>
        <button onClick={() => {
          setStatus('empty');
          setTitle('');
          setContent('');
        }}>
          Viết bài mới
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {showError && <div className="error">⚠️ {error}</div>}

      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (status !== 'typing') setStatus('typing');
        }}
        placeholder="Tiêu đề bài viết"
        disabled={isDisabled}
      />
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          if (status !== 'typing') setStatus('typing');
        }}
        placeholder="Nội dung..."
        disabled={isDisabled}
      />
      <button disabled={isDisabled || status === 'empty'}>
        {isDisabled ? '⏳ Đang gửi...' : '📤 Đăng bài'}
      </button>
    </form>
  );
}
```

#### Khái niệm State Machine

Bạn có thể hình dung các trạng thái như một **sơ đồ máy trạng thái** (state machine) — mỗi trạng thái chỉ có thể chuyển sang một số trạng thái nhất định:

```
empty → typing (khi user bắt đầu nhập)
typing → submitting (khi user submit)
submitting → success (khi API trả về ok)
submitting → error (khi API trả về lỗi)
error → typing (khi user sửa lại input)
success → empty (khi user muốn tạo mới)
```

💡 **Mẹo:** Trước khi code, hãy vẽ sơ đồ trạng thái. Điều này giúp bạn không bỏ sót trường hợp nào và tránh các trạng thái "bất khả thi" (ví dụ: vừa `submitting` vừa `success`).

⚠️ **Lỗi phổ biến:** Dùng nhiều biến boolean riêng lẻ (`isLoading`, `isError`, `isSuccess`) thay vì một biến status duy nhất. Điều này dẫn đến các trạng thái mâu thuẫn — ví dụ `isLoading = true` và `isError = true` cùng lúc.

---

### 3.2 Chọn cấu trúc State (Choosing the State Structure)

Cấu trúc state tốt giúp component dễ debug, dễ cập nhật, và ít bug. Dưới đây là 5 nguyên tắc vàng:

#### Nguyên tắc 1: Gom các state liên quan lại (Group related state)

Nếu hai state luôn thay đổi cùng lúc, hãy gộp chúng thành một object.

```tsx
// ❌ Không tốt: hai state luôn cập nhật cùng lúc
const [x, setX] = useState(0);
const [y, setY] = useState(0);

function handleMouseMove(e: React.MouseEvent) {
  setX(e.clientX); // Phải gọi 2 lần set
  setY(e.clientY);
}

// ✅ Tốt hơn: gộp thành object
const [position, setPosition] = useState({ x: 0, y: 0 });

function handleMouseMove(e: React.MouseEvent) {
  setPosition({ x: e.clientX, y: e.clientY }); // Gọn gàng hơn
}
```

💡 **Mẹo:** Nếu bạn không biết dùng bao nhiêu state (ví dụ: form động với số lượng field thay đổi), hãy dùng object hoặc array.

#### Nguyên tắc 2: Tránh mâu thuẫn trong state (Avoid contradictions)

State không nên có khả năng ở trạng thái "bất khả thi".

```tsx
// ❌ Nguy hiểm: có thể vô tình set cả hai = true
const [isSending, setIsSending] = useState(false);
const [isSent, setIsSent] = useState(false);

async function handleSubmit() {
  setIsSending(true);
  await sendMessage();
  setIsSending(false);
  setIsSent(true);
  // Nếu quên setIsSending(false) → vừa sending vừa sent!
}

// ✅ Dùng một status duy nhất — không thể mâu thuẫn
const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

async function handleSubmit() {
  setStatus('sending');
  await sendMessage();
  setStatus('sent'); // Rõ ràng, không mâu thuẫn
}
```

#### Nguyên tắc 3: Tránh state dư thừa (Avoid redundancy)

Nếu bạn có thể tính toán một giá trị từ props hoặc state hiện có, **đừng** tạo thêm state cho nó.

```tsx
// ❌ Dư thừa: fullName có thể tính từ firstName + lastName
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState(''); // ← KHÔNG CẦN!

// Phải đồng bộ mỗi lần firstName hoặc lastName thay đổi
function handleFirstNameChange(e) {
  setFirstName(e.target.value);
  setFullName(e.target.value + ' ' + lastName); // Dễ quên!
}

// ✅ Tính toán trực tiếp khi render — luôn đồng bộ
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const fullName = firstName + ' ' + lastName; // Biến thường, không phải state
```

💡 **Mẹo:** Hãy tự hỏi "Giá trị này có thể được tính từ state/props khác không?" Nếu có → đừng dùng `useState`.

#### Nguyên tắc 4: Tránh trùng lặp state (Avoid duplication)

Đừng copy cùng một dữ liệu vào nhiều state variables.

```tsx
interface Item {
  id: number;
  title: string;
}

// ❌ Trùng lặp: selectedItem là bản copy của item trong items
const [items, setItems] = useState<Item[]>(initialItems);
const [selectedItem, setSelectedItem] = useState<Item | null>(null);

// Khi cập nhật items, selectedItem vẫn giữ dữ liệu cũ! BUG!
function handleUpdateItem(id: number, newTitle: string) {
  setItems(items.map(item =>
    item.id === id ? { ...item, title: newTitle } : item
  ));
  // Quên cập nhật selectedItem → dữ liệu bị lệch!
}

// ✅ Chỉ lưu ID → tham chiếu, không copy
const [items, setItems] = useState<Item[]>(initialItems);
const [selectedId, setSelectedId] = useState<number | null>(null);

// Tính toán item được chọn từ ID
const selectedItem = items.find(item => item.id === selectedId) ?? null;

function handleUpdateItem(id: number, newTitle: string) {
  setItems(items.map(item =>
    item.id === id ? { ...item, title: newTitle } : item
  ));
  // selectedItem tự động cập nhật vì nó được tính từ items!
}
```

#### Nguyên tắc 5: Tránh state lồng sâu (Avoid deeply nested state)

State lồng nhiều tầng rất khó cập nhật. Hãy "phẳng hóa" (flatten/normalize) nó.

```tsx
// ❌ Lồng sâu — cập nhật rất phức tạp
interface NestedPlace {
  id: number;
  title: string;
  childPlaces: NestedPlace[];
}

const [plan, setPlan] = useState<NestedPlace>(deeplyNestedData);

// Để xóa một place con → phải clone toàn bộ cây! 😱

// ✅ Phẳng hóa (normalized) — dùng ID để tham chiếu
interface FlatPlace {
  id: number;
  title: string;
  childIds: number[];
}

// Lưu dạng "bảng" (table/map)
const [places, setPlaces] = useState<Record<number, FlatPlace>>({
  0: { id: 0, title: 'Việt Nam', childIds: [1, 2] },
  1: { id: 1, title: 'Hà Nội', childIds: [] },
  2: { id: 2, title: 'TP.HCM', childIds: [3] },
  3: { id: 3, title: 'Quận 1', childIds: [] },
});

// Xóa một place → chỉ cần cập nhật 1-2 entries
function handleDeletePlace(parentId: number, placeId: number) {
  setPlaces(prev => {
    const updated = { ...prev };
    // Xóa khỏi danh sách con của parent
    updated[parentId] = {
      ...updated[parentId],
      childIds: updated[parentId].childIds.filter(id => id !== placeId),
    };
    // Xóa chính nó
    delete updated[placeId];
    return updated;
  });
}
```

⚠️ **Lỗi phổ biến:** Lưu toàn bộ dữ liệu API response (thường lồng sâu) trực tiếp vào state. Hãy normalize trước khi lưu.

---

### 3.3 Chia sẻ State giữa Components (Lifting State Up)

#### Khi nào cần Lift State?

Khi **hai hoặc nhiều component cùng cấp** cần chia sẻ và phản ứng với cùng một dữ liệu. Hãy tưởng tượng hai anh em muốn chia sẻ một cái remote TV — thay vì mỗi người giữ một cái riêng, hãy đưa nó cho bố mẹ (parent component) quản lý.

#### Các bước Lift State (Step-by-step)

```tsx
// === BƯỚC 1: Ban đầu, mỗi Panel tự quản lý isActive ===
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false); // State riêng
  return (
    <section>
      <h3>{title}</h3>
      {isActive ? children : <button onClick={() => setIsActive(true)}>Hiện</button>}
    </section>
  );
}

function Accordion() {
  return (
    <>
      {/* Hai Panel hoạt động độc lập — cả hai có thể mở cùng lúc */}
      <Panel title="Giới thiệu">Nội dung giới thiệu...</Panel>
      <Panel title="Chi tiết">Nội dung chi tiết...</Panel>
    </>
  );
}

// === BƯỚC 2: Lift state lên Accordion ===
// 1. XÓA state khỏi component con
// 2. TRUYỀN dữ liệu từ parent qua props
// 3. TRUYỀN hàm thay đổi state qua props

// Panel giờ là "controlled component" — nhận isActive từ props
function Panel({
  title,
  children,
  isActive,
  onShow,
}: {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onShow: () => void;
}) {
  return (
    <section>
      <h3>{title}</h3>
      {isActive ? children : <button onClick={onShow}>Hiện</button>}
    </section>
  );
}

function Accordion() {
  // State giờ nằm ở parent — đảm bảo chỉ 1 panel mở
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Panel
        title="Giới thiệu"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        Nội dung giới thiệu...
      </Panel>
      <Panel
        title="Chi tiết"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        Nội dung chi tiết...
      </Panel>
    </>
  );
}
```

#### Controlled vs Uncontrolled Components

| Đặc điểm | Uncontrolled | Controlled |
|-----------|-------------|------------|
| State | Quản lý bên trong component | Nhận từ parent qua props |
| Linh hoạt | Ít cần cấu hình | Có thể tùy chỉnh hoàn toàn |
| Ví dụ | `<input />` (tự quản lý value) | `<input value={x} onChange={...} />` |
| Khi nào dùng | Component đơn giản, độc lập | Cần đồng bộ với component khác |

```tsx
// Uncontrolled: Component tự quản lý state
function UncontrolledSearchBox() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

// Controlled: Parent truyền value + onChange
function ControlledSearchBox({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (q: string) => void;
}) {
  return <input value={query} onChange={e => onQueryChange(e.target.value)} />;
}

// Parent dùng ControlledSearchBox
function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <ControlledSearchBox query={searchQuery} onQueryChange={setSearchQuery} />
      <SearchResults query={searchQuery} />
    </div>
  );
}
```

💡 **Mẹo:** Trong thực tế, một component thường có sự kết hợp cả hai — một số state nội bộ (uncontrolled) và một số nhận từ props (controlled).

---

### 3.4 Bảo toàn và Reset State (Preserving and Resetting State)

#### React giữ state dựa vào vị trí trong UI Tree

React không "thấy" tên biến hay tên component — nó chỉ quan tâm đến **vị trí** của component trong cây render. Nếu cùng một component xuất hiện ở cùng vị trí trong cây, React sẽ **giữ nguyên state**.

```tsx
// Ví dụ: Cùng component Counter, cùng vị trí → state được giữ
function App() {
  const [isFancy, setIsFancy] = useState(false);

  return (
    <div>
      {/* Dù isFancy thay đổi, Counter vẫn ở cùng vị trí →
          state (count) KHÔNG bị reset! */}
      {isFancy ? (
        <Counter className="fancy" />
      ) : (
        <Counter className="normal" />
      )}
      <button onClick={() => setIsFancy(!isFancy)}>Đổi style</button>
    </div>
  );
}
```

⚠️ **Cảnh báo quan trọng:** Đây là lý do tại sao bạn **KHÔNG NÊN** định nghĩa component bên trong component khác:

```tsx
// ❌ TUYỆT ĐỐI KHÔNG LÀM THẾ NÀY
function App() {
  // MyInput được tạo mới mỗi lần App render
  // → React coi nó là component KHÁC mỗi lần → state bị mất!
  function MyInput() {
    const [text, setText] = useState('');
    return <input value={text} onChange={e => setText(e.target.value)} />;
  }

  return <MyInput />;
}

// ✅ Định nghĩa component ở ngoài
function MyInput() {
  const [text, setText] = useState('');
  return <input value={text} onChange={e => setText(e.target.value)} />;
}

function App() {
  return <MyInput />;
}
```

#### Dùng `key` để force reset state

Khi bạn muốn React **xóa sạch state** và tạo component mới, hãy dùng `key` khác nhau. Đây là kỹ thuật cực kỳ hữu ích trong thực tế.

```tsx
// Ví dụ thực tế: Chat app — đổi người chat
interface Contact {
  id: number;
  name: string;
}

function ChatApp() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);

  return (
    <div className="chat-app">
      <ContactList
        contacts={contacts}
        onSelect={setSelectedContact}
      />
      {/* KEY là selectedContact.id
          Khi đổi contact → key thay đổi → ChatBox mới hoàn toàn
          → ô input được xóa sạch, không còn tin nhắn cũ */}
      <ChatBox
        key={selectedContact.id}
        contact={selectedContact}
      />
    </div>
  );
}

function ChatBox({ contact }: { contact: Contact }) {
  const [message, setMessage] = useState('');

  return (
    <div>
      <h2>Chat với {contact.name}</h2>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder={`Nhắn tin cho ${contact.name}...`}
      />
      <button>Gửi cho {contact.name}</button>
    </div>
  );
}
```

💡 **Mẹo:** `key` không chỉ dùng trong danh sách (`map`). Bất cứ khi nào bạn muốn "tạo lại" một component từ đầu, hãy đổi `key` của nó.

---

### 3.5 Trích xuất Logic State với Reducers

#### Tại sao cần Reducer?

Khi component có nhiều state updates phân tán ở nhiều event handler, code trở nên khó theo dõi. **Reducer** giúp gom tất cả logic cập nhật state vào **một nơi duy nhất**.

Hãy tưởng tượng: thay vì mỗi nhân viên tự quyết định lương của mình (state updates phân tán), bạn có một phòng kế toán (reducer) xử lý tất cả yêu cầu (actions).

#### Chuyển từ useState sang useReducer (3 bước)

```tsx
// === TRƯỚC: dùng useState — logic phân tán ===
interface Task {
  id: number;
  text: string;
  done: boolean;
}

function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nextId, setNextId] = useState(0);

  // Logic phân tán ở 3 handler khác nhau
  function handleAddTask(text: string) {
    setTasks([...tasks, { id: nextId, text, done: false }]);
    setNextId(nextId + 1);
  }

  function handleToggleTask(taskId: number) {
    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, done: !t.done } : t
    ));
  }

  function handleDeleteTask(taskId: number) {
    setTasks(tasks.filter(t => t.id !== taskId));
  }

  // ... render
}

// === SAU: dùng useReducer — logic tập trung ===

// BƯỚC 1: Định nghĩa Action types
type TaskAction =
  | { type: 'added'; text: string }
  | { type: 'toggled'; taskId: number }
  | { type: 'deleted'; taskId: number };

// BƯỚC 2: Viết reducer function
// Reducer là pure function: nhận state cũ + action → trả về state mới
function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'added':
      return [...tasks, {
        id: Date.now(), // hoặc dùng counter
        text: action.text,
        done: false,
      }];
    case 'toggled':
      return tasks.map(t =>
        t.id === action.taskId ? { ...t, done: !t.done } : t
      );
    case 'deleted':
      return tasks.filter(t => t.id !== action.taskId);
    default:
      throw new Error('Action không hợp lệ');
  }
}

// BƯỚC 3: Dùng useReducer trong component
function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  function handleAddTask(text: string) {
    dispatch({ type: 'added', text }); // Gửi "yêu cầu" thay vì tự cập nhật
  }

  function handleToggleTask(taskId: number) {
    dispatch({ type: 'toggled', taskId });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({ type: 'deleted', taskId });
  }

  return (
    <div>
      <h1>Danh sách công việc ({tasks.length})</h1>
      <AddTaskForm onAdd={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
```

#### So sánh useState vs useReducer

| Tiêu chí | useState | useReducer |
|----------|---------|-----------|
| Độ phức tạp | Đơn giản, ít state | Nhiều state, logic phức tạp |
| Code size | Ít code ban đầu | Nhiều code hơn (action + reducer) |
| Debugging | Khó trace khi nhiều updates | Dễ — log mỗi action để xem flow |
| Testing | Test cả component | Test reducer riêng biệt (pure function) |
| Ưu tiên dùng khi | State đơn giản (toggle, input) | State phức tạp (form nhiều field, CRUD) |

#### Dùng Immer với Reducer (viết code gọn hơn)

```tsx
import { useImmerReducer } from 'use-immer';

// Với Immer, bạn có thể "mutate" trực tiếp — Immer lo phần immutable
function tasksReducerWithImmer(draft: Task[], action: TaskAction) {
  switch (action.type) {
    case 'added':
      // push trực tiếp! Immer sẽ tạo bản copy tự động
      draft.push({
        id: Date.now(),
        text: action.text,
        done: false,
      });
      break;
    case 'toggled':
      const task = draft.find(t => t.id === action.taskId);
      if (task) {
        task.done = !task.done; // Mutate trực tiếp!
      }
      break;
    case 'deleted':
      // Trả về giá trị mới (thay vì mutate) cũng được
      return draft.filter(t => t.id !== action.taskId);
  }
}

function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducerWithImmer, []);
  // ... dùng giống hệt useReducer
}
```

⚠️ **Lưu ý:** Reducer PHẢI là pure function — không gọi API, không tạo side effect, không dùng `Date.now()` bên trong (ngoại trừ khi dùng để tạo ID tạm — lý tưởng nên tạo ID ở bên ngoài trước khi dispatch).

---

### 3.6 Truyền Data sâu với Context

#### Vấn đề Prop Drilling

Khi dữ liệu cần đi qua nhiều tầng component mà các tầng trung gian không dùng đến, ta gọi là "prop drilling" — giống như chuyền một lá thư qua 10 người trung gian chỉ để đến người cuối cùng.

```tsx
// ❌ Prop drilling: level phải truyền qua nhiều tầng
function Page({ level }: { level: number }) {
  return <Section level={level}>
    <Heading level={level}>Tiêu đề</Heading>
  </Section>;
}

function Section({ level, children }: { level: number; children: React.ReactNode }) {
  return <div>
    {/* Section không dùng level, chỉ chuyền tiếp */}
    {children}
  </div>;
}
```

#### Giải pháp: Context

Context cho phép parent cung cấp dữ liệu cho **bất kỳ component con nào** trong cây, dù sâu bao nhiêu tầng.

```tsx
import { createContext, useContext } from 'react';

// BƯỚC 1: Tạo Context
const ThemeContext = createContext<'light' | 'dark'>('light');

// BƯỚC 2: Dùng Provider để cung cấp giá trị
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <ThemeContext.Provider value={theme}>
      <Header />
      <MainContent />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Đổi theme
      </button>
    </ThemeContext.Provider>
  );
}

// BƯỚC 3: Dùng useContext để đọc giá trị — ở BẤT KỲ ĐÂU
function ThemedButton() {
  const theme = useContext(ThemeContext); // Lấy giá trị gần nhất từ Provider

  return (
    <button className={theme === 'dark' ? 'btn-dark' : 'btn-light'}>
      Theme hiện tại: {theme}
    </button>
  );
}

// Component này ở sâu trong cây nhưng vẫn truy cập được theme
function DeepNestedComponent() {
  const theme = useContext(ThemeContext); // Không cần prop drilling!
  return <div className={`card-${theme}`}>Nội dung</div>;
}
```

#### Khi nào NÊN và KHÔNG NÊN dùng Context

✅ **Nên dùng:**
- Theme (dark/light mode)
- Thông tin user đăng nhập
- Ngôn ngữ / Locale
- Router (React Router dùng context)

❌ **Không nên dùng:**
- Thay thế hoàn toàn cho mọi props — props vẫn rõ ràng hơn cho data flow đơn giản
- Dữ liệu thay đổi rất thường xuyên (ví dụ: vị trí chuột) — gây re-render toàn bộ tree
- Khi chỉ cần truyền qua 1-2 tầng — quá mức cần thiết

💡 **Trước khi dùng Context, hãy thử:**
1. Truyền props — đơn giản nhất
2. Dùng `children` pattern — tránh prop drilling mà không cần context
3. Nếu vẫn phức tạp → Context

---

### 3.7 Scale Up với Reducer + Context

Đây là pattern mạnh mẽ nhất để quản lý state phức tạp: **Reducer** quản lý logic, **Context** phân phối data đến mọi nơi.

#### Ví dụ hoàn chỉnh: TaskApp

```tsx
// ===== taskContext.tsx =====
import { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
interface Task {
  id: number;
  text: string;
  done: boolean;
}

type TaskAction =
  | { type: 'added'; text: string }
  | { type: 'toggled'; id: number }
  | { type: 'deleted'; id: number }
  | { type: 'edited'; id: number; text: string };

// Tạo 2 context riêng biệt:
// - TasksContext cho dữ liệu (tasks)
// - TasksDispatchContext cho hàm dispatch
const TasksContext = createContext<Task[]>([]);
const TasksDispatchContext = createContext<React.Dispatch<TaskAction>>(() => {});

// Custom hooks — giao diện sạch cho các component con
export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

// Reducer
let nextId = 0;
function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'added':
      return [...tasks, { id: nextId++, text: action.text, done: false }];
    case 'toggled':
      return tasks.map(t => t.id === action.id ? { ...t, done: !t.done } : t);
    case 'deleted':
      return tasks.filter(t => t.id !== action.id);
    case 'edited':
      return tasks.map(t => t.id === action.id ? { ...t, text: action.text } : t);
    default:
      throw new Error('Unknown action');
  }
}

// Custom Provider — gói gọn tất cả logic
export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

// ===== AddTaskForm.tsx =====
import { useState } from 'react';
import { useTasksDispatch } from './taskContext';

export function AddTaskForm() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch(); // Chỉ cần dispatch, không cần tasks

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: 'added', text });
    setText('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Thêm công việc..."
      />
      <button type="submit">➕ Thêm</button>
    </form>
  );
}

// ===== TaskList.tsx =====
import { useTasks, useTasksDispatch } from './taskContext';

export function TaskList() {
  const tasks = useTasks(); // Đọc tasks từ context
  const dispatch = useTasksDispatch();

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => dispatch({ type: 'toggled', id: task.id })}
            />
            <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
              {task.text}
            </span>
          </label>
          <button onClick={() => dispatch({ type: 'deleted', id: task.id })}>
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}

// ===== App.tsx =====
import { TasksProvider } from './taskContext';
import { AddTaskForm } from './AddTaskForm';
import { TaskList } from './TaskList';

export default function App() {
  return (
    <TasksProvider>
      <h1>📋 Quản lý công việc</h1>
      <AddTaskForm />
      <TaskList />
    </TasksProvider>
  );
}
```

💡 **Tại sao tách thành 2 Context (`TasksContext` và `TasksDispatchContext`)?**
- Component chỉ cần đọc tasks (ví dụ: hiển thị số lượng) → dùng `useTasks()` → không re-render khi dispatch thay đổi
- Component chỉ cần dispatch (ví dụ: form thêm task) → dùng `useTasksDispatch()` → không re-render khi tasks thay đổi
- Tối ưu performance!

---

## PHẦN 4: ESCAPE HATCHES (Các Lối Thoát)

Đôi khi bạn cần "thoát ra" khỏi mô hình React thuần túy để tương tác với thế giới bên ngoài: DOM, API, browser API, thư viện bên thứ ba. React cung cấp các "lối thoát" (escape hatches) cho những trường hợp này.

---

### 4.1 Tham chiếu giá trị với Refs

#### useRef Hook

`useRef` tạo ra một "hộp" có thể chứa bất kỳ giá trị nào, và giá trị này **được giữ lại giữa các lần render** nhưng **KHÔNG gây re-render** khi thay đổi.

```tsx
import { useRef, useState } from 'react';

// Ví dụ: Đồng hồ bấm giờ (Stopwatch)
function Stopwatch() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  // Ref để lưu interval ID — không cần re-render khi thay đổi
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    // Xóa interval cũ nếu có
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Lưu interval ID vào ref
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <div>
      <h1>⏱️ {secondsPassed.toFixed(3)} giây</h1>
      <button onClick={handleStart}>Bắt đầu</button>
      <button onClick={handleStop}>Dừng</button>
    </div>
  );
}
```

#### Ref vs State — Khi nào dùng cái nào?

| Đặc điểm | `useRef` | `useState` |
|-----------|---------|-----------|
| Trigger re-render | ❌ Không | ✅ Có |
| Mutable | ✅ Thay đổi `.current` bất cứ lúc nào | ❌ Phải dùng setter function |
| Đọc trong render | ⚠️ Không nên (giá trị có thể stale) | ✅ Luôn an toàn |
| Dùng cho | Timer ID, DOM node, giá trị previous | Dữ liệu hiển thị trên UI |

```tsx
// Ví dụ: Đếm số lần render (dùng ref vì KHÔNG muốn gây thêm render)
function RenderCounter() {
  const renderCount = useRef(0);
  renderCount.current += 1; // Tăng mỗi lần render, nhưng KHÔNG gây re-render

  return <p>Component này đã render {renderCount.current} lần</p>;
}
```

⚠️ **Cảnh báo:** Đừng đọc hoặc ghi `ref.current` trong quá trình render (ngoại trừ lần khởi tạo). Điều này làm component trở nên khó đoán.

```tsx
// ❌ Đừng làm thế này
function Bad() {
  const ref = useRef(0);
  ref.current += 1; // Ghi ref trong render — khó đoán!
  return <div>{ref.current}</div>; // Đọc ref trong render — có thể stale!
}
```

---

### 4.2 Thao tác DOM với Refs

#### Truy cập DOM node

Đây là use case phổ biến nhất của ref — lấy tham chiếu đến phần tử DOM thực tế.

```tsx
import { useRef } from 'react';

function SearchPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    // Truy cập DOM node thực tế và gọi method trên nó
    inputRef.current?.focus();
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Tìm kiếm..." />
      <button onClick={handleClick}>🔍 Focus vào ô tìm kiếm</button>
    </div>
  );
}

// Ví dụ: Cuộn đến phần tử cụ thể
function ImageGallery() {
  const selectedRef = useRef<HTMLLIElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = ['cat.jpg', 'dog.jpg', 'bird.jpg', 'fish.jpg'];

  function handleNext() {
    const nextIndex = (selectedIndex + 1) % images.length;
    setSelectedIndex(nextIndex);

    // Cuộn phần tử được chọn vào tầm nhìn
    // Phải dùng flushSync nếu muốn cuộn NGAY sau khi state thay đổi
  }

  return (
    <div>
      <button onClick={handleNext}>Ảnh tiếp theo →</button>
      <ul style={{ display: 'flex', gap: '10px', overflow: 'auto' }}>
        {images.map((img, i) => (
          <li
            key={img}
            ref={i === selectedIndex ? selectedRef : null}
            style={{
              border: i === selectedIndex ? '3px solid blue' : '1px solid gray',
              padding: '5px',
            }}
          >
            <img src={`/images/${img}`} alt={img} width={100} />
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### flushSync — Đồng bộ hóa DOM ngay lập tức

```tsx
import { flushSync } from 'react-dom';

function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  function handleAdd(text: string) {
    // flushSync buộc React cập nhật DOM NGAY tại đây
    flushSync(() => {
      setTodos([...todos, text]);
    });

    // Bây giờ DOM đã được cập nhật → cuộn xuống cuối
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <ul ref={listRef}>
      {todos.map((todo, i) => <li key={i}>{todo}</li>)}
    </ul>
  );
}
```

#### Forwarding ref đến component con

React component mặc định **không** expose DOM node ra ngoài. Bạn phải dùng `ref` prop forwarding (React 19+) hoặc `forwardRef` (React 18 trở về).

```tsx
// React 19+: Dùng ref như một prop bình thường
function MyInput({ ref, ...props }: { ref?: React.Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />;
}

// React 18 trở về: Dùng forwardRef
const MyInputLegacy = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function MyInput(props, ref) {
    return <input ref={ref} {...props} />;
  }
);

// Sử dụng
function Form() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <MyInput ref={inputRef} placeholder="Nhập tên..." />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </div>
  );
}
```

💡 **Mẹo:** Nếu bạn muốn hạn chế component con chỉ expose một số method, dùng `useImperativeHandle`:

```tsx
import { useRef, useImperativeHandle } from 'react';

interface InputHandle {
  focus: () => void;
  scrollIntoView: () => void;
}

function MyInput({ ref }: { ref: React.Ref<InputHandle> }) {
  const realInputRef = useRef<HTMLInputElement>(null);

  // Chỉ expose focus và scrollIntoView, KHÔNG expose toàn bộ DOM node
  useImperativeHandle(ref, () => ({
    focus() {
      realInputRef.current?.focus();
    },
    scrollIntoView() {
      realInputRef.current?.scrollIntoView();
    },
  }));

  return <input ref={realInputRef} />;
}
```

---

### 4.3 Đồng bộ hóa với Effects

#### useEffect là gì?

Effect cho phép bạn **đồng bộ hóa** component với hệ thống bên ngoài (API, DOM, WebSocket, timer...). Nó chạy **SAU** khi React đã render và cập nhật DOM.

Hãy tưởng tượng: render là "vẽ tranh", còn Effect là "treo tranh lên tường" — bạn phải vẽ xong trước đã.

#### Effect vs Event Handler

| Effect | Event Handler |
|--------|--------------|
| Chạy vì component render | Chạy vì user tương tác |
| "Đồng bộ hóa" với thứ bên ngoài | "Phản hồi" hành động user |
| Ví dụ: kết nối chat server | Ví dụ: gửi tin nhắn |

#### Dependency Array — 3 trường hợp

```tsx
// 1. Không có dependency array → chạy SAU MỖI lần render
useEffect(() => {
  console.log('Chạy sau mỗi render');
});

// 2. Mảng rỗng [] → chỉ chạy SAU lần render ĐẦU TIÊN (mount)
useEffect(() => {
  console.log('Chỉ chạy 1 lần khi mount');
}, []);

// 3. Có dependencies → chạy khi BẤT KỲ dependency nào thay đổi
useEffect(() => {
  console.log(`roomId thay đổi thành: ${roomId}`);
}, [roomId]); // Chạy khi roomId thay đổi
```

#### Ví dụ: Kết nối Chat Server

```tsx
function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Setup: kết nối đến phòng chat
    const connection = createConnection(roomId);
    connection.connect();

    connection.on('message', (msg: string) => {
      setMessages(prev => [...prev, msg]);
    });

    // Cleanup: ngắt kết nối khi roomId thay đổi hoặc component unmount
    return () => {
      connection.disconnect();
    };
  }, [roomId]); // Effect phụ thuộc vào roomId

  return (
    <div>
      <h2>Phòng: {roomId}</h2>
      {messages.map((msg, i) => <p key={i}>{msg}</p>)}
    </div>
  );
}
```

#### Ví dụ: Fetch Data

```tsx
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false; // Flag để tránh race condition

    setLoading(true);
    setError(null);

    fetchUser(userId)
      .then(data => {
        if (!isCancelled) { // Chỉ cập nhật state nếu Effect chưa bị cleanup
          setUser(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!isCancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    // Cleanup: hủy request nếu userId thay đổi trước khi request hoàn thành
    return () => {
      isCancelled = true;
    };
  }, [userId]);

  if (loading) return <div>⏳ Đang tải...</div>;
  if (error) return <div>❌ Lỗi: {error}</div>;
  return <div>👤 {user?.name}</div>;
}
```

⚠️ **Lỗi phổ biến:** Quên cleanup function → gây memory leak hoặc race condition.

⚠️ **Strict Mode:** Trong development, React cố ý chạy Effect 2 lần (mount → unmount → mount) để giúp bạn phát hiện bug do thiếu cleanup.

---

### 4.4 Bạn có thể KHÔNG cần Effect

Đây là phần **cực kỳ quan trọng**. Nhiều developer lạm dụng `useEffect`, tạo ra code rối rắm và nhiều bug. Hãy kiểm tra xem bạn có thực sự cần Effect không.

#### ❌ KHÔNG cần Effect: Tính toán từ state/props hiện có

```tsx
// ❌ Dùng Effect để tính giá trị phái sinh — THỪA và chậm
function FilteredList({ items, query }: { items: Item[]; query: string }) {
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  useEffect(() => {
    setFilteredItems(items.filter(item => item.name.includes(query)));
  }, [items, query]);
  // Vấn đề: render 2 lần! Lần 1 với state cũ, lần 2 sau Effect.

  // ✅ Tính trực tiếp trong render — nhanh hơn, đúng hơn
  const filteredItems2 = items.filter(item => item.name.includes(query));

  // ✅ Nếu tính toán nặng → dùng useMemo
  const expensiveFiltered = useMemo(
    () => items.filter(item => heavyComputation(item, query)),
    [items, query] // Chỉ tính lại khi items hoặc query thay đổi
  );

  return <ul>{expensiveFiltered.map(/* ... */)}</ul>;
}
```

#### ❌ KHÔNG cần Effect: Reset state khi props thay đổi

```tsx
// ❌ Reset state bằng Effect
function ProfilePage({ userId }: { userId: string }) {
  const [comment, setComment] = useState('');

  useEffect(() => {
    setComment(''); // Reset comment khi userId thay đổi
  }, [userId]);
  // Vấn đề: flash nội dung cũ trước khi reset

  // ✅ Dùng key để React tạo component mới hoàn toàn
  return <Profile userId={userId} key={userId} />;
}
```

#### ❌ KHÔNG cần Effect: Xử lý user event

```tsx
// ❌ Gửi request trong Effect dựa trên state "flag"
function Form() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      sendToAPI(formData); // Khó theo dõi flow, dễ gửi trùng
    }
  }, [submitted]);

  // ✅ Gửi trực tiếp trong event handler — rõ ràng hơn nhiều
  function handleSubmit() {
    sendToAPI(formData);
  }
}
```

#### ❌ KHÔNG cần Effect: Khởi tạo app

```tsx
// ❌ Khởi tạo bên trong Effect
function App() {
  useEffect(() => {
    initializeAnalytics(); // Chạy 2 lần trong Strict Mode!
  }, []);
}

// ✅ Chạy 1 lần ngoài component
let didInit = false;
function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      initializeAnalytics();
    }
  }, []);
}

// ✅ Hoặc tốt hơn: chạy ở top-level module
if (typeof window !== 'undefined') {
  initializeAnalytics(); // Chỉ chạy 1 lần khi module được import
}
```

💡 **Quy tắc vàng:** Nếu bạn có thể tính toán giá trị từ props/state hiện có → không cần Effect. Nếu bạn đang phản hồi user event → dùng event handler, không phải Effect.

---

### 4.5 Lifecycle của Reactive Effects

#### Effect lifecycle ≠ Component lifecycle

Đừng nghĩ Effect theo lifecycle của component (mount/update/unmount). Hãy nghĩ mỗi Effect là một **chu kỳ đồng bộ hóa** (synchronization cycle) độc lập:

```
Bắt đầu đồng bộ (setup) → ... → Dừng đồng bộ (cleanup) → Bắt đầu đồng bộ lại (setup) → ...
```

```tsx
// Effect này có lifecycle RIÊNG, không gắn với component
useEffect(() => {
  // ▶️ Bắt đầu đồng bộ: kết nối đến roomId
  const connection = createConnection(roomId);
  connection.connect();

  return () => {
    // ⏹️ Dừng đồng bộ: ngắt kết nối
    connection.disconnect();
  };
}, [roomId]);

// Khi roomId thay đổi:
// 1. Cleanup: disconnect khỏi room CŨ
// 2. Setup: connect đến room MỚI
// → Mỗi lần là một "chu kỳ đồng bộ" riêng biệt
```

#### React Lint Rules cho Dependencies

React ESLint plugin (`react-hooks/exhaustive-deps`) kiểm tra dependencies. Mọi "reactive value" (props, state, biến được tính từ chúng) mà Effect sử dụng **phải** có trong dependency array.

```tsx
// ❌ Lint sẽ cảnh báo: thiếu dependency
function ChatRoom({ roomId }: { roomId: string }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const conn = createConnection(serverUrl, roomId);
    conn.connect();
    return () => conn.disconnect();
  }, [roomId]); // ⚠️ Thiếu serverUrl! Khi serverUrl thay đổi, Effect không chạy lại

  // ✅ Đúng: khai báo đầy đủ dependencies
  useEffect(() => {
    const conn = createConnection(serverUrl, roomId);
    conn.connect();
    return () => conn.disconnect();
  }, [serverUrl, roomId]); // Effect chạy lại khi bất kỳ giá trị nào thay đổi
}
```

⚠️ **ĐỪNG BAO GIỜ** tắt lint rule `react-hooks/exhaustive-deps`. Nếu lint cảnh báo, đó là vì code của bạn có bug tiềm ẩn. Hãy sửa code, không phải tắt lint.

---

### 4.6 Tách Event ra khỏi Effects

#### Vấn đề: Logic thuộc Event nhưng nằm trong Effect

Đôi khi trong một Effect, bạn có một đoạn code **không nên** là reactive (không nên chạy lại khi dependency thay đổi):

```tsx
function ChatRoom({ roomId }: { roomId: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const conn = createConnection(roomId);
    conn.on('connected', () => {
      // Hiển thị notification với theme HIỆN TẠI
      showNotification(`Đã kết nối đến ${roomId}!`, theme);
    });
    conn.connect();
    return () => conn.disconnect();
  }, [roomId, theme]); // ⚠️ Mỗi khi đổi theme → disconnect rồi connect lại! Sai logic!
}
```

#### useEffectEvent (Experimental)

`useEffectEvent` cho phép bạn trích xuất logic non-reactive ra khỏi Effect:

```tsx
import { useEffectEvent } from 'react';

function ChatRoom({ roomId }: { roomId: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Event function: luôn đọc giá trị mới nhất, nhưng KHÔNG phải dependency
  const onConnected = useEffectEvent(() => {
    showNotification(`Đã kết nối đến ${roomId}!`, theme);
  });

  useEffect(() => {
    const conn = createConnection(roomId);
    conn.on('connected', () => {
      onConnected(); // Gọi Event function — không cần thêm theme vào deps
    });
    conn.connect();
    return () => conn.disconnect();
  }, [roomId]); // ✅ Chỉ reconnect khi roomId thay đổi, không phải khi theme thay đổi
}
```

⚠️ **Lưu ý:** `useEffectEvent` vẫn là API thử nghiệm (experimental) tính đến React 19. Trong thực tế hiện tại, bạn có thể dùng ref để đạt hiệu ứng tương tự:

```tsx
// Workaround khi chưa có useEffectEvent
function ChatRoom({ roomId }: { roomId: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const themeRef = useRef(theme);
  themeRef.current = theme; // Luôn cập nhật ref

  useEffect(() => {
    const conn = createConnection(roomId);
    conn.on('connected', () => {
      showNotification(`Đã kết nối!`, themeRef.current); // Đọc từ ref
    });
    conn.connect();
    return () => conn.disconnect();
  }, [roomId]); // Không cần theme trong deps
}
```

---

### 4.7 Loại bỏ Dependencies của Effect

Khi lint cảnh báo về dependency, **đừng tắt lint** — hãy sửa code. Dưới đây là các cách đúng:

#### 1. Di chuyển object/function ra ngoài component

```tsx
// ❌ Object tạo mới mỗi render → Effect chạy vô hạn!
function ChatRoom() {
  const options = { serverUrl: 'https://localhost:1234', roomId: 'general' };

  useEffect(() => {
    const conn = createConnection(options);
    conn.connect();
    return () => conn.disconnect();
  }, [options]); // options mới mỗi render → infinite loop!

  // ✅ Giải pháp 1: Di chuyển ra ngoài component (nếu không phụ thuộc props/state)
}

// Object nằm ngoài component → không bao giờ thay đổi
const options = { serverUrl: 'https://localhost:1234', roomId: 'general' };

function ChatRoom() {
  useEffect(() => {
    const conn = createConnection(options);
    conn.connect();
    return () => conn.disconnect();
  }, []); // ✅ Không cần dependency
}
```

#### 2. Di chuyển object/function vào bên trong Effect

```tsx
// ✅ Giải pháp 2: Tạo object bên trong Effect
function ChatRoom({ roomId }: { roomId: string }) {
  useEffect(() => {
    // Object tạo bên trong Effect → không phải dependency
    const options = { serverUrl: 'https://localhost:1234', roomId };
    const conn = createConnection(options);
    conn.connect();
    return () => conn.disconnect();
  }, [roomId]); // ✅ Chỉ phụ thuộc vào primitive value
}
```

#### 3. Dùng useCallback cho functions

```tsx
// ❌ Function tạo mới mỗi render
function SearchResults({ query }: { query: string }) {
  function fetchResults() {
    return fetch(`/api/search?q=${query}`);
  }

  useEffect(() => {
    fetchResults().then(/* ... */);
  }, [fetchResults]); // fetchResults mới mỗi render!

  // ✅ Dùng useCallback để memo hóa function
  const fetchResults = useCallback(() => {
    return fetch(`/api/search?q=${query}`);
  }, [query]); // fetchResults chỉ thay đổi khi query thay đổi

  useEffect(() => {
    fetchResults().then(/* ... */);
  }, [fetchResults]); // ✅ OK

  // ✅ Hoặc tốt hơn: di chuyển fetch vào bên trong Effect
  useEffect(() => {
    fetch(`/api/search?q=${query}`).then(/* ... */);
  }, [query]);
}
```

#### 4. Đọc primitive values thay vì objects

```tsx
// ❌ Object dependency → reference thay đổi mỗi render
function MapComponent({ location }: { location: { lat: number; lng: number } }) {
  useEffect(() => {
    map.panTo(location);
  }, [location]); // location là object mới mỗi lần parent render!

  // ✅ Destructure ra primitive values
  const { lat, lng } = location;
  useEffect(() => {
    map.panTo({ lat, lng });
  }, [lat, lng]); // Primitive values → so sánh bằng giá trị, ổn định
}
```

💡 **Quy tắc:** Ưu tiên dùng primitive values (string, number, boolean) làm dependencies. Tránh objects và functions.

---

### 4.8 Tái sử dụng Logic với Custom Hooks

#### Custom Hook là gì?

Custom Hook là một function bắt đầu bằng `use` và có thể gọi các Hook khác bên trong. Nó giúp bạn trích xuất logic stateful để tái sử dụng giữa nhiều component.

Hãy tưởng tượng: thay vì copy-paste cùng một đoạn code vào 10 component, bạn gói nó thành một "công cụ" (custom hook) mà ai cũng có thể dùng.

#### Ví dụ 1: useOnlineStatus

```tsx
import { useState, useEffect } from 'react';

// Custom hook: theo dõi trạng thái mạng
function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function handleOnline() { setIsOnline(true); }
    function handleOffline() { setIsOnline(false); }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Sử dụng ở bất kỳ đâu
function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '🟢 Online' : '🔴 Offline'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();
  return (
    <button disabled={!isOnline}>
      {isOnline ? '💾 Lưu' : '⏳ Đang chờ kết nối...'}
    </button>
  );
}
```

#### Ví dụ 2: useFormInput

```tsx
// Custom hook: quản lý một input field
function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function reset() {
    setValue(initialValue);
  }

  // Trả về object với props cho input + helper functions
  return {
    value,
    onChange: handleChange,
    reset,
    // Spread-friendly: có thể dùng {...inputProps} trên <input>
  };
}

// Sử dụng: mỗi input có state riêng biệt
function SignupForm() {
  const nameInput = useFormInput('');
  const emailInput = useFormInput('');
  const passwordInput = useFormInput('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Spread props trực tiếp! */}
      <input {...nameInput} placeholder="Tên" />
      <input {...emailInput} placeholder="Email" type="email" />
      <input {...passwordInput} placeholder="Mật khẩu" type="password" />
      <button type="submit">Đăng ký</button>
      <button type="button" onClick={() => {
        nameInput.reset();
        emailInput.reset();
        passwordInput.reset();
      }}>
        Xóa form
      </button>
    </form>
  );
}
```

#### Ví dụ 3: useWindowSize

```tsx
interface WindowSize {
  width: number;
  height: number;
}

function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Sử dụng
function ResponsiveLayout() {
  const { width } = useWindowSize();

  if (width < 768) {
    return <MobileLayout />;
  }
  return <DesktopLayout />;
}
```

#### Ví dụ 4: useLocalStorage — Đồng bộ state với localStorage

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  // Khởi tạo state từ localStorage (nếu có) hoặc giá trị mặc định
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Ghi vào localStorage mỗi khi value thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Lỗi ghi localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

// Sử dụng: state tự động lưu/đọc từ localStorage
function Settings() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const [fontSize, setFontSize] = useLocalStorage<number>('fontSize', 16);

  return (
    <div>
      <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')}>
        <option value="light">Sáng</option>
        <option value="dark">Tối</option>
      </select>
      <input
        type="range"
        min={12}
        max={24}
        value={fontSize}
        onChange={e => setFontSize(Number(e.target.value))}
      />
      <p>Cỡ chữ: {fontSize}px</p>
    </div>
  );
}
```

#### Quy tắc đặt tên và Rules of Hooks

1. **Tên phải bắt đầu bằng `use`** — `useOnlineStatus`, `useFormInput`, KHÔNG phải `getOnlineStatus`
2. **Chỉ gọi Hook ở top level** — KHÔNG gọi trong if, loop, hoặc function lồng nhau
3. **Chỉ gọi Hook trong React function** — component hoặc custom hook khác

```tsx
// ❌ Vi phạm Rules of Hooks
function Bad() {
  if (someCondition) {
    const [x, setX] = useState(0); // ❌ Hook trong if
  }

  for (let i = 0; i < 5; i++) {
    useEffect(() => {}); // ❌ Hook trong loop
  }
}

// ✅ Đúng cách
function Good() {
  const [x, setX] = useState(0); // ✅ Top level

  useEffect(() => {
    if (someCondition) {
      // Logic điều kiện bên TRONG hook, không phải ngược lại
    }
  }, [someCondition]);
}
```

#### Khi nào nên tạo Custom Hook?

✅ **Nên tạo khi:**
- Cùng logic xuất hiện ở ≥ 2 component
- Logic phức tạp che khuất mục đích chính của component
- Muốn đơn giản hóa API cho team (giấu complexity)

❌ **Không nên tạo khi:**
- Logic chỉ dùng 1 lần và đơn giản
- Hook chỉ là wrapper mỏng quanh một useState/useEffect (không thêm giá trị)

💡 **Mẹo:** Custom Hook nên tập trung vào **một mục đích cụ thể**. Nếu hook của bạn có quá nhiều parameters hoặc return values, hãy xem xét tách nhỏ.

```tsx
// ❌ Hook "bao la" — làm quá nhiều thứ
function useEverything(userId, roomId, theme) { /* ... */ }

// ✅ Tách nhỏ, mỗi hook một trách nhiệm
function useUser(userId) { /* ... */ }
function useChatRoom(roomId) { /* ... */ }
function useTheme() { /* ... */ }
```

---

> **Tổng kết Phần 3 & 4:** Quản lý state hiệu quả là nền tảng của mọi ứng dụng React. Hãy bắt đầu với `useState` cho state đơn giản, nâng cấp lên `useReducer` khi logic phức tạp, kết hợp `Context` khi cần chia sẻ rộng, và sử dụng các Escape Hatches (refs, effects, custom hooks) một cách có chọn lọc. Luôn nhớ: **code đơn giản nhất mà giải quyết được vấn đề = code tốt nhất**.

---

# PHẦN 5: CHUYÊN ĐỀ REACT HOOKS TOÀN DIỆN & NGHỆ THUẬT TẠO CUSTOM HOOKS (REACT 16.8 – REACT 19)

---

### 5.1 Bản chất cốt lõi của React Hooks (Under The Hood)

#### 1. Tại sao React Hooks ra đời?
Trước phiên bản **React 16.8 (2019)**, lập trình viên React bị phân tách làm 2 thế giới:
- **Functional Components**: Chỉ dùng để render UI tĩnh (Stateless/Presentational Components). Không thể lưu state, không có vòng đời.
- **Class Components**: Bắt buộc phải dùng nếu muốn có `state` hoặc vòng đời (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`).

Class Component bộc lộ 3 nhược điểm chí mạng:
1. **Khó tái sử dụng Stateful Logic**: Để chia sẻ logic giữa các component, lập trình viên phải dùng kỹ thuật **Higher-Order Components (HOC)** hoặc **Render Props**, tạo nên cây DOM lồng nhau khủng khiếp gọi là *"Wrapper Hell"* (lồng 5-7 tầng div/component bao bọc).
2. **Logic bị xé vụn theo Lifecycles**: Một tác vụ (ví dụ: đăng ký và hủy WebSocket) bị chia cắt ra 2 nơi: `componentDidMount` (kết nối) và `componentWillUnmount` (hủy). Ngược lại, một lifecycle lại chứa nhiều tác vụ không liên quan đến nhau.
3. **Sự phức tạp của con trỏ `this`**: Lập trình viên liên tục gặp lỗi quên bind `this` trong constructor hoặc phải dùng arrow functions.

$\rightarrow$ **React Hooks ra đời**: Cho phép bạn sử dụng state và các tính năng khác của React bên trong Functional Components mà **không cần viết Class**.

---

#### 2. Cơ chế lưu trữ bên dưới nền tảng (Under the hood)
Làm thế nào React biết được state nào thuộc về lời gọi `useState` nào khi component chỉ là một function chạy từ trên xuống dưới?

* **Câu trả lời:** React không dùng phép thuật hay map key-value, mà sử dụng **Danh Sách Liên Kết Đơn (Singly Linked List)** đính kèm trực tiếp vào Fiber Node của Component (`fiber.memoizedState`).

```
Fiber Node (Component Instance)
  │
  └── memoizedState ──► [ Hook 1 (useState) ]
                               │
                               ▼ next
                        [ Hook 2 (useEffect) ]
                               │
                               ▼ next
                        [ Hook 3 (useRef) ] ──► next: null
```

Mỗi lần component render, React duyệt qua danh sách liên kết theo đúng **thứ tự xuất hiện**:
```javascript
// Mô phỏng tư duy của React Hook Runner:
let currentHook = fiber.memoizedState;

function useState(initialValue) {
  let hook = currentHook;
  currentHook = currentHook.next; // Di chuyển con trỏ sang hook kế tiếp
  return [hook.state, hook.queue];
}
```

> [!CAUTION]
> #### Tại sao có "Rules of Hooks" (Chỉ gọi ở Top-Level)?
> Nếu bạn đặt Hook bên trong một câu lệnh điều kiện `if (isLoggedIn)` hoặc vòng lặp `for`:
> - Lần render 1 (`isLoggedIn = true`): Có 3 hooks `[Hook 1, Hook 2, Hook 3]`.
> - Lần render 2 (`isLoggedIn = false`): Bỏ qua Hook 1 $\rightarrow$ Con trỏ `next` bị lệch vị trí! React sẽ gán nhầm state của `Hook 2` vào biến của `Hook 1`. Toàn bộ dữ liệu của component sẽ bị đảo lộn và crash!
> 
> $\rightarrow$ **2 Quy tắc bất khả xâm phạm:**
> 1. **Chỉ gọi Hook ở cấp ngoài cùng (Top Level)** — Không nằm trong `if`, vòng lặp `for/while`, hay hàm con.
> 2. **Chỉ gọi Hook từ React Function** — Từ Function Component hoặc từ một Custom Hook khác (bắt đầu bằng `use`).

---

### 5.2 Bảng phân loại & So sánh toàn diện 16 Hooks chuẩn trong React

Dưới đây là bảng tổng hợp tất cả các hooks chính thức từ **React 16.8, React 18** cho đến **React 19**:

| Tên Hook | Nhóm | Phiên bản | Mục đích & Use-case chính | Kích hoạt Re-render? |
| :--- | :--- | :--- | :--- | :---: |
| **`useState`** | State | 16.8+ | Lưu trữ giá trị trạng thái cơ bản của component. | **Có** (khi giá trị thay đổi) |
| **`useReducer`** | State | 16.8+ | Quản lý state phức tạp theo mô hình Redux (State + Action $\rightarrow$ New State). | **Có** (khi dispatch action) |
| **`useActionState`** | State / Form | **19+** | Quản lý state của Form Action (pending, data, error) tự động. | **Có** |
| **`useContext`** | Context | 16.8+ | Đọc dữ liệu từ React Context Provider mà không cần prop drilling. | **Có** (khi Provider đổi value) |
| **`use`** | Data Reading | **19+** | Đọc giá trị của Promise hoặc Context. Có thể gọi bên trong `if` và vòng lặp. | **Có** (tùy thuộc vào Promise/Context) |
| **`useRef`** | Ref | 16.8+ | Lưu trữ giá trị có thể biến đổi không gây re-render hoặc truy cập DOM trực tiếp. | **Không** |
| **`useImperativeHandle`** | Ref | 16.8+ | Tùy biến các hàm/thuộc tính mà component con expose cho component cha thông qua `ref`. | **Không** |
| **`useEffect`** | Effect | 16.8+ | Đồng bộ hóa với hệ thống ngoại vi (API, timer, DOM event) **sau khi** trình duyệt đã vẽ UI (Asynchronous). | **Không trực tiếp** (chỉ re-render nếu gọi setState bên trong) |
| **`useLayoutEffect`** | Effect | 16.8+ | Chạy đồng bộ (Synchronous) **ngay sau khi DOM thay đổi nhưng trước khi** trình duyệt vẽ lên màn hình. Dùng đo kích thước layout. | **Không trực tiếp** |
| **`useInsertionEffect`** | Effect | **18+** | Chạy trước khi DOM bị can thiệp. Dành riêng cho các thư viện CSS-in-JS chèn thẻ `<style>`. | **Không** |
| **`useMemo`** | Performance | 16.8+ | Ghi nhớ (cache) kết quả tính toán tốn kém, chỉ tính lại khi dependencies thay đổi. | **Không** |
| **`useCallback`** | Performance | 16.8+ | Ghi nhớ (cache) định nghĩa hàm (function reference) giữa các lần render. | **Không** |
| **`useTransition`** | Concurrent | **18+** | Đánh dấu một cập nhật state là "độ ưu tiên thấp" (Transition), không làm nghẽn UI nhập liệu. | **Có** (cung cấp cờ `isPending`) |
| **`useDeferredValue`** | Concurrent | **18+** | Trì hoãn việc cập nhật một giá trị phụ thuộc để nhường quyền xử lý cho các tác vụ khẩn cấp. | **Có** (render lại với giá trị mới sau) |
| **`useId`** | Accessibility | **18+** | Sinh ID duy nhất và ổn định giữa Server và Client, tránh lỗi Hydration Mismatch. | **Không** |
| **`useSyncExternalStore`** | Integration | **18+** | Lắng nghe (subscribe) các store dữ liệu bên ngoài React (Redux, Zustand, `window.navigator.onLine`) mà không bị tearing. | **Có** (khi external store phát sinh update) |
| **`useOptimistic`** | Form / UI | **19+** | Cập nhật giao diện lập tức (lạc quan) trong khi chờ server xử lý hoàn tất. | **Có** |
| **`useFormStatus`** | Form | **19+** | Lấy trạng thái submit của thẻ `<form>` cha gần nhất (`pending`, `data`, `method`). | **Có** |

---

### 5.3 Mổ xẻ chi tiết từng nhóm Hooks & Code minh họa chuyên sâu

#### 5.3.1. Nhóm State: `useState` vs `useReducer` vs `useActionState`

* **`useState`**: Phù hợp với primitive data (string, number, boolean) hoặc state độc lập đơn giản.
* **`useReducer`**: Phù hợp khi state là object phức tạp nhiều tầng, hoặc giá trị của state tiếp theo phụ thuộc vào trạng thái trước đó thông qua các hành động rõ ràng (`FETCH_START`, `FETCH_SUCCESS`, `FETCH_ERROR`).

```tsx
// useReducer: Mô hình Finite State Machine rõ ràng
type State = { status: 'idle' | 'loading' | 'success' | 'error'; data?: string[] };
type Action = { type: 'FETCH' } | { type: 'RESOLVE'; payload: string[] } | { type: 'REJECT' };

function fetchReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH': return { status: 'loading' };
    case 'RESOLVE': return { status: 'success', data: action.payload };
    case 'REJECT': return { status: 'error' };
    default: return state;
  }
}

function DataList() {
  const [state, dispatch] = useReducer(fetchReducer, { status: 'idle' });
  // dispatch({ type: 'FETCH' });
}
```

* **`useActionState` (React 19)**: Tự động quản lý vòng đời submit form:
```tsx
import { useActionState } from 'react';

async function updateUsernameAction(previousState: any, formData: FormData) {
  const newName = formData.get('username') as string;
  const res = await apiUpdateName(newName);
  return { success: true, name: res.name };
}

function ProfileForm() {
  const [state, formAction, isPending] = useActionState(updateUsernameAction, { success: false, name: '' });

  return (
    <form action={formAction}>
      <input name="username" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Đang lưu...' : 'Lưu tên'}
      </button>
    </form>
  );
}
```

---

#### 5.3.2. Nhóm Ref: `useRef` vs `useImperativeHandle`

* **`useRef`**: Giữ giá trị xuyên suốt các render mà **không** kích hoạt vẽ lại UI; hoặc trỏ đến DOM element.
* **`useImperativeHandle`**: Component cha **không nên** can thiệp bừa bãi vào toàn bộ DOM của con. Thay vào đó, dùng `useImperativeHandle` để chỉ cho phép cha gọi đúng các hàm được chỉ định (như `focus()`, `scrollIntoView()`, `reset()`):

```tsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

// Định nghĩa API công khai của Component con
export interface CustomInputHandle {
  focusInput: () => void;
  clear: () => void;
}

const CustomInput = forwardRef<CustomInputHandle, { placeholder: string }>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Chỉ expose 2 hàm này cho cha:
  useImperativeHandle(ref, () => ({
    focusInput: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) inputRef.current.value = '';
    }
  }));

  return <input ref={inputRef} placeholder={props.placeholder} />;
});

// Component Cha gọi:
function Parent() {
  const inputHandleRef = useRef<CustomInputHandle>(null);

  return (
    <div>
      <CustomInput ref={inputHandleRef} placeholder="Nhập email..." />
      <button onClick={() => inputHandleRef.current?.focusInput()}>Focus vào ô nhập</button>
      <button onClick={() => inputHandleRef.current?.clear()}>Xóa trắng</button>
    </div>
  );
}
```

---

#### 5.3.3. Nhóm Effect: Phân biệt `useEffect` vs `useLayoutEffect` vs `useInsertionEffect`

Thứ tự thực thi trong một chu kỳ Render của React:

```
[1. Render Phase]  (Tính toán Virtual DOM)
        │
        ▼
[2. Commit Phase: Mutation]
        │
        ├──► useInsertionEffect  (Chèn CSS style rules vào DOM)
        │
        ├──► Can thiệp Real DOM
        │
        ├──► useLayoutEffect     (Chạy ĐỒNG BỘ: Đo đạc vị trí element)
        │
        ▼
[3. Browser Paint] (Trình duyệt vẽ pixel lên màn hình cho mắt người nhìn thấy)
        │
        ▼
[4. useEffect]     (Chạy BẤT ĐỒNG BỘ: Call API, subscriptions, logging)
```

> [!TIP]
> **Khi nào bắt buộc dùng `useLayoutEffect`?**
> Khi bạn cần tính toán vị trí của một phần tử DOM (như Tooltip, Popover, Dropdown menu) để định vị tọa độ `top`, `left`. Nếu dùng `useEffect`, người dùng sẽ thấy tooltip hiện ở tọa độ (0,0) rồi mới nhảy sang tọa độ đúng $\rightarrow$ gây hiện tượng **nhấp nháy giật hình (Flickering)**. `useLayoutEffect` tính toán xong trước khi màn hình kịp vẽ, loại bỏ hoàn toàn flickering!

---

#### 5.3.4. Nhóm Tối Ưu Hiệu Năng: `useMemo` vs `useCallback`

* **`useMemo`**: Ghi nhớ **kết quả trả về** của một hàm: `const cachedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`
* **`useCallback`**: Ghi nhớ **chính bản thân function đó**: `const cachedFn = useCallback(() => doSomething(a), [a]);`

> [!NOTE]
> Bản chất: `useCallback(fn, deps)` tương đương với `useMemo(() => fn, deps)`.
> 
> **Hai trường hợp DUY NHẤT cần dùng `useCallback` & `useMemo`:**
> 1. Truyền function / object xuống một component con được bọc bởi `React.memo` để ngăn component con re-render vô ích.
> 2. Function / object đó nằm trong mảng dependency `[]` của một `useEffect` hoặc custom hook khác.

---

#### 5.3.5. Nhóm Concurrent: `useTransition` vs `useDeferredValue` (React 18+)

* **`useTransition`**: Dùng khi bạn là người **chủ động gọi hàm cập nhật state**:
```tsx
const [isPending, startTransition] = useTransition();

function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
  // 1. Cập nhật khẩn cấp: Gõ phím tới đâu chữ hiện lên ô input tới đó (0ms)
  setText(e.target.value);

  // 2. Cập nhật không khẩn cấp: Lọc danh sách 10.000 sản phẩm (cho phép ngắt giữa chừng)
  startTransition(() => {
    setFilterKeyword(e.target.value);
  });
}
```

* **`useDeferredValue`**: Dùng khi bạn **nhận giá trị từ props** (không có quyền truy cập vào hàm `set...`):
```tsx
function HeavyProductList({ keyword }: { keyword: string }) {
  // Trì hoãn giá trị keyword: UI vẫn mượt mà, danh sách cập nhật sau
  const deferredKeyword = useDeferredValue(keyword);
  const isStale = keyword !== deferredKeyword; // Cờ báo hiệu dữ liệu cũ

  return (
    <div style={{ opacity: isStale ? 0.6 : 1 }}>
      {/* Render danh sách dựa trên deferredKeyword */}
    </div>
  );
}
```

---

#### 5.3.6. `useSyncExternalStore` (React 18+)

Được sinh ra để giải quyết vấn đề **Tearing** (hiện tượng các component trên cùng màn hình hiển thị 2 giá trị khác nhau của cùng một biến toàn cục khi React chạy ở chế độ Concurrent Mode).

```tsx
import { useSyncExternalStore } from 'react';

// Lắng nghe trạng thái mạng từ Browser API một cách an toàn tuyệt đối:
function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

export function useNetworkStatus() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
```

---

### 5.4 Nghệ thuật thiết kế & Xây dựng Custom Hooks chuyên nghiệp

#### 1. Bản chất của Custom Hook:
- Custom Hook **chia sẻ Stateful Logic, KHÔNG chia sẻ State Instance**.
- Nếu 2 component cùng gọi `useCounter()`, mỗi component sẽ sở hữu biến `count` độc lập hoàn toàn trong bộ nhớ Fiber của riêng mình.

#### 2. Quy trình 4 bước chuẩn thiết kế Custom Hook:
```
[Bước 1: Phân tích bài toán] ──► Nhận diện logic bị lặp lại hoặc phình to trong component.
              │
              ▼
[Bước 2: Thiết kế Input API]  ──► Nhận tham số linh hoạt, có fallback default value.
              │
              ▼
[Bước 3: Đóng gói State/Effect] ──► Gọi các hook chuẩn (useState, useEffect, useRef...),
              │                  luôn nhớ cleanup đầy đủ.
              ▼
[Bước 4: Thiết kế Output API] ──► Trả về Tuple [state, actions] as const (nếu ít giá trị)
                                 hoặc Object { data, loading, error } (nếu nhiều giá trị).
```

---

### 5.5 4 Bộ Custom Hooks thực chiến chuẩn Production (TypeScript)

#### Hook 1: `useDebounce` — Chống Spam Request Ô Tìm Kiếm
Trì hoãn việc cập nhật giá trị cho đến khi người dùng ngừng gõ phím sau một khoảng thời gian quy định (thường là 300ms - 500ms):

```tsx
// useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Thiết lập bộ hẹn giờ
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // DỌN DẸP: Nếu value thay đổi trước khi hết delay, hủy timer cũ
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Cách dùng trong Component:
function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 400);

  useEffect(() => {
    if (debouncedKeyword) {
      callApiSearch(debouncedKeyword); // Chỉ gọi khi ngừng gõ 400ms!
    }
  }, [debouncedKeyword]);

  return <input value={keyword} onChange={e => setKeyword(e.target.value)} />;
}
```

---

#### Hook 2: `useFetch` — Quản Lý Gọi API & Hủy Yêu Cầu với AbortController
Bao bọc toàn bộ trạng thái `data`, `isLoading`, `error`, và tự động hủy HTTP request nếu người dùng chuyển trang trước khi API phản hồi:

```tsx
// useFetch.ts
import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useFetch<T>(url: string, options?: RequestInit): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setState({ data: null, isLoading: true, error: null });

    fetch(url, { ...options, signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then((data: T) => {
        setState({ data, isLoading: false, error: null });
      })
      .catch((err: Error) => {
        // Bỏ qua lỗi nếu do chính AbortController chủ động hủy
        if (err.name !== 'AbortError') {
          setState({ data: null, isLoading: false, error: err });
        }
      });

    // CLEANUP: Tự động hủy gọi mạng nếu Component bị unmount
    return () => {
      controller.abort();
    };
  }, [url]);

  return state;
}
```

---

#### Hook 3: `useEventListener` — Lắng Nghe Sự Kiện DOM An Toàn
Tự động đăng ký và gỡ bỏ event listener, hỗ trợ bắt sự kiện trên `window`, `document` hoặc bất kỳ element nào với type safety tuyệt đối:

```tsx
// useEventListener.ts
import { useEffect, useRef } from 'react';

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | HTMLElement = window
) {
  // Lưu handler vào ref để tránh việc effect re-run liên tục khi handler là arrow function
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: any) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

// Cách dùng:
function ShortcutManager() {
  useEventListener('keydown', (e) => {
    if (e.key === 'Escape') console.log('Đã nhấn phím ESC');
  });

  return <div>Bấm phím ESC để thử</div>;
}
```

---

#### Hook 4: `usePrevious` — Lưu Vết Giá Trị Của Lần Render Trước Đó
Sử dụng `useRef` kết hợp `useEffect` để so sánh giá trị hiện tại với giá trị của lần render liền kề trước:

```tsx
// usePrevious.ts
import { useRef, useEffect } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value; // Gán giá trị sau khi render hoàn tất
  }, [value]);

  return ref.current; // Trả về giá trị của lần render trước
}

// Cách dùng:
function Counter({ count }: { count: number }) {
  const prevCount = usePrevious(count);

  return (
    <p>
      Hiện tại: {count} - Trước đó: {prevCount ?? 'Chưa có'}
      {prevCount !== undefined && (
        <span> ({count > prevCount ? '▲ Tăng' : '▼ Giảm'})</span>
      )}
    </p>
  );
}
```

---

### 5.6 Các cạm bẫy (Anti-patterns) cần tránh khi viết Custom Hooks

1. **Bẫy 1: "God Hook" (Hook làm quá nhiều việc)**:
   - ❌ *Sai:* Tạo một hook `useApp()` chứa từ user, shopping cart, theme, websocket cho đến navigation.
   - ✅ *Đúng:* Áp dụng nguyên lý Single Responsibility. Tách nhỏ thành `useUser()`, `useCart()`, `useTheme()`.
2. **Bẫy 2: Trả về functions không được bọc bởi `useCallback`**:
   - Nếu custom hook trả về các hàm hành động (`login`, `refetch`, `reset`), hãy bọc chúng trong `useCallback`. Nếu không, mỗi lần component cha re-render, hàm trả về sẽ đổi reference mới, phá vỡ memoization của các component con bên dưới.
3. **Bẫy 3: Quên hàm Cleanup trong `useEffect`**:
   - Khi hook tạo event listener, timer (`setInterval`), hoặc mở kết nối WebSocket, **bắt buộc phải trả về hàm cleanup**. Thiếu cleanup sẽ gây rò rỉ bộ nhớ (Memory Leak) nghiêm trọng trên ứng dụng Single Page App (SPA).
4. **Bẫy 4: Đặt tên `use...` cho các hàm tiện ích thông thường (Stateless Utilities)**:
   - Nếu hàm của bạn chỉ tính toán chuỗi hoặc format ngày tháng mà **hoàn toàn không gọi bất kỳ React Hook nào bên trong** (`useState`, `useEffect`...), hãy viết nó thành một hàm JavaScript bình thường (`formatDate()`). Đặt tên `useFormatDate` sẽ ép React linter áp dụng các quy tắc kiểm tra của hook một cách không cần thiết.

