import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faComment,
  faReply,
  faEdit,
  faTrash,
  faHeart,
  faSpinner,
  faExclamationTriangle,
  faCheck,
  faTimes,
  faUser,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import type { Comment, User } from '../../types';
import Button from './Button';
import Textarea from './Textarea';

interface CommentSectionProps {
  postId: string;
  className?: string;
}

interface CommentFormData {
  content: string;
  parentId?: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, className = '' }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [formData, setFormData] = useState<CommentFormData>({ content: '' });
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    setLoading(true);
    try {
      // 로컬 스토리지에서 댓글 로드
      const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
      const postComments = savedComments.filter((comment: Comment) => comment.postId === postId);
      
      // 날짜순 정렬 (최신순)
      postComments.sort((a: Comment, b: Comment) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      setComments(postComments);
    } catch (error) {
      console.error('댓글 로드 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!user || !formData.content.trim()) return;

    setSubmitting(true);
    try {
      const newComment: Comment = {
        id: `comment_${Date.now()}`,
        content: formData.content.trim(),
        author: user,
        postId,
        parentId: formData.parentId,
        createdAt: new Date(),
        updatedAt: new Date(),
        likeCount: 0,
        isLiked: false
      };

      // 로컬 스토리지에 저장
      const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
      const updatedComments = [newComment, ...savedComments];
      localStorage.setItem('comments', JSON.stringify(updatedComments));

      // 상태 업데이트
      setComments(prev => [newComment, ...prev]);
      setFormData({ content: '' });
      setShowCommentForm(false);
      setReplyingTo(null);
      
      // 성공 메시지 (실제로는 Toast 사용)
      console.log('댓글이 작성되었습니다.');
    } catch (error) {
      console.error('댓글 작성 오류:', error);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!editContent.trim()) return;

    try {
      // 로컬 스토리지 업데이트
      const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
      const updatedComments = savedComments.map((comment: Comment) => 
        comment.id === commentId 
          ? { ...comment, content: editContent.trim(), updatedAt: new Date() }
          : comment
      );
      localStorage.setItem('comments', JSON.stringify(updatedComments));

      // 상태 업데이트
      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, content: editContent.trim(), updatedAt: new Date() }
          : comment
      ));

      setEditingComment(null);
      setEditContent('');
    } catch (error) {
      console.error('댓글 수정 오류:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('이 댓글을 삭제하시겠습니까?')) return;

    try {
      // 로컬 스토리지 업데이트
      const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
      const updatedComments = savedComments.filter((comment: Comment) => comment.id !== commentId);
      localStorage.setItem('comments', JSON.stringify(updatedComments));

      // 상태 업데이트
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!user) return;

    try {
      // 로컬 스토리지에서 좋아요 상태 토글
      const comment = comments.find(c => c.id === commentId);
      if (!comment) return;

      const newLikeCount = comment.isLiked ? comment.likeCount - 1 : comment.likeCount + 1;
      const newIsLiked = !comment.isLiked;

      // 로컬 스토리지 업데이트
      const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
      const updatedComments = savedComments.map((c: Comment) => 
        c.id === commentId 
          ? { ...c, likeCount: newLikeCount, isLiked: newIsLiked }
          : c
      );
      localStorage.setItem('comments', JSON.stringify(updatedComments));

      // 상태 업데이트
      setComments(prev => prev.map(c => 
        c.id === commentId 
          ? { ...c, likeCount: newLikeCount, isLiked: newIsLiked }
          : c
      ));
    } catch (error) {
      console.error('좋아요 오류:', error);
    }
  };

  const startReply = (commentId: string) => {
    setReplyingTo(commentId);
    setFormData({ content: '', parentId: commentId });
    setShowCommentForm(true);
  };

  const startEdit = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  const cancelEdit = () => {
    setEditingComment(null);
    setEditContent('');
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setFormData({ content: '' });
    setShowCommentForm(false);
  };

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = new Date(date);
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(dateObj);
    } catch {
      return '-';
    }
  };

  const renderComment = (comment: Comment) => {
    const isOwner = user?.id === comment.author.id;
    const isEditing = editingComment === comment.id;

    return (
      <div key={comment.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {/* 댓글 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">
                {comment.author.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{comment.author.username}</h4>
              <p className="text-xs text-gray-500 flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                {formatDate(comment.createdAt)}
                {comment.updatedAt && new Date(comment.updatedAt).getTime() !== new Date(comment.createdAt).getTime() && (
                  <span className="ml-2">(수정됨)</span>
                )}
              </p>
            </div>
          </div>

          {/* 댓글 액션 */}
          {isOwner && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => startEdit(comment)}
                className="text-gray-400 hover:text-blue-600 p-1"
                title="수정"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="text-gray-400 hover:text-red-600 p-1"
                title="삭제"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        </div>

        {/* 댓글 내용 */}
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="댓글을 수정하세요..."
              rows={3}
              className="resize-none"
            />
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handleEditComment(comment.id)}
                size="sm"
                disabled={!editContent.trim()}
              >
                <FontAwesomeIcon icon={faCheck} className="mr-1" />
                저장
              </Button>
              <button
                onClick={cancelEdit}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                <FontAwesomeIcon icon={faTimes} className="mr-1" />
                취소
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
        )}

        {/* 댓글 하단 액션 */}
        {!isEditing && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleLikeComment(comment.id)}
                className={`flex items-center space-x-1 text-sm transition-colors ${
                  comment.isLiked 
                    ? 'text-red-600 hover:text-red-700' 
                    : 'text-gray-500 hover:text-red-600'
                }`}
                disabled={!user}
              >
                <FontAwesomeIcon icon={faHeart} />
                <span>{comment.likeCount || 0}</span>
              </button>

              {user && (
                <button
                  onClick={() => startReply(comment.id)}
                  className="flex items-center space-x-1 text-sm text-gray-500 hover:text-purple-600"
                >
                  <FontAwesomeIcon icon={faReply} />
                  <span>답글</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* 답글 폼 */}
        {replyingTo === comment.id && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-700 mb-3">
              {comment.author.username}님에게 답글 작성
            </h5>
            <div className="space-y-3">
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="답글을 작성하세요..."
                rows={3}
                className="resize-none"
              />
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleSubmitComment}
                  size="sm"
                  disabled={!formData.content.trim() || submitting}
                >
                  {submitting ? (
                    <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
                  ) : (
                    <FontAwesomeIcon icon={faReply} className="mr-1" />
                  )}
                  답글 작성
                </Button>
                <button
                  onClick={cancelReply}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 댓글 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <FontAwesomeIcon icon={faComment} className="mr-2 text-purple-600" />
          댓글 ({comments.length})
        </h3>
        
        {user && !showCommentForm && !replyingTo && (
          <Button
            onClick={() => setShowCommentForm(true)}
            size="sm"
          >
            <FontAwesomeIcon icon={faComment} className="mr-1" />
            댓글 작성
          </Button>
        )}
      </div>

      {/* 댓글 작성 폼 */}
      {showCommentForm && !replyingTo && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium text-gray-900">{user.username}</span>
              </div>
              
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="댓글을 작성하세요..."
                rows={4}
                className="resize-none"
              />
              
              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleSubmitComment}
                  disabled={!formData.content.trim() || submitting}
                >
                  {submitting ? (
                    <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
                  ) : (
                    <FontAwesomeIcon icon={faComment} className="mr-1" />
                  )}
                  댓글 작성
                </Button>
                <button
                  onClick={() => {
                    setShowCommentForm(false);
                    setFormData({ content: '' });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FontAwesomeIcon icon={faUser} className="text-4xl text-gray-300 mb-4" />
              <p className="text-gray-600 mb-4">댓글을 작성하려면 로그인이 필요합니다.</p>
              <Button onClick={() => window.location.href = '/login'}>
                로그인하기
              </Button>
            </div>
          )}
        </div>
      )}

      {/* 댓글 목록 */}
      {loading ? (
        <div className="text-center py-8">
          <FontAwesomeIcon icon={faSpinner} className="text-2xl text-purple-600 animate-spin mb-4" />
          <p className="text-gray-600">댓글을 불러오는 중...</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <FontAwesomeIcon icon={faComment} className="text-4xl text-gray-300 mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">아직 댓글이 없습니다</h4>
          <p className="text-gray-600 mb-4">첫 번째 댓글을 작성해보세요!</p>
          {user && !showCommentForm && (
            <Button onClick={() => setShowCommentForm(true)}>
              댓글 작성하기
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map(renderComment)}
        </div>
      )}
    </div>
  );
};

export default CommentSection;