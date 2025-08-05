import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import ImageUpload from '../../components/common/ImageUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSave, 
  faEye, 
  faArrowLeft,
  faSpinner,
  faCheck,
  faExclamationTriangle,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import type { PostFormData, Post } from '../../types';

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    images: []
  });
  const [errors, setErrors] = useState<Partial<PostFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock 데이터 (PostDetail과 동일)
  const mockPosts: Post[] = [
    {
      id: '1',
      title: '리액트 18의 새로운 기능들과 실무 적용 가이드',
      content: `# 리액트 18의 새로운 기능들과 실무 적용 가이드

리액트 18은 React 생태계에 혁신적인 변화를 가져왔습니다. 이 글에서는 리액트 18에서 도입된 Concurrent Features, Suspense, 그리고 새로운 Hooks들을 실무에서 어떻게 활용할 수 있는지 상세히 알아보겠습니다.

## 🚀 주요 새로운 기능들

### 1. Concurrent Features
Concurrent Rendering은 리액트가 작업을 중단하고 재개할 수 있게 해주는 새로운 렌더링 메커니즘입니다.`,
      author: {
        id: 'u1',
        username: '김개발',
        email: 'dev@example.com',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      viewCount: 1250,
      likeCount: 89,
      status: 'published'
    }
  ];

  // 컴포넌트 마운트 시 글 데이터 로드
  useEffect(() => {
    const fetchPost = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));

      // 로컬 스토리지에서 사용자가 작성한 글 가져오기
      const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      
      // Mock 데이터와 실제 작성된 글 합치기
      const allPosts = [...savedPosts, ...mockPosts];
      
      const foundPost = allPosts.find(p => p.id === id);
      
      if (!foundPost) {
        alert('글을 찾을 수 없습니다.');
        navigate('/posts');
        return;
      }

      // 작성자 권한 확인
      if (foundPost.author.id !== user.id) {
        alert('글을 수정할 권한이 없습니다.');
        navigate(`/posts/${id}`);
        return;
      }

      setPost(foundPost);
      setFormData({
        title: foundPost.title,
        content: foundPost.content,
        images: foundPost.images || []
      });
      setLoading(false);
    };

    if (id) {
      fetchPost();
    }
  }, [id, user, navigate]);

  // 자동 임시저장
  useEffect(() => {
    const autoSave = () => {
      if (formData.title.trim() || formData.content.trim()) {
        saveDraft();
      }
    };

    const interval = setInterval(autoSave, 5000); // 5초마다
    return () => clearInterval(interval);
  }, [formData]);

  const handleInputChange = (field: keyof PostFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const saveDraft = () => {
    try {
      setSaveStatus('saving');
      const draftKey = `edit_draft_${id}`;
      localStorage.setItem(draftKey, JSON.stringify(formData));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (error) {
      console.error('임시저장 실패:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 2000);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PostFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    }

    if (!formData.content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 수정된 글 객체 생성
      const updatedPost: Post = {
        ...post!,
        title: formData.title,
        content: formData.content,
        images: formData.images || [],
        updatedAt: new Date()
      };

      // 로컬 스토리지에서 기존 글 목록 가져오기
      const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      
      // 해당 글 찾아서 업데이트
      const updatedPosts = existingPosts.map((p: Post) => 
        p.id === post!.id ? updatedPost : p
      );
      
      // 로컬 스토리지에 저장
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      
      // 임시저장 데이터 삭제
      localStorage.removeItem(`edit_draft_${id}`);
      
      // 업데이트 완료 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 글 상세 페이지로 이동
      navigate(`/posts/${post!.id}`);
    } catch (error) {
      console.error('글 수정 실패:', error);
      alert('글 수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말로 이 글을 삭제하시겠습니까? 삭제된 글은 복구할 수 없습니다.')) {
      return;
    }

    setIsDeleting(true);

    try {
      // 로컬 스토리지에서 글 삭제
      const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const updatedPosts = existingPosts.filter((p: Post) => p.id !== post!.id);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      
      // 임시저장 데이터도 삭제
      localStorage.removeItem(`edit_draft_${id}`);
      
      // 삭제 완료 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('글이 삭제되었습니다.');
      navigate('/posts');
    } catch (error) {
      console.error('글 삭제 실패:', error);
      alert('글 삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    if (formData.title !== post?.title || formData.content !== post?.content) {
      if (confirm('수정 중인 내용이 있습니다. 정말 나가시겠습니까?')) {
        navigate(`/posts/${id}`);
      }
    } else {
      navigate(`/posts/${id}`);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-6 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
              <div className="space-y-3 mb-8">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📄</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">글을 찾을 수 없습니다</h1>
            <p className="text-gray-600 mb-6">요청하신 글이 존재하지 않거나 삭제되었습니다.</p>
            <Button onClick={() => navigate('/posts')}>글 목록으로 돌아가기</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* 상단 헤더 */}
        <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleCancel}
                  className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  뒤로가기
                </button>
                
                {/* 저장 상태 표시 */}
                {saveStatus && (
                  <div className="flex items-center space-x-2 text-sm">
                    {saveStatus === 'saving' && (
                      <span className="flex items-center text-gray-500">
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-1" />
                        저장 중...
                      </span>
                    )}
                    {saveStatus === 'saved' && (
                      <span className="flex items-center text-green-600">
                        <FontAwesomeIcon icon={faCheck} className="mr-1" />
                        자동 저장됨
                      </span>
                    )}
                    {saveStatus === 'error' && (
                      <span className="flex items-center text-red-600">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" />
                        저장 실패
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  {isDeleting ? '삭제 중...' : '삭제'}
                </button>
                
                <button
                  type="button"
                  onClick={saveDraft}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faSave} className="mr-2" />
                  임시저장
                </button>
                
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    previewMode 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <FontAwesomeIcon icon={faEye} className="mr-2" />
                  {previewMode ? '편집' : '미리보기'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 헤더 섹션 */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              글 수정
            </h1>
            <p className="text-gray-600">내용을 수정하고 업데이트하세요.</p>
          </div>

          {previewMode ? (
            /* 미리보기 모드 */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">미리보기</h2>
              </div>
              <article className="p-8">
                <header className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {formData.title || '제목을 입력하세요'}
                  </h1>
                  <div className="flex items-center text-gray-500 text-sm">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">
                        {post.author.username.charAt(0)}
                      </span>
                    </div>
                    <span>{post.author.username}</span>
                    <span className="mx-2">•</span>
                    <span>수정됨: {new Date().toLocaleDateString('ko-KR')}</span>
                  </div>
                </header>
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
                    {formData.content || '내용을 입력하세요'}
                  </div>
                </div>
              </article>
            </div>
          ) : (
            /* 편집 모드 */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* 제목 입력 */}
                <div className="border-b border-gray-100 p-6">
                  <Input
                    label=""
                    type="text"
                    placeholder="글의 제목을 입력하세요"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    error={errors.title}
                    required
                    className="text-2xl font-bold border-none shadow-none focus:ring-0 p-0"
                  />
                </div>

                {/* 이미지 업로드 */}
                <div className="border-b border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">이미지 수정</h3>
                  <ImageUpload
                    onImagesChange={(images) => handleInputChange('images', images)}
                    existingImages={formData.images || []}
                    maxImages={5}
                    maxSizeMB={5}
                  />
                </div>

                {/* 내용 입력 */}
                <div className="p-6">
                  <Textarea
                    label=""
                    placeholder="내용을 수정하세요..."
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    error={errors.content}
                    rows={20}
                    required
                    className="border-none shadow-none focus:ring-0 resize-none text-lg leading-relaxed"
                  />
                </div>
              </div>

              {/* 수정 완료 버튼 */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
                  size="lg"
                  className="px-8 py-4 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                      수정 중...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faSave} className="mr-2" />
                      수정 완료
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EditPost;