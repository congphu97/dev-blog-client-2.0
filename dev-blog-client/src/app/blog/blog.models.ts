export interface BlogPost {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  viewCount: number;
  createAt: string;
  updateAt: string;
  author: string;
  category: string;
  tags: string[];
  summary?: string;
  favorite?: boolean;
  upvotes?: number;
  commentsCount?: number;
  readTime?: string;
  authorAvatar?: string;
  isVideo?: boolean;
}
