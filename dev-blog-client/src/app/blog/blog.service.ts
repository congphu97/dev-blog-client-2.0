import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlogPost, BlogCategory } from './blog.models';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  // Tự động phân biệt format API dựa theo URL trong environment.apiUrl
  private readonly isFirebase = environment.apiUrl.includes('firebasedatabase.app');
  private readonly apiUrl = this.isFirebase
    ? `${environment.apiUrl}/blogs-dev/blogs.json`
    : `${environment.apiUrl}/blogs`;

  /**
   * Lấy danh sách bài viết trực tiếp từ API (Express hoặc Firebase tùy theo environment)
   */
  async getBlogs(limit?: number, abortSignal?: AbortSignal): Promise<BlogPost[]> {
    const url = this.isFirebase
      ? this.apiUrl
      : `${this.apiUrl}${limit ? `?limit=${limit}` : ''}`;

    const res = await fetch(url, { signal: abortSignal });
    if (!res.ok) {
      throw new Error(`Không thể tải dữ liệu blog (HTTP ${res.status})`);
    }

    const json = await res.json();
    if (!json) return [];

    let blogs: BlogPost[] = [];
    if (this.isFirebase) {
      blogs = Array.isArray(json) ? json.filter(Boolean) : Object.values(json);
    } else {
      if (json.success && Array.isArray(json.data)) {
        blogs = json.data;
      } else if (Array.isArray(json)) {
        blogs = json;
      }
    }

    return limit ? blogs.slice(0, limit) : blogs;
  }

  /**
   * Lấy chi tiết 1 bài viết theo ID
   */
  async getBlogById(id: number, abortSignal?: AbortSignal): Promise<BlogPost | null> {
    if (this.isFirebase) {
      const blogs = await this.getBlogs(undefined, abortSignal);
      return blogs.find(b => b.id === id) || null;
    }

    const res = await fetch(`${this.apiUrl}/${id}`, { signal: abortSignal });
    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    return json?.data || null;
  }

  /**
   * Cập nhật hoặc lưu danh sách blogs
   */
  async saveBlogs(blogs: BlogPost[]): Promise<void> {
    const res = await fetch(this.apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogs)
    });

    if (!res.ok) {
      throw new Error(`Cập nhật blog thất bại (HTTP ${res.status})`);
    }
  }

  /**
   * Lấy danh sách danh mục (categories) từ Firebase
   */
  async getCategories(abortSignal?: AbortSignal): Promise<BlogCategory[]> {
    const url = this.isFirebase
      ? `${environment.apiUrl}/blogs-dev/categories.json`
      : `${environment.apiUrl}/categories`;

    const res = await fetch(url, { signal: abortSignal });
    if (!res.ok) return [];

    const json = await res.json();
    if (!json) return [];

    return Array.isArray(json) ? json.filter(Boolean) : Object.values(json);
  }

  /**
   * Cập nhật hoặc lưu danh sách categories lên Firebase
   */
  async saveCategories(categories: BlogCategory[]): Promise<void> {
    const url = this.isFirebase
      ? `${environment.apiUrl}/blogs-dev/categories.json`
      : `${environment.apiUrl}/categories`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categories)
    });

    if (!res.ok) {
      throw new Error(`Cập nhật danh mục thất bại (HTTP ${res.status})`);
    }
  }
}
