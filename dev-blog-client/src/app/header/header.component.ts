import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons } from '@ionic/angular/standalone';
import { NgcAvatarModule } from 'ngc-library';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, NgcAvatarModule, RouterLink, RouterLinkActive],
})
export class HeaderComponent {
  constructor() { }
}
