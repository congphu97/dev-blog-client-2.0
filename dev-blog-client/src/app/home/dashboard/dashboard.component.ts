import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule],
})
export class DashboardComponent {
  private router = inject(Router);

  // Link đến trang guideline chính thức của ngc-library
  public readonly guidelineUrl = 'https://ngc-library.vercel.app/components';

  /**
   * Điều hướng sang trang Guideline nhúng của NGC-Library trực tiếp trong app
   */
  public navigateToGuideline(): void {
    this.router.navigate(['/guideline']);
  }

  /**
   * Điều hướng sang trang Dev Blog
   */
  public navigateToBlog(): void {
    this.router.navigate(['/blog']);
  }
}
