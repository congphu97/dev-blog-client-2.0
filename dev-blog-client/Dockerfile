# ==========================================
# STAGE 1: Build Application (Node.js Alpine)
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Tận dụng Docker Cache: Chỉ copy file khai báo dependencies trước
COPY package.json package-lock.json ./

# Cài đặt dependencies chính xác theo lock file
RUN npm ci --legacy-peer-deps

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng cho môi trường Production (Output sinh ra tại thư mục /app/www)
RUN npm run build

# ==========================================
# STAGE 2: Production Server (Nginx Alpine)
# ==========================================
FROM nginx:1.27-alpine AS runner

# Gỡ bỏ cấu hình mặc định của Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copy cấu hình Nginx tối ưu cho SPA (Gzip, Cache, 404 Fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build bundle tĩnh từ stage builder vào thư mục web server của Nginx
COPY --from=builder /app/www /usr/share/nginx/html

# Mở cổng 80 cho web traffic
EXPOSE 80

# Chạy Nginx foreground mode
CMD ["nginx", "-g", "daemon off;"]
