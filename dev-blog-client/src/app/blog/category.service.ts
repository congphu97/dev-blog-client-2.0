import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlogCategory } from './blog.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly isFirebase = environment.apiUrl.includes('firebasedatabase.app');
  private readonly apiUrl = this.isFirebase
    ? `${environment.apiUrl}/blogs-dev/categories.json`
    : `${environment.apiUrl}/categories`;

  /**
   * Lấy danh sách danh mục (categories) từ Firebase Realtime Database hoặc API server
   */
  async getCategories(abortSignal?: AbortSignal): Promise<BlogCategory[]> {
    try {
      const res = await fetch(this.apiUrl, { signal: abortSignal });
      if (!res.ok) return [];

      const json = await res.json();
      if (!json) return [];

      return Array.isArray(json) ? json.filter(Boolean) : Object.values(json);
    } catch (err) {
      console.error('Lỗi khi tải danh mục từ CategoryService:', err);
      return [];
    }
  }

  /**
   * Cập nhật hoặc lưu danh sách categories lên Firebase Realtime Database
   */
  async saveCategories(categories: BlogCategory[]): Promise<void> {
    const res = await fetch(this.apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categories)
    });

    if (!res.ok) {
      throw new Error(`Cập nhật danh mục thất bại (HTTP ${res.status})`);
    }
  }
}

