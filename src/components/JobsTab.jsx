import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, TrendingUp, Award, Sparkles } from 'lucide-react';
import JobDetailModal from './JobDetailModal';

const JobsTab = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(Date.now());
  const previousJobCdRef = useRef(null);
  const [userMajor, setUserMajor] = useState(localStorage.getItem('userMajor') || '컴퓨터공학과');

  // 전망 텍스트를 "좋음/보통/나쁨"으로 변환
  const getProspectLevel = (prospectText) => {
    if (!prospectText) return '보통';
    const text = prospectText.toLowerCase();
    if (text.includes('증가') || text.includes('좋') || text.includes('긍정')) return '좋음';
    if (text.includes('감소') || text.includes('나쁨') || text.includes('부정')) return '나쁨';
    return '보통';
  };

  // 직업 아이콘 매핑 (더미 데이터)
  const getJobIcon = (jobName) => {
    const iconMap = {
      '웹': '💻',
      '개발': '⚙️',
      '디자인': '🎨',
      '기획': '📋',
      '데이터': '📊',
      '보안': '🔒',
      '네트워크': '🌐',
      '시스템': '🖥️',
      '드론': '🚁',
      '로봇': '🤖',
      'AI': '🧠',
      '앱': '📱'
    };
    
    for (const [key, icon] of Object.entries(iconMap)) {
      if (jobName.includes(key)) return icon;
    }
    return '💼';
  };

  // 학과별 더미 데이터
  const getDummyJobsByMajor = (major) => {
    const jobsByMajor = {
      '컴퓨터공학과': [
        {
          id: 'dummy-1',
          jobCd: 'K000001',
          name: '웹 개발자',
          description: '웹사이트와 웹 애플리케이션을 설계하고 개발합니다.',
          salary: '평균 4,200만원',
          category: '정보통신',
          skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
          mainTasks: ['웹 프론트엔드 개발', '백엔드 API 개발', 'UI/UX 구현', '성능 최적화'],
          icon: '💻',
          prospect: '좋음',
          jobSatisfaction: '74%'
        },
        {
          id: 'dummy-2',
          jobCd: 'K000002',
          name: '데이터 과학자',
          description: '빅데이터를 분석하여 인사이트를 도출하고 예측 모델을 개발합니다.',
          salary: '평균 5,500만원',
          category: '정보통신',
          skills: ['Python', 'Machine Learning', 'SQL', '통계 분석'],
          mainTasks: ['데이터 수집 및 전처리', '머신러닝 모델 개발', '데이터 시각화', '예측 분석'],
          icon: '📊',
          prospect: '좋음',
          jobSatisfaction: '78%'
        },
        {
          id: 'dummy-3',
          jobCd: 'K000003',
          name: '정보보안 전문가',
          description: '시스템과 네트워크의 보안을 관리하고 사이버 위협에 대응합니다.',
          salary: '평균 4,800만원',
          category: '정보통신',
          skills: ['네트워크 보안', '침투 테스트', '암호화', '보안 정책'],
          mainTasks: ['보안 취약점 분석', '침해사고 대응', '보안 시스템 구축', '보안 정책 수립'],
          icon: '🔒',
          prospect: '좋음',
          jobSatisfaction: '72%'
        },
        {
          id: 'dummy-4',
          jobCd: 'K000004',
          name: '시스템 엔지니어',
          description: '서버와 네트워크 인프라를 설계하고 관리합니다.',
          salary: '평균 4,500만원',
          category: '정보통신',
          skills: ['Linux/Unix', '클라우드', '네트워크', 'DevOps'],
          mainTasks: ['서버 구축 및 관리', '네트워크 설계', '시스템 모니터링', '인프라 최적화'],
          icon: '🖥️',
          prospect: '보통',
          jobSatisfaction: '70%'
        }
      ],
      '소프트웨어학과': [
        {
          id: 'dummy-11',
          jobCd: 'K000011',
          name: '모바일 앱 개발자',
          description: 'iOS, Android 등 모바일 플랫폼 애플리케이션을 개발합니다.',
          salary: '평균 4,300만원',
          category: '정보통신',
          skills: ['Swift', 'Kotlin', 'Flutter', 'React Native'],
          mainTasks: ['모바일 UI/UX 개발', '앱 기능 구현', '성능 최적화', '스토어 배포'],
          icon: '📱',
          prospect: '좋음',
          jobSatisfaction: '76%'
        },
        {
          id: 'dummy-12',
          jobCd: 'K000012',
          name: '게임 개발자',
          description: '게임 소프트웨어를 설계하고 개발합니다.',
          salary: '평균 4,000만원',
          category: '소프트웨어',
          skills: ['Unity', 'Unreal Engine', 'C++', 'C#'],
          mainTasks: ['게임 엔진 개발', '게임 로직 구현', '그래픽 프로그래밍', '최적화'],
          icon: '🎮',
          prospect: '좋음',
          jobSatisfaction: '80%'
        },
        {
          id: 'dummy-13',
          jobCd: 'K000013',
          name: '소프트웨어 아키텍트',
          description: '대규모 소프트웨어 시스템의 전체 구조를 설계합니다.',
          salary: '평균 6,500만원',
          category: '소프트웨어',
          skills: ['시스템 설계', '아키텍처 패턴', '마이크로서비스', '클라우드'],
          mainTasks: ['시스템 아키텍처 설계', '기술 스택 선정', '코드 리뷰', '기술 리더십'],
          icon: '⚙️',
          prospect: '좋음',
          jobSatisfaction: '82%'
        },
        {
          id: 'dummy-14',
          jobCd: 'K000014',
          name: 'AI 엔지니어',
          description: '인공지능 모델을 개발하고 서비스에 적용합니다.',
          salary: '평균 6,000만원',
          category: '정보통신',
          skills: ['Deep Learning', 'TensorFlow', 'PyTorch', 'NLP'],
          mainTasks: ['AI 모델 개발', '모델 학습 및 튜닝', 'AI 서비스 구현', '성능 평가'],
          icon: '🧠',
          prospect: '좋음',
          jobSatisfaction: '85%'
        }
      ],
      '무인이동체공학': [
        {
          id: 'dummy-21',
          jobCd: 'K000021',
          name: '드론 시스템 엔지니어',
          description: '드론 하드웨어와 소프트웨어를 설계하고 개발합니다.',
          salary: '평균 4,500만원',
          category: '기계/항공',
          skills: ['드론 제어', '임베디드 시스템', 'C/C++', '센서 기술'],
          mainTasks: ['드론 비행 제어 시스템 개발', '센서 통합', '자율비행 알고리즘 구현', '성능 테스트'],
          icon: '🚁',
          prospect: '좋음',
          jobSatisfaction: '78%'
        },
        {
          id: 'dummy-22',
          jobCd: 'K000022',
          name: '자율주행 엔지니어',
          description: '자율주행 차량의 인식, 판단, 제어 시스템을 개발합니다.',
          salary: '평균 6,200만원',
          category: '자동차/항공',
          skills: ['컴퓨터 비전', 'ROS', 'SLAM', '센서 퓨전'],
          mainTasks: ['자율주행 알고리즘 개발', '센서 데이터 처리', '경로 계획', '안전 시스템 구축'],
          icon: '🚗',
          prospect: '좋음',
          jobSatisfaction: '82%'
        },
        {
          id: 'dummy-23',
          jobCd: 'K000023',
          name: '로봇 공학자',
          description: '산업용 및 서비스용 로봇을 설계하고 개발합니다.',
          salary: '평균 5,000만원',
          category: '기계',
          skills: ['로봇 제어', '모션 플래닝', '머신러닝', '센서 기술'],
          mainTasks: ['로봇 메커니즘 설계', '제어 알고리즘 개발', '인공지능 통합', '시뮬레이션'],
          icon: '🤖',
          prospect: '좋음',
          jobSatisfaction: '80%'
        },
        {
          id: 'dummy-24',
          jobCd: 'K000024',
          name: '항공 시스템 엔지니어',
          description: '항공기 및 우주선의 시스템을 설계하고 개발합니다.',
          salary: '평균 5,500만원',
          category: '항공우주',
          skills: ['항공역학', '비행 제어', '시스템 통합', 'MATLAB'],
          mainTasks: ['비행 제어 시스템 설계', '항공 시뮬레이션', '성능 분석', '안전성 검증'],
          icon: '✈️',
          prospect: '보통',
          jobSatisfaction: '75%'
        }
      ]
    };

    // 학과명 정규화 (여러 형식 지원)
    const normalizeMajor = (majorName) => {
      const majorMap = {
        '컴퓨터공학과': '컴퓨터공학과',
        '컴퓨터공학': '컴퓨터공학과',
        '소프트웨어학과': '소프트웨어학과',
        '소프트웨어학': '소프트웨어학과',
        '소프트웨어공학과': '소프트웨어학과',
        '무인이동체공학': '무인이동체공학',
        '무인이동체공학전공': '무인이동체공학',
        '무인이동체공학과': '무인이동체공학'
      };
      
      return majorMap[majorName] || '컴퓨터공학과';
    };

    const normalizedMajor = normalizeMajor(major);
    
    return jobsByMajor[normalizedMajor] || jobsByMajor['컴퓨터공학과'];
  };

  useEffect(() => {
    const loadDummyJobs = async () => {
      try {
        setLoading(true);
        
        // 최신 학과 정보 읽기
        const currentMajor = localStorage.getItem('userMajor') || '컴퓨터공학과';
        setUserMajor(currentMajor);
        
        // 더미 데이터 로드
        const dummyJobs = getDummyJobsByMajor(currentMajor);
        
        // 약간의 지연을 추가하여 실제 API처럼 보이게
        await new Promise(resolve => setTimeout(resolve, 300));
        setRelatedJobs(dummyJobs);
        setLoading(false);

      } catch (error) {
        console.error('더미 데이터 로드 중 오류:', error);
        setRelatedJobs([]);
        setLoading(false);
      }
    };

    loadDummyJobs();
  }, [lastFetchTime]);

  return (
    <div className="py-6">
      {/* 헤더 섹션 - 더 화려하게 */}
      <div className="bg-gradient-to-br from-[#FFF5F5] via-white to-[#FFF9F5] rounded-3xl border-2 border-[#FBBAB7]/30 p-8 mb-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#FBBAB7] to-[#F49795] rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">나의 전공 관련 직업</h2>
            <p className="text-gray-600">{userMajor} 졸업생들이 선택하는 다양한 진로를 탐색해보세요</p>
          </div>
        </div>

        {/* 통계 정보 */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 border border-[#FBBAB7]/20">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-[#EA7274]" />
              <span className="text-2xl font-bold text-gray-800">{loading ? '...' : relatedJobs.length}</span>
            </div>
            <p className="text-sm text-gray-600">추천 직업</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#FBBAB7]/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-[#EA7274]" />
              <span className="text-2xl font-bold text-gray-800">좋음</span>
            </div>
            <p className="text-sm text-gray-600">전망</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#FBBAB7]/20">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-[#EA7274]" />
              <span className="text-2xl font-bold text-gray-800">
                {loading ? '...' : (() => {
                  // 연봉 정보가 있는 직업들만 필터링
                  const jobsWithSalary = relatedJobs.filter(j => j.salary && j.salary !== '정보 없음');
                  
                  if (jobsWithSalary.length === 0) return '정보 없음';
                  
                  // "평균 4,200만원" 형식에서 숫자만 추출하여 평균 계산
                  const salaries = jobsWithSalary
                    .map(j => {
                      const match = j.salary.match(/[\d,]+/);
                      if (match) {
                        return parseInt(match[0].replace(/,/g, ''));
                      }
                      return null;
                    })
                    .filter(s => s !== null);
                  
                  if (salaries.length === 0) return '정보 없음';
                  
                  const avgSalary = Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length);
                  return `평균 ${avgSalary.toLocaleString()}만원`;
                })()}
              </span>
            </div>
            <p className="text-sm text-gray-600">평균 연봉</p>
          </div>
        </div>
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-12 h-12 border-4 border-[#FBBAB7] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">관련 직업 정보를 불러오는 중...</p>
        </div>
      )}

      {/* 직업 없음 */}
      {!loading && relatedJobs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-gray-200">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">관련 직업 정보가 없습니다.</p>
          <p className="text-gray-500 text-sm mt-2">희망 직업을 먼저 설정해주세요.</p>
        </div>
      )}

      {/* 직업 카드 그리드 - 더 크고 화려하게 */}
      {!loading && relatedJobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="group cursor-pointer bg-white hover:bg-gradient-to-br hover:from-[#FFF9F5] hover:to-[#FFF5F5] border-2 border-gray-200 hover:border-[#FBBAB7] rounded-3xl p-8 transition-all shadow-md hover:shadow-2xl hover:scale-[1.02] duration-300"
            >
              {/* 상단: 아이콘과 카테고리 */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-5xl">{job.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#EA7274] transition-colors">
                      {job.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-[#FFF5F5] to-[#FFE8E8] border border-[#FBBAB7] rounded-full text-sm font-medium text-[#EA7274]">
                    <Award className="w-3 h-3" />
                    {job.category}
                  </span>
                </div>
              </div>

              {/* 설명 */}
              <p className="text-gray-700 text-base mb-6 leading-relaxed line-clamp-3">{job.description}</p>

              {/* 주요 정보 */}
              <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FFE8E8] rounded-xl p-4 border border-[#FBBAB7]/30 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">연봉</p>
                    <p className="text-xl font-bold text-[#EA7274]">{job.salary}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 font-medium mb-1">전망</p>
                    <p className={`text-lg font-bold ${
                      job.prospect === '좋음' ? 'text-green-600' :
                      job.prospect === '나쁨' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {job.prospect}
                    </p>
                  </div>
                </div>
              </div>

              {/* 스킬 태그 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.slice(0, 4).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills.length > 4 && (
                  <span className="px-3 py-1.5 bg-gradient-to-r from-[#FBBAB7]/20 to-[#F49795]/20 border border-[#FBBAB7] rounded-lg text-sm text-[#EA7274] font-bold">
                    +{job.skills.length - 4}
                  </span>
                )}
              </div>

              {/* 더보기 버튼 */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-[#EA7274] font-bold text-base group-hover:gap-3 transition-all">
                  <Briefcase className="w-5 h-5" />
                  <span>상세 정보 보기</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* </div> */}


      {/* // 직업 상세 모달 */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default JobsTab;