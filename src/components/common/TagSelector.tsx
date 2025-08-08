import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import type { Tag } from '../../types';
import { getAllTags, searchTags, createTag, createSlug, getRandomColor } from '../../utils/categoryUtils';

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tagIds: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  allowCreate?: boolean;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  onChange,
  placeholder = '태그를 검색하거나 추가하세요...',
  maxTags = 10,
  allowCreate = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tags = getAllTags();
    setAvailableTags(tags);
    setFilteredTags(tags);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchTags(searchQuery);
      setFilteredTags(filtered);
    } else {
      setFilteredTags(availableTags);
    }
  }, [searchQuery, availableTags]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSelectedTagsData = (): Tag[] => {
    return selectedTags.map(id => availableTags.find(tag => tag.id === id)).filter(Boolean) as Tag[];
  };

  const handleTagSelect = (tag: Tag) => {
    if (selectedTags.includes(tag.id)) {
      // 이미 선택된 태그 제거
      onChange(selectedTags.filter(id => id !== tag.id));
    } else if (selectedTags.length < maxTags) {
      // 새 태그 추가
      onChange([...selectedTags, tag.id]);
    }
    setSearchQuery('');
  };

  const handleTagRemove = (tagId: string) => {
    onChange(selectedTags.filter(id => id !== tagId));
  };

  const handleCreateTag = () => {
    if (!searchQuery.trim() || !allowCreate) return;

    // 이미 존재하는 태그인지 확인
    const existingTag = availableTags.find(tag => 
      tag.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (existingTag) {
      handleTagSelect(existingTag);
      return;
    }

    // 새 태그 생성
    const newTag = createTag({
      name: searchQuery.trim(),
      slug: createSlug(searchQuery.trim()),
      color: getRandomColor()
    });

    // 상태 업데이트
    const updatedTags = [...availableTags, newTag];
    setAvailableTags(updatedTags);
    
    // 새 태그 선택
    if (selectedTags.length < maxTags) {
      onChange([...selectedTags, newTag.id]);
    }
    
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim() && allowCreate) {
        handleCreateTag();
      } else if (filteredTags.length > 0) {
        const firstTag = filteredTags[0];
        if (!selectedTags.includes(firstTag.id)) {
          handleTagSelect(firstTag);
        }
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  const selectedTagsData = getSelectedTagsData();
  const canCreateNew = allowCreate && searchQuery.trim() && 
    !filteredTags.some(tag => tag.name.toLowerCase() === searchQuery.toLowerCase());

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-4">
        <FontAwesomeIcon icon={faTag} className="mr-2 text-amber-500" />
        태그
      </label>
      
      {/* 선택된 태그들 */}
      {selectedTagsData.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedTagsData.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium text-white shadow-lg transform hover:scale-105 transition-all duration-200"
              style={{ 
                backgroundColor: tag.color || '#8B5CF6',
                boxShadow: `0 4px 14px 0 ${tag.color || '#8B5CF6'}25`
              }}
            >
              <FontAwesomeIcon icon={faTag} className="mr-2 text-xs" />
              {tag.name}
              <button
                type="button"
                onClick={() => handleTagRemove(tag.id)}
                className="ml-2 text-white/80 hover:text-white transition-colors hover:bg-white/20 rounded-full p-1"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xs" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* 입력 필드 */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faTag} className="text-amber-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={selectedTags.length >= maxTags ? `최대 ${maxTags}개까지 선택 가능` : placeholder}
          disabled={selectedTags.length >= maxTags}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 placeholder-gray-400 bg-white/80 backdrop-blur-sm shadow-sm hover:border-amber-300"
        />
      </div>

      {/* 드롭다운 */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
          {filteredTags.length > 0 || canCreateNew ? (
            <ul className="py-1">
              {/* 기존 태그들 */}
              {filteredTags.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <li key={tag.id}>
                    <button
                      type="button"
                      onClick={() => handleTagSelect(tag)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${
                        isSelected ? 'bg-purple-50 text-purple-700' : 'text-gray-900'
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: tag.color || '#8B5CF6' }}
                        />
                        <span>{tag.name}</span>
                      </div>
                      {isSelected && (
                        <FontAwesomeIcon icon={faTimes} className="text-xs text-purple-500" />
                      )}
                    </button>
                  </li>
                );
              })}

              {/* 새 태그 생성 옵션 */}
              {canCreateNew && (
                <li>
                  <button
                    type="button"
                    onClick={handleCreateTag}
                    className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-3" />
                    <span>새 태그 생성: "{searchQuery}"</span>
                  </button>
                </li>
              )}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}

      {/* 도움말 텍스트 */}
      <div className="mt-3 text-xs text-gray-500 bg-gradient-to-r from-gray-50 to-amber-50 rounded-lg p-3 border border-gray-100">
        <div className="flex items-center justify-between">
          <span className="font-medium">{selectedTags.length}/{maxTags} 태그 선택됨</span>
          {allowCreate && (
            <span className="text-amber-600">
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Enter키로 새 태그 생성
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagSelector;