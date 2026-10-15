import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  ModalController
} from '@ionic/angular/standalone';

export interface NewBlogData {
  title: string;
  summary: string;
  imageUrl: string;
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
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonInput,
    IonTextarea
  ]
})
export class BlogFormComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);

  // Input nhận vào kiểu FormMode qua Ionic componentProps
  @Input() mode: FormMode = 'signal-form';

  // ========================================================
  // MODE 1: SIGNAL FORM (State thuần bằng Signal + Validation bằng computed)
  // ========================================================
  public signalForm = signal<NewBlogData>({
    title: '',
    summary: '',
    imageUrl: 'https://picsum.photos/400/250'
  });

  // Validation tự động bằng computed
  public isSignalFormValid = computed(() => {
    const data = this.signalForm();
    return data.title.trim().length >= 3 && data.summary.trim().length > 0;
  });

  updateSignalField(field: keyof NewBlogData, value: string) {
    this.signalForm.update(prev => ({ ...prev, [field]: value }));
  }

  // ========================================================
  // MODE 2: REACTIVE FORM (FormGroup, FormControl)
  // ========================================================
  public blogForm!: FormGroup;

  // ========================================================
  // MODE 3: TEMPLATE-DRIVEN FORM (ngModel)
  // ========================================================
  public templateModel: NewBlogData = {
    title: '',
    summary: '',
    imageUrl: 'https://picsum.photos/400/250'
  };

  ngOnInit() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      summary: ['', [Validators.required]],
      imageUrl: ['https://picsum.photos/400/250']
    });
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  submit() {
    let resultData: NewBlogData;

    if (this.mode === 'signal-form') {
      // 1. Xử lý Signal Form
      if (!this.isSignalFormValid()) return;
      resultData = { ...this.signalForm() };
      console.log('🚀 Submit bằng SIGNAL FORM:', resultData);
    } else if (this.mode === 'reactive-form') {
      // 2. Xử lý Reactive Form
      if (this.blogForm.invalid) {
        this.blogForm.markAllAsTouched();
        return;
      }
      resultData = this.blogForm.value;
      console.log('🚀 Submit bằng REACTIVE FORM:', resultData);
    } else {
      // 3. Xử lý Template-driven Form
      if (!this.templateModel.title.trim() || !this.templateModel.summary.trim()) {
        return;
      }
      resultData = { ...this.templateModel };
      console.log('🚀 Submit bằng TEMPLATE-DRIVEN FORM:', resultData);
    }

    this.modalCtrl.dismiss(resultData, 'confirm');
  }
}

