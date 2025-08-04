import React from 'react';

interface SocialAuthButtonsProps {
  onGoogle?: () => void;
  onKakao?: () => void;
  type?: 'login' | 'signup';
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ onGoogle, onKakao, type = 'login' }) => {
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={onGoogle}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors shadow-sm"
      >
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5" />
        <span className="font-medium text-gray-700">Google로 {type === 'login' ? '로그인' : '회원가입'}</span>
      </button>
      <button
        type="button"
        onClick={onKakao}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-yellow-300 rounded-md bg-yellow-50 hover:bg-yellow-100 transition-colors shadow-sm"
      >
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/kakaotalk.svg" alt="Kakao" className="w-5 h-5" />
        <span className="font-medium text-yellow-800">카카오톡으로 {type === 'login' ? '로그인' : '회원가입'}</span>
      </button>
    </div>
  );
};

export default SocialAuthButtons;