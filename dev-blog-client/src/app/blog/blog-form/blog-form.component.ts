import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonFooter,
  ModalController
} from '@ionic/angular/standalone';
import { BlogPost } from '../blog.models';
import { CategoryService } from '../category.service';
import { MarkdownPipe } from '../markdown.pipe';
import { NgcButtonModule, NgcFormFieldModule, NgcCheckboxModule } from 'ngc-library';

export interface BlogSubmitData {
  id?: number;
  title: string;
  category: string;
  author: string;
  imageUrl: string;
  summary: string;
  content: string;
  tags: string[];
  favorite: boolean;
  publishedAt: string;
  viewCount: number;
}

export type FormMode = 'reactive-form' | 'template-driven-form' | 'signal-form';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonFooter,
    MarkdownPipe,
    NgcButtonModule,
    NgcFormFieldModule,
    NgcCheckboxModule
  ]
})
export class BlogFormComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);

  public showLiveContentPreview = signal<boolean>(true);

  public toggleContentPreview() {
    this.showLiveContentPreview.update(v => !v);
  }

  // Input nhận vào kiểu FormMode qua Ionic componentProps
  @Input() mode: FormMode = 'signal-form';
  public currentMode = signal<FormMode>('signal-form');

  // Input nhận vào bài viết ban đầu (nếu là chế độ Cập nhật / Edit)
  @Input() initialData?: BlogPost | null = null;

  // Input danh mục truyền từ ngoài vào
  @Input() categories: string[] = [];

  public categoryList: string[] = [
    'Tips',
    'English',
    'Web Development',
    'Capacitor',
    'Angular',
    'CI/CD & DevOps',
    'Android & Firebase',
    'Google Play',
    'iOS & App Store',
    'Mobile Development',
    'JavaScript & Web APIs',
    'Kiến Trúc & Design Patterns',
    'OOP & Software Design',
    'Khác'
  ];

  public readonly tagOptions = [
    'Angular',
    'Ionic',
    'Capacitor',
    'Firebase',
    'CI/CD',
    'DevOps',
    'Android',
    'iOS',
    'Google Play',
    'App Store',
    'Khác'
  ];

  // Trạng thái cho Chuyên mục Khác
  public customCategorySignal = signal('');

  // Trạng thái cho Thẻ Tag Khác (hiển thị text input)
  public showCustomTagSignal = signal(true);
  public showCustomTagReactive = signal(true);
  public showCustomTagTemplate = signal(true);

  // Kiểm tra xem đang ở chế độ Edit hay Create
  public isEdit = computed(() => !!this.initialData);

  // ========================================================
  // MODE 1: SIGNAL FORM (State thuần bằng Signal + Validation bằng computed)
  // ========================================================
  public signalForm = signal<{
    title: string;
    category: string;
    author: string;
    imageUrl: string;
    summary: string;
    content: string;
    tags: string;
    favorite: boolean;
    publishedAt: string;
    viewCount: number;
  }>({
    title: '',
    category: 'CI/CD & DevOps',
    author: 'Phú Nguyễn',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=800&auto=format&fit=crop&q=80',
    summary: '',
    content: '',
    tags: 'Angular, DevOps, CI/CD',
    favorite: false,
    publishedAt: new Date().toISOString().substring(0, 10),
    viewCount: 0
  });

  // Validation tự động bằng computed: Tiêu đề >= 3 ký tự, có nội dung và tác giả (summary là tùy chọn, tự động trích xuất nếu để trống)
  public isSignalFormValid = computed(() => {
    const data = this.signalForm();
    return (
      data.title.trim().length >= 3 &&
      data.content.trim().length > 0 &&
      data.author.trim().length > 0
    );
  });

  public getMissingSignalFields(): string {
    const data = this.signalForm();
    const missing: string[] = [];
    if (data.title.trim().length < 3) missing.push('Tiêu đề (≥3 ký tự)');
    if (!data.content.trim()) missing.push('Nội dung chi tiết');
    if (!data.author.trim()) missing.push('Tác giả');
    return missing.join(', ') || 'Đã hợp lệ';
  }

  updateSignalField(field: string, value: any) {
    this.signalForm.update(prev => ({ ...prev, [field]: value }));
  }

  // ========================================================
  // MODE 2: REACTIVE FORM (FormGroup, FormControl)
  // ========================================================
  public blogForm!: FormGroup;

  // ========================================================
  // MODE 3: TEMPLATE-DRIVEN FORM (ngModel)
  // ========================================================
  public templateModel = {
    title: '',
    category: 'CI/CD & DevOps',
    customCategory: '',
    author: 'Phú Nguyễn',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=800&auto=format&fit=crop&q=80',
    summary: '',
    content: '',
    tags: 'Angular, DevOps, CI/CD',
    favorite: false,
    publishedAt: new Date().toISOString().substring(0, 10),
    viewCount: 0
  };

  // ========================================================
  // CÁC HÀM XỬ LÝ CHỌN TAG & KHÁC
  // ========================================================
  onTagSelectChange(val: string, formMode: 'signal' | 'reactive' | 'template') {
    if (!val) return;
    if (val === 'Khác') {
      if (formMode === 'signal') this.showCustomTagSignal.set(true);
      else if (formMode === 'reactive') this.showCustomTagReactive.set(true);
      else this.showCustomTagTemplate.set(true);
      return;
    }

    if (formMode === 'signal') {
      const currentTags = this.signalForm().tags
        ? this.signalForm().tags.split(',').map(t => t.trim()).filter(Boolean)
        : [];
      if (!currentTags.includes(val)) {
        currentTags.push(val);
        this.updateSignalField('tags', currentTags.join(', '));
      }
    } else if (formMode === 'reactive') {
      const raw = this.blogForm.get('tags')?.value || '';
      const currentTags = raw ? raw.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
      if (!currentTags.includes(val)) {
        currentTags.push(val);
        this.blogForm.patchValue({ tags: currentTags.join(', ') });
      }
    } else {
      const raw = this.templateModel.tags || '';
      const currentTags = raw ? raw.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
      if (!currentTags.includes(val)) {
        currentTags.push(val);
        this.templateModel.tags = currentTags.join(', ');
      }
    }
  }

  removeTag(tagToRemove: string, formMode: 'signal' | 'reactive' | 'template') {
    if (formMode === 'signal') {
      const currentTags = this.signalForm().tags
        ? this.signalForm().tags.split(',').map(t => t.trim()).filter(Boolean)
        : [];
      const updated = currentTags.filter(t => t !== tagToRemove);
      this.updateSignalField('tags', updated.join(', '));
    } else if (formMode === 'reactive') {
      const raw = this.blogForm.get('tags')?.value || '';
      const currentTags = raw ? raw.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
      const updated = currentTags.filter((t: string) => t !== tagToRemove);
      this.blogForm.patchValue({ tags: updated.join(', ') });
    } else {
      const raw = this.templateModel.tags || '';
      const currentTags = raw ? raw.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
      const updated = currentTags.filter((t: string) => t !== tagToRemove);
      this.templateModel.tags = updated.join(', ');
    }
  }

  getTagBadges(formMode: 'signal' | 'reactive' | 'template'): string[] {
    let raw = '';
    if (formMode === 'signal') {
      raw = this.signalForm().tags;
    } else if (formMode === 'reactive') {
      raw = this.blogForm?.get('tags')?.value || '';
    } else {
      raw = this.templateModel.tags;
    }
    return raw ? raw.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
  }

  // ========================================================
  // CHUYỂN ĐỔI CHẾ ĐỘ FORM (MODE SWITCHER)
  // ========================================================
  setMode(newMode: FormMode) {
    if (this.currentMode() === newMode) return;
    this.syncFormDataBetweenModes(this.currentMode(), newMode);
    this.currentMode.set(newMode);
  }

  private syncFormDataBetweenModes(from: FormMode, to: FormMode) {
    let currentData = {
      title: '',
      category: 'CI/CD & DevOps',
      customCategory: '',
      author: 'Phú Nguyễn',
      imageUrl: '',
      summary: '',
      content: '',
      tags: '',
      favorite: false,
      publishedAt: new Date().toISOString().substring(0, 10),
      viewCount: 0
    };

    if (from === 'signal-form') {
      const s = this.signalForm();
      currentData = {
        title: s.title,
        category: s.category,
        customCategory: this.customCategorySignal(),
        author: s.author,
        imageUrl: s.imageUrl,
        summary: s.summary,
        content: s.content,
        tags: s.tags,
        favorite: s.favorite,
        publishedAt: s.publishedAt,
        viewCount: s.viewCount
      };
    } else if (from === 'reactive-form') {
      const v = this.blogForm ? this.blogForm.value : {};
      currentData = {
        title: v.title || '',
        category: v.category || 'CI/CD & DevOps',
        customCategory: v.customCategory || '',
        author: v.author || 'Phú Nguyễn',
        imageUrl: v.imageUrl || '',
        summary: v.summary || '',
        content: v.content || '',
        tags: v.tags || '',
        favorite: !!v.favorite,
        publishedAt: v.publishedAt || new Date().toISOString().substring(0, 10),
        viewCount: Number(v.viewCount) || 0
      };
    } else {
      const t = this.templateModel;
      currentData = {
        title: t.title,
        category: t.category,
        customCategory: t.customCategory,
        author: t.author,
        imageUrl: t.imageUrl,
        summary: t.summary,
        content: t.content,
        tags: t.tags,
        favorite: t.favorite,
        publishedAt: t.publishedAt,
        viewCount: t.viewCount
      };
    }

    if (to === 'signal-form') {
      this.signalForm.set({
        title: currentData.title,
        category: currentData.category,
        author: currentData.author,
        imageUrl: currentData.imageUrl,
        summary: currentData.summary,
        content: currentData.content,
        tags: currentData.tags,
        favorite: currentData.favorite,
        publishedAt: currentData.publishedAt,
        viewCount: currentData.viewCount
      });
      this.customCategorySignal.set(currentData.customCategory);
    } else if (to === 'reactive-form' && this.blogForm) {
      this.blogForm.patchValue({
        title: currentData.title,
        category: currentData.category,
        customCategory: currentData.customCategory,
        author: currentData.author,
        imageUrl: currentData.imageUrl,
        summary: currentData.summary,
        content: currentData.content,
        tags: currentData.tags,
        favorite: currentData.favorite,
        publishedAt: currentData.publishedAt,
        viewCount: currentData.viewCount
      });
    } else if (to === 'template-driven-form') {
      this.templateModel = {
        title: currentData.title,
        category: currentData.category,
        customCategory: currentData.customCategory,
        author: currentData.author,
        imageUrl: currentData.imageUrl,
        summary: currentData.summary,
        content: currentData.content,
        tags: currentData.tags,
        favorite: currentData.favorite,
        publishedAt: currentData.publishedAt,
        viewCount: currentData.viewCount
      };
    }
  }

  ngOnInit() {
    // Nạp danh sách categories động từ Input hoặc từ Firebase Service
    if (this.categories && this.categories.length > 0) {
      this.categoryList = [...this.categories.filter(c => c !== 'Khác'), 'Khác'];
    } else {
      this.categoryService.getCategories().then(remoteCats => {
        if (remoteCats && remoteCats.length > 0) {
          this.categoryList = [...remoteCats.map(c => c.name).filter(c => c !== 'Khác'), 'Khác'];
        }
      });
    }

    // Khởi tạo chế độ hiện tại
    if (this.mode) {
      this.currentMode.set(this.mode);
    }

    // 1. Điền dữ liệu ban đầu nếu là chế độ Update
    if (this.initialData) {
      const init = this.initialData;
      const initialTags = Array.isArray(init.tags) ? init.tags.join(', ') : '';
      const publishedDate = init.publishedAt ? init.publishedAt.substring(0, 10) : new Date().toISOString().substring(0, 10);
      
      const isStandardCat = this.categoryList.filter(c => c !== 'Khác').includes(init.category);
      const catValue = isStandardCat ? (init.category || this.categoryList[0]) : 'Khác';
      const customCat = !isStandardCat ? (init.category || '') : '';
      if (customCat) {
        this.customCategorySignal.set(customCat);
      }

      this.signalForm.set({
        title: init.title || '',
        category: catValue,
        author: init.author || 'Phú Nguyễn',
        imageUrl: init.imageUrl || '',
        summary: init.summary || '',
        content: init.content || '',
        tags: initialTags,
        favorite: !!init.favorite,
        publishedAt: publishedDate,
        viewCount: init.viewCount ?? 0
      });

      this.templateModel = {
        title: init.title || '',
        category: catValue,
        customCategory: customCat,
        author: init.author || 'Phú Nguyễn',
        imageUrl: init.imageUrl || '',
        summary: init.summary || '',
        content: init.content || '',
        tags: initialTags,
        favorite: !!init.favorite,
        publishedAt: publishedDate,
        viewCount: init.viewCount ?? 0
      };

      this.blogForm = this.fb.group({
        title: [init.title || '', [Validators.required, Validators.minLength(3)]],
        category: [catValue, [Validators.required]],
        customCategory: [customCat],
        author: [init.author || 'Phú Nguyễn', [Validators.required]],
        imageUrl: [init.imageUrl || ''],
        summary: [init.summary || ''],
        content: [init.content || '', [Validators.required]],
        tags: [initialTags],
        favorite: [!!init.favorite],
        publishedAt: [publishedDate],
        viewCount: [init.viewCount ?? 0, [Validators.min(0)]]
      });
    } else {
      // 2. Chế độ Tạo mới (Create)
      const defaultDate = new Date().toISOString().substring(0, 10);
      const defaultCat = this.categoryList[0] || 'Tips';

      this.signalForm.update(s => ({
        ...s,
        category: defaultCat
      }));

      this.templateModel.category = defaultCat;

      this.blogForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        category: [defaultCat, [Validators.required]],
        customCategory: [''],
        author: ['Phú Nguyễn', [Validators.required]],
        imageUrl: ['https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=800&auto=format&fit=crop&q=80'],
        summary: [''],
        content: ['', [Validators.required]],
        tags: ['Angular, DevOps, CI/CD'],
        favorite: [false],
        publishedAt: [defaultDate],
        viewCount: [0, [Validators.min(0)]]
      });
    }
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  submit() {
    let rawData: {
      title: string;
      category: string;
      author: string;
      imageUrl: string;
      summary: string;
      content: string;
      tags: string;
      favorite: boolean;
      publishedAt: string;
      viewCount: number;
    };

    if (this.currentMode() === 'signal-form') {
      if (!this.isSignalFormValid()) return;
      rawData = { ...this.signalForm() };
    } else if (this.currentMode() === 'reactive-form') {
      if (this.blogForm.invalid) {
        this.blogForm.markAllAsTouched();
        return;
      }
      rawData = this.blogForm.value;
    } else {
      if (
        !this.templateModel.title.trim() ||
        !this.templateModel.content.trim() ||
        !this.templateModel.author.trim()
      ) {
        return;
      }
      rawData = { ...this.templateModel };
    }

    // Tách chuỗi tags thành mảng string[]
    const tagArray = rawData.tags
      ? rawData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : ['Blog'];

    // Xử lý Chuyên mục khi chọn "Khác"
    let finalCategory = rawData.category;
    if (rawData.category === 'Khác') {
      if (this.currentMode() === 'signal-form') {
        finalCategory = this.customCategorySignal().trim() || 'Khác';
      } else if (this.currentMode() === 'reactive-form') {
        finalCategory = this.blogForm.get('customCategory')?.value?.trim() || 'Khác';
      } else {
        finalCategory = this.templateModel.customCategory?.trim() || 'Khác';
      }
    }

    // Tự động trích xuất tóm tắt ngắn từ content nếu người dùng để trống
    let finalSummary = rawData.summary ? rawData.summary.trim() : '';
    if (!finalSummary && rawData.content) {
      finalSummary = rawData.content
        .replace(/[#*`>\[\]\(\)\-_]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 160) + '...';
    }

    const resultData: BlogSubmitData = {
      id: this.initialData ? this.initialData.id : undefined,
      title: rawData.title.trim(),
      category: finalCategory || 'Công nghệ',
      author: rawData.author.trim() || 'Admin',
      imageUrl: rawData.imageUrl.trim() || 'https://picsum.photos/400/250',
      summary: finalSummary,
      content: rawData.content.trim(),
      tags: tagArray,
      favorite: !!rawData.favorite,
      publishedAt: rawData.publishedAt ? new Date(rawData.publishedAt).toISOString() : new Date().toISOString(),
      viewCount: Number(rawData.viewCount) || 0
    };

    this.modalCtrl.dismiss(resultData, 'confirm');
  }
}
