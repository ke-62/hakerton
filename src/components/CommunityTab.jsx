import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, User, Plus, Calendar, TrendingUp, X, Send, ThumbsUp, ArrowLeft } from 'lucide-react';

const CommunityTab = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showWriteForm, setShowWriteForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    course: '',
    tags: ''
  });

  // 브라우저 히스토리 연동 (스와이프 뒤로가기 지원)
  useEffect(() => {
    const handlePopState = (e) => {
      if (viewMode === 'detail') {
        e.preventDefault();
        setViewMode('list');
        setSelectedPost(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [viewMode]);

  // 게시글 목록 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('jwtToken');
        
        if (!token) {
          console.error('토큰이 없습니다.');
          setLoading(false);
          return;
        }

        const response = await fetch('http://172.16.72.219:3000/community/posts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('게시글 목록을 불러오지 못했습니다.');
        }

        const data = await response.json();
        
        // 백엔드 응답 구조 확인
        console.log('백엔드 응답:', data);
        
        // result.posts 형태인지 확인
        let postsArray = [];
        if (data.isSuccess && data.result) {
          postsArray = data.result.posts || data.result;
        } else if (Array.isArray(data)) {
          postsArray = data;
        }
        
        // 날짜 포맷 함수
        const formatDate = (dateString) => {
          try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '24/12/24';
            const year = String(date.getFullYear()).slice(-2);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}/${month}/${day}`;
          } catch {
            return '24/12/24';
          }
        };
        
        // 백엔드 데이터를 프론트엔드 형식으로 변환
        const formattedPosts = postsArray.map(post => ({
          id: post.id,
          author: post.author?.name || '익명',
          major: (post.author?.major && post.author?.grade) 
            ? `${post.author.major} ${post.author.grade}학년` 
            : '',
          title: post.title,
          content: post.content,
          course: post.course || '기타',
          likes: post.likes || 0,
          comments: post.comments?.length || 0,
          createdAt: formatDate(post.createdAt),
          tags: post.hashtags || [],
          commentList: (post.comments || []).map(comment => ({
            id: comment.id,
            author: comment.author?.name || '익명',
            content: comment.content,
            createdAt: formatDate(comment.createdAt),
            likes: comment.likes || 0
          }))
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error('게시글 목록 불러오기 오류:', error);
        alert('게시글 목록을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 상세 페이지로 이동 시 히스토리 추가
  const goToDetail = (post) => {
    setSelectedPost(post);
    setViewMode('detail');
    window.history.pushState({ view: 'detail', postId: post.id }, '', `#post-${post.id}`);
  };

  // 목록으로 돌아가기
  const goToList = () => {
    setViewMode('list');
    setSelectedPost(null);
    window.history.pushState({ view: 'list' }, '', '#community');
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
    }
  };

  const handleCommentLike = (commentId) => {
    if (!selectedPost) return;
    
    const updatedComments = selectedPost.commentList.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    );
    
    const updatedPost = { ...selectedPost, commentList: updatedComments };
    setSelectedPost(updatedPost);
    
    setPosts(posts.map(post =>
      post.id === selectedPost.id ? updatedPost : post
    ));
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      const response = await fetch(`http://172.16.72.219:3000/community/posts/${selectedPost.id}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: newComment
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('댓글 작성 실패:', response.status, errorData);
        throw new Error(errorData.message || '댓글 작성에 실패했습니다.');
      }

      const data = await response.json();
      console.log('댓글 작성 성공:', data);

      // 백엔드 응답에서 댓글 데이터 추출
      const commentData = data.result;
      
      // 날짜 포맷 (YY/MM/DD)
      const formatDate = (dateString) => {
        try {
          const date = new Date(dateString);
          if (isNaN(date.getTime())) return '24/12/24';
          const year = String(date.getFullYear()).slice(-2);
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}/${month}/${day}`;
        } catch {
          return '24/12/24';
        }
      };

      const newCommentData = {
        id: commentData.id,
        author: commentData.author?.name || '익명',
        content: commentData.content,
        createdAt: formatDate(commentData.createdAt),
        likes: commentData.likes || 0
      };

      const updatedPost = {
        ...selectedPost,
        commentList: [...(selectedPost.commentList || []), newCommentData],
        comments: (selectedPost.comments || 0) + 1
      };

      setSelectedPost(updatedPost);
      setPosts(posts.map(post =>
        post.id === selectedPost.id ? updatedPost : post
      ));
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성 오류:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  const handleSubmit = async () => {
    if (!newPost.title || !newPost.content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const userName = localStorage.getItem('userName') || '익명';
      const studentId = localStorage.getItem('studentId') || '';
      
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      // 백엔드 API 호출
      const requestBody = {
        title: newPost.title,
        content: newPost.content,
        hashtags: newPost.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      
      console.log('게시글 작성 요청:', requestBody);
      
      const response = await fetch('http://172.16.72.219:3000/community/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('게시글 작성 실패:', response.status, errorData);
        throw new Error(errorData.message || '게시글 작성에 실패했습니다.');
      }

      const data = await response.json();
      
      // 백엔드에서 받은 학과와 학년 정보 우선 사용
      const backendMajor = localStorage.getItem('userMajor');
      const backendGrade = localStorage.getItem('userGrade');
      
      let majorInfo = '학과 정보 없음';
      
      // 백엔드 데이터가 있으면 우선 사용
      if (backendMajor && backendGrade) {
        majorInfo = `${backendMajor} ${backendGrade}학년`;
      }

      // 새 게시글을 목록에 추가
      const newPostData = {
        id: data.id,
        author: userName,
        major: majorInfo,
        title: data.title,
        content: data.content,
        course: newPost.course || '기타',
        likes: data.likes || 0,
        comments: data.comments?.length || 0,
        createdAt: (() => {
          try {
            const date = new Date(data.createdAt);
            if (isNaN(date.getTime())) {
              // Invalid Date일 경우 현재 날짜 사용
              const now = new Date();
              const year = String(now.getFullYear()).slice(-2);
              const month = String(now.getMonth() + 1).padStart(2, '0');
              const day = String(now.getDate()).padStart(2, '0');
              return `${year}/${month}/${day}`;
            }
            const year = String(date.getFullYear()).slice(-2);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}/${month}/${day}`;
          } catch {
            const now = new Date();
            const year = String(now.getFullYear()).slice(-2);
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            return `${year}/${month}/${day}`;
          }
        })(),
        tags: data.hashtags || [],
        commentList: data.comments || []
      };

      setPosts([newPostData, ...posts]);
      setNewPost({ title: '', content: '', course: '', tags: '' });
      setShowWriteForm(false);
      alert('게시글이 등록되었습니다!');
    } catch (error) {
      console.error('게시글 작성 오류:', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  // 게시글 상세 보기
  if (viewMode === 'detail' && selectedPost) {
    return (
      <div className="space-y-6">
        {/* 뒤로가기 헤더 */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <button
            onClick={goToList}
            className="flex items-center gap-2 text-gray-600 hover:text-[#EA7274] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">목록으로 돌아가기</span>
          </button>
        </div>

        {/* 게시글 상세 */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          {/* 작성자 정보 */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FBBAB7] to-[#F49795] rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-800 text-lg">{selectedPost.author}</div>
              <div className="text-sm text-gray-500">{selectedPost.major}</div>
            </div>
            <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {selectedPost.createdAt}
            </div>
          </div>

          {/* 과목 태그 */}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-[#FFF5F5] border border-[#FBBAB7] rounded-full text-sm font-bold text-[#EA7274]">
              {selectedPost.course}
            </span>
          </div>

          {/* 제목과 내용 */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedPost.title}</h2>
          <p className="text-gray-700 mb-6 leading-relaxed text-lg whitespace-pre-wrap">{selectedPost.content}</p>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedPost.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 좋아요 버튼 */}
          <div className="flex items-center gap-4 py-6 border-y border-gray-200 mb-6">
            <button
              onClick={() => handleLike(selectedPost.id)}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FFF5F5] to-[#FFE8E8] hover:from-[#FBBAB7] hover:to-[#F49795] rounded-xl transition-all group border border-[#FBBAB7]"
            >
              <Heart className="w-5 h-5 text-[#EA7274] group-hover:text-white group-hover:fill-white transition-all" />
              <span className="font-bold text-[#EA7274] group-hover:text-white transition-all">좋아요 {selectedPost.likes}</span>
            </button>
            <div className="flex items-center gap-2 text-gray-600">
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">댓글 {selectedPost.commentList?.length || 0}</span>
            </div>
          </div>

          {/* 댓글 목록 */}
          <div className="space-y-4 mb-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4">댓글</h4>
            {selectedPost.commentList && selectedPost.commentList.length > 0 ? (
              selectedPost.commentList.map(comment => (
                <div key={comment.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#FBBAB7] to-[#F49795] rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-800">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.createdAt}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{comment.content}</p>
                      <button
                        onClick={() => handleCommentLike(comment.id)}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#EA7274] transition-colors"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                첫 댓글을 작성해보세요!
              </div>
            )}
          </div>

          {/* 댓글 작성 */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              rows="3"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#FBBAB7] focus:ring-2 focus:ring-[#FBBAB7]/20 outline-none transition-all resize-none mb-3"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddComment}
                className="px-6 py-2 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] hover:from-[#F49795] hover:to-[#EA7274] text-white rounded-lg font-bold shadow-lg transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                댓글 작성
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 게시글 목록
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">커뮤니티</h2>
            <p className="text-gray-600">수강 경험과 프로젝트를 공유하고, 선배들의 조언을 받아보세요</p>
          </div>
          <button
            onClick={() => setShowWriteForm(!showWriteForm)}
            className="px-6 py-3 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] hover:from-[#F49795] hover:to-[#EA7274] text-white rounded-xl font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            글 작성하기
          </button>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FFE8E8] rounded-xl p-4 border border-[#FBBAB7]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FBBAB7] rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{posts.length}</div>
                <div className="text-sm text-gray-600">전체 게시글</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{posts.reduce((sum, p) => sum + p.likes, 0)}</div>
                <div className="text-sm text-gray-600">총 좋아요</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">활발</div>
                <div className="text-sm text-gray-600">커뮤니티 활동</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 글 작성 폼 */}
      {showWriteForm && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 animate-in fade-in">
          <h3 className="text-xl font-bold text-gray-800 mb-6">새 글 작성</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="제목을 입력하세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#FBBAB7] focus:ring-2 focus:ring-[#FBBAB7]/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">관련 과목</label>
              <input
                type="text"
                value={newPost.course}
                onChange={(e) => setNewPost({ ...newPost, course: e.target.value })}
                placeholder="예: 웹 프로그래밍, 알고리즘 등"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#FBBAB7] focus:ring-2 focus:ring-[#FBBAB7]/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="내용을 입력하세요"
                rows="6"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#FBBAB7] focus:ring-2 focus:ring-[#FBBAB7]/20 outline-none transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">태그 (쉼표로 구분)</label>
              <input
                type="text"
                value={newPost.tags}
                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                placeholder="예: Spring Boot, 프로젝트, 팀원모집"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#FBBAB7] focus:ring-2 focus:ring-[#FBBAB7]/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] hover:from-[#F49795] hover:to-[#EA7274] text-white rounded-xl font-bold shadow-lg transition-all"
              >
                등록하기
              </button>
              <button
                onClick={() => setShowWriteForm(false)}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 로딩 상태 */}
      {loading ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-16 h-16 border-4 border-[#FBBAB7] border-t-[#EA7274] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">게시글을 불러오는 중입니다...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">아직 작성된 게시글이 없습니다</p>
          <p className="text-sm text-gray-500">첫 번째 게시글을 작성해보세요!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all"
            >
              {/* 작성자 정보 */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FBBAB7] to-[#F49795] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">{post.author}</div>
                </div>
                <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {post.createdAt}
                </div>
              </div>

              {/* 과목 태그 */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-[#FFF5F5] border border-[#FBBAB7] rounded-full text-sm font-medium text-[#EA7274]">
                  {post.course}
                </span>
              </div>

              {/* 제목과 내용 */}
              <h3 className="text-lg font-bold text-gray-800 mb-2 cursor-pointer hover:text-[#EA7274] transition-colors"
                  onClick={() => goToDetail(post)}
              >
                {post.title}
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

              {/* 태그 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 좋아요와 댓글 */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-[#FFF5F5] rounded-lg transition-all group"
                >
                  <Heart className="w-4 h-4 text-gray-600 group-hover:text-[#EA7274] group-hover:fill-[#EA7274] transition-all" />
                  <span className="text-sm font-medium text-gray-700">{post.likes}</span>
                </button>
                <button 
                  onClick={() => goToDetail(post)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-[#FFF5F5] rounded-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{post.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityTab;