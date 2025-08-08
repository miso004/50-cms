import React, { useState, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUpload, 
  faImage, 
  faTrash, 
  faSpinner,
  faExclamationTriangle,
  faCheck,
  faTimes,
  faExpand
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
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

  const handleImageClick = (imageUrl: string) => {
    console.log('handleImageClick 호출됨:', imageUrl);
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    console.log('모달 닫기');
    setImageModalOpen(false);
    setSelectedImage(null);
  };

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeImageModal();
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <label className="block text-sm font-semibold text-gray-700 mb-4">
        <FontAwesomeIcon icon={faImage} className="mr-2 text-indigo-500" />
        파일 업로드
      </label>
      
      {/* 업로드 영역 */}
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer transform hover:scale-[1.02]
          ${dragOver 
            ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg shadow-indigo-500/10' 
            : 'border-gray-300 hover:border-indigo-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-indigo-50 hover:shadow-md'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'shadow-sm'}
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
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl mb-3">
              <FontAwesomeIcon icon={faSpinner} className="text-white text-lg animate-spin" />
            </div>
            <p className="text-gray-600 font-medium">이미지를 업로드하는 중...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${
              dragOver 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/25' 
                : 'bg-gradient-to-r from-gray-400 to-gray-500'
            }`}>
              <FontAwesomeIcon 
                icon={faUpload} 
                className="text-white text-lg" 
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                이미지를 드래그하거나 클릭하여 업로드
              </p>
              <p className="text-sm text-gray-500 bg-gray-100 rounded-lg px-3 py-1.5 inline-block">
                최대 {maxImages}개, {maxSizeMB}MB 이하의 이미지 파일
              </p>
            </div>
          </div>
        )}

        {/* 업로드 상태 오버레이 */}
        {dragOver && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/90 to-purple-100/90 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="text-indigo-600 font-bold text-lg flex items-center">
              <FontAwesomeIcon icon={faUpload} className="mr-3 text-lg" />
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
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
            <h4 className="font-semibold text-gray-900 flex items-center">
              <FontAwesomeIcon icon={faImage} className="mr-2 text-indigo-500" />
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div 
                  className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('이미지 클릭됨:', image);
                    handleImageClick(image);
                  }}
                >
                  <img
                    src={image}
                    alt={`업로드된 이미지 ${index + 1}`}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
                
                {/* 삭제 버튼 */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 shadow-lg transform hover:scale-110 z-10"
                  title="이미지 삭제"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-sm" />
                </button>

                {/* 순서 표시 */}
                <div className="absolute top-3 left-3 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg z-10">
                  {index + 1}
                </div>

                {/* 확대 아이콘 */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 z-5">
                  <div className="text-white text-sm font-medium bg-black bg-opacity-50 px-3 py-1 rounded-full flex items-center">
                    <FontAwesomeIcon icon={faExpand} className="mr-1" />
                    클릭하여 확대
                  </div>
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

      {/* 이미지 모달 */}
      {imageModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
          onKeyDown={handleModalKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-7xl max-h-full">
            <img
              src={selectedImage}
              alt="확대된 이미지"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
              ESC 키를 누르거나 클릭하여 닫기
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;