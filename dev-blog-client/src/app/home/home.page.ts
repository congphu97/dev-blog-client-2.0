import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, DashboardComponent],
})
export class HomePage {
  constructor() {}
}
