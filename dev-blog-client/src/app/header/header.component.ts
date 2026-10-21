import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/angular/standalone';
import { NgcAvatarModule } from 'ngc-library';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, NgcAvatarModule],
})
export class HeaderComponent {
  constructor() { }
}
