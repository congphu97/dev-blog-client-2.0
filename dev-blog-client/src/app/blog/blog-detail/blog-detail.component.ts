import { Component, inject, input, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/header/header.component';
import { BlogPost } from '../blog.models';
import { ModalController } from '@ionic/angular/standalone';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  imports: [HeaderComponent, JsonPipe],

})
export class BlogDetailComponent {
  constructor() { }

  public post = input.required<BlogPost>();
  public modal = inject(ModalController);

  public dismiss() {
    this.modal.dismiss(null, 'cancel');
  }
}
