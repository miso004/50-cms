import React from 'react';
import Layout from '../../components/layout/Layout';

const PostList: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">글 목록</h1>
          <p className="text-gray-600">모든 글을 확인해보세요.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-500 text-center py-8">글 목록 기능은 개발 중입니다.</p>
        </div>
      </div>
    </Layout>
  );
};

export default PostList; 