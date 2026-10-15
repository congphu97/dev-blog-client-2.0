import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/header/header.component';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  imports: [HeaderComponent],

})
export class BlogDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
