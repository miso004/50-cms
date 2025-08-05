import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch,
  faFilter,
  faTimes,
  faCalendarAlt,
  faUser,
  faEye,
  faHeart,
  faComment,
  faSort,
  faUndo
} from '@fortawesome/free-solid-svg-icons';
import Input from './Input';
import Button from './Button';
import CategorySelector from './CategorySelector';
import TagSelector from './TagSelector';
import { getAllCategories, getAllTags } from '../../utils/categoryUtils';

export interface SearchFilters {
  searchTerm: string;
  categoryId?: string;
  tagIds: string[];
  authorName?: string;
  dateRange: {
    start?: Date;
    end?: Date;
  };
  sortBy: 'latest' | 'oldest' | 'popular' | 'mostViewed' | 'mostCommented';
  minViews?: number;
  minLikes?: number;
  hasImages?: boolean;
}

interface AdvancedSearchProps {
  onFiltersChange: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
  className?: string;
  showAdvanced?: boolean;
}

const defaultFilters: SearchFilters = {
  searchTerm: '',
  tagIds: [],
  dateRange: {},
  sortBy: 'latest'
};

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onFiltersChange,
  initialFilters = {},
  className = '',
  showAdvanced = false
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    ...defaultFilters,
    ...initialFilters
  });
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(showAdvanced);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  useEffect(() => {
    // 활성 필터 확인
    const isActive = 
      filters.searchTerm ||
      filters.categoryId ||
      filters.tagIds.length > 0 ||
      filters.authorName ||
      filters.dateRange.start ||
      filters.dateRange.end ||
      filters.minViews ||
      filters.minLikes ||
      filters.hasImages !== undefined ||
      filters.sortBy !== 'latest';
    
    setHasActiveFilters(isActive);
  }, [filters]);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const updateFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const updateDateRange = (field: 'start' | 'end', value: string) => {
    const date = value ? new Date(value) : undefined;
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: date
      }
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const formatDateForInput = (date?: Date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const sortOptions = [
    { value: 'latest', label: '최신순', icon: faCalendarAlt },
    { value: 'oldest', label: '오래된순', icon: faCalendarAlt },
    { value: 'popular', label: '인기순 (좋아요)', icon: faHeart },
    { value: 'mostViewed', label: '조회수순', icon: faEye },
    { value: 'mostCommented', label: '댓글순', icon: faComment }
  ] as const;

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${className}`}>
      {/* 기본 검색 */}
      <div className="p-6">
        <div className="flex items-center space-x-4">
          {/* 검색어 입력 */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                placeholder="제목, 내용, 작성자로 검색..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>
          </div>

          {/* 정렬 */}
          <div className="min-w-0 w-48">
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value as any)}
              className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 고급 검색 토글 */}
          <Button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            variant={isAdvancedOpen || hasActiveFilters ? 'primary' : 'outline'}
            className="flex items-center"
          >
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            고급 검색
            {hasActiveFilters && (
              <span className="ml-2 bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">
                활성
              </span>
            )}
          </Button>

          {/* 필터 초기화 */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center px-3 py-2 text-gray-500 hover:text-red-600 transition-colors"
              title="필터 초기화"
            >
              <FontAwesomeIcon icon={faUndo} />
            </button>
          )}
        </div>

        {/* 활성 필터 표시 */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.searchTerm && (
              <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                검색: {filters.searchTerm}
                <button
                  onClick={() => updateFilter('searchTerm', '')}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xs" />
                </button>
              </span>
            )}
            
            {filters.categoryId && (
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                카테고리: {getAllCategories().find(c => c.id === filters.categoryId)?.name}
                <button
                  onClick={() => updateFilter('categoryId', undefined)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xs" />
                </button>
              </span>
            )}

            {filters.tagIds.length > 0 && (
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                태그: {filters.tagIds.length}개
                <button
                  onClick={() => updateFilter('tagIds', [])}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xs" />
                </button>
              </span>
            )}

            {filters.authorName && (
              <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                작성자: {filters.authorName}
                <button
                  onClick={() => updateFilter('authorName', undefined)}
                  className="ml-2 text-yellow-600 hover:text-yellow-800"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xs" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* 고급 검색 옵션 */}
      {isAdvancedOpen && (
        <div className="border-t border-gray-200 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FontAwesomeIcon icon={faFilter} className="mr-2 text-purple-600" />
            고급 검색 옵션
          </h3>

          {/* 카테고리 선택 */}
          <div>
            <CategorySelector
              selectedCategoryId={filters.categoryId}
              onChange={(categoryId) => updateFilter('categoryId', categoryId)}
              allowEmpty={true}
            />
          </div>

          {/* 태그 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              태그
            </label>
            <TagSelector
              selectedTags={filters.tagIds}
              onChange={(tagIds) => updateFilter('tagIds', tagIds)}
              maxTags={5}
              allowCreate={false}
            />
          </div>

          {/* 작성자 */}
          <div>
            <Input
              label="작성자"
              value={filters.authorName || ''}
              onChange={(e) => updateFilter('authorName', e.target.value || undefined)}
              placeholder="작성자 이름으로 검색..."
            />
          </div>

          {/* 날짜 범위 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              작성 날짜
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">시작 날짜</label>
                <input
                  type="date"
                  value={formatDateForInput(filters.dateRange.start)}
                  onChange={(e) => updateDateRange('start', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">종료 날짜</label>
                <input
                  type="date"
                  value={formatDateForInput(filters.dateRange.end)}
                  onChange={(e) => updateDateRange('end', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* 통계 필터 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              통계 조건
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  <FontAwesomeIcon icon={faEye} className="mr-1" />
                  최소 조회수
                </label>
                <input
                  type="number"
                  value={filters.minViews || ''}
                  onChange={(e) => updateFilter('minViews', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="예: 100"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  <FontAwesomeIcon icon={faHeart} className="mr-1" />
                  최소 좋아요
                </label>
                <input
                  type="number"
                  value={filters.minLikes || ''}
                  onChange={(e) => updateFilter('minLikes', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="예: 10"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* 기타 옵션 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              기타 옵션
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.hasImages === true}
                  onChange={(e) => updateFilter('hasImages', e.target.checked ? true : undefined)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">이미지가 있는 글만</span>
              </label>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              onClick={resetFilters}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <FontAwesomeIcon icon={faUndo} className="mr-2" />
              모든 필터 초기화
            </button>
            
            <button
              onClick={() => setIsAdvancedOpen(false)}
              className="flex items-center px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              고급 검색 닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;