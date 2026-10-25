import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from '../../blog.models';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-blog-form-template',
  templateUrl: './blog-form-template.component.html',
  styleUrls: ['./blog-form-template.component.scss'],
  imports: [FormsModule]
})
export class BlogFormTemplateComponent implements OnInit {

  @Input() post!: BlogPost;
  public blogForm: BlogPost = {
    id: 0,
    title: '',
    summary: '',
    imageUrl: 'https://picsum.photos/400/250'
  };

  ngOnInit() {
    if (this.post) {
      this.blogForm = { ...this.post };
    }
  }

  submitForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log('Template Form Submitted:', this.blogForm);
  }
}
