# Cẩm Nang Đóng Gói Ứng Dụng Với Docker & Nginx Tối Ưu (Multi-Stage Build Cho Angular 22 & Ionic Web)

> **Mục tiêu tài liệu:** Giúp bạn hiểu sâu từ gốc rễ bản chất của **Docker** (Container, Image, Layer, Cache, Virtual Machine vs Container), nắm vững lý do tại sao frontend cần Docker, và mổ xẻ chi tiết từng dòng lệnh trong **Dockerfile Multi-Stage Build** giúp tối ưu kích thước ứng dụng từ **1.5GB xuống chỉ còn ~25MB**.

---

## Mục lục

1. [Phần 1: Nền tảng & Các khái niệm cốt lõi trong Docker](#phần-1-nền-tảng--các-khái-niệm-cốt-lõi-trong-docker)
   - 1.1. Docker là gì?
   - 1.2. So sánh Container vs Virtual Machine (Máy ảo VM)
   - 1.3. Bộ ba trụ cột: Dockerfile, Docker Image và Docker Container
   - 1.4. Docker Client, Docker Daemon và Docker Registry (Docker Hub)
   - 1.5. Cơ chế Layer & Union File System (OverlayFS)
   - 1.6. Nguyên lý Docker Build Cache & Cache Invalidation
2. [Phần 2: Tại sao Frontend SPA cần Docker?](#phần-2-tại-sao-frontend-spa-cần-docker)
3. [Phần 3: Chiến lược Multi-Stage Build: Bí quyết giảm dung lượng từ 1.5GB còn 25MB](#phần-3-chiến-lược-multi-stage-build-bí-quyết-giảm-dung-lượng-từ-15gb-còn-25mb)
4. [Phần 4: Phân tích chi tiết từng bước & từng câu lệnh trong Dockerfile](#phần-4-phân-tích-chi-tiết-từng-bước--từng-câu-lệnh-trong-dockerfile)
   - 4.1. Stage 1: Build Application (Node.js Alpine)
   - 4.2. Stage 2: Production Server (Nginx Alpine)
   - 4.3. Phân biệt các lệnh dễ nhầm: `RUN` vs `CMD` vs `ENTRYPOINT`
   - 4.4. Sự thật về lệnh `EXPOSE` và cờ `-p` (Port Publishing)
   - 4.5. Tại sao Nginx bắt buộc phải chạy `daemon off;`?
5. [Phần 5: Tối ưu Build Context với `.dockerignore`](#phần-5-tối-ưu-build-context-với-dockerignore)
6. [Phần 6: Cấu hình `nginx.conf` chuẩn cho Single Page Application (SPA)](#phần-6-cấu-hình-nginxconf-chuẩn-cho-single-page-application-spa)
   - Xử lý triệt để lỗi F5 Refresh bị 404 Not Found
   - Bật nén Gzip tối đa hóa tốc độ tải trang
   - Caching Policy (Bảo đảm cập nhật code mới ngay lập tức)
   - Bổ sung Security Headers
7. [Phần 7: Quản lý & Chạy nhanh bằng `docker-compose.yml`](#phần-7-quản-lý--chạy-nhanh-bằng-docker-composeyml)
8. [Phần 8: Hướng dẫn chạy thực tế & Cheatsheet lệnh Docker](#phần-8-hướng-dẫn-chạy-thực-tế--cheatsheet-lệnh-docker)
9. [Phần 9: Bảng tổng hợp các cạm bẫy thường gặp & Best Practices](#phần-9-bảng-tổng-hợp-các-cạm-bẫy-thường-gặp--best-practices)

---

## Phần 1: Nền tảng & Các khái niệm cốt lõi trong Docker

Trước khi bắt tay vào viết code, bạn cần hiểu rõ bản chất cách thức Docker vận hành để không bị bỡ ngỡ khi debug hoặc tối ưu pipeline.

### 1.1. Docker là gì?
**Docker** là một nền tảng mã nguồn mở cho phép bạn tự động hóa việc triển khai ứng dụng bên trong các **Container** (thùng chứa) độc lập. Docker đóng gói toàn bộ: mã nguồn (code), môi trường thực thi (runtime), thư viện phụ thuộc (libraries) và các file cấu hình hệ thống vào một khối duy nhất có thể chạy ở bất kỳ đâu có cài Docker Engine.

### 1.2. So sánh Container vs Virtual Machine (Máy ảo VM)

| Tiêu chí | Virtual Machine (VM - VMware, VirtualBox) | Container (Docker) |
| :--- | :--- | :--- |
| **Kiến trúc** | Cần một lớp điều khiển ảo hóa **Hypervisor** và phải cài **Guest OS** riêng biệt cho từng máy ảo. | Chia sẻ trực tiếp **Kernel của Host OS** thông qua công nghệ Linux Namespaces & cgroups. |
| **Dung lượng** | Rất nặng: Từ vài GB đến hàng chục GB (do chứa cả hệ điều hành Windows/Ubuntu đầy đủ). | Cực nhẹ: Từ **5MB đến vài chục MB** (chỉ chứa ứng dụng và thư viện tối thiểu). |
| **Thời gian khởi động**| Chậm: Mất từ **vài chục giây đến vài phút** để khởi động lại hệ điều hành ảo. | Siêu nhanh: Chỉ mất **vài mili-giây đến vài giây** (như khởi động một tiến trình Process thông thường). |
| **Hiệu năng & RAM** | Tốn nhiều RAM cố định gán cho VM, CPU bị hao phí qua lớp Hypervisor. | Tiêu tốn cực ít RAM (chạy sát phần cứng của máy chủ Host). |

```text
+-------------------------+     +-------------------------+
|    Virtual Machines     |     |       Containers        |
+-------------------------+     +-------------------------+
| [App 1]     | [App 2]   |     | [App 1]     | [App 2]   |
| [Libs/Deps] | [Libs]    |     | [Libs/Deps] | [Libs]    |
| [Guest OS]  | [Guest OS]|     +-------------+-----------+
+-------------+-----------+     |      Docker Engine      |
|       Hypervisor        |     +-------------------------+
+-------------------------+     |     Host OS (Kernel)    |
|    Host OS (Kernel)     |     +-------------------------+
+-------------------------+     |    Server Hardware      |
|    Server Hardware      |     +-------------------------+
+-------------------------+
```

### 1.3. Bộ ba trụ cột: Dockerfile, Docker Image và Docker Container

Nếu coi theo tư duy Lập trình hướng đối tượng (OOP):
- **`Dockerfile` (Kịch bản công thức nấu ăn):** Là một file text chứa tập hợp các chỉ thị dòng lệnh từng bước một để mô tả cách xây dựng nên một Image.
- **`Docker Image` (Class / Bản thiết kế Blueprint):** Là một gói tĩnh chỉ đọc (read-only), chứa hệ điều hành tối giản, code, cấu hình và dependencies. Image không chạy, nó là trạng thái "đóng băng".
- **`Docker Container` (Object Instance đang chạy):** Là một thực thể sống được sinh ra từ Image. Một Image có thể khởi chạy thành 1, 10 hay 100 Container cùng lúc. Trên đỉnh Container có một lớp ghi (Read-Write Layer) cho phép ghi dữ liệu tạm khi chạy.

### 1.4. Docker Client, Docker Daemon và Docker Registry

Kiến trúc Docker hoạt động theo mô hình Client - Server:
- **Docker Client (`docker` CLI):** Giao diện dòng lệnh bạn gõ trên terminal (`docker build`, `docker run`). Client gửi yêu cầu REST API tới Daemon.
- **Docker Daemon (`dockerd`):** Tiến trình chạy ngầm chịu trách nhiệm tạo, quản lý images, containers, networks và volumes.
- **Docker Registry:** Kho lưu trữ chứa các Docker Image đã được build sẵn. Nổi tiếng nhất là **Docker Hub** (công khai), ngoài ra còn có AWS ECR, Google Artifact Registry, GitHub Container Registry (ghcr.io).

### 1.5. Cơ chế Layer & Union File System (OverlayFS)

Một Docker Image không phải là một file nén zip đơn lẻ khổng lồ, mà được tạo thành từ **nhiều lớp (layers) xếp chồng lên nhau**.
- Mỗi câu lệnh trong Dockerfile (`FROM`, `COPY`, `RUN`) sẽ tạo ra **một Layer mới**.
- Các Layer bên dưới là **Chỉ Đọc (Read-Only)** và bất biến.
- Khi nhiều container cùng chạy từ 1 Image, chúng dùng chung các Layer Read-Only này, chỉ có một lớp mỏng **Container Layer (Read-Write)** được gắn trên cùng để lưu thay đổi trong phiên làm việc.

```text
+------------------------------------------------------+
| [Container Layer (Read-Write)] <-- Ghi dữ liệu tạm   |
+------------------------------------------------------+
| Layer 5: CMD ["nginx", "-g", "daemon off;"] (RO)     |
+------------------------------------------------------+
| Layer 4: COPY --from=builder /app/www ...   (RO)     |
+------------------------------------------------------+
| Layer 3: COPY nginx.conf ...                (RO)     |
+------------------------------------------------------+
| Layer 2: RUN rm -rf /etc/nginx/conf.d/*     (RO)     |
+------------------------------------------------------+
| Layer 1: FROM nginx:1.27-alpine             (RO)     |
+------------------------------------------------------+
```

### 1.6. Nguyên lý Docker Build Cache & Cache Invalidation

Khi bạn chạy lệnh `docker build`:
- Docker sẽ duyệt qua từng dòng lệnh từ trên xuống dưới.
- Với mỗi dòng, Docker kiểm tra xem câu lệnh đó và các file đầu vào có bị thay đổi so với lần build trước không.
- Nếu **KHÔNG THAY ĐỔI**: Docker sẽ tái sử dụng lại layer đã build trước đó trong cache (`---> Using cache`), giúp việc build chỉ mất **0.5 giây**!
- Nếu **CÓ THAY ĐỔI (Cache Invalidation)**: Layer đó bị tính toán lại, và **TẤT CẢ CÁC DÒNG LỆNH PHÍA SAU NÓ ĐỀU BỊ BUỘC PHẢI CHẠY LẠI TỪ ĐẦU**, không thể dùng lại cache nữa!
> **Quy tắc vàng:** Dòng nào **ít thay đổi** (cài đặt dependencies, cấu hình môi trường) thì đặt ở **TRÊN CÙNG**. Dòng nào **thường xuyên thay đổi** (sửa mã nguồn `.ts`, `.html`) thì đặt ở **DƯỚI CÙNG**.

---

## Phần 2: Tại sao Frontend SPA cần Docker?

Nhiều bạn nghĩ: *"Frontend Angular chỉ là file HTML/CSS/JS tĩnh, deploy lên host nào chả được, cần gì Docker?"*.

Trong môi trường doanh nghiệp thực tế:
1. **Xóa bỏ vĩnh viễn câu nói "Nó chạy được trên máy tôi":** Bạn dùng Node.js v22 trên macOS M3, nhưng server staging dùng Ubuntu Node v18 gây ra lỗi biên dịch thư viện C-bindings. Docker đồng nhất 100% môi trường build từ local đến server.
2. **Sẵn sàng cho kiến trúc Kubernetes (K8s) & Cloud Native:** Các nền tảng điều phối container như K8s, AWS ECS, Google Cloud Run đều yêu cầu đóng gói dưới dạng Docker image.
3. **Toàn quyền kiểm soát Web Server Nginx:** Bạn tự cấu hình Gzip, HTTP/2, Cache-Control, Security Headers, CORS, và SPA fallback mà không phụ thuộc vào hạ tầng bên ngoài.
4. **Rollback trong chớp mắt (Zero-Downtime Rollback):** Nếu bản release mới phát sinh lỗi nghiêm trọng, bạn chỉ cần chuyển thẻ container sang image cũ (`docker run dev-blog:v1.0.0`) trong vòng **1 giây** là hệ thống hoạt động bình thường, không cần build lại code.

---

## Phần 3: Chiến lược Multi-Stage Build: Bí quyết giảm dung lượng từ 1.5GB còn 25MB

Nếu bạn tạo một Dockerfile thông thường bằng cách dùng image `node:22`, copy code vào, chạy `npm install` và serve ứng dụng bằng lệnh `npm start` hoặc `http-server`:
- Kích thước Docker Image sẽ phình to lên tới **1.2GB - 1.8GB**!
- Lý do: Toàn bộ công cụ Node runtime, npm CLI, TypeScript compiler, và hàng vạn file trong thư mục `node_modules` đều bị nhét vào image production.
- Rủi ro bảo mật: Image chứa đầy các công cụ build dev có thể bị kẻ tấn công khai thác.

**Giải pháp: Kỹ thuật Multi-Stage Build (Đa tầng)**

```text
==================================================================================
STAGE 1: BUILDER (Môi trường xưởng gia công - Nặng)
FROM node:22-alpine AS builder
- Tải package.json, chạy `npm ci`
- Biên dịch TypeScript, SCSS, tối ưu Tree-shaking, băm hash tên file
- Kết quả đầu ra: Thư mục thuần tĩnh `/app/www` (chỉ nặng khoảng 5MB - 10MB)
==================================================================================
                                    |
            CHỈ COPY THƯ MỤC /www (Bỏ lại toàn bộ Node và node_modules)
                                    v
==================================================================================
STAGE 2: RUNNER (Phòng trưng bày Production - Siêu nhẹ)
FROM nginx:1.27-alpine AS runner
- Không chứa Node.js, không có npm, không có node_modules
- Chỉ có Web Server Nginx Alpine (~20MB) và các file tĩnh trong `/usr/share/nginx/html`
==> DUNG LƯỢNG IMAGE CUỐI CÙNG: CHỈ ~25MB! GIẢM HƠN 98%!
==================================================================================
```

---

## Phần 4: Phân tích chi tiết từng bước & từng câu lệnh trong Dockerfile

Dưới đây là toàn bộ nội dung của file `Dockerfile` chuẩn Production của dự án:

```dockerfile
# ==========================================
# STAGE 1: Build Application (Node.js Alpine)
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Tận dụng Docker Layer Cache
COPY package.json package-lock.json ./

# Cài đặt dependencies sạch và chính xác
RUN npm ci --legacy-peer-deps

# Copy toàn bộ mã nguồn vào container
COPY . .

# Biên dịch mã nguồn cho môi trường Production (Output đặt tại /app/www)
RUN npm run build

# ==========================================
# STAGE 2: Production Server (Nginx Alpine)
# ==========================================
FROM nginx:1.27-alpine AS runner

# Xóa các file cấu hình mặc định của Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copy cấu hình Nginx SPA đã viết ở bước trên
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy thư mục build tĩnh từ Stage 1 sang thư mục phục vụ web của Nginx
COPY --from=builder /app/www /usr/share/nginx/html

# Mở cổng 80 cho HTTP traffic
EXPOSE 80

# Chạy Nginx foreground mode (giữ container luôn sống)
CMD ["nginx", "-g", "daemon off;"]
```

Bây giờ, chúng ta hãy mổ xẻ **từng dòng một** để hiểu tại sao lại viết như vậy:

---

### 4.1. Stage 1: Build Application (Node.js Alpine)

#### Dòng 1: `FROM node:22-alpine AS builder`
- `FROM`: Câu lệnh khởi đầu bắt buộc của mọi Dockerfile, dùng để chỉ định **Base Image**.
- `node:22-alpine`: Chúng ta chọn Node.js phiên bản 22 chạy trên nhân **Alpine Linux**. Alpine là bản phân phối Linux siêu gọn nhẹ (chỉ khoảng 5MB), không chứa các tiện ích dư thừa, giúp tải nhanh và giảm thiểu lỗ hổng bảo mật (vulnerabilities).
- `AS builder`: Đặt tên định danh cho tầng build này là `builder`. Tên gọi này sẽ được dùng ở Stage 2 để trích xuất file sang.

#### Dòng 2: `WORKDIR /app`
- Thiết lập thư mục làm việc mặc định bên trong container là `/app`.
- Mọi câu lệnh tiếp theo (`COPY`, `RUN`) nếu dùng đường dẫn tương đối sẽ được thực thi tại đây.
- *Lưu ý:* Nếu thư mục `/app` chưa tồn tại, Docker sẽ tự động tạo ra. Tránh dùng `RUN cd /app` vì mỗi lệnh `RUN` chạy trong một subshell riêng biệt, lệnh `cd` sẽ không có tác dụng cho các dòng sau!

#### Dòng 3: `COPY package.json package-lock.json ./`
- Copy 2 file khai báo dependencies từ máy tính bạn vào thư mục `/app` trong container.
- **TẠI SAO KHÔNG COPY TẤT CẢ CODE NGAY LẬP TỨC BẰNG `COPY . .`?**
  - Đây là kỹ thuật tối ưu **Docker Layer Cache** quan trọng nhất!
  - File `package.json` rất hiếm khi thay đổi (chỉ đổi khi bạn cài thêm thư viện mới). Trong khi đó mã nguồn `.ts`, `.html` lại thay đổi liên tục mỗi ngày.
  - Bằng cách chỉ copy file `package.json` trước, Docker sẽ cache lại bước `npm ci` ở dòng tiếp theo. Lần sau bạn sửa code, Docker phát hiện `package.json` không đổi nên sẽ **bỏ qua bước cài đặt npm**, tiết kiệm 3-5 phút mỗi lần build!

#### Dòng 4: `RUN npm ci --legacy-peer-deps`
- `RUN`: Thực thi một lệnh bash bên trong container trong quá trình build image và lưu kết quả thành một layer mới.
- **Tại sao dùng `npm ci` thay vì `npm install`?**
  - `npm install` có thể tự ý nâng cấp phiên bản các gói phụ thuộc (dấu `^`, `~`) và tự động ghi đè lại file `package-lock.json`. Điều này dẫn đến tình trạng máy bạn chạy phiên bản thư viện khác, máy server chạy phiên bản khác.
  - `npm ci` (Clean Install) bắt buộc phải có `package-lock.json`, xóa sạch thư mục `node_modules` cũ và cài đặt chính xác 100% từng byte phiên bản thư viện đã được khóa. Nếu lock file sai lệch, nó sẽ lập tức báo lỗi. Đây là chuẩn mực bắt buộc trong CI/CD.
- `--legacy-peer-deps`: Bỏ qua các xung đột nghiêm ngặt về peer dependency giữa Angular 22 và các thư viện UI cũ (như Ionic hoặc thư viện bên thứ ba), tránh làm đứt gãy quá trình build.

#### Dòng 5: `COPY . .`
- Copy toàn bộ mã nguồn dự án (sau khi đã lọc qua file `.dockerignore`) vào `/app`.
- Vì dòng này nằm SAU dòng cài đặt dependencies, nên khi bạn sửa bất kỳ file logic nào, Docker chỉ chạy lại từ dòng này trở xuống, không phải cài lại npm!

#### Dòng 6: `RUN npm run build`
- Thực thi lệnh build của dự án Angular (`ng build --configuration=production`).
- Trình biên dịch Angular CLI tiến hành tối ưu: Tree-shaking (gọt tỉa code chết), Minify & Uglify mã nguồn, sinh ra Source Maps (nếu cấu hình) và băm mã Hash vào tên file JS/CSS.
- Thư mục đầu ra được sinh ra tại: `/app/www`.

---

### 4.2. Stage 2: Production Server (Nginx Alpine)

#### Dòng 7: `FROM nginx:1.27-alpine AS runner`
- Khởi động **Stage 2** hoàn toàn mới với base image là `nginx:1.27-alpine`.
- **Điều gì xảy ra với Stage 1?** Toàn bộ môi trường Stage 1 (Node.js runtime, compiler, npm cache, `node_modules`) sẽ **BỊ BỎ RƠI HOÀN TOÀN**, không một file rác nào lọt được sang Image cuối cùng!
- Tầng này chỉ chứa Nginx Alpine siêu nhẹ (chỉ khoảng 20MB).

#### Dòng 8: `RUN rm -rf /etc/nginx/conf.d/*`
- Xóa sạch cấu hình mặc định sẵn có của Nginx (thường là trang chào mừng `Welcome to nginx!`) để tránh xung đột với cấu hình tùy chỉnh của chúng ta.

#### Dòng 9: `COPY nginx.conf /etc/nginx/conf.d/default.conf`
- Copy file cấu hình `nginx.conf` tối ưu riêng cho SPA từ máy chủ vào vị trí cấu hình chính thức của Nginx bên trong container.

#### Dòng 10: `COPY --from=builder /app/www /usr/share/nginx/html`
- **Đây chính là dòng lệnh "phép màu" của Multi-stage build:**
  - Cờ `--from=builder`: Chỉ định Docker truy cập vào Stage 1 (có tên là `builder`).
  - Lấy thư mục tĩnh `/app/www` đã được biên dịch sạch sẽ.
  - Đặt vào thư mục phục vụ web mặc định của Nginx: `/usr/share/nginx/html`.
- Lúc này, container Nginx chỉ chứa các file HTML, CSS, JavaScript tĩnh và ảnh, không hề có bất kỳ công cụ build nào đi kèm.

#### Dòng 11: `EXPOSE 80`
- Khai báo cổng mà container sẽ lắng nghe ở runtime.

#### Dòng 12: `CMD ["nginx", "-g", "daemon off;"]`
- Câu lệnh mặc định sẽ được thực thi khi bạn tạo và chạy container từ Image.

---

### 4.3. Phân biệt các lệnh dễ nhầm: `RUN` vs `CMD` vs `ENTRYPOINT`

| Lệnh | Thời điểm chạy | Mục đích | Có bị ghi đè không? |
| :--- | :--- | :--- | :--- |
| **`RUN`** | Chạy trong lúc **BUILD IMAGE** (`docker build`). | Cài đặt phần mềm, download thư viện, biên dịch code, tạo file/thư mục. Kết quả được lưu vĩnh viễn vào Layer. | Không áp dụng (chỉ chạy 1 lần lúc build). |
| **`CMD`** | Chạy khi **CONTAINER KHỞI ĐỘNG** (`docker run`). | Cung cấp lệnh và tham số mặc định để kích hoạt ứng dụng bên trong container. | **Dễ dàng bị ghi đè** nếu người dùng truyền lệnh khác khi chạy (ví dụ `docker run image bash`). |
| **`ENTRYPOINT`** | Chạy khi **CONTAINER KHỞI ĐỘNG** (`docker run`). | Thiết lập tiến trình cố định không thể thay đổi của container (thường dùng để làm công cụ CLI hoặc script khởi động). | Khó ghi đè (phải dùng cờ `--entrypoint`). Các tham số của `CMD` sẽ được nối tiếp vào sau `ENTRYPOINT`. |

---

### 4.4. Sự thật về lệnh `EXPOSE` và cờ `-p` (Port Publishing)

- **`EXPOSE 80` trong Dockerfile CÓ MỞ CỔNG RA NGOÀI INTERNET KHÔNG?**
  - **KHÔNG!** Lệnh `EXPOSE` thực chất chỉ đóng vai trò như một **tài liệu ghi chú (metadata)** giữa người viết Dockerfile và người vận hành hệ thống, báo hiệu rằng: *"Ứng dụng bên trong container này lắng nghe ở cổng 80"*.
  - Nếu bạn chỉ viết `EXPOSE 80` mà khi chạy bạn gõ: `docker run -d my-image`, thì từ máy tính của bạn hoàn toàn KHÔNG THỂ truy cập vào container qua cổng 80!
- **Muốn mở cổng ra ngoài, bắt buộc phải dùng cờ `-p` (Port Binding):**
  ```bash
  docker run -d -p 8080:80 my-image
  # Cú pháp: -p <Cổng_Máy_Thật_Host>:<Cổng_Bên_Trong_Container>
  ```
  Lúc này Docker Engine sẽ tạo một quy tắc định tuyến iptables: Bất kỳ ai gửi request vào cổng `8080` của máy tính sẽ được chuyển tiếp thẳng vào cổng `80` của Nginx bên trong container.

---

### 4.5. Tại sao Nginx bắt buộc phải chạy `daemon off;`?

Trong Linux thông thường, Nginx chạy dưới dạng **Daemon** (tiến trình chạy ngầm dưới background, nhường quyền điều khiển terminal lại cho người dùng).

Tuy nhiên, trong Docker:
- Container Docker tồn tại và sống sót **CHỈ DỰA VÀO TIẾN TRÌNH CÓ PID = 1** (tiến trình chính được khởi tạo bởi lệnh `CMD`).
- Nếu tiến trình PID 1 kết thúc (exit), container sẽ xem như đã hoàn thành nhiệm vụ và **TỰ ĐỘNG TẮT NGAY LẬP TỨC (Exited with code 0)**!
- Nếu bạn chỉ viết `CMD ["nginx"]`, Nginx sẽ spawn ra các worker ngầm rồi tiến trình chính tự thoát ra -> Container lập tức tắt ngúm chỉ sau 0.1 giây!
- Do đó, tham số `-g "daemon off;"` là **bắt buộc**, ra lệnh cho Nginx: *"Hãy chạy ở chế độ foreground (tiền cảnh), giữ chặt lấy tiến trình PID 1 và không bao giờ thoát!"*.

---

## Phần 5: Tối ưu Build Context với `.dockerignore`

File `.dockerignore` giúp bạn lọc bỏ các file rác trước khi Docker Client nén và gửi lên Docker Daemon:

```dockerignore
# Dependencies & Logs
node_modules
npm-debug.log
*.log

# Git & IDE configs
.git
.gitignore
.angular
.vscode
.idea

# Build outputs cục bộ
www
dist
coverage

# Mobile Native Builds (Capacitor)
android
ios
platforms
plugins
release
*.jks
*.keystore

# Documentation
*.md
```

---

## Phần 6: Cấu hình `nginx.conf` chuẩn cho Single Page Application (SPA)

Dưới đây là file `nginx.conf` hoàn chỉnh đã được tinh chỉnh cho Angular:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html index.htm;

    # 1. Bật Gzip Compression để giảm 70% dung lượng file tải về
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/x-javascript
        application/javascript
        application/json
        application/xml
        application/xml+rss
        image/svg+xml;
    gzip_disable "MSIE [1-6]\.";

    # 2. Tăng cường Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # 3. Cache vĩnh viễn (1 năm) cho các file tĩnh đã có hash trong tên file
    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg|webp|avif)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # 4. Tuyệt đối KHÔNG cache file index.html (để người dùng luôn nhận code mới nhất khi deploy)
    location = /index.html {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
    }

    # 5. SPA Fallback: Chống lỗi 404 khi người dùng F5 hoặc gõ trực tiếp URL con
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 6. Trang báo lỗi máy chủ
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

> [!IMPORTANT]
> **Giải thích cơ chế Fallback chống lỗi F5 404:**
> Trong Angular SPA, trình duyệt chỉ tải 1 file `index.html`. Việc chuyển trang sang `/blog/detail/8` hoàn toàn do Angular Router xử lý ảo phía client.
> Khi người dùng bấm **F5 (Refresh)** tại trang `/blog/detail/8`, trình duyệt sẽ gửi request hỏi Nginx: *"Cho tôi file vật lý tại đường dẫn `/blog/detail/8`"*. Nginx tìm trên ổ đĩa không thấy file nào tên như vậy, mặc định Nginx sẽ trả về lỗi **404 Not Found**.
> Nhờ dòng cấu hình `try_files $uri $uri/ /index.html;`, Nginx sẽ kiểm tra: nếu không thấy file `$uri`, nó sẽ tự động trả về `index.html` kèm HTTP 200, sau đó Angular Router trên trình duyệt sẽ nhận diện URL và render đúng nội dung bài viết!

---

## Phần 7: Quản lý & Chạy nhanh bằng `docker-compose.yml`

File `docker-compose.yml` giúp bạn lưu trữ toàn bộ cấu hình chạy thành mã nguồn (Infrastructure as Code):

```yaml
services:
  dev-blog-web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: dev-blog-web-container
    restart: always
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
```

---

## Phần 8: Hướng dẫn chạy thực tế & Cheatsheet lệnh Docker

### Cách 1: Sử dụng Docker CLI thuần

```bash
# 1. Build image từ Dockerfile
docker build -t dev-blog-client:latest .

# 2. Khởi chạy container ngầm (-d), map cổng 8080 host vào cổng 80 container
docker run -d -p 8080:80 --name my-dev-blog dev-blog-client:latest

# 3. Mở trình duyệt xem sản phẩm tại:
http://localhost:8080

# 4. Xem log truy cập Nginx
docker logs -f my-dev-blog

# 5. Xem dung lượng RAM/CPU container tiêu thụ (thường chỉ tốn ~10MB RAM!)
docker stats my-dev-blog

# 6. Dừng và xóa container
docker stop my-dev-blog && docker rm my-dev-blog
```

### Cách 2: Sử dụng Docker Compose (Khuyên dùng)

```bash
# Khởi động dịch vụ và tự động build
docker compose up -d --build

# Xem danh sách container đang chạy
docker compose ps

# Xem log tổng hợp
docker compose logs -f

# Dừng toàn bộ dịch vụ
docker compose down
```

---

## Phần 9: Bảng tổng hợp các cạm bẫy thường gặp & Best Practices

| Vấn đề | Nguyên nhân | Cách khắc phục |
| :--- | :--- | :--- |
| **Bấm F5 bị lỗi 404 Not Found** | Nginx tìm file vật lý theo đường dẫn URL nhưng không thấy file tương ứng | Thêm `try_files $uri $uri/ /index.html;` vào `location /` trong `nginx.conf`. |
| **Build Docker quá lâu mỗi lần sửa code** | `COPY . .` được đặt trước lệnh `npm ci`, làm mất bộ nhớ đệm (Cache Invalidation) | Luôn copy `package.json` và chạy `npm ci` TRƯỚC KHI copy toàn bộ source code. |
| **Image Docker quá nặng (>1GB)** | Quên không dùng Multi-Stage Build hoặc copy cả `node_modules` vào image cuối | Dùng Nginx Alpine làm base image cho stage 2 và chỉ copy thư mục bundle tĩnh `/www`. |
| **Deploy code mới nhưng user vẫn thấy code cũ** | Trình duyệt cache file `index.html` của người dùng | Thêm header `Cache-Control: "no-store, no-cache, must-revalidate"` riêng cho `index.html`. |
| **Container tự tắt ngay sau khi chạy** | Nginx chạy chế độ daemon ngầm, tiến trình PID 1 kết thúc | Bắt buộc phải thêm `-g "daemon off;"` vào lệnh `CMD`. |
| **Lỗi Base Href khi chạy dưới Subpath** | Ứng dụng chạy dưới subpath (ví dụ `/dev-blog/`) nhưng Nginx phục vụ ở root `/` | Thêm tham số `--base-href /subpath/` khi chạy lệnh `ng build`. |

---

## Tổng kết

Hiểu rõ bản chất của **Docker Architecture**, cơ chế **Layer Cache**, và kỹ thuật **Multi-Stage Build** không chỉ giúp bạn đóng gói dự án Angular 22 & Ionic thành công mà còn là nền tảng vững chắc để làm việc với bất kỳ hệ sinh thái Microservices, Kubernetes (K8s) hay Cloud-native nào trong tương lai.
