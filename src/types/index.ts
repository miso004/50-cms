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

// 글 타입
export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
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
  createdAt: Date;
  updatedAt: Date;
}

// 글 작성 폼 타입
export interface PostFormData {
  title: string;
  content: string;
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