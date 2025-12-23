# 살아있는 진로 로드맵 🚀

AI 기반 개인화 커리어 내비게이션 플랫폼

## 🎯 주요 기능

### 1. RPG 스킬 트리
- 게임처럼 재미있는 학습 경로 시각화
- 레벨/경험치 시스템으로 학습 진행도 추적
- 실시간 채용 공고 기반 과목 추천

### 2. 실시간 채용 공고 매칭
- 원티드, 프로그래머스 등에서 크롤링한 JD 분석
- 개인 역량과 채용 요구사항 매칭률 계산
- 부족한 역량 자동 분석

### 3. Gap Analysis
- 육각형 레이더 차트로 현재 vs 목표 역량 시각화
- 우선순위 기반 과목 추천
- 성공한 선배들의 수강 이력 데이터 활용

### 4. AI 자동 포트폴리오 생성
- 이수한 과목 기반 자기소개서 자동 작성
- 핵심 역량 추출 및 시각화
- PDF 다운로드 기능

## 🛠️ 기술 스택

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Create React App

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm start
```

브라우저에서 `http://localhost:3000` 접속

### 3. 프로덕션 빌드
```bash
npm run build
```

## 📁 프로젝트 구조

```
career-roadmap-platform/
├── public/
│   └── index.html              # HTML 템플릿
├── src/
│   ├── components/             # React 컴포넌트
│   │   ├── Header.jsx          # 헤더 (로고, 목표 직무)
│   │   ├── Navigation.jsx      # 탭 네비게이션
│   │   ├── SkillTreeTab.jsx    # 스킬 트리 탭
│   │   ├── SkillCard.jsx       # 개별 스킬 카드
│   │   ├── CourseDetailSidebar.jsx  # 과목 상세 정보
│   │   ├── JobsTab.jsx         # 채용 공고 탭
│   │   ├── JobCard.jsx         # 개별 채용 공고 카드
│   │   ├── GapAnalysisTab.jsx  # Gap 분석 탭
│   │   ├── RadarChart.jsx      # 육각형 레이더 차트
│   │   ├── GapList.jsx         # 우선순위 리스트
│   │   └── PortfolioTab.jsx    # 포트폴리오 탭
│   ├── data/
│   │   └── mockData.js         # 목 데이터
│   ├── utils/
│   │   └── helpers.js          # 유틸리티 함수
│   ├── App.jsx                 # 메인 앱 컴포넌트
│   ├── index.js                # 엔트리 포인트
│   └── index.css               # 글로벌 스타일
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 디자인 특징

### 다크 그라데이션 테마
- 프리미엄 느낌의 어두운 배경
- 유리 모피즘(Glassmorphism) 효과
- 네온 그라데이션 강조 요소

### 인터랙티브 UI
- 호버 시 확대/그림자 효과
- 부드러운 트랜지션 애니메이션
- 반응형 디자인

### 색상 체계
- **기초 과목**: 파란색 그라데이션
- **개발 과목**: 보라색 그라데이션  
- **심화 과목**: 핑크색 그라데이션

## 🔧 커스터마이징

### Mock 데이터 수정
`src/data/mockData.js` 파일에서 다음 데이터를 수정할 수 있습니다:
- 스킬 트리 (skillTree)
- 채용 공고 (liveJobs)
- Gap 분석 (gapAnalysis)
- 포트폴리오 (portfolioData)

### 스타일 커스터마이징
`tailwind.config.js`에서 색상, 폰트, 애니메이션 등을 커스터마이징할 수 있습니다.

## 🚀 향후 개발 계획

1. **백엔드 연동**
   - Spring Boot API 서버 구축
   - 실제 학교 요람 데이터 파싱
   - 사용자 인증 및 데이터 저장

2. **실시간 크롤링**
   - 채용 사이트 크롤러 구현
   - 채용 공고 자동 업데이트

3. **AI 기능 강화**
   - GPT API 연동으로 개인화 추천 고도화
   - 자동 포트폴리오 생성 품질 향상

4. **소셜 기능**
   - 스터디 그룹 매칭
   - 선배 멘토링 연결

## 📝 라이선스

MIT License

## 👥 개발자

고은 - Computer Engineering Sophomore

---

**문의사항이 있으시면 이슈를 등록해주세요!** 🙌
