import React, { useState } from 'react';
import { MessageSquare, Heart, User, Plus, Calendar, TrendingUp } from 'lucide-react';

const CommunityTab = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: '김개발',
      major: '컴퓨터공학과 3학년',
      title: '방탈출 예약 시스템 프로젝트 진행했어요!',
      content: 'Spring Boot로 RESTful API 구현하고 JPA로 DB 연동했습니다. 예약 관리 로직이 생각보다 복잡했는데, 시간표 충돌 체크하는 부분이 재미있었어요. 다들 실무에서는 어떻게 처리하시나요?',
      course: '웹 프로그래밍',
      likes: 24,
      comments: 5,
      createdAt: '2024-12-20',
      tags: ['Spring Boot', 'JPA', 'MySQL']
    },
    {
      id: 2,
      author: '이코딩',
      major: 'AI융합학과 2학년',
      title: '코딩테스트 준비 꿀팁 공유합니다',
      content: '백준 단계별로 풀기 추천드려요! 저는 알고리즘 수업 들으면서 하루에 1-2문제씩 풀었더니 실력이 많이 늘었습니다. 특히 DP 파트가 어려웠는데 반복해서 푸니까 감이 잡혔어요.',
      course: '알고리즘',
      likes: 42,
      comments: 12,
      createdAt: '2024-12-19',
      tags: ['코딩테스트', '알고리즘', '백준']
    },
    {
      id: 3,
      author: '박서버',
      major: '소프트웨어학과 4학년',
      title: '네이버 인턴 합격 후기 (백엔드)',
      content: '데이터베이스 수업 열심히 들었던 게 면접에서 엄청 도움 됐어요. 정규화, 인덱스, 트랜잭션 같은 개념들 확실히 알아두시면 좋습니다. 코딩테스트는 알고리즘 수업 범위 내에서 나왔어요!',
      course: '데이터베이스',
      likes: 89,
      comments: 23,
      createdAt: '2024-12-18',
      tags: ['취업', '인턴', '네이버', '면접']
    },
    {
      id: 4,
      author: '최개발자',
      major: '컴퓨터공학과 2학년',
      title: '운영체제 과목 꼭 들으세요!',
      content: '처음엔 이론만 배우는 줄 알았는데, 프로세스 스케줄링이나 메모리 관리 같은 개념이 실무에서 진짜 중요하더라고요. 특히 멀티스레딩 부분은 면접 단골 질문이에요.',
      course: '운영체제',
      likes: 31,
      comments: 8,
      createdAt: '2024-12-17',
      tags: ['운영체제', '면접', '추천과목']
    },
    {
      id: 5,
      author: '정프론트',
      major: 'AI융합학과 3학년',
      title: '머신러닝 프로젝트 팀원 구해요',
      content: '이번 학기 머신러닝 수업 프로젝트로 추천 시스템 만들려고 하는데 같이 하실 분 계신가요? Python, TensorFlow 사용 예정입니다. 관심 있으신 분은 댓글 주세요!',
      course: '머신러닝',
      likes: 15,
      comments: 7,
      createdAt: '2024-12-16',
      tags: ['팀원모집', 'ML', '프로젝트']
    }
  ]);

  const [showWriteForm, setShowWriteForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    course: '',
    tags: ''
  });

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleSubmit = () => {
    if (!newPost.title || !newPost.content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const post = {
      id: posts.length + 1,
      author: '나',
      major: '학과 정보 없음',
      title: newPost.title,
      content: newPost.content,
      course: newPost.course || '기타',
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString().split('T')[0],
      tags: newPost.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', course: '', tags: '' });
    setShowWriteForm(false);
    alert('게시글이 등록되었습니다!');
  };

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

      {/* 게시글 목록 */}
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
                <div className="text-xs text-gray-500">{post.major}</div>
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
            <h3 className="text-lg font-bold text-gray-800 mb-2">{post.title}</h3>
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
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-[#FFF5F5] rounded-lg transition-all">
                <MessageSquare className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{post.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityTab;