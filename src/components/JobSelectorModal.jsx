import React, { useState, useEffect } from 'react';
import { X, Briefcase, Search } from 'lucide-react';

const JobSelectorModal = ({ onClose, onSelectJob }) => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 전체 직업 목록 조회
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setIsLoading(true);
                console.log('직업 목록 조회 시작...');
                
                const response = await fetch('http://172.19.31.67:3000/career/jobs', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                console.log('응답 상태:', response.status);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('받은 데이터:', data);

                if (data.isSuccess) {
                    setJobs(data.result);
                    setFilteredJobs(data.result);
                    setError(null);
                } else {
                    setError(data.message || '직업 목록을 불러오는데 실패했습니다.');
                }
            } catch (err) {
                console.error('직업 목록 조회 에러 상세:', err);
                console.error('에러 메시지:', err.message);
                setError(`서버 연결 실패: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // 검색 필터링
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredJobs(jobs);
        } else {
            const filtered = jobs.filter(job =>
                job.jobNm.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredJobs(filtered);
        }
    }, [searchTerm, jobs]);

    // 직업 선택 및 저장
    const handleSelectJob = async (job) => {
        try {
            console.log('직업 선택:', job);
            
            const token = localStorage.getItem('jwtToken');
            console.log('토큰 확인:', token ? '✅ 존재' : '❌ 없음');
            
            if (!token) {
                console.error('토큰이 없습니다. 다시 로그인해주세요.');
                alert('인증 정보가 없습니다. 다시 로그인해주세요.');
                return;
            }
            
            const response = await fetch('http://172.19.31.67:3000/users/profile/desired-job', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    jobNm: job.jobNm,
                    jobCd: job.jobCd
                })
            });

            console.log('저장 응답 상태:', response.status);
            
            const data = await response.json();
            console.log('저장 응답 데이터:', data);

            if (data.isSuccess) {
                onSelectJob(job.jobNm);
                onClose();
            } else {
                // 저장은 실패했지만 선택은 적용 (개발 중)
                console.warn('저장 실패했지만 선택은 적용:', data.message);
                alert(`직업 선택됨: ${job.jobNm}\n(백엔드 저장 실패: ${data.message})`);
                onSelectJob(job.jobNm);
                onClose();
            }
        } catch (err) {
            console.error('직업 저장 에러:', err);
            // 에러 발생해도 선택은 적용 (개발 중)
            alert(`직업 선택됨: ${job.jobNm}\n(백엔드 연결 실패, 프론트엔드에만 저장됨)`);
            onSelectJob(job.jobNm);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                {/* 헤더 */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#FBBAB7] to-[#F49795] rounded-xl flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">목표 직업 선택</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    {/* 검색 바 */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="직업명으로 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FBBAB7] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* 직업 리스트 */}
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <div className="w-12 h-12 border-4 border-[#FBBAB7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-600">직업 목록을 불러오는 중...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <p className="text-red-600 mb-2">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-sm text-[#EA7274] hover:underline"
                                >
                                    다시 시도
                                </button>
                            </div>
                        </div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="flex items-center justify-center py-12">
                            <p className="text-gray-600">검색 결과가 없습니다.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            {filteredJobs.map((job) => (
                                <button
                                    key={job.jobCd}
                                    onClick={() => handleSelectJob(job)}
                                    className="group p-4 bg-gradient-to-br from-[#FFF9F5] to-[#FFF5F5] hover:from-[#FFF5F5] hover:to-[#FFE8E8] border-2 border-[#FBBAB7]/30 hover:border-[#FBBAB7] rounded-2xl transition-all text-left"
                                >
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-[#EA7274]" />
                                        <h3 className="font-bold text-gray-800">{job.jobNm}</h3>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobSelectorModal;
