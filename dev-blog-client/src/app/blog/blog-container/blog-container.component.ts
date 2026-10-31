import { Component, computed, debounced, effect, inject, linkedSignal, OnInit, signal } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular/standalone';
import { arrayEqualByKey } from 'src/app/shared/signal-utils';
import { BlogFormComponent, BlogSubmitData } from '../blog-form/blog-form.component';
import { BlogPost, BlogCategory } from '../blog.models';
import { BlogGridComponent } from '../blog-grid/blog-grid.component';
import { BlogListComponent } from '../blog-list/blog-list.component';

import { NgcBadgeModule, NgcButtonModule, NgcTagModule, NgcAvatarModule, NgcCardModule, NgcSkeletonModule, NgcLoadingModule } from 'ngc-library';

import { BlogService } from '../blog.service';
import { CategoryService } from '../category.service';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

@Component({
  selector: 'app-blog-container',
  templateUrl: './blog-container.component.html',
  styleUrls: ['./blog-container.component.scss'],
  imports: [
    IonContent, 
    BlogGridComponent, 
    BlogListComponent,
    NgcBadgeModule,
    NgcButtonModule,
    NgcTagModule,
    NgcAvatarModule,
    NgcCardModule,
    NgcSkeletonModule,
    NgcLoadingModule
  ],
})
export class BlogContainerComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  private blogService = inject(BlogService);
  private categoryService = inject(CategoryService);

  // Trạng thái loading toàn cục khi tải từ Firebase
  public isLoading = signal<boolean>(true);

  // Chế độ hiển thị: 'grid' hoặc 'list' bằng Signal
  public viewMode = signal<'grid' | 'list'>('grid');

  toggleViewMode() {
    this.viewMode.update(mode => mode === 'grid' ? 'list' : 'grid');
  }

  // 1. Keyword nhận giá trị ngay lập tức khi người dùng gõ
  public keyword = signal<string>('');

  // 2. DÙNG HÀM BUILT-IN CỦA ANGULAR 22: debounced()
  // Trì hoãn 400ms sau khi người dùng dừng gõ mới cập nhật
  public debouncedKeyword = debounced(this.keyword, 400);

  // Bộ lọc danh mục Category đang được chọn
  public selectedCategory = signal<string>('all');

  // Danh mục chuyên mục động (lấy từ Firebase qua blogService.getCategories())
  public rawCategories = signal<BlogCategory[]>([
    { id: 'tips', name: 'Tips' },
    { id: 'english', name: 'English' },
    { id: 'web-development', name: 'Web Development' },
    { id: 'capacitor', name: 'Capacitor' },
    { id: 'angular', name: 'Angular' },
    { id: 'cicd-devops', name: 'CI/CD & DevOps' },
    { id: 'android-firebase', name: 'Android & Firebase' },
    { id: 'google-play', name: 'Google Play' },
    { id: 'ios-app-store', name: 'iOS & App Store' },
    { id: 'mobile-development', name: 'Mobile Development' },
    { id: 'javascript-web-apis', name: 'JavaScript & Web APIs' },
    { id: 'kien-truc-design-patterns', name: 'Kiến Trúc & Design Patterns' },
    { id: 'oop-software-design', name: 'OOP & Software Design' }
  ]);

  // Computed: Tự động tính số lượng bài viết của từng Category kèm theo
  public categoriesWithCount = computed(() => {
    const posts = this.blogPosts();
    const totalCount = posts.length;
    const cats = this.rawCategories();

    // Map đếm số lượng bài viết theo Category
    const countMap = new Map<string, number>();
    for (const p of posts) {
      if (p.category) {
        const catName = p.category.trim();
        countMap.set(catName, (countMap.get(catName) || 0) + 1);
      }
    }

    const allItem = {
      id: 'all',
      name: 'Tất cả',
      count: totalCount
    };

    const catItems = cats.map(c => {
      const count = countMap.get(c.name.trim()) || 0;
      return {
        id: c.id,
        name: c.name,
        count
      };
    });

    return [allItem, ...catItems];
  });

  selectCategory(catId: string) {
    this.selectedCategory.set(catId);
  }

  public isFavorite = signal(false);
  public blogPosts = signal<BlogPost[]>([
    {
      id: 99,
      title: '4 Open Source Tools That Feel Illegal To Be Free',
      content: `## 🚀 4 Open Source Tools That Feel Illegal To Be Free

Tổng hợp các công cụ mã nguồn mở đột phá giúp bạn tăng tốc độ lập trình gấp 10 lần, tích hợp AI Agents và tự động hóa quy trình phát triển phần mềm hiện đại.

- 🤖 **AI Code Orchestration:** Tự động hóa tác vụ lặp lại
- 🎨 **Modern UI Kits:** Thư viện giao diện mở siêu nhẹ
- 📦 **Local Database Emulator:** Chạy test không cần cloud
- ⚡ **API Stress Tester:** Đo lường tải tức thì`,
      summary: 'Khám phá 4 công cụ mã nguồn mở cực đỉnh cho lập trình viên với AI agents và giao diện hiện đại.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      publishedAt: '2026-10-12T08:30:00Z',
      viewCount: 519600,
      createAt: '2026-10-12T08:30:00Z',
      updateAt: '2026-10-12T08:30:00Z',
      author: 'Danny Tech',
      authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=LuckyGreen&backgroundColor=b6e3f4',
      category: 'GitHub',
      tags: ['open-source', 'ai-agents', 'devtools', 'productivity'],
      upvotes: 222,
      commentsCount: 8,
      readTime: '22m watch time',
      isVideo: true
    },
    {
      id: 1,
      title: 'Cẩm Nang Toàn Tập Về CI/CD Web Với GitHub Actions (Angular 22 + Ionic)',
      content: `## 🚀 Tổng quan về Pipeline CI/CD với GitHub Actions

Tự động hóa toàn bộ quy trình từ khâu kiểm tra mã nguồn (Linting, Unit Test) đến khâu đóng gói sản phẩm (Production Build) và phát hành trực tiếp lên **GitHub Pages**.

> [!NOTE]
> Để pipeline deploy lên GitHub Pages thành công, bạn cần vào **Settings > Pages > Build and deployment** và chọn nguồn là **GitHub Actions**.

---

### 📋 Tính năng nổi bật của Pipeline

- [x] Tối ưu Cache \`npm\` / \`node_modules\` giúp giảm thời gian build từ 4 phút xuống **45 giây**.
- [x] Tự động kiểm tra chất lượng mã bằng \`ng lint\` và \`prettier\`.
- [x] Build bản phát hành Angular 22 với chuẩn ES2022 và Service Worker PWA.
- [x] Tự động cập nhật \`base-href\` tương ứng với repository GitHub Pages.

---

### 💻 Cấu hình GitHub Actions Workflow (\`.github/workflows/deploy.yml\`)

Dưới đây là file workflow hoàn chỉnh để tự động deploy:

\`\`\`yaml
name: Deploy Angular 22 + Ionic to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout mã nguồn
        uses: actions/checkout@v4

      - name: Cài đặt Node.js 22.x
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Cài đặt dependencies
        run: npm ci

      - name: Build ứng dụng Angular
        run: npm run build -- --configuration production

      - name: Cấu hình GitHub Pages
        uses: actions/configure-pages@v4

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './www'

      - name: Xuất bản lên GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
\`\`\`

> [!TIP]
> Sử dụng lệnh \`npm ci\` thay vì \`npm install\` trên CI/CD để đảm bảo đúng 100% phiên bản dependencies được ghi nhận trong file \`package-lock.json\`.

---

### 📊 So sánh hiệu năng Build

| Chỉ số (Metrics) | Build truyền thống | Pipeline tối ưu Cache | Mức cải thiện |
| :--- | :---: | :---: | :---: |
| Thời gian cài dependencies | 180s | 25s | **Giảm 86%** |
| Thời gian biên dịch (Build) | 90s | 45s | **Giảm 50%** |
| Dung lượng Artifact gzip | 1.8 MB | 1.2 MB | **Giảm 33%** |
| Tỷ lệ thành công Pipeline | 92% | **99.9%** | Tăng độ tin cậy |

> [!IMPORTANT]
> Đối với Single Page Application (SPA), hãy đảm bảo cấu hình URL rewrite hoặc copy \`index.html\` thành \`404.html\` để tránh lỗi khi người dùng F5 tải lại trang.`,
      summary: 'Hướng dẫn toàn diện về CI/CD tự động hóa kiểm tra cú pháp, tối ưu build Linux runner và deploy lên GitHub Pages cho Angular 22 & Ionic.',
      imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80',
      publishedAt: '2026-10-24T08:00:00Z',
      viewCount: 3240,
      createAt: '2026-10-24T07:30:00Z',
      updateAt: '2026-10-26T10:15:00Z',
      author: 'Phú Nguyễn',
      category: 'CI/CD & DevOps',
      tags: ['CI/CD', 'GitHub Actions', 'Angular 22', 'Ionic', 'GitHub Pages'],
      favorite: true
    },
    {
      id: 2,
      title: 'Hướng Dẫn Tự Động Build APK & Phân Phối Firebase App Distribution Bằng CI/CD',
      content: `## 📱 Tự Động Build APK & Phân Phối Qua Firebase App Distribution

Quy trình tự động hóa đóng gói ứng dụng di động Android (Capacitor 7 + Angular 22) và gửi file APK thử nghiệm đến hòm thư của toàn bộ Tester chỉ sau một lệnh \`git push\`.

> [!TIP]
> Bạn có thể tạo nhóm tester chuyên biệt trên Firebase Console (ví dụ: \`qa-team\`, \`internal-beta\`) để tự động phân quyền truy cập bản build mới.

---

### 🛠️ Các bước thực hiện chính

1. Cài đặt môi trường **Java 21 (Temurin)** và **Android SDK 34**.
2. Đồng bộ mã nguồn Web sang thư mục Android bằng lệnh \`npx cap sync android\`.
3. Biên dịch bản APK Release bằng Gradle wrapper \`./gradlew assembleRelease\`.
4. Ký mã APK bằng Keystore bảo mật lưu trữ trong GitHub Secrets.
5. Upload APK lên **Firebase App Distribution** qua Firebase CLI action.

---

### 💻 Đoạn mã GitHub Actions Workflow mẫu

\`\`\`yaml
name: Build Android APK & Distribute to Firebase

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  build-android:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Java 21
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'

      - name: Cài đặt Node.js & Dependencies
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - run: npm ci
      - run: npm run build
      - run: npx cap sync android

      - name: Build APK với Gradle
        run: |
          cd android
          chmod +x gradlew
          ./gradlew assembleRelease

      - name: Upload APK lên Firebase App Distribution
        uses: w9jds/firebase-action@master
        with:
          args: appdistribution:distribute android/app/build/outputs/apk/release/app-release.apk --app \${{ secrets.FIREBASE_APP_ID }} --groups qa-testers
        env:
          FIREBASE_TOKEN: \${{ secrets.FIREBASE_TOKEN }}
\`\`\`

> [!WARNING]
> Tuyệt đối không commit file Keystore hoặc mật khẩu Key Store vào Git public. Luôn sử dụng GitHub Encrypted Secrets!`,
      summary: 'Quy trình tự động tăng version, biên dịch file APK Android với Java 21 và gửi tự động cho nhóm testers qua Firebase App Distribution.',
      imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80',
      publishedAt: '2026-10-25T09:30:00Z',
      viewCount: 2850,
      createAt: '2026-10-25T08:45:00Z',
      updateAt: '2026-10-26T11:00:00Z',
      author: 'Phú Nguyễn',
      category: 'Android & Firebase',
      tags: ['Firebase', 'Android', 'APK', 'Capacitor 7', 'CI/CD'],
      favorite: false
    },
    {
      id: 3,
      title: 'Hướng Dẫn Tự Động Build AAB & Upload Lên Google Play Console (CH Play)',
      content: `## 📦 Xuất Bản Android App Bundle (AAB) Lên Google Play Console

Hướng dẫn thiết lập pipeline CI/CD tự động xuất xưởng gói phát hành chính thức (.aab) và tải lên các đường đua (Tracks) như Internal Testing hoặc Closed Testing trên **Google Play Console**.

> [!IMPORTANT]
> Google Play bắt buộc tất cả ứng dụng mới phải xuất bản dưới dạng **Android App Bundle (.aab)** thay vì file .apk truyền thống để tối ưu dung lượng tải về cho người dùng.

---

### 🔑 Các Secret cần chuẩn bị trong GitHub Repository

| Tên Secret | Mục đích sử dụng |
| :--- | :--- |
| \`ANDROID_KEYSTORE_BASE64\` | Chuỗi mã hóa Base64 của file .keystore hoặc .jks ký mã |
| \`ANDROID_KEY_ALIAS\` | Tên Alias dùng khi tạo Key |
| \`ANDROID_KEY_PASSWORD\` | Mật khẩu của Key Alias |
| \`PLAY_CONSOLE_SERVICE_ACCOUNT_JSON\` | JSON Service Account API cấp quyền từ Google Cloud |

---

### 📜 Lệnh sinh Android App Bundle

\`\`\`bash
# Di chuyển vào thư mục android và build bundle release
cd android
./gradlew bundleRelease

# Kiểm tra file đầu ra
ls -lh app/build/outputs/bundle/release/app-release.aab
\`\`\`

> [!CAUTION]
> Đảm bảo mỗi lần xuất bản lên Google Play, giá trị \`versionCode\` trong file \`android/app/build.gradle\` phải luôn lớn hơn số phiên bản trước đó.`,
      summary: 'Từng bước tạo Keystore ký mã, cấu hình Service Account API và tự động xuất bản Android App Bundle (.aab) lên Google Play Console bằng GitHub Actions.',
      imageUrl: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&auto=format&fit=crop&q=80',
      publishedAt: '2026-10-25T14:00:00Z',
      viewCount: 2190,
      createAt: '2026-10-25T13:15:00Z',
      updateAt: '2026-10-26T12:00:00Z',
      author: 'Phú Nguyễn',
      category: 'Google Play',
      tags: ['Google Play', 'Android', 'AAB', 'Release', 'Capacitor'],
      favorite: true
    },
    {
      id: 4,
      title: 'Hướng Dẫn Tự Động Build IPA & Upload Lên Apple App Store / TestFlight (iOS)',
      content: `## 🍏 Tự Động Build & Phân Phối TestFlight / App Store (iOS)

Thiết lập pipeline CI/CD chạy trên macOS runner để ký mã với Apple Distribution Certificate, tự động tạo IPA và upload lên TestFlight qua App Store Connect API.

> [!NOTE]
> GitHub Actions hỗ trợ runner \`macos-latest\` (Apple Silicon M1/M2) giúp thời gian archive dự án Xcode nhanh hơn gấp 3 lần so với runner Intel trước đây.

---

### 🛠️ Công nghệ & Công cụ sử dụng

- **Fastlane**: Tự động hóa các bước match provisioning profile, build và upload.
- **App Store Connect API Key (.p8)**: Xác thực không cần tài khoản 2FA.
- **Xcode Archive & Export**: Đóng gói file .ipa hoàn chỉnh.

\`\`\`ruby
# fastlane/Fastfile
default_platform(:ios)

platform :ios do
  desc "Push a new beta build to TestFlight"
  lane :beta do
    setup_ci
    api_key = app_store_connect_api_key(
      key_id: ENV["APP_STORE_KEY_ID"],
      issuer_id: ENV["APP_STORE_ISSUER_ID"],
      key_content: ENV["APP_STORE_KEY_P8"]
    )
    build_app(workspace: "App.xcworkspace", scheme: "App")
    upload_to_testflight(api_key: api_key)
  end
end
\`\`\`

> [!TIP]
> Sử dụng Fastlane Match để lưu trữ chứng chỉ trong một Git repository riêng tư có mã hóa AES-256.`,
      summary: 'Giải thích hệ thống Apple Code Signing (.p12, provisioning profile), API Key .p8 và pipeline build IPA với Xcode archive trên runner macOS.',
      imageUrl: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&auto=format&fit=crop&q=80',
      publishedAt: '2026-10-26T08:00:00Z',
      viewCount: 1940,
      createAt: '2026-10-26T07:00:00Z',
      updateAt: '2026-10-26T13:45:00Z',
      author: 'Phú Nguyễn',
      category: 'iOS & App Store',
      tags: ['iOS', 'App Store', 'TestFlight', 'Xcode', 'IPA'],
      favorite: false
    }
  ]);

  // 3. computed lọc theo debouncedKeyword.value() thay vì keyword() trực tiếp!
  public favoriteBlogs = computed(() => {
    const search = (this.debouncedKeyword.value() ?? '').toLowerCase();
    return this.blogPosts().filter(post => post.favorite && post.title.toLowerCase().includes(search));
  }, {
    equal: arrayEqualByKey('id')
  });

  // 4. computed lọc bài viết theo search và danh mục
  public filteredBlogPosts = computed(() => {
    const search = (this.debouncedKeyword.value() ?? '').trim().toLowerCase();
    const selectedCatId = this.selectedCategory();
    
    // Tìm thông tin danh mục theo id
    const activeCat = this.categoriesWithCount().find(c => c.id === selectedCatId);
    const targetCatName = activeCat?.name?.trim();

    return this.blogPosts().filter(post => {
      const matchSearch = !search || 
        post.title.toLowerCase().includes(search) || 
        post.category.toLowerCase().includes(search) ||
        (post.summary && post.summary.toLowerCase().includes(search));
      
      const postCat = post.category ? post.category.trim() : '';
      const matchCat = selectedCatId === 'all' || 
        postCat === selectedCatId || 
        (targetCatName && postCat.toLowerCase() === targetCatName.toLowerCase());

      return matchSearch && matchCat;
    });
  });

  public selectedBlog = signal<BlogPost>(this.blogPosts()[0]);
  public editTitle = linkedSignal(() => this.selectedBlog().title);

  constructor() {
    effect(() => {
      console.log('--- Đang chọn bài:', this.selectedBlog().title);
      console.log('--- Giá trị trong ô Edit Title:', this.editTitle());
    });
  }

  async ngOnInit() {
    this.isLoading.set(true);
    try {
      // Tải đồng thời cả blogs và categories từ Firebase Realtime Database
      const [posts, remoteCats] = await Promise.all([
        this.blogService.getBlogs(),
        this.categoryService.getCategories()
      ]);

      if (posts && posts.length > 0) {
        this.blogPosts.set(posts);
        this.selectedBlog.set(posts[0]);
      }

      if (remoteCats && remoteCats.length > 0) {
        this.rawCategories.set(remoteCats);
      }
    } catch (err) {
      console.error('Không thể tải dữ liệu từ Firebase:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  // Chọn bài khác để sửa và mở form cập nhật đầy đủ field
  chooseBlogToEdit(blog: BlogPost) {
    this.selectedBlog.set(blog);
    this.openEditModal(blog);
  }

  // Lưu nhanh tiêu đề từ LinkedSignal
  async saveTitle() {
    this.blogPosts.update(posts =>
      posts.map(p => p.id === this.selectedBlog().id ? { ...p, title: this.editTitle() } : p)
    );
    try {
      await this.blogService.saveBlogs(this.blogPosts());
      console.log('🔥 Đã đồng bộ tiêu đề mới lên Firebase RTDB!');
    } catch (err) {
      console.error('❌ Lỗi lưu tiêu đề lên Firebase:', err);
    }
  }

  onSearch(event: Event) {
    this.keyword.set((event.target as HTMLInputElement).value);
  }

  // ==========================================
  // Mở Modal Tạo bài viết với đầy đủ thông số model
  // ==========================================
  async openCreateModal(mode: 'signal-form' | 'reactive-form' | 'template-driven-form' = 'signal-form') {
    const modal = await this.modalCtrl.create({
      component: BlogFormComponent,
      cssClass: 'blog-form-modal',
      componentProps: {
        mode: mode,
        initialData: null,
        categories: this.rawCategories().map(c => c.name)
      }
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss<BlogSubmitData>();

    if (role === 'confirm' && data) {
      // Tự động tạo và lưu chuyên mục mới vào Firebase nếu người dùng chọn "Khác"
      const chosenCatName = data.category ? data.category.trim() : '';
      if (chosenCatName && chosenCatName !== 'Khác') {
        const existingCats = this.rawCategories();
        const exists = existingCats.some(
          c => c.name.trim().toLowerCase() === chosenCatName.toLowerCase()
        );

        if (!exists) {
          const newCat: BlogCategory = {
            id: slugify(chosenCatName) || `cat-${Date.now()}`,
            name: chosenCatName
          };
          const updatedCategories = [...existingCats, newCat];
          this.rawCategories.set(updatedCategories);

          // Lưu danh mục mới vào Firebase RTDB (blogs-dev/categories) qua CategoryService
          this.categoryService.saveCategories(updatedCategories).then(() => {
            console.log('🔥 Đã tự động tạo và lưu chuyên mục mới vào Firebase:', newCat);
          }).catch(err => {
            console.error('❌ Lỗi khi lưu chuyên mục mới lên Firebase:', err);
          });
        }
      }

      const newPost: BlogPost = {
        id: Date.now(),
        title: data.title,
        category: data.category,
        author: data.author,
        imageUrl: data.imageUrl,
        summary: data.summary,
        content: data.content,
        tags: data.tags,
        publishedAt: data.publishedAt || new Date().toISOString(),
        viewCount: data.viewCount ?? 0,
        createAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
        favorite: !!data.favorite
      };

      this.blogPosts.update(posts => [newPost, ...posts]);
      this.selectedBlog.set(newPost);
      console.log('✅ Đã tạo bài viết mới đầy đủ model:', newPost);

      // Đồng bộ trực tiếp lên Firebase Realtime Database
      try {
        await this.blogService.saveBlogs(this.blogPosts());
        console.log('🔥 Đã lưu bài viết mới lên Firebase RTDB!');
      } catch (err) {
        console.error('❌ Lỗi khi lưu bài mới lên Firebase:', err);
      }
    }
  }

  // ==========================================
  // Mở Modal Cập nhật bài viết với đầy đủ thông số model
  // ==========================================
  async openEditModal(blog: BlogPost, mode: 'signal-form' | 'reactive-form' | 'template-driven-form' = 'signal-form') {
    const modal = await this.modalCtrl.create({
      component: BlogFormComponent,
      cssClass: 'blog-form-modal',
      componentProps: {
        mode: mode,
        initialData: blog,
        categories: this.rawCategories().map(c => c.name)
      }
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss<BlogSubmitData>();

    if (role === 'confirm' && data) {
      // Tự động tạo và lưu chuyên mục mới vào Firebase nếu người dùng chọn "Khác"
      const chosenCatName = data.category ? data.category.trim() : '';
      if (chosenCatName && chosenCatName !== 'Khác') {
        const existingCats = this.rawCategories();
        const exists = existingCats.some(
          c => c.name.trim().toLowerCase() === chosenCatName.toLowerCase()
        );

        if (!exists) {
          const newCat: BlogCategory = {
            id: slugify(chosenCatName) || `cat-${Date.now()}`,
            name: chosenCatName
          };
          const updatedCategories = [...existingCats, newCat];
          this.rawCategories.set(updatedCategories);

          this.categoryService.saveCategories(updatedCategories).then(() => {
            console.log('🔥 Đã tự động tạo và lưu chuyên mục mới vào Firebase:', newCat);
          }).catch(err => {
            console.error('❌ Lỗi khi lưu chuyên mục mới lên Firebase:', err);
          });
        }
      }

      const updatedPost: BlogPost = {
        ...blog,
        title: data.title,
        category: data.category,
        author: data.author,
        imageUrl: data.imageUrl,
        summary: data.summary,
        content: data.content,
        tags: data.tags,
        favorite: !!data.favorite,
        publishedAt: data.publishedAt || blog.publishedAt,
        viewCount: data.viewCount ?? blog.viewCount,
        updateAt: new Date().toISOString()
      };

      this.blogPosts.update(posts =>
        posts.map(p => p.id === blog.id ? updatedPost : p)
      );

      if (this.selectedBlog().id === blog.id) {
        this.selectedBlog.set(updatedPost);
      }
      console.log('✅ Đã cập nhật bài viết đầy đủ model:', updatedPost);

      // Đồng bộ trực tiếp lên Firebase Realtime Database
      try {
        await this.blogService.saveBlogs(this.blogPosts());
        console.log('🔥 Đã lưu thành công bài viết cập nhật lên Firebase RTDB!');
      } catch (err) {
        console.error('❌ Lỗi khi lưu cập nhật lên Firebase:', err);
      }
    }
  }

  async toggleFavorite(id: number) {
    this.blogPosts.update(posts =>
      posts.map(post =>
        post.id === id ? { ...post, favorite: !post.favorite } : post
      )
    );
    try {
      await this.blogService.saveBlogs(this.blogPosts());
    } catch (err) {
      console.error('❌ Lỗi lưu favorite lên Firebase:', err);
    }
  }

}
