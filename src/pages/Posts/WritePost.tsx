import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">새 글 작성</h1>
          <p className="text-gray-600">당신의 생각을 자유롭게 표현해보세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 제목 입력 */}
          <div>
            <Input
              label="제목"
              type="text"
              placeholder="글의 제목을 입력하세요"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              error={errors.title}
              required
            />
          </div>

          {/* 내용 입력 */}
          <div>
            <Textarea
              label="내용"
              placeholder="글의 내용을 입력하세요"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              error={errors.content}
              rows={15}
              required
            />
          </div>

          {/* 카테고리 선택 */}
          <div>
            <CategorySelector
              selectedCategoryId={formData.categoryId}
              onChange={handleCategoryChange}
              allowEmpty={true}
            />
          </div>

          {/* 태그 선택 */}
          <div>
            <TagSelector
              selectedTags={formData.tags || []}
              onChange={handleTagsChange}
              maxTags={10}
              allowCreate={true}
            />
          </div>

          {/* 이미지 업로드 */}
          <div>
            <ImageUpload
              onImagesChange={handleImagesChange}
              existingImages={formData.images || []}
              maxImages={5}
              maxSizeMB={5}
            />
          </div>

          {/* 버튼 그룹 */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? '작성 중...' : '글 작성'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default WritePost; 