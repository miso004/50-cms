import type { Category, Tag } from '../types';

// 기본 카테고리들
export const defaultCategories: Category[] = [
  {
    id: 'cat_1',
    name: '개발',
    slug: 'development',
    description: '프로그래밍, 웹 개발, 앱 개발 등',
    color: '#3B82F6',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'cat_2',
    name: '디자인',
    slug: 'design',
    description: 'UI/UX, 그래픽 디자인, 웹 디자인 등',
    color: '#8B5CF6',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'cat_3',
    name: '일상',
    slug: 'daily',
    description: '일상 생활, 개인적인 이야기',
    color: '#06B6D4',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'cat_4',
    name: '리뷰',
    slug: 'review',
    description: '제품 리뷰, 서비스 후기',
    color: '#10B981',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'cat_5',
    name: '튜토리얼',
    slug: 'tutorial',
    description: '강의, 가이드, 하우투',
    color: '#F59E0B',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'cat_6',
    name: '뉴스',
    slug: 'news',
    description: '최신 소식, 업계 동향',
    color: '#EF4444',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// 기본 태그들
export const defaultTags: Tag[] = [
  { id: 'tag_1', name: 'React', slug: 'react', color: '#61DAFB', createdAt: new Date(), updatedAt: new Date() },
  { id: 'tag_2', name: 'TypeScript', slug: 'typescript', color: '#3178C6', createdAt: new Date(), updatedAt: new Date() },
  { id: 'tag_3', name: 'JavaScript', slug: 'javascript', color: '#F7DF1E', createdAt: new Date(), updatedAt: new Date() },
  { id: 'tag_4', name: 'CSS', slug: 'css', color: '#1572B6', createdAt: new Date(), updatedAt: new Date() },
  { id: 'tag_5', name: 'HTML', slug: 'html', color: '#E34F26', createdAt: new Date(), updatedAt: new Date() },
  { id: 'tag_6', name: 'Node.js', slug: 'nodejs', color: '#339933', createdAt: new Date(), updatedAt: new Date() },
  { id: 'tag_7', name: 'Python', slug: 'python', color: '#3776AB', createdAt: new Date(), updatedAt: new Date() },
  { id: 'tag_8', name: 'Vue.js', slug: 'vuejs', color: '#4FC08D', createdAt: new Date(), updatedAt: new Date() },
  { id: 'tag_9', name: 'Angular', slug: 'angular', color: '#DD0031', createdAt: new Date(), updatedAt: new Date() },
  { id: 'tag_10', name: 'Tailwind', slug: 'tailwind', color: '#06B6D4', createdAt: new Date(), updatedAt: new Date() },
  { id: 'tag_11', name: 'Figma', slug: 'figma', color: '#F24E1E', createdAt: new Date(), updatedAt: new Date() },
  { id: 'tag_12', name: 'Photoshop', slug: 'photoshop', color: '#31A8FF', createdAt: new Date(), updatedAt: new Date() },
  { id: 'tag_13', name: '개인', slug: 'personal', color: '#8B5CF6', createdAt: new Date(), updatedAt: new Date() },
  { id: 'tag_14', name: '일상', slug: 'daily', color: '#06B6D4', createdAt: new Date(), updatedAt: new Date() },
  { id: 'tag_15', name: '후기', slug: 'review', color: '#10B981', createdAt: new Date(), updatedAt: new Date() }
];

// 카테고리 관련 유틸리티 함수들
export const getCategoryById = (id: string): Category | undefined => {
  const savedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
  const allCategories = [...savedCategories, ...defaultCategories];
  return allCategories.find(cat => cat.id === id);
};

export const getAllCategories = (): Category[] => {
  const savedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
  return [...defaultCategories, ...savedCategories];
};

export const createCategory = (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Category => {
  const newCategory: Category = {
    ...categoryData,
    id: `cat_${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const savedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
  const updatedCategories = [...savedCategories, newCategory];
  localStorage.setItem('categories', JSON.stringify(updatedCategories));

  return newCategory;
};

// 태그 관련 유틸리티 함수들
export const getTagById = (id: string): Tag | undefined => {
  const savedTags = JSON.parse(localStorage.getItem('tags') || '[]');
  const allTags = [...savedTags, ...defaultTags];
  return allTags.find(tag => tag.id === id);
};

export const getAllTags = (): Tag[] => {
  const savedTags = JSON.parse(localStorage.getItem('tags') || '[]');
  return [...defaultTags, ...savedTags];
};

export const getTagsByIds = (ids: string[]): Tag[] => {
  const allTags = getAllTags();
  return ids.map(id => allTags.find(tag => tag.id === id)).filter(Boolean) as Tag[];
};

export const createTag = (tagData: Omit<Tag, 'id' | 'createdAt' | 'updatedAt'>): Tag => {
  const newTag: Tag = {
    ...tagData,
    id: `tag_${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const savedTags = JSON.parse(localStorage.getItem('tags') || '[]');
  const updatedTags = [...savedTags, newTag];
  localStorage.setItem('tags', JSON.stringify(updatedTags));

  return newTag;
};

export const searchTags = (query: string): Tag[] => {
  const allTags = getAllTags();
  return allTags.filter(tag => 
    tag.name.toLowerCase().includes(query.toLowerCase()) ||
    tag.slug.toLowerCase().includes(query.toLowerCase())
  );
};

// 슬러그 생성 유틸리티
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
};

// 색상 유틸리티
export const getRandomColor = (): string => {
  const colors = [
    '#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', 
    '#F59E0B', '#EF4444', '#EC4899', '#8B5A3C'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};