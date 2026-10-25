import { Component, OnInit, signal } from '@angular/core';
import { BlogPost } from '../../blog.models';
import { form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-blog-form-signal',
  templateUrl: './blog-form-signal.component.html',
  styleUrls: ['./blog-form-signal.component.scss'],
  imports: [FormField, FormRoot],
})
export class BlogFormSignalComponent implements OnInit {

  public blogFormModel = signal<BlogPost>({
    id: 0,
    title: '',
    summary: '',
    imageUrl: 'https://picsum.photos/400/250'
  });

  public blogForm = form(this.blogFormModel, (schema) => {
    required(schema.title, { message: 'Tiêu đề là bắt buộc.' });
    minLength(schema.title, 3, { message: 'Tiêu đề phải từ 3 ký tự trở lên.' });
    required(schema.summary, { message: 'Tóm tắt là bắt buộc.' });
  });

  ngOnInit() {}

  submitForm() {
    if (this.blogForm().invalid()) {
      return;
    }
    console.log('Signal Form Submitted:', this.blogFormModel());
  }
}
