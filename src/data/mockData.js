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
  labels: ['알고리즘', '웹개발', 'DB', 'AI/ML', '시스템', '협업']
};

// 컴퓨터공학과 관련 직업 목록
export const careerJobs = [
  {
    id: 1,
    name: '백엔드 개발자',
    // icon: '💻',
    category: '소프트웨어 개발',
    description: '서버, 데이터베이스, API를 개발하고 관리하는 개발자',
    tasks: [
      'RESTful API 설계 및 개발',
      '데이터베이스 설계 및 최적화',
      '서버 성능 모니터링 및 개선',
      '보안 및 인증 시스템 구현',
      '마이크로서비스 아키텍처 설계'
    ],
    skills: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Docker', 'Kubernetes', 'AWS'],
    salary: '신입 4,000만원 ~ 경력 8,000만원',
    companies: ['네이버', '카카오', '토스', '쿠팡', '배민', '당근마켓']
  },
  {
    id: 2,
    name: '프론트엔드 개발자',
    // icon: '🎨',
    category: '소프트웨어 개발',
    description: '사용자가 직접 보고 상호작용하는 웹/앱 화면을 개발',
    tasks: [
      '사용자 인터페이스(UI) 구현',
      '반응형 웹 디자인 개발',
      '웹 성능 최적화',
      'API 연동 및 상태 관리',
      '크로스 브라우저 호환성 확보'
    ],
    skills: ['JavaScript', 'React', 'TypeScript', 'Next.js', 'CSS', 'HTML', 'Webpack'],
    salary: '신입 3,800만원 ~ 경력 7,500만원',
    companies: ['당근마켓', '토스', '네이버', '카카오', '쿠팡', '우아한형제들']
  },
  {
    id: 3,
    name: '데이터 엔지니어',
    // icon: '📊',
    category: '데이터',
    description: '대규모 데이터 파이프라인을 설계하고 구축하는 전문가',
    tasks: [
      '데이터 파이프라인 설계 및 구축',
      'ETL 프로세스 개발',
      '데이터 웨어하우스 관리',
      '실시간 데이터 처리 시스템 구축',
      '데이터 품질 관리'
    ],
    skills: ['Python', 'Spark', 'Airflow', 'Kafka', 'SQL', 'AWS', 'Hadoop'],
    salary: '신입 4,200만원 ~ 경력 9,000만원',
    companies: ['네이버', '카카오', '쿠팡', '토스', '라인', '배민']
  },
  {
    id: 4,
    name: 'AI/ML 엔지니어',
    // icon: '🤖',
    category: '인공지능',
    description: '머신러닝 모델을 개발하고 실제 서비스에 적용',
    tasks: [
      '머신러닝 모델 설계 및 학습',
      '데이터 전처리 및 특성 엔지니어링',
      '모델 성능 평가 및 최적화',
      'ML 파이프라인 구축',
      'MLOps 시스템 구축'
    ],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Keras', 'MLflow', 'Kubeflow'],
    salary: '신입 4,500만원 ~ 경력 10,000만원',
    companies: ['네이버', '카카오', '라인', '토스', 'SK텔레콤', 'LG AI연구원']
  },
  {
    id: 5,
    name: 'DevOps 엔지니어',
    // icon: '⚙️',
    category: '인프라',
    description: '개발과 운영의 효율성을 높이는 자동화 및 인프라 관리',
    tasks: [
      'CI/CD 파이프라인 구축',
      '클라우드 인프라 관리',
      '모니터링 시스템 구축',
      '컨테이너 오케스트레이션',
      '인프라 자동화'
    ],
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'AWS', 'Linux', 'Python'],
    salary: '신입 4,000만원 ~ 경력 8,500만원',
    companies: ['쿠팡', '토스', '네이버', '카카오', '배민', '당근마켓']
  },
  {
    id: 6,
    name: '보안 엔지니어',
    // icon: '🔒',
    category: '보안',
    description: '시스템과 네트워크의 보안을 담당하는 전문가',
    tasks: [
      '보안 취약점 분석 및 대응',
      '보안 모니터링 시스템 구축',
      '침입 탐지 및 방어 시스템 관리',
      '보안 정책 수립 및 교육',
      '보안 사고 대응 및 분석'
    ],
    skills: ['Network Security', 'Penetration Testing', 'Python', 'Linux', 'SIEM', 'IDS/IPS'],
    salary: '신입 4,200만원 ~ 경력 9,500만원',
    companies: ['삼성SDS', 'LG CNS', '네이버', '카카오', 'SK쉴더스', '안랩']
  }
];

// 실시간 채용 공고
export const liveJobs = [
  {
    company: '네이버',
    position: '백엔드 개발자 (신입)',
    requiredSkills: ['Java', 'Spring', 'MySQL'],
    deadline: '2025-01-15',
    location: '경기 성남시',
    logo: '🟢',
    link: 'https://recruit.navercorp.com'
  },
  {
    company: '카카오',
    position: '풀스택 개발자 (경력무관)',
    requiredSkills: ['React', 'Node.js', 'AWS'],
    deadline: '2025-01-20',
    location: '제주',
    logo: '💬',
    link: 'https://careers.kakao.com'
  },
  {
    company: '토스',
    position: '서버 개발자 (신입)',
    requiredSkills: ['Kotlin', 'Spring Boot', 'Redis'],
    deadline: '2025-01-18',
    location: '서울 강남구',
    logo: '💙',
    link: 'https://toss.im/career'
  },
  {
    company: '쿠팡',
    position: '백엔드 엔지니어 (신입)',
    requiredSkills: ['Java', 'Kubernetes', 'Docker'],
    deadline: '2025-01-22',
    location: '서울 송파구',
    logo: '📦',
    link: 'https://www.coupang.jobs'
  },
  {
    company: '당근마켓',
    position: '프론트엔드 개발자 (신입)',
    requiredSkills: ['React', 'TypeScript', 'Next.js'],
    deadline: '2025-01-25',
    location: '서울 성동구',
    logo: '🥕',
    link: 'https://team.daangn.com'
  },
  {
    company: '라인',
    position: 'AI 엔지니어 (신입)',
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch'],
    deadline: '2025-01-28',
    location: '경기 성남시',
    logo: '💚',
    link: 'https://careers.linecorp.com'
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