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
    path: 'blog',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./blog/blog-list/blog-list.component').then(m => m.BlogListComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./blog/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent),
      }
    ],
  },
];
