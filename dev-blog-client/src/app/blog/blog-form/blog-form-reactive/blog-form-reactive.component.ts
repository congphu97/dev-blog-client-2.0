import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogPost } from '../../blog.models';

@Component({
  selector: 'app-blog-form-reactive',
  templateUrl: './blog-form-reactive.component.html',
  styleUrls: ['./blog-form-reactive.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class BlogFormReactiveComponent implements OnInit {

  public blogForm!: FormGroup;
  @Input() post?: BlogPost;

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      summary: ['', [Validators.required]],
      imageUrl: ['https://picsum.photos/400/250']
    });

    if (this.post) {
      this.blogForm.patchValue(this.post);
    }
  }

  submitForm() {
    console.log(this.blogForm.value);
  }

}
