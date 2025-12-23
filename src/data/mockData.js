// 스킬 트리 데이터
export const skillTree = [
  {
    id: 1,
    name: '자료구조',
    level: 3,
    maxLevel: 5,
    category: 'development',
    prerequisites: [],
    jobRelevance: 95,
    seniorsTook: 87,
    description: '네이버 백엔드 신입의 92%가 이 역량을 요구합니다. 성공한 선배들의 87%가 이수했습니다.',
    nextCourses: ['알고리즘', '웹 프로그래밍']
  },
  {
    id: 2,
    name: '알고리즘',
    level: 2,
    maxLevel: 5,
    category: 'development',
    prerequisites: [1],
    jobRelevance: 92,
    seniorsTook: 85,
    description: '코딩 테스트 통과율 85% 향상. 카카오, 네이버 필수 역량입니다.',
    nextCourses: ['머신러닝', '시스템 설계']
  },
  {
    id: 3,
    name: '웹 프로그래밍',
    level: 4,
    maxLevel: 5,
    category: 'development',
    prerequisites: [1],
    jobRelevance: 98,
    seniorsTook: 91,
    description: 'Spring Boot 실무 프로젝트 경험. 토스, 당근마켓 신입 필수 스킬입니다.',
    nextCourses: ['클라우드 아키텍처', 'MSA 설계']
  },
  {
    id: 4,
    name: '데이터베이스',
    level: 3,
    maxLevel: 5,
    category: 'development',
    prerequisites: [1],
    jobRelevance: 89,
    seniorsTook: 78,
    description: 'MySQL, PostgreSQL 활용 능력. 모든 백엔드 직무의 기본 요구사항입니다.',
    nextCourses: ['NoSQL 실습', '데이터 파이프라인']
  },
  {
    id: 5,
    name: '머신러닝',
    level: 1,
    maxLevel: 5,
    category: 'advanced',
    prerequisites: [2],
    jobRelevance: 85,
    seniorsTook: 62,
    description: 'AI 엔지니어 전환 시 필수. 네이버 클로바, 카카오 브레인 지원 시 우대됩니다.',
    nextCourses: ['딥러닝', 'NLP 응용']
  },
  {
    id: 6,
    name: '운영체제',
    level: 2,
    maxLevel: 5,
    category: 'development',
    prerequisites: [],
    jobRelevance: 88,
    seniorsTook: 80,
    description: '시스템 프로그래밍의 기초. 대기업 면접 단골 질문 영역입니다.',
    nextCourses: ['분산 시스템', '클라우드 컴퓨팅']
  },
];

// Gap Analysis 데이터
export const gapAnalysis = {
  current: [85, 70, 90, 65, 40, 75],
  target: [95, 90, 95, 85, 80, 90],
  labels: ['알고리즘', '웹개발', '데이터베이스', 'AI/ML', '시스템설계', '협업']
};

// 실시간 채용 공고
export const liveJobs = [
  {
    company: '네이버',
    position: '백엔드 개발자',
    requiredSkills: ['Java', 'Spring', 'MySQL'],
    matchRate: 87,
    deadline: '2024-01-15',
    logo: '🟢'
  },
  {
    company: '카카오',
    position: '풀스택 개발자',
    requiredSkills: ['React', 'Node.js', 'AWS'],
    matchRate: 72,
    deadline: '2024-01-20',
    logo: '💬'
  },
  {
    company: '토스',
    position: '서버 개발자',
    requiredSkills: ['Kotlin', 'Spring Boot', 'Redis'],
    matchRate: 65,
    deadline: '2024-01-18',
    logo: '💙'
  },
  {
    company: '쿠팡',
    position: '백엔드 엔지니어',
    requiredSkills: ['Java', 'Kubernetes', 'Docker'],
    matchRate: 78,
    deadline: '2024-01-22',
    logo: '📦'
  },
  {
    company: '당근마켓',
    position: '프론트엔드 개발자',
    requiredSkills: ['React', 'TypeScript', 'Next.js'],
    matchRate: 68,
    deadline: '2024-01-25',
    logo: '🥕'
  }
];

// 포트폴리오 자동 생성 데이터
export const portfolioData = {
  introduction: '저는 자료구조, 알고리즘, 웹 프로그래밍 과목을 통해 견고한 개발 기초를 다졌으며, 특히 Spring Boot를 활용한 백엔드 개발에 강점을 가지고 있습니다. 데이터베이스 설계부터 RESTful API 구현까지 전 과정을 경험하며 실무 역량을 쌓았습니다.',
  coreSkills: [
    '자료구조 & 알고리즘',
    'Spring Boot 백엔드',
    'RESTful API 설계',
    'MySQL 데이터베이스',
    'Git 협업',
    'Agile 방법론'
  ],
  projects: [
    {
      title: '방탈출 예약 시스템',
      period: '2024.09 - 2024.11',
      skills: ['Spring Boot', 'MySQL', 'JPA'],
      description: 'RESTful API 기반 예약 관리 시스템 구현'
    },
    {
      title: '알고리즘 스터디 플랫폼',
      period: '2024.03 - 2024.06',
      skills: ['React', 'Node.js', 'MongoDB'],
      description: '실시간 코드 리뷰 및 스터디 매칭 서비스'
    }
  ]
};
