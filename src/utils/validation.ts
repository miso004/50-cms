// 이메일 유효성 검사
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 비밀번호 유효성 검사 (최소 8자, 영문+숫자)
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

// 사용자명 유효성 검사 (2-20자, 영문+숫자+한글)
export const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[A-Za-z0-9가-힣]{2,20}$/;
  return usernameRegex.test(username);
};

// 제목 유효성 검사 (1-100자)
export const validateTitle = (title: string): boolean => {
  return title.trim().length >= 1 && title.trim().length <= 100;
};

// 내용 유효성 검사 (최소 10자)
export const validateContent = (content: string): boolean => {
  return content.trim().length >= 10;
};

// 폼 에러 메시지
export const getValidationMessage = (field: string, value: string): string => {
  switch (field) {
    case 'email':
      return validateEmail(value) ? '' : '올바른 이메일 주소를 입력해주세요.';
    case 'password':
      return validatePassword(value) ? '' : '비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.';
    case 'username':
      return validateUsername(value) ? '' : '사용자명은 2-20자의 영문, 숫자, 한글만 가능합니다.';
    case 'title':
      return validateTitle(value) ? '' : '제목은 1-100자 사이로 입력해주세요.';
    case 'content':
      return validateContent(value) ? '' : '내용은 최소 10자 이상 입력해주세요.';
    default:
      return '';
  }
}; 