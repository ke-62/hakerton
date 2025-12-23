import React from 'react';

const RadarChart = ({ gapAnalysis }) => {
  const { current, target, labels } = gapAnalysis;

  // 육각형의 각 꼭지점 좌표 계산
  const angleStep = (Math.PI * 2) / labels.length;
  const center = 200; // 중앙 위치 증가
  const maxRadius = 120; // 반지름

  const getPoint = (value, index, radius = maxRadius) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  };

  // 현재 역량 포인트들
  const currentPoints = current.map((val, idx) => getPoint(val, idx)).join(' ');

  // 목표 역량 포인트들
  const targetPoints = target.map((val, idx) => getPoint(val, idx)).join(' ');

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto mb-8">
      <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
        {/* 배경 그리드 (3개의 육각형) */}
        <polygon
          points={[0, 1, 2, 3, 4, 5].map(i => getPoint(100, i)).join(' ')}
          fill="none"
          stroke="rgba(229,229,229,1)"
          strokeWidth="1"
        />
        <polygon
          points={[0, 1, 2, 3, 4, 5].map(i => getPoint(66, i)).join(' ')}
          fill="none"
          stroke="rgba(229,229,229,1)"
          strokeWidth="1"
        />
        <polygon
          points={[0, 1, 2, 3, 4, 5].map(i => getPoint(33, i)).join(' ')}
          fill="none"
          stroke="rgba(229,229,229,1)"
          strokeWidth="1"
        />

        {/* 축선 */}
        {labels.map((_, idx) => (
          <line
            key={idx}
            x1={center}
            y1={center}
            x2={getPoint(100, idx).split(',')[0]}
            y2={getPoint(100, idx).split(',')[1]}
            stroke="rgba(229,229,229,1)"
            strokeWidth="1"
          />
        ))}

        {/* 목표 영역 */}
        <polygon
          points={targetPoints}
          fill="rgba(239,68,68,0.1)"
          stroke="rgba(239,68,68,0.5)"
          strokeWidth="2"
        />

        {/* 현재 역량 */}
        <polygon
          points={currentPoints}
          fill="rgba(251,113,133,0.3)"
          stroke="rgba(251,113,133,1)"
          strokeWidth="3"
        />

        {/* 현재 역량 포인트 표시 */}
        {current.map((val, idx) => {
          const [x, y] = getPoint(val, idx).split(',');
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r="4"
              fill="rgba(251,113,133,1)"
              stroke="white"
              strokeWidth="2"
            />
          );
        })}

        {/* 레이블 - 위치 조정 및 배경 추가 */}
        {labels.map((label, idx) => {
          const [x, y] = getPoint(110, idx, 140).split(',');
          const angle = angleStep * idx - Math.PI / 2;

          // 레이블의 앵커 포인트 계산 (중앙에서 먼 쪽으로)
          let textAnchor = 'middle';
          if (Math.cos(angle) > 0.3) textAnchor = 'start';
          if (Math.cos(angle) < -0.3) textAnchor = 'end';

          return (
            <g key={idx}>
              {/* 배경 박스 */}
              <rect
                x={textAnchor === 'start' ? x + 2 : textAnchor === 'end' ? x - 95 : x - 47}
                y={y - 14}
                width="95"
                height="28"
                fill="white"
                opacity="0.95"
                rx="4"
              />
              {/* 텍스트 */}
              <text
                x={textAnchor === 'start' ? x + 49 : textAnchor === 'end' ? x - 47 : x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#374151"
                fontSize="16"
                fontWeight="700"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default RadarChart;