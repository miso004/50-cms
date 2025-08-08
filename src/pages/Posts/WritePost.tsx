import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import CategorySelector from '../../components/common/CategorySelector';
import TagSelector from '../../components/common/TagSelector';
import ImageUpload from '../../components/common/ImageUpload';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import type { PostFormData, Post } from '../../types';
import { getCategoryById, getTagsByIds } from '../../utils/categoryUtils';

const WritePost: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    categoryId: undefined,
    tags: [],
    images: []
  });
  const [errors, setErrors] = useState<Partial<PostFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: keyof PostFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 에러 메시지 제거
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleCategoryChange = (categoryId: string | undefined) => {
    setFormData(prev => ({
      ...prev,
      categoryId
    }));
  };

  const handleTagsChange = (tagIds: string[]) => {
    setFormData(prev => ({
      ...prev,
      tags: tagIds
    }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({
      ...prev,
      images
    }));
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
    
    if (!user) {
      showToast('로그인이 필요합니다.', 'error');
      navigate('/login');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 카테고리와 태그 데이터 가져오기
      const category = formData.categoryId ? getCategoryById(formData.categoryId) : undefined;
      const tags = getTagsByIds(formData.tags || []);

      // 새 글 생성
      const newPost: Post = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        author: user,
        category,
        tags,
        images: formData.images || [],
        createdAt: new Date(),
        updatedAt: new Date(),
        viewCount: 0,
        likeCount: 0,
        status: 'published'
      };

      // localStorage에 저장
      const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      localStorage.setItem('posts', JSON.stringify([newPost, ...existingPosts]));

      showToast('글이 성공적으로 작성되었습니다!', 'success');
      navigate('/posts');
    } catch (error) {
      console.error('글 작성 실패:', error);
      showToast('글 작성에 실패했습니다. 다시 시도해주세요.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (formData.title || formData.content) {
      if (confirm('작성 중인 내용이 있습니다. 정말 나가시겠습니까?')) {
        navigate('/posts');
      }
    } else {
      navigate('/posts');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar - Full Width */}
        <div className="bg-white border-b border-gray-200 w-full">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <Link
                to="/posts"
                className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                글 목록
              </Link>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6 shadow-lg shadow-purple-500/25">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent mb-4">
              새 글 작성
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              당신의 생각을 자유롭게 표현해보세요. 멋진 이야기를 세상과 공유하세요.
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-gray-200/50 border border-white/50 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Title Section */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100/50">
                  <Input
                    label="제목"
                    type="text"
                    placeholder="매력적인 제목을 입력해보세요..."
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    error={errors.title}
                    required
                    className="bg-white/80 backdrop-blur-sm border-white/50 shadow-sm"
                  />
                </div>

                {/* Content Section */}
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-100/50">
                  <Textarea
                    label="내용"
                    placeholder="당신의 이야기를 들려주세요. 자유롭게 작성해보세요..."
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    error={errors.content}
                    rows={18}
                    required
                    className="bg-white/80 backdrop-blur-sm border-white/50 shadow-sm resize-none"
                  />
                </div>
              </div>

                             {/* Metadata Section */}
               <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100/50">
                  <CategorySelector
                    selectedCategoryId={formData.categoryId}
                    onChange={handleCategoryChange}
                    allowEmpty={true}
                  />
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100/50">
                  <TagSelector
                    selectedTags={formData.tags || []}
                    onChange={handleTagsChange}
                    maxTags={10}
                    allowCreate={true}
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100/50">
                <ImageUpload
                  onImagesChange={handleImagesChange}
                  existingImages={formData.images || []}
                  maxImages={5}
                  maxSizeMB={5}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-200/50">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  작성하신 글은 즉시 게시됩니다
                </div>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    size="lg"
                    className="min-w-[120px]"
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="min-w-[140px] shadow-lg shadow-purple-500/25"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        작성 중...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        글 작성
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Bottom Tips */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/50 text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              팁: 매력적인 제목과 풍부한 내용으로 더 많은 독자의 관심을 끌어보세요
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WritePost; 