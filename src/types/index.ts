// 사용자 타입
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  role?: UserRoleType;
}

// 사용자 역할
export const UserRole = {
  USER: 'user',
  ADMIN: 'admin'
} as const;

export type UserRoleType = typeof UserRole[keyof typeof UserRole];

// 관리자 통계
export interface AdminStats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  newUsersThisWeek: number;
  newPostsThisWeek: number;
  activeUsers: number;
}

// 인증 관련 타입
export interface AuthFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends AuthFormData {
  username: string;
  confirmPassword: string;
}

export interface LoginFormData extends AuthFormData {
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// 카테고리 타입
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

// 태그 타입
export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 글 타입
export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  category?: Category;
  tags?: Tag[];
  images?: string[]; // Base64 이미지 배열
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  likeCount: number;
  status?: PostStatusType;
}

// 글 상태
export const PostStatus = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  ARCHIVED: 'archived'
} as const;

export type PostStatusType = typeof PostStatus[keyof typeof PostStatus];

// 댓글 타입
export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  parentId?: string; // 답글용 부모 댓글 ID
  createdAt: Date;
  updatedAt: Date;
  likeCount: number;
  isLiked: boolean;
  status?: CommentStatusType;
}

// 댓글 상태
export const CommentStatus = {
  APPROVED: 'approved',
  PENDING: 'pending',
  REJECTED: 'rejected'
} as const;

export type CommentStatusType = typeof CommentStatus[keyof typeof CommentStatus];

// 글 작성 폼 타입
export interface PostFormData {
  title: string;
  content: string;
  categoryId?: string;
  tags?: string[];
  images?: string[];
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 글 목록 응답 타입
export interface PostsResponse {
  posts: Post[];
  pagination: Pagination;
}

// 사용자 목록 응답 타입
export interface UsersResponse {
  users: User[];
  pagination: Pagination;
} 