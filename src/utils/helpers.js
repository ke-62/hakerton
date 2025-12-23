// 카테고리별 그라데이션 색상 반환
export const getCategoryColor = (category) => {
  const colors = {
    foundation: 'from-[#FBBAB7] to-[#F49795]',
    development: 'from-[#F49795] to-[#EA7274]',
    advanced: 'from-[#EA7274] to-[#d85d5f]'
  };
  return colors[category] || 'from-gray-400 to-gray-600';
};

// 매칭률에 따른 색상 반환
export const getMatchColor = (rate) => {
  if (rate >= 80) return 'text-green-600';
  if (rate >= 60) return 'text-amber-600';
  return 'text-orange-600';
};

// Gap에 따른 우선순위 색상
export const getGapPriorityColor = (gap) => {
  if (gap > 20) return 'border-red-300 bg-red-50';
  if (gap > 10) return 'border-amber-300 bg-amber-50';
  return 'border-green-300 bg-green-50';
};

// 날짜 포맷팅
export const formatDeadline = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return '마감';
  if (diffDays === 0) return '오늘 마감';
  if (diffDays === 1) return '내일 마감';
  return `D-${diffDays}`;
};
