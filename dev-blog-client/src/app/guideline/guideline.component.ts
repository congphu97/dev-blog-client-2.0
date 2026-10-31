import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgcLoadingModule } from 'ngc-library';

@Component({
  selector: 'app-guideline',
  standalone: true,
  templateUrl: './guideline.component.html',
  styleUrls: ['./guideline.component.scss'],
  imports: [CommonModule, NgcLoadingModule],
})
export class GuidelineComponent {
  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);

  public readonly rawUrl = 'https://ngc-library.vercel.app/components';
  public safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawUrl);
  public isLoading = signal<boolean>(true);

  public onIframeLoad(): void {
    this.isLoading.set(false);
  }

  public refresh(): void {
    this.isLoading.set(true);
    const iframe = document.querySelector('.guideline-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = this.rawUrl;
    }
  }

  public backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  public openExternal(): void {
    if (typeof window !== 'undefined') {
      window.open(this.rawUrl, '_blank', 'noopener,noreferrer');
    }
  }
}

