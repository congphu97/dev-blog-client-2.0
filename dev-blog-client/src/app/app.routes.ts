import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'tags',
    loadComponent: () => import('./tags/tags.component').then((m) => m.TagsComponent),
  },
  {
    path: 'guideline',
    loadComponent: () => import('./guideline/guideline.component').then((m) => m.GuidelineComponent),
  },
  {
    path: 'components',
    redirectTo: 'guideline',
    pathMatch: 'full',
  },
  {
    path: 'blog',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./blog/blog-container/blog-container.component').then(m => m.BlogContainerComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./blog/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent),
      }
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
  },
];
