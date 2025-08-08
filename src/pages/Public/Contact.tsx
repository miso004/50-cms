import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 폼 제출 로직 추가
    console.log('폼 제출:', formData);
    alert('메시지가 성공적으로 전송되었습니다!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 메인 콘텐츠 */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">연락처</h1>
          <p className="text-xl text-gray-600">문의사항이나 제안사항이 있으시면 언제든 연락주세요.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 연락처 정보 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">연락처 정보</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">전화</h3>
                  <p className="text-gray-600">02-1234-5678</p>
                  <p className="text-gray-500 text-sm">평일 09:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">이메일</h3>
                  <p className="text-gray-600">info@cms-site.com</p>
                  <p className="text-gray-500 text-sm">24시간 내 답변</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">주소</h3>
                  <p className="text-gray-600">서울특별시 강남구 테헤란로 123</p>
                  <p className="text-gray-500 text-sm">CMS 빌딩 5층</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">업무 시간</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>월요일 - 금요일</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>토요일</span>
                  <span>10:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span>일요일</span>
                  <span>휴무</span>
                </div>
              </div>
            </div>
          </div>

          {/* 문의 폼 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">문의하기</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="이름을 입력하세요"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="이메일을 입력하세요"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  제목 *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">제목을 선택하세요</option>
                  <option value="general">일반 문의</option>
                  <option value="technical">기술 지원</option>
                  <option value="business">비즈니스 제휴</option>
                  <option value="feedback">피드백</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  메시지 *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="메시지를 입력하세요"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                메시지 보내기
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
