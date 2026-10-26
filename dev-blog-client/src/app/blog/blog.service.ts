import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlogPost } from './blog.models';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly baseUrl = `${environment.firebase.databaseURL}/blogs-dev/blogs`;

  /**
   * Lấy danh sách tất cả bài viết từ Firebase Realtime Database
   */
  async getBlogs(limit?: number, abortSignal?: AbortSignal): Promise<BlogPost[]> {
    const res = await fetch(`${this.baseUrl}.json`, { signal: abortSignal });
    if (!res.ok) {
      throw new Error(`Không thể tải dữ liệu blog từ Firebase (HTTP ${res.status})`);
    }

    const data = await res.json();
    if (!data) return [];

    const blogs: BlogPost[] = Array.isArray(data)
      ? data.filter(Boolean)
      : Object.values(data);

    return limit ? blogs.slice(0, limit) : blogs;
  }

  /**
   * Lấy chi tiết 1 bài viết theo ID
   */
  async getBlogById(id: number, abortSignal?: AbortSignal): Promise<BlogPost | null> {
    const blogs = await this.getBlogs(undefined, abortSignal);
    return blogs.find(b => b.id === id) || null;
  }

  /**
   * Cập nhật hoặc lưu danh sách blogs lên Firebase
   */
  async saveBlogs(blogs: BlogPost[]): Promise<void> {
    const res = await fetch(`${this.baseUrl}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogs)
    });
    if (!res.ok) {
      throw new Error(`Cập nhật blog thất bại (HTTP ${res.status})`);
    }
  }
}
