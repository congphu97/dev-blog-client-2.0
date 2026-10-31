# CẨM NANG THIẾT LẬP GOOGLE ANTIGRAVITY (AGY) TOÀN DIỆN: SETUP HIỆU QUẢ, WORKSPACE SKILLS CHO FRONTEND & CẤU HÌNH MCP SERVERS

> **Mục tiêu:** Cung cấp hướng dẫn toàn diện, chuẩn xác từ kiến trúc nền tảng đến thực chiến để biến **Google Antigravity** thành trợ lý lập trình siêu cấp (AI Pair Programmer) cho các dự án Frontend (Angular, React, Vue, Hybrid Mobile).

---

## 📌 MỤC LỤC TỔNG QUAN (TABLE OF CONTENTS)

- [1. Tổng Quan Kiến Trúc Google Antigravity & Nguyên Tắc Vận Hành](#1-tổng-quan-kiến-trúc-google-antigravity--nguyên-tắc-vận-hành)
- [2. Thiết Lập & Tối Ưu Hóa Antigravity Môi Trường Dự Án (Best Practices)](#2-thiết-lập--tối-ưu-hóa-antigravity-môi-trường-dự-án-best-practices)
  - [2.1. Cấu trúc thư mục tùy biến & Thứ tự ưu tiên (Loading Priority)](#21-cấu-trúc-thư-mục-tùy-biến--thứ-tự-ưu-tiên-loading-priority)
  - [2.2. Thiết lập Bộ Quy Tắc (Rules) với `GEMINI.md` / `AGENTS.md`](#22-thiết-lập-bộ-quy-tắc-rules-với-geminimd--agentsmd)
  - [2.3. Quản lý Ngân Sách Ngữ Cảnh (Context Window & Budget Limits)](#23-quản-lý-ngân-sách-ngữ-cảnh-context-window--budget-limits)
  - [2.4. Khai thác hệ thống Slash Commands đắc lực](#24-khai-thác-hệ-thống-slash-commands-đắc-lực)
- [3. Hướng Dẫn Thiết Lập Skills Cho Source Code Frontend](#3-hướng-dẫn-thiết-lập-skills-cho-source-code-frontend)
  - [3.1. Cấu trúc chuẩn của một Skill Package](#31-cấu-trúc-chuẩn-của-một-skill-package)
  - [3.2. Cơ chế Progressive Disclosure (Tiết lộ lũy tiến)](#32-cơ-chế-progressive-disclosure-tiết-lộ-lũy-tiến)
  - [3.3. Bộ 3 Skills thực chiến mẫu cho dự án Frontend](#33-bộ-3-skills-thực-chiến-mẫu-cho-dự-án-frontend)
    - [Skill 1: `fe-component-architect` (Tạo Component chuẩn Design System)](#skill-1-fe-component-architect-tạo-component-chuẩn-design-system)
    - [Skill 2: `fe-performance-audit` (Kiểm tra Core Web Vitals & Bundle)](#skill-2-fe-performance-audit-kiểm-tra-core-web-vitals--bundle)
    - [Skill 3: `fe-a11y-checker` (Đảm bảo Tiêu chuẩn Web Accessibility)](#skill-3-fe-a11y-checker-đảm-bảo-tiêu-chuẩn-web-accessibility)
- [4. Hướng Dẫn Cấu Hình MCP (Model Context Protocol) Servers](#4-hướng-dẫn-cấu-hình-mcp-model-context-protocol-servers)
  - [4.1. Bản chất của giao thức MCP trong Antigravity](#41-bản-chất-của-giao-thức-mcp-trong-antigravity)
  - [4.2. File cấu hình `mcp_config.json` (Stdio vs Streamable HTTP)](#42-file-cấu-hình-mcp_configjson-stdio-vs-streamable-http)
  - [4.3. Top 4 MCP Servers đắc lực nhất cho Frontend Engineer](#43-top-4-mcp-servers-đắc-lực-nhất-cho-frontend-engineer)
    - [MCP 1: Chrome DevTools / Puppeteer (Kiểm tra UI & DOM runtime)](#mcp-1-chrome-devtools--puppeteer-kiểm-tra-ui--dom-runtime)
    - [MCP 2: Figma MCP (Đọc Token thiết kế & Biến thành CSS/Code)](#mcp-2-figma-mcp-đọc-token-thiết-kế--biến-thành-csscode)
    - [MCP 3: Filesystem / Database Mock MCP](#mcp-3-filesystem--database-mock-mcp)
    - [MCP 4: GitHub / GitLab MCP (Tự động hóa PR & Code Review)](#mcp-4-github--gitlab-mcp-tự-động-hóa-pr--code-review)
  - [4.4. Cách Debug và xác nhận MCP Server hoạt động](#44-cách-debug-và-xác-nhận-mcp-server-hoạt-động)
- [5. Nghệ Thuật Viết Prompt Hiệu Quả Trong Antigravity (Prompt Engineering For Developers)](#5-nghệ-thuật-viết-prompt-hiệu-quả-trong-antigravity-prompt-engineering-for-developers)
  - [5.1. Công thức vàng C-T-C-O (Context - Task - Constraints - Output)](#51-công-thức-vàng-c-t-c-o-context---task---constraints---output)
  - [5.2. Prompt Mẫu 1: Fix Bug (Sửa Lỗi & Debug Chuẩn Xác 100%)](#52-prompt-mẫu-1-fix-bug-sửa-lỗi--debug-chuẩn-xác-100)
  - [5.3. Prompt Mẫu 2: Phát Triển Tính Năng Mới (Feature Development)](#53-prompt-mẫu-2-phát-triển-tính-năng-mới-feature-development)
  - [5.4. Prompt Mẫu 3: Soạn Thảo Tài Liệu Kỹ Thuật (Technical Documentation & TSD)](#54-prompt-mẫu-3-soạn-thảo-tài-liệu-kỹ-thuật-technical-documentation--tsd)
  - [5.5. Prompt Mẫu 4: Tối Ưu Hiệu Năng & Refactor Code (Performance Tuning)](#55-prompt-mẫu-4-tối-ưu-hiệu-năng--refactor-code-performance-tuning)
- [6. Bảng Tóm Tắt & Checklist Triển Khai Dự Án Mới](#6-bảng-tóm-tắt--checklist-triển-khai-dự-án-mới)

---

# 1. Tổng Quan Kiến Trúc Google Antigravity & Nguyên Tắc Vận Hành

**Google Antigravity (AGY)** là nền tảng phát triển phần mềm AI-first thế hệ mới của Google, tích hợp mô hình Gemini tiên tiến với khả năng chạy ngầm tự trị (Autonomous Subagents), quản lý tiến trình nền (Background Tasks), và mở rộng năng lực qua hệ thống **Customization System** (Rules, Skills, Hooks, Plugins, MCP Servers).

### Mô hình kiến trúc 3 tầng:
```
┌────────────────────────────────────────────────────────────────────────┐
│                   GIAO DIỆN NGƯỜI DÙNG & TƯƠNG TÁC                     │
│    Antigravity IDE  /  Desktop App 2.0  /  Antigravity CLI (agy)       │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    ANTIGRAVITY AGENT ORCHESTRATOR                      │
│  - Phân tích ngữ cảnh (Context Engine) & Quản lý ngân sách Token       │
│  - Điều phối Subagents (Self, Research, Image-Generator, Custom)       │
│  - Thực thi công cụ: File I/O, Bash Sandbox, Terminal Tasks            │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    HỆ THỐNG TÙY BIẾN (CUSTOMIZATIONS)                  │
│   ├── Workspace Rules  : GEMINI.md / AGENTS.md (Quy định bắt buộc)     │
│   ├── Workspace Skills : .agents/skills/ (Runbooks & Cheatsheets)      │
│   ├── Plugins          : Gói đóng gói Rules + Skills + MCP Servers     │
│   └── MCP Servers      : Kết nối ngoại vi (Figma, Chrome DevTools, DB) │
└────────────────────────────────────────────────────────────────────────┘
```

---

# 2. Thiết Lập & Tối Ưu Hóa Antigravity Môi Trường Dự Án (Best Practices)

Để Antigravity hiểu sâu sắc cấu trúc source code Frontend và không bao giờ viết code sai lệch chuẩn của team, bạn cần thiết lập cấu trúc file cấu hình đúng chuẩn.

---

### 2.1. Cấu trúc thư mục tùy biến & Thứ tự ưu tiên (Loading Priority)

Antigravity quét và phát hiện các tùy biến theo thứ tự ưu tiên từ **cao xuống thấp**:

```
[1. Workspace Root (.agents/)]  ──► Ưu tiên cao nhất (ghi đè cấu hình bên dưới)
          │
          ▼
[2. Workspace Declared (skills.json)]
          │
          ▼
[3. Global Config (~/.gemini/config/)] ──► Áp dụng cho mọi dự án trên máy cá nhân
          │
          ▼
[4. Built-in Customizations]    ──► Các skills mặc định của Google
```

#### Cây thư mục khuyến nghị cho dự án Frontend:
```text
my-frontend-app/
├── .agents/                      # Thư mục cấu hình Antigravity của dự án
│   ├── rules/                    # Các quy chuẩn code chi tiết
│   │   ├── typescript.md
│   │   ├── state-management.md
│   │   └── accessibility.md
│   └── skills/                   # Các skills đặc thù cho dự án
│       ├── fe-component-architect/
│       │   └── SKILL.md
│       └── fe-performance-audit/
│           ├── SKILL.md
│           └── scripts/audit.sh
├── GEMINI.md                     # Quy chuẩn cốt lõi (Root Project Rule)
├── package.json
└── src/
```

---

### 2.2. Thiết lập Bộ Quy Tắc (Rules) với `GEMINI.md` / `AGENTS.md`

File `GEMINI.md` hoặc `AGENTS.md` đặt tại thư mục gốc của dự án được Antigravity tự động tải vào ngữ cảnh của **mọi lượt hội thoại**.

#### Mẫu file `GEMINI.md` chuẩn cho dự án Frontend (Angular / React / Hybrid):
```markdown
# DỰ ÁN FRONTEND: QUY TẮC PHÁT TRIỂN & CHUẨN MỰC BẮT BUỘC

> File này được Antigravity đọc tự động để áp dụng trong mọi phản hồi và thao tác code.

## 1. Công nghệ & Phiên bản Cốt lõi
- **Framework**: Angular v19+ (Stand-alone components, Signals, Zineless change detection) HOẶC React 18/19 (Hooks, Concurrent features).
- **Ngôn ngữ**: TypeScript 5.x ở chế độ `strict: true`. Tuyệt đối KHÔNG dùng kiểu dữ liệu `any`.
- **CSS**: SCSS sử dụng hệ thống CSS Variables (`var(--app-*)`), tuân thủ chuẩn Light/Dark theme tokens.

## 2. Tiêu chuẩn viết Code & Kiến trúc
- **Component-Driven**: Component phải nhỏ, thuần khiết (pure), phân chia rõ ràng giữa Smart/Container Component và Presentational/Dumb Component.
- **Quản lý Bất đồng bộ**:
  - Không subscribe Observable thủ công mà không dọn dẹp bộ nhớ (bắt buộc dùng `takeUntilDestroyed` hoặc `async` pipe).
  - Ưu tiên sử dụng Signals (`signal`, `computed`, `resource()`) cho reactive state.
- **Hiệu năng & Tối ưu**:
  - Luôn sử dụng `ChangeDetectionStrategy.OnPush` cho mọi component.
  - Sử dụng Virtual Scrolling (`@angular/cdk` hoặc `react-window`) khi render danh sách trên 50 phần tử.

## 3. Quy tắc Kiểm tra & An toàn (Safety Guardrails)
- Không bao giờ xóa file dữ liệu hoặc chạy lệnh phá hủy (`rm -rf`, `drop table`) mà không có sự xác nhận của người dùng.
- Sau khi chỉnh sửa code, luôn chạy lệnh kiểm tra cú pháp và build:
  `npm run build`
```

---

### 2.3. Quản lý Ngân Sách Ngữ Cảnh (Context Window & Budget Limits)

Để tránh làm tràn cửa sổ ngữ cảnh (Context Window) của AI, Antigravity áp dụng các giới hạn ngân sách nghiêm ngặt:
1. **Giới hạn mỗi file Rule (`24 KB` / `24,000 bytes`)**: Mỗi file rule tối đa 24KB. Nếu vượt quá, hệ thống sẽ tự động cắt ngắn ở ranh giới dòng.
2. **Tổng ngân sách Rules (`20,000 tokens`)**: Toàn bộ các rule luôn bật (`always-on`) chia sẻ chung ngân sách 20,000 tokens. Nếu vượt quá, Antigravity sẽ chuyển rule đó từ dạng "inline toàn bộ nội dung" sang dạng "con trỏ đường dẫn file" để agent tự đọc khi cần.
3. **Mẹo tối ưu**: Viết rule súc tích, chỉ nêu quy tắc cốt lõi; những quy trình hướng dẫn từng bước dài dòng hãy chuyển sang dạng **Skills**.

---

### 2.4. Khai thác hệ thống Slash Commands đắc lực

Bạn có thể tận dụng các lệnh Slash Command có sẵn trong ô chat UI của Antigravity để tăng tốc:

| Slash Command | Mục đích & Tình huống nên dùng |
| :--- | :--- |
| **`/plan`** | Dùng khi gặp tính năng lớn hoặc bug phức tạp. Yêu cầu agent lập kế hoạch chi tiết từng bước trước khi viết code. |
| **`/boost`** | Kích hoạt chế độ suy nghĩ sâu (Deep Thinking), lập luận đa chiều và tự phản biện giải pháp. |
| **`/grill-me`** | Agent đóng vai trò phỏng vấn kỹ thuật, đặt câu hỏi phản biện để làm rõ yêu cầu trước khi triển khai. |
| **`/goal`** | Chạy tác vụ tự trị dài hạn (Long-running autonomous task), agent sẽ tự động chạy, kiểm tra và sửa lỗi đến khi hoàn thành mục tiêu mới dừng. |
| **`/compact`** | Thu gọn ngữ cảnh hội thoại khi cuộc trò chuyện quá dài để giải phóng bộ nhớ token. |
| **`/learn`** | Lưu lại các hướng dẫn hoặc sửa đổi vừa làm vào bộ nhớ của agent cho các lần làm việc tương lai. |
| **`/browser`** | Mở trình duyệt tương tác trực tiếp với ứng dụng web, click nút, chụp ảnh màn hình và kiểm tra kết quả hiển thị. |

---

# 3. Hướng Dẫn Thiết Lập Skills Cho Source Code Frontend

**Skills** là các gói hướng dẫn (runbooks / cheatsheets) dạy cho AI biết **cách thực hiện một quy trình cụ thể từng bước** mà không làm tốn context window thường trực.

---

### 3.1. Cấu trúc chuẩn của một Skill Package

Mỗi Skill là một thư mục nằm trong `.agents/skills/<tên-skill>/` với cấu trúc bắt buộc:

```text
.agents/skills/my-frontend-skill/
├── SKILL.md          # [BẮT BUỘC]: File hướng dẫn chính có YAML Frontmatter
├── scripts/          # [TÙY CHỌN]: Các script bash/node tự động hóa
├── examples/         # [TÙY CHỌN]: Code mẫu hoặc component mẫu
├── resources/        # [TÙY CHỌN]: Template cấu hình, SVG, mock JSON
└── references/       # [TÙY CHỌN]: Tài liệu giải thích chuyên sâu
```

#### Quy tắc viết file `SKILL.md`:
Bắt đầu bằng phần **YAML Frontmatter** với 2 trường bắt buộc:
* `name`: Tên định danh (viết thường, dùng dấu gạch ngang, ví dụ: `fe-component-architect`).
* `description`: Mô tả ngắn bằng **ngôi thứ 3**, chỉ rõ **Skill này làm gì và ĐƯỢC DÙNG KHI NÀO**.

---

### 3.2. Cơ chế Progressive Disclosure (Tiết lộ lũy tiến)

* **Ban đầu:** Antigravity **chỉ đọc trường `name` và `description`** của skill đưa vào System Prompt.
* **Khi cần:** Chỉ khi người dùng yêu cầu tác vụ liên quan (ví dụ: *"hãy tạo một modal component"*), Agent mới kích hoạt và đọc toàn bộ nội dung chi tiết bên trong file `SKILL.md`.
* **Tiết kiệm Token:** Giúp bạn có thể tích hợp hàng chục skills vào dự án mà không lo bị đầy context window!

---

### 3.3. Bộ 3 Skills thực chiến mẫu cho dự án Frontend

#### Skill 1: `fe-component-architect` (Tạo Component chuẩn Design System)

Tạo file `.agents/skills/fe-component-architect/SKILL.md`:

```markdown
---
name: fe-component-architect
description: >-
  Use this skill whenever the user asks to create, scaffold, or refactor a Frontend Component
  (Angular Standalone or React Component), ensuring strict compliance with Design System,
  Signals/Hooks state management, CSS tokens, and Accessibility standards.
---

# Frontend Component Architect Skill

Skill này hướng dẫn quy trình tạo một Component chuẩn mực cho dự án Frontend.

## Quy Trình 4 Bước Tạo Component

### Bước 1: Khởi tạo Cấu Trúc Thư Mục
Mỗi component phải nằm trong thư mục riêng biệt gồm 4 file:
- `[name].component.ts` (Logic)
- `[name].component.html` (Template - nếu dùng Angular)
- `[name].component.scss` (Style với CSS tokens)
- `[name].component.spec.ts` (Unit test)

### Bước 2: Thiết kế Quản Lý Trạng Thái
- Đối với **Angular**: Bắt buộc dùng `input()`, `output()` và `computed()`. Không dùng decorator `@Input()` cũ.
- Đối với **React**: Dùng TypeScript interface rõ ràng cho Props, dùng `useCallback` cho event handlers truyền xuống component con.

### Bước 3: Định dạng CSS Tokens
- Tuyệt đối KHÔNG hardcode mã màu hex (`#ffffff`, `#000000`).
- Bắt buộc dùng biến CSS:
  - Màu nền: `var(--app-card-bg, #ffffff)`
  - Màu chữ chính: `var(--app-text-primary, #0f172a)`
  - Màu chữ phụ: `var(--app-text-muted, #64748b)`
  - Đường viền: `var(--app-card-border, #e2e8f0)`

### Bước 4: Kiểm tra Accessibility (a11y)
- Thẻ `<button>` hoặc icon phải có `aria-label`.
- Form controls phải có `id` gắn kết với `<label htmlFor="...">`.
- Kiểm tra focus state bằng `:focus-visible`.
```

---

#### Skill 2: `fe-performance-audit` (Kiểm tra Core Web Vitals & Bundle)

Tạo file `.agents/skills/fe-performance-audit/SKILL.md`:

```markdown
---
name: fe-performance-audit
description: >-
  Use this skill when the user asks to analyze application performance, optimize bundle size,
  fix slow rendering/lagging UI, or audit Core Web Vitals (FCP, LCP, CLS, INP).
---

# Frontend Performance Audit Runbook

Quy trình chuẩn để chẩn đoán và khắc phục điểm nghẽn hiệu năng trên ứng dụng web/mobile:

## 1. Phân Tích Dung Lượng Bundle (Bundle Size Analysis)
1. Chạy lệnh phân tích gói build:
   `npm run build -- --stats-json`
2. Kiểm tra các thư viện nặng bất thường (moment.js, lodash nguyên khối).
3. Hướng khắc phục:
   - Chuyển sang import theo hàm cụ thể: `import debounce from 'lodash/debounce'`.
   - Áp dụng Route-level Lazy Loading (`loadComponent: () => import(...)`).
   - Sử dụng `@defer` blocks cho các component nằm dưới màn hình (below-the-fold).

## 2. Kiểm Tra Chu Kỳ Re-render
- Đảm bảo component sử dụng `OnPush` (Angular) hoặc `React.memo` (React).
- Không thực hiện tính toán nặng lặp đi lặp lại trong template function: thay bằng `computed()` hoặc `useMemo()`.

## 3. Tối Ưu Hóa Render Danh Sách Lớn
- Nếu danh sách $> 50$ items, bắt buộc chuyển sang Virtual Scrolling (`cdk-virtual-scroll-viewport`).
```

---

#### Skill 3: `fe-a11y-checker` (Đảm bảo Tiêu chuẩn Web Accessibility)

Tạo file `.agents/skills/fe-a11y-checker/SKILL.md`:

```markdown
---
name: fe-a11y-checker
description: >-
  Use this skill when auditing or refactoring HTML/templates for Web Accessibility (a11y)
  compliance (WCAG 2.1 Level AA), screen reader compatibility, and keyboard navigation.
---

# Web Accessibility (a11y) Standards

Mọi thành phần giao diện được sinh ra phải đạt chuẩn **WCAG 2.1 AA**:

## Checklist Bắt Buộc:
1. **Hình ảnh**: Phải luôn có thuộc tính `alt`. Nếu là ảnh trang trí, dùng `alt=""` kèm `aria-hidden="true"`.
2. **Nút bấm Icon**: Bắt buộc có `aria-label` (Ví dụ: `<button aria-label="Đóng cửa sổ">✕</button>`).
3. **Màu sắc & Độ tương phản**: Tỷ lệ tương phản văn bản so với nền tối thiểu là **4.5:1** cho chữ thông thường và **3:1** cho chữ lớn.
4. **Điều hướng bằng bàn phím**: Người dùng có thể nhấn phím `Tab` để di chuyển qua mọi nút và input theo đúng thứ tự logic; phím `Enter` / `Space` để kích hoạt; phím `Esc` để đóng modal/dialog.
```

---

# 4. Hướng Dẫn Cấu Hình MCP (Model Context Protocol) Servers

---

### 4.1. Bản chất của giao thức MCP trong Antigravity

**Model Context Protocol (MCP)** là chuẩn mở do Anthropic khởi xướng và được Google Antigravity hỗ trợ toàn diện. MCP cho phép AI Agent kết nối an toàn với:
* **Hệ thống tệp cục bộ và cơ sở dữ liệu** (Local SQLite, Postgres, Redis).
* **Trình duyệt tự động** (Chrome DevTools, Puppeteer, Playwright).
* **Công cụ thiết kế & Quản lý** (Figma, GitHub, GitLab, Jira, Notion).

Khi MCP Server được cấu hình, Antigravity sẽ tự động khám phá các công cụ (tools) mà server đó cung cấp và biến chúng thành các hàm mà Agent có thể gọi trực tiếp trong cuộc hội thoại!

---

### 4.2. File cấu hình `mcp_config.json` (Stdio vs Streamable HTTP)

Antigravity tìm file cấu hình MCP tại:
* **Toàn cục (Global):** `~/.gemini/config/mcp_config.json` (Áp dụng cho mọi workspace).
* **Theo Plugin:** `plugins/<plugin_name>/mcp_config.json` (Kích hoạt khi plugin bật).

Antigravity hỗ trợ **2 cơ chế truyền tải (Transports)**:
1. **Stdio Transport (Khuyên dùng cho Local Tools)**: Agent khởi chạy trực tiếp một câu lệnh dòng lệnh (`node`, `python`, `npx`) và giao tiếp qua stdin/stdout.
2. **Streamable HTTP Transport (Cho Remote Tools)**: Kết nối với máy chủ MCP từ xa qua đường dẫn URL (`https://.../mcp`).

---

### 4.3. Top 4 MCP Servers đắc lực nhất cho Frontend Engineer

Dưới đây là file `~/.gemini/config/mcp_config.json` mẫu cấu hình sẵn 4 MCP Server mạnh mẽ nhất cho lập trình viên Frontend:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/congphu2210/Desktop/Phu/dev-blog-client-2.0"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_personal_access_token_here"
      }
    },
    "figma-remote": {
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

---

#### Chi tiết tính năng từng MCP Server:

#### MCP 1: Chrome DevTools / Puppeteer (Kiểm tra UI & DOM runtime)
* **Khả năng:** Cho phép Antigravity tự mở trình duyệt headless Chrome, truy cập vào `http://localhost:4200`, click thử các nút bấm, chụp ảnh màn hình lỗi, và đọc log console runtime của trình duyệt.
* **Tình huống sử dụng:**
  - *"Kiểm tra xem màn hình login trên Safari/Chrome có bị vỡ layout không."*
  - *"Chụp ảnh màn hình component blog-list ở cả chế độ Sáng và Tối."*

#### MCP 2: Figma MCP (Đọc Token thiết kế & Biến thành CSS/Code)
* **Khả năng:** Cho phép Agent đọc file thiết kế Figma qua URL, trích xuất mã màu, font-size, khoảng cách padding, cấu trúc Auto-layout và tự sinh ra SCSS/HTML tương ứng 100% pixel-perfect!
* **Tình huống sử dụng:**
  - *"Đọc frame Figma này và sinh ra HTML/SCSS component tương ứng."*

#### MCP 3: Filesystem / Database Mock MCP
* **Khả năng:** Cấp quyền cho Agent truy cập an toàn vào thư mục mock dữ liệu hoặc đọc file SQLite cục bộ để tạo fixture/mock data cho unit test.

#### MCP 4: GitHub / GitLab MCP (Tự động hóa PR & Code Review)
* **Khả năng:** Tạo pull request, đọc commit history, phân tích diff giữa các nhánh, và đọc issue description trực tiếp từ GitHub.
* **Tình huống sử dụng:**
  - *"Tạo một PR từ nhánh feature/pwa vào nhánh main với mô tả ngắn gọn về các thay đổi."*

---

### 4.4. Cách Debug và xác nhận MCP Server hoạt động

1. **Kiểm tra trạng thái trong giao diện Antigravity:**
   - Trong giao diện chat của Antigravity, click vào biểu tượng **Additional Options (`...`)** ở góc trên bên phải.
   - Chọn mục **MCP Servers**.
   - Bạn sẽ nhìn thấy danh sách các server đang chạy (chấm xanh lá cây `Connected`) và toàn bộ danh sách Tools mà server đó cung cấp.
2. **Kiểm tra nhật ký lỗi (Logs):**
   - Nếu một server báo chấm đỏ (`Failed`), click vào tên server để xem log stdout/stderr.
   - Nguyên nhân thường gặp: Thiếu `node` trong PATH, chưa cấp biến môi trường (`GITHUB_PERSONAL_ACCESS_TOKEN`), hoặc sai đường dẫn thư mục.

---

---

# 5. Nghệ Thuật Viết Prompt Hiệu Quả Trong Antigravity (Prompt Engineering For Developers)

Một trong những lý do khiến lập trình viên cảm thấy AI "viết code ngớ ngẩn" hoặc "sửa chỗ này hỏng chỗ kia" là do câu lệnh (Prompt) quá mơ hồ. Trong Antigravity, mô hình Gemini có khả năng đọc toàn bộ codebase và chạy lệnh shell, do đó **chất lượng của câu lệnh quyết định 90% kết quả đầu ra**.

---

### 5.1. Công thức vàng C-T-C-O (Context - Task - Constraints - Output)

Mọi yêu cầu phức tạp gửi đến Antigravity nên được cấu trúc theo 4 thành tố cốt lõi:

```
┌────────────────────────────────────────────────────────────────────────┐
│ [C] CONTEXT      : Chỉ rõ file liên quan, công nghệ, trạng thái hiện tại│
│       │                                                                │
│       ▼                                                                │
│ [T] TASK         : Mục tiêu duy nhất cần hoàn thành (User Story / Goal) │
│       │                                                                │
│       ▼                                                                │
│ [C] CONSTRAINTS  : Ranh giới KHÔNG ĐƯỢC PHÉP vi phạm (Guardrails)      │
│       │                                                                │
│       ▼                                                                │
│ [O] OUTPUT       : Định dạng mong muốn (Diff code, Test, hay Tài liệu) │
└────────────────────────────────────────────────────────────────────────┘
```

#### So sánh trực quan giữa "Prompt Thường" và "Prompt Chuẩn Senior":

| Tiêu chí | Prompt chưa tốt (Bad Prompt) | Prompt chuẩn Senior (Effective Prompt) |
| :--- | :--- | :--- |
| **Fix Bug** | *"Ứng dụng bị lỗi màn hình trắng rồi, fix giùm tao với."* | *"Ở trang `@blog-container`, khi chuyển sang Light Mode thì chữ tiêu đề bị mất màu. Xem file `@blog-container.component.scss` dòng 260 và chuyển các mã màu cứng sang CSS tokens của dự án."* |
| **New Feature** | *"Viết tính năng tìm kiếm bài viết đi."* | *"Xây dựng ô Search debounced 300ms trong `@blog-container`. Dùng Angular `signal` + `effect()`, có nút X để xóa nhanh, hiển thị badge số lượng kết quả tìm thấy."* |
| **Tài liệu** | *"Viết tài liệu giải thích module này."* | *"Soạn tài liệu TSD (Technical Specification Document) cho module State Management dưới dạng Markdown. Bao gồm: 1 sequence diagram Mermaid, bảng so sánh và checklist triển khai."* |

---

### 5.2. Prompt Mẫu 1: Fix Bug (Sửa Lỗi & Debug Chuẩn Xác 100%)

#### Bối cảnh bài toán:
Component bị lỗi hiển thị, rò rỉ bộ nhớ, hoặc crash khi nhận dữ liệu từ API.

#### Prompt Mẫu (Copy & Paste):
```markdown
[CONTEXT]:
Tôi đang gặp lỗi hiển thị trên trang danh sách bài viết tại file:
- `src/app/blog/blog-container/blog-container.component.html`
- `src/app/blog/blog-container/blog-container.component.scss`
Khi người dùng bấm chuyển sang giao diện Light Mode, tiêu đề "Khám phá bài viết" biến mất hoàn toàn, chỉ còn lại con số `(16)`.

[LOG/TRIỆU CHỨNG]:
Kiểm tra Inspect Element thấy text vẫn nằm trong DOM nhưng mang màu trắng `#f8fafc` trên nền trắng sáng `#ffffff`.

[TASK]:
1. Điều tra file SCSS và thay thế toàn bộ các mã màu hex bị hardcode (`#f8fafc`, `#181c24`, `#282f3d`) sang các CSS Theme Tokens chuẩn của dự án (`var(--app-text-primary)`, `var(--app-card-bg)`, `var(--app-card-border)`).
2. Đảm bảo giao diện hiển thị sắc nét trên CẢ 2 chế độ: Dark Mode và Light Mode.

[CONSTRAINTS]:
- Giữ nguyên cấu trúc layout Flexbox/Grid hiện tại, không làm xô lệch vị trí các nút chuyển chế độ "Lưới" và "Danh sách".
- Sau khi sửa xong, hãy chạy lệnh `npm run build` để đảm bảo không có lỗi cú pháp SCSS.
```

> 💡 **Điểm mấu chốt giúp AI làm đúng:** Nêu rõ file nghi ngờ, triệu chứng cụ thể (màu trắng trên nền trắng), yêu cầu dùng token thay vì đổi bừa sang màu đen, và đặt điều kiện chạy build kiểm chứng.

---

### 5.3. Prompt Mẫu 2: Phát Triển Tính Năng Mới (Feature Development)

#### Bối cảnh bài toán:
Tạo một tính năng tìm kiếm thông minh có trì hoãn (Debounce) và lưu lịch sử tìm kiếm gần đây.

#### Prompt Mẫu (Copy & Paste):
```markdown
[CONTEXT]:
Dự án của chúng ta đang sử dụng Angular v19 (Standalone Components, Signals, SCSS).
Tôi muốn bổ sung tính năng "Tìm kiếm thông minh có Debounce & Lịch sử tìm kiếm" vào `src/app/blog/blog-container/`.

[TASK]:
Hãy thiết kế và triển khai tính năng tìm kiếm theo các yêu cầu sau:
1. **Search Input**:
   - Sử dụng Signal `keyword = signal('')`.
   - Trì hoãn phát tín hiệu tìm kiếm 350ms (debounce) để tránh spam tính toán lọc dữ liệu.
   - Có icon kính lúp ở đầu và nút "✕" xóa nhanh ở cuối khi ô nhập có dữ liệu.
2. **Search History Chips**:
   - Lưu 5 từ khóa tìm kiếm gần nhất vào `localStorage` (dưới key `recent_searches`).
   - Hiển thị các từ khóa này dạng Chip/Tag nhỏ bên dưới ô input. Người dùng bấm vào tag nào thì tự điền từ khóa đó vào ô tìm kiếm.
   - Có nút xóa từng tag hoặc xóa toàn bộ lịch sử.

[CONSTRAINTS]:
- **State Management**: Ưu tiên sử dụng Modern Signals (`signal`, `computed`). Không dùng RxJS `Subject` nếu không thực sự cần thiết.
- **Styling**: Sử dụng hoàn toàn CSS variables của dự án (`--app-input-bg`, `--app-pill-bg`...).
- **Accessibility (a11y)**: Nút xóa và ô input phải có đầy đủ thuộc tính `aria-label`.
- **Validation**: Chạy `npm run build` sau khi code xong để kiểm tra lỗi TypeScript/Template.
```

> 💡 **Điểm mấu chốt giúp AI làm đúng:** Chia nhỏ tính năng thành các gạch đầu dòng rõ ràng (Input, History), quy định rõ nơi lưu dữ liệu (`localStorage`), và chỉ định kiến trúc kỹ thuật (`Signals`).

---

### 5.4. Prompt Mẫu 3: Soạn Thảo Tài Liệu Kỹ Thuật (Technical Documentation & TSD)

#### Bối cảnh bài toán:
Cần viết tài liệu kiến trúc (Technical Specification Document - TSD) cho module hoặc chuẩn bị tài liệu bàn giao, review cho ban giám đốc/khách hàng.

#### Prompt Mẫu (Copy & Paste):
```markdown
[CONTEXT]:
Tôi là Senior Frontend Engineer phụ trách module Dynamic CMS & Multi-Tenant Storefront tại dự án E-Commerce.
Dự án phục vụ nhiều chuỗi bán lẻ khác nhau với yêu cầu tùy biến giao diện mà không cần deploy lại mã nguồn.

[TASK]:
Hãy soạn thảo một tài liệu **Technical Specification Document (TSD)** chi tiết, chuyên nghiệp bằng định dạng Markdown cho module này.

[CẤU TRÚC BẮT BUỘC TRONG TÀI LIỆU]:
1. **Executive Summary**: Tóm tắt bài toán kinh doanh và mục tiêu kỹ thuật trong 1 đoạn văn ngắn.
2. **System Architecture Diagram**: Vẽ 1 sơ đồ luồng dữ liệu bằng cú pháp Mermaid (`flowchart TD`) thể hiện tương tác giữa: CMS Server ──► Dynamic Widget Engine ──► StencilJS Web Components ──► Angular Web / Ionic Mobile.
3. **Core Technical Decisions**: Giải thích 3 quyết định kiến trúc then chốt:
   - Tại sao dùng JSON Schema để định nghĩa layout động?
   - Tại sao dùng Adapter Pattern để bọc các SDK bên thứ ba?
   - Cơ chế Caching và Invalidation trên thiết bị người dùng.
4. **Security & Performance Considerations**: Đề cập đến XSS sanitization cho dữ liệu từ CMS và Lazy loading widgets bằng `@defer`.
5. **Rollout & Rollback Strategy**: Chiến lược phát hành an toàn với Feature Flags.

[OUTPUT FORMAT]:
- Markdown chuẩn GitHub Flavored Markdown (GFM).
- Giọng văn chuyên nghiệp, súc tích chuẩn Staff/Lead Engineer. Không viết chung chung sáo rỗng.
```

> 💡 **Điểm mấu chốt giúp AI làm đúng:** Đưa ra cấu trúc mục lục cố định và yêu cầu cụ thể (Mermaid diagram, Mermaid format), ép AI đóng vai trò Senior/Staff Engineer để tránh câu trả lời hời hợt.

---

### 5.5. Prompt Mẫu 4: Tối Ưu Hiệu Năng & Refactor Code (Performance Tuning)

#### Bối cảnh bài toán:
Trang web bị giật lag khi cuộn trang hoặc bundle size quá nặng.

#### Prompt Mẫu (Copy & Paste):
```markdown
[CONTEXT]:
Component `@src/app/blog/blog-grid/blog-grid.component.ts` đang render danh sách bài viết. Khi danh sách tăng lên trên 100 bài viết kèm ảnh và badge, trang bắt đầu xuất hiện hiện tượng sụt giảm FPS (dưới 30 FPS) khi cuộn chuột nhanh.

[TASK]:
Hãy phân tích và refactor component này để tối ưu hiệu năng:
1. Đổi chiến lược phát hiện thay đổi sang `ChangeDetectionStrategy.OnPush`.
2. Kiểm tra các hàm tính toán đang gọi trực tiếp trong template HTML và chuyển chúng sang Signal `computed()`.
3. Tích hợp Virtual Scrolling (`cdk-virtual-scroll-viewport` từ `@angular/cdk/scrolling`) với chiều cao item cố định `280px`.
4. Bổ sung thuộc tính `loading="lazy"` và `decoding="async"` cho các thẻ `<img>`.

[CONSTRAINTS]:
- Giữ nguyên toàn bộ logic tương tác hiện có (thả tim favorite, click xem chi tiết, chia sẻ bài viết).
- Không được làm vỡ giao diện CSS Grid responsive trên thiết bị di động.
- Trình bày rõ ràng: Phần 1 là giải thích nguyên nhân gây nghẽn (Bottlenecks), Phần 2 là code refactor hoàn chỉnh, và Phần 3 là kết quả dự kiến (Metrics improvement).
```

---

# 6. Bảng Tóm Tắt & Checklist Triển Khai Dự Án Mới

Khi bắt đầu một dự án Frontend mới với Google Antigravity, hãy hoàn thành **Checklist 6 bước** sau để đạt hiệu suất cao nhất:

| Bước | Hành động | Mục đích |
| :---: | :--- | :--- |
| **1** | Tạo file `GEMINI.md` tại thư mục gốc | Định hình công nghệ (Angular 19 / React, TypeScript strict, SCSS variables) để AI không viết code lệch chuẩn. |
| **2** | Tạo thư mục `.agents/skills/` | Đưa vào các runbook chuẩn của team: `fe-component-architect`, `fe-performance-audit`. |
| **3** | Cấu hình `~/.gemini/config/mcp_config.json` | Kích hoạt Chrome DevTools / Puppeteer để AI có thể tự chạy thử UI và chụp ảnh màn hình kiểm chứng. |
| **4** | Kiểm tra Context Budget | Đảm bảo các file rule không vượt quá 24KB và tổng rule không vượt quá 20,000 tokens. |
| **5** | Khai thác Slash Commands | Sử dụng `/plan` trước khi code tính năng phức tạp và `/boost` khi cần giải bài toán kiến trúc khó. |
| **6** | Áp dụng công thức C-T-C-O khi prompt | Luôn cung cấp Context, Task, Constraints và Output rõ ràng kèm `@file` để AI làm đúng ngay lần đầu. |

---

> 🚀 **Kết luận:** Với bộ ba **Rules** (Kiểm soát hành vi), **Skills** (Quy trình từng bước không tốn context), **MCP Servers** (Kết nối thế giới bên ngoài) cùng kỹ năng **Prompting chuẩn C-T-C-O**, bạn đã biến Google Antigravity từ một chatbot thông thường thành một **Senior Tech Lead ảo** luôn đồng hành sát cánh bên bạn trong toàn bộ vòng đời phát triển phần mềm!


