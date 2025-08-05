import React, { useState, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUpload, 
  faImage, 
  faTrash, 
  faSpinner,
  faExclamationTriangle,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

interface ImageUploadProps {
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  maxSizeMB?: number;
  className?: string;
  disabled?: boolean;
  existingImages?: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesChange,
  maxImages = 5,
  maxSizeMB = 5,
  className = '',
  disabled = false,
  existingImages = []
}) => {
  const [images, setImages] = useState<string[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      return '이미지 파일만 업로드할 수 있습니다.';
    }

    // 파일 크기 검증
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      return `파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`;
    }

    // 이미지 개수 검증
    if (images.length >= maxImages) {
      return `최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`;
    }

    return null;
  };

  const processFile = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        resolve(result);
      };
      
      reader.onerror = () => {
        reject(new Error('파일을 읽는 중 오류가 발생했습니다.'));
      };
      
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFiles = useCallback(async (files: FileList) => {
    setError('');
    setUploading(true);

    try {
      const newImages: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // 파일 검증
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          continue;
        }

        // 파일을 Base64로 변환
        try {
          const base64 = await processFile(file);
          newImages.push(base64);
        } catch (error) {
          console.error('파일 처리 오류:', error);
          setError('파일 처리 중 오류가 발생했습니다.');
        }
      }

      if (newImages.length > 0) {
        const updatedImages = [...images, ...newImages].slice(0, maxImages);
        setImages(updatedImages);
        onImagesChange(updatedImages);
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      setError('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  }, [images, maxImages, maxSizeMB, onImagesChange, processFile, validateFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
    // 입력 초기화 (같은 파일 재선택 가능)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files) {
      handleFiles(files);
    }
  }, [disabled, handleFiles]);

  const removeImage = useCallback((index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
    setError('');
  }, [images, onImagesChange]);

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 업로드 영역 */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
          ${dragOver 
            ? 'border-purple-500 bg-purple-50' 
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />

        {uploading ? (
          <div className="space-y-3">
            <FontAwesomeIcon icon={faSpinner} className="text-purple-600 text-3xl animate-spin" />
            <p className="text-gray-600">이미지를 업로드하는 중...</p>
          </div>
        ) : (
          <div className="space-y-3">
            <FontAwesomeIcon 
              icon={faUpload} 
              className={`text-3xl ${dragOver ? 'text-purple-600' : 'text-gray-400'}`} 
            />
            <div>
              <p className="text-lg font-medium text-gray-900 mb-1">
                이미지를 드래그하거나 클릭하여 업로드
              </p>
              <p className="text-sm text-gray-500">
                최대 {maxImages}개, {maxSizeMB}MB 이하의 이미지 파일
              </p>
            </div>
          </div>
        )}

        {/* 업로드 상태 오버레이 */}
        {dragOver && (
          <div className="absolute inset-0 bg-purple-100 bg-opacity-80 rounded-xl flex items-center justify-center">
            <div className="text-purple-600 font-semibold">
              여기에 이미지를 놓으세요
            </div>
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 mr-2" />
          <span className="text-red-700 text-sm">{error}</span>
          <button
            onClick={() => setError('')}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}

      {/* 업로드된 이미지 미리보기 */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 flex items-center">
              <FontAwesomeIcon icon={faImage} className="mr-2 text-purple-600" />
              업로드된 이미지 ({images.length}/{maxImages})
            </h4>
            {images.length > 0 && (
              <button
                onClick={() => {
                  setImages([]);
                  onImagesChange([]);
                }}
                className="text-sm text-red-600 hover:text-red-700 underline"
              >
                모두 삭제
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={image}
                    alt={`업로드된 이미지 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* 삭제 버튼 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="이미지 삭제"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-xs" />
                </button>

                {/* 순서 표시 */}
                <div className="absolute top-2 left-2 w-6 h-6 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* 성공 메시지 */}
          {images.length > 0 && !uploading && !error && (
            <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
              <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
              <span className="text-green-700 text-sm">
                {images.length}개의 이미지가 성공적으로 업로드되었습니다.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;