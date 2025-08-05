import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faCheck } from '@fortawesome/free-solid-svg-icons';
import type { Category } from '../../types';
import { getAllCategories } from '../../utils/categoryUtils';

interface CategorySelectorProps {
  selectedCategoryId?: string;
  onChange: (categoryId: string | undefined) => void;
  placeholder?: string;
  allowEmpty?: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategoryId,
  onChange,
  placeholder = '카테고리를 선택하세요',
  allowEmpty = true
}) => {
  const categories = getAllCategories();
  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <FontAwesomeIcon icon={faFolder} className="mr-2" />
        카테고리
      </label>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* 카테고리 없음 옵션 */}
        {allowEmpty && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              !selectedCategoryId
                ? 'border-gray-400 bg-gray-50 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-4 h-4 rounded-full bg-gray-400" />
              {!selectedCategoryId && (
                <FontAwesomeIcon icon={faCheck} className="text-gray-600" />
              )}
            </div>
            <div className="text-sm font-medium text-gray-600">
              카테고리 없음
            </div>
            <div className="text-xs text-gray-500 mt-1">
              분류하지 않음
            </div>
          </button>
        )}

        {/* 카테고리 옵션들 */}
        {categories.map((category) => {
          const isSelected = selectedCategoryId === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                isSelected
                  ? 'border-current shadow-sm'
                  : 'border-gray-200 hover:border-current hover:bg-gray-50'
              }`}
              style={{
                color: isSelected ? category.color : undefined,
                backgroundColor: isSelected ? `${category.color}10` : undefined
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                {isSelected && (
                  <FontAwesomeIcon 
                    icon={faCheck} 
                    style={{ color: category.color }}
                  />
                )}
              </div>
              <div className="text-sm font-medium text-gray-900">
                {category.name}
              </div>
              {category.description && (
                <div className="text-xs text-gray-500 mt-1">
                  {category.description}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 선택된 카테고리 표시 */}
      {selectedCategory && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center text-sm">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: selectedCategory.color }}
            />
            <span className="font-medium text-gray-900">
              선택된 카테고리: {selectedCategory.name}
            </span>
          </div>
          {selectedCategory.description && (
            <div className="text-xs text-gray-600 mt-1 ml-5">
              {selectedCategory.description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;