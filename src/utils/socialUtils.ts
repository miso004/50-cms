// 소셜 기능 관련 유틸리티 함수들

export interface UserInteraction {
  userId: string;
  postId: string;
  type: 'like' | 'bookmark';
  createdAt: Date;
}

// 좋아요 관련 함수들
export const getUserLikes = (userId: string): string[] => {
  const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]') as UserInteraction[];
  return interactions
    .filter(interaction => interaction.userId === userId && interaction.type === 'like')
    .map(interaction => interaction.postId);
};

export const isPostLiked = (userId: string, postId: string): boolean => {
  const likedPosts = getUserLikes(userId);
  return likedPosts.includes(postId);
};

export const togglePostLike = (userId: string, postId: string): boolean => {
  const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]') as UserInteraction[];
  const existingInteraction = interactions.find(
    interaction => interaction.userId === userId && interaction.postId === postId && interaction.type === 'like'
  );

  if (existingInteraction) {
    // 좋아요 취소
    const updatedInteractions = interactions.filter(
      interaction => !(interaction.userId === userId && interaction.postId === postId && interaction.type === 'like')
    );
    localStorage.setItem('userInteractions', JSON.stringify(updatedInteractions));
    
    // 글의 좋아요 수 감소
    updatePostLikeCount(postId, -1);
    return false;
  } else {
    // 좋아요 추가
    const newInteraction: UserInteraction = {
      userId,
      postId,
      type: 'like',
      createdAt: new Date()
    };
    interactions.push(newInteraction);
    localStorage.setItem('userInteractions', JSON.stringify(interactions));
    
    // 글의 좋아요 수 증가
    updatePostLikeCount(postId, 1);
    return true;
  }
};

// 북마크 관련 함수들
export const getUserBookmarks = (userId: string): string[] => {
  const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]') as UserInteraction[];
  return interactions
    .filter(interaction => interaction.userId === userId && interaction.type === 'bookmark')
    .map(interaction => interaction.postId);
};

export const isPostBookmarked = (userId: string, postId: string): boolean => {
  const bookmarkedPosts = getUserBookmarks(userId);
  return bookmarkedPosts.includes(postId);
};

export const togglePostBookmark = (userId: string, postId: string): boolean => {
  const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]') as UserInteraction[];
  const existingInteraction = interactions.find(
    interaction => interaction.userId === userId && interaction.postId === postId && interaction.type === 'bookmark'
  );

  if (existingInteraction) {
    // 북마크 취소
    const updatedInteractions = interactions.filter(
      interaction => !(interaction.userId === userId && interaction.postId === postId && interaction.type === 'bookmark')
    );
    localStorage.setItem('userInteractions', JSON.stringify(updatedInteractions));
    return false;
  } else {
    // 북마크 추가
    const newInteraction: UserInteraction = {
      userId,
      postId,
      type: 'bookmark',
      createdAt: new Date()
    };
    interactions.push(newInteraction);
    localStorage.setItem('userInteractions', JSON.stringify(interactions));
    return true;
  }
};

// 글의 좋아요 수 업데이트
const updatePostLikeCount = (postId: string, change: number) => {
  // 저장된 글들에서 해당 글 찾기
  const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
  const updatedPosts = savedPosts.map((post: any) => {
    if (post.id === postId) {
      return {
        ...post,
        likeCount: Math.max(0, (post.likeCount || 0) + change)
      };
    }
    return post;
  });
  
  localStorage.setItem('posts', JSON.stringify(updatedPosts));
};

// 글의 조회수 증가
export const incrementViewCount = (postId: string) => {
  const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
  const updatedPosts = savedPosts.map((post: any) => {
    if (post.id === postId) {
      return {
        ...post,
        viewCount: (post.viewCount || 0) + 1
      };
    }
    return post;
  });
  
  localStorage.setItem('posts', JSON.stringify(updatedPosts));
};

// 사용자의 상호작용 통계
export const getUserInteractionStats = (userId: string) => {
  const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]') as UserInteraction[];
  const userInteractions = interactions.filter(interaction => interaction.userId === userId);
  
  return {
    totalLikes: userInteractions.filter(i => i.type === 'like').length,
    totalBookmarks: userInteractions.filter(i => i.type === 'bookmark').length,
    recentActivity: userInteractions
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)
  };
};

// 인기 글 가져오기 (좋아요 수 기준)
export const getPopularPosts = (limit: number = 5) => {
  const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
  return savedPosts
    .sort((a: any, b: any) => (b.likeCount || 0) - (a.likeCount || 0))
    .slice(0, limit);
};

// 북마크된 글들 가져오기
export const getBookmarkedPosts = (userId: string) => {
  const bookmarkedPostIds = getUserBookmarks(userId);
  const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
  
  return savedPosts.filter((post: any) => bookmarkedPostIds.includes(post.id));
};