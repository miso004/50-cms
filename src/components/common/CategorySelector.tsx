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
      <label className="block text-sm font-semibold text-gray-700 mb-4">
        <FontAwesomeIcon icon={faFolder} className="mr-2 text-emerald-500" />
        카테고리
      </label>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* 카테고리 없음 옵션 */}
        {allowEmpty && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className={`p-3 rounded-xl border-2 transition-all duration-200 text-left transform hover:scale-105 bg-white ${
              !selectedCategoryId
                ? 'border-emerald-400 shadow-lg shadow-emerald-500/10'
                : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2" />
                <div className="text-sm font-medium text-gray-600">
                  카테고리 없음
                </div>
              </div>
              {!selectedCategoryId && (
                <FontAwesomeIcon icon={faCheck} className="text-gray-600" />
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1 ml-5">
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
              className={`p-3 rounded-xl border-2 transition-all duration-200 text-left transform hover:scale-105 bg-white ${
                isSelected
                  ? 'border-current shadow-lg shadow-current/10'
                  : 'border-gray-200 hover:border-current hover:shadow-md'
              }`}
              style={{
                color: isSelected ? category.color : undefined
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  <div className="text-sm font-medium text-gray-900">
                    {category.name}
                  </div>
                </div>
                {isSelected && (
                  <FontAwesomeIcon 
                    icon={faCheck} 
                    style={{ color: category.color }}
                  />
                )}
              </div>
              {category.description && (
                <div className="text-xs text-gray-500 mt-1 ml-5">
                  {category.description}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 선택된 카테고리 표시 */}
      {selectedCategory && (
        <div className="mt-4 p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center text-sm">
            <div
              className="w-3 h-3 rounded-full mr-2 shadow-sm"
              style={{ backgroundColor: selectedCategory.color }}
            />
            <span className="font-semibold text-gray-900">
              선택된 카테고리: {selectedCategory.name}
            </span>
          </div>
          {selectedCategory.description && (
            <div className="text-xs text-gray-600 mt-2 ml-5 leading-relaxed">
              {selectedCategory.description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;