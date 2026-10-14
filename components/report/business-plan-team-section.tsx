import { Badge, Separator } from "@/components/ui"
import { Square } from "lucide-react"
import BusinessPlanReportHeader from "./business-plan-report-header"

function BusinessPlanTeamSection() {
    return (
        <>
            {/* 팀 구성 및 사업비 집행 계획 - 가. 핵심 인력 구성 및 R&D 역량 */}
            <div className="flex h-auto min-h-280.75 w-198.5 shrink-0 flex-col rounded-lg bg-white p-6 text-[11px] text-black">
                <BusinessPlanReportHeader />
                <section className="flex flex-col gap-6 py-6">
                    <div className="flex items-center justify-between border-b border-black pb-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="w-5! rounded-xs border border-blue-200 bg-blue-100 font-semibold text-blue-900">
                                4
                            </Badge>
                            <span className="text-base font-semibold">4. 팀 구성 (Team) 및 사업비 집행 계획</span>
                        </div>
                        <span className="border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-900">
                            [인적역량 및 자금운용 계획]
                        </span>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-semibold text-neutral-900">가. 핵심 인력 구성 및 연구개발 역량 (조직 체계도 & 인재 프로필)</span>
                        <div className="mt-2 flex w-full flex-col items-center gap-3 rounded-sm border border-neutral-500 p-3">
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-1.5 text-sm font-bold text-neutral-900">
                                    <Square fill="#1e3a8a" className="h-3 w-3 text-blue-900" />
                                    <span>[도 4-1] 핵심 인적 역량 및 주요 직무 실적 요약</span>
                                </div>
                                <span className="border border-blue-300 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-900">
                                    전원 풀타임 상근 인력 (창업팀 지분율 92.4% 결속)
                                </span>
                            </div>
                            <Separator className="bg-blue-200" />

                            <div className="flex w-full flex-col gap-2.5 text-left">
                                {[
                                    {
                                        role: "대표이사 / CEO",
                                        name: "김 태 윤",
                                        career: "경력 10년",
                                        isCEO: true,
                                        spec: "컴퓨터 비전 · 엣지 AI",
                                        exp: "前 K사 자율주행 코어 엔진 설계, NPU 알고리즘 특허 2건 보유",
                                        task: "R&D 총괄 · 비전 AI 코어 모델 설계 및 사업화 전략 수립",
                                    },
                                    {
                                        role: "연구소장 / CTO",
                                        name: "박 민 우",
                                        career: "경력 8년",
                                        isCEO: false,
                                        spec: "클라우드 아키텍처 · 데이터 엔지니어링",
                                        exp: "대규모 분산처리 플랫폼 구축 5년, 추천 알고리즘 설계 특허 3건",
                                        task: "클라우드 인프라 아키텍처 설계 · 비전 데이터 파이프라인 구축",
                                    },
                                    {
                                        role: "사업이사 / CPO",
                                        name: "이 지 은",
                                        career: "경력 7년",
                                        isCEO: false,
                                        spec: "B2B 서비스 기획 · 신선식품 SCM",
                                        exp: "대형 커머스 신선 물류 설계, 600여 개 산지 농가 네트워크 구축",
                                        task: "식자재 당일 소진 BM 검증 · 플랫폼 서비스 기획 및 UX 고도화",
                                    },
                                    {
                                        role: "수석연구원 / Lead",
                                        name: "최 영 환",
                                        career: "경력 5년",
                                        isCEO: false,
                                        spec: "AI 모델 최적화 · MLOps",
                                        exp: "비전 모델 경량화(Pruning) 기법을 통한 추론 속도 400% 향상 리드",
                                        task: "온디바이스 엣지 추론 엔진 최적화 · AI 모델 서빙 환경 구축",
                                    },
                                ].map((member) => (
                                    <div
                                        key={member.name}
                                        className={`flex w-full border ${member.isCEO ? "border-blue-300" : "border-neutral-400"} bg-white text-left`}
                                    >
                                        <div
                                            className={`flex w-36 shrink-0 flex-col items-start justify-center border-r ${member.isCEO ? "border-blue-300 bg-blue-50/70" : "border-neutral-400 bg-neutral-100"} p-2.5`}
                                        >
                                            <span
                                                className={`border ${member.isCEO ? "border-blue-800 bg-blue-900" : "border-neutral-700 bg-neutral-800"} px-1.5 py-0.5 text-[9px] font-bold text-white`}
                                            >
                                                {member.role}
                                            </span>
                                            <span className={`mt-1 text-sm font-bold ${member.isCEO ? "text-blue-950" : "text-neutral-900"}`}>
                                                {member.name}
                                            </span>
                                            <span className="mt-0.5 w-full border-t border-neutral-300 pt-0.5 text-[9.5px] font-semibold text-neutral-600">
                                                {member.career}
                                            </span>
                                        </div>
                                        <div className="flex flex-1 flex-col divide-y divide-neutral-300 text-[10px]">
                                            <div className="flex items-center">
                                                <div className="flex w-20 shrink-0 items-center justify-center self-stretch border-r border-neutral-300 bg-neutral-100 py-1.5 font-bold text-neutral-800">
                                                    전문 분야
                                                </div>
                                                <div className="flex-1 px-3 py-1.5 font-semibold text-neutral-900">{member.spec}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex w-20 shrink-0 items-center justify-center self-stretch border-r border-neutral-300 bg-neutral-100 py-1.5 font-bold text-neutral-800">
                                                    주요 역량
                                                </div>
                                                <div className="flex-1 px-3 py-1.5 font-medium text-neutral-700">{member.exp}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex w-20 shrink-0 items-center justify-center self-stretch border-r border-neutral-300 bg-blue-100/70 py-1.5 font-bold text-blue-900">
                                                    담당 역할
                                                </div>
                                                <div className="flex-1 bg-blue-50/30 px-3 py-1.5 font-bold text-blue-950">{member.task}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-1 flex w-full items-center gap-2 border border-blue-300 bg-blue-50/50 p-2 text-left">
                                <span className="shrink-0 border border-blue-800 bg-blue-900 px-2 py-0.5 text-[9.5px] font-bold text-white">
                                    ※ 사외 기술 / 산업 전문 자문단
                                </span>
                                <p className="text-[10px] font-semibold whitespace-nowrap text-blue-950">
                                    AI 비전&middot;멀티모달 전문위원 (기술 검증 자문) & 식품 유통 총괄임원 (BM 기획 및 SCM 물류 자문) 연계
                                </p>
                            </div>
                        </div>

                        <div className="mt-2 flex w-full flex-col items-center gap-3 rounded-sm border border-blue-200 bg-white p-3">
                            <div className="mb-1 flex w-full items-center justify-between">
                                <span className="flex items-center gap-1.5 text-[11px] font-bold text-blue-950">
                                    <span className="inline-block h-2.5 w-2.5 bg-blue-900" />
                                    창업팀 핵심 역량 시너지 및 R&D 추진 체계 우수성
                                </span>
                                <span className="border border-blue-300 bg-blue-50 px-2 py-0.5 text-[9.5px] font-bold text-blue-900">
                                    인하우스 R&D 100% · 특허 5건
                                </span>
                            </div>
                            <Separator className="-mt-2 bg-blue-200" />
                            <div className="grid grid-cols-3 gap-2">
                                <div className="flex flex-col gap-1.5 border border-blue-200 bg-blue-50/30 p-2.5 text-left">
                                    <span className="border-b border-blue-200 pb-1 text-[10px] font-bold text-blue-900">1. 독보적 기술 전문성 내재화</span>
                                    <span className="text-[10px] leading-relaxed font-medium text-neutral-700">
                                        &middot; 핵심 인력 전원 AI/SW 개발 경력 평균 7.5년 이상
                                        <br />
                                        &middot; 자율주행 및 대규모 분산처리 플랫폼 관련 특허 5건
                                        <br />
                                        &middot; 핵심 알고리즘 설계 및 최적화 (외주 의존도 0%)
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1.5 border border-blue-200 bg-blue-50/30 p-2.5 text-left">
                                    <span className="border-b border-blue-200 pb-1 text-[10px] font-bold text-blue-900">2. 린(Lean) 기반 사업화 검증 역량</span>
                                    <span className="text-[10px] leading-relaxed font-medium text-neutral-700">
                                        &middot; 대형 커머스 SCM 구축 및 퀵커머스 플랫폼 성공 경험
                                        <br />
                                        &middot; 타겟 시장(신선식품) 높은 이해도 & 600개 산지 네트워크
                                        <br />
                                        &middot; 기획-개발-운영-마케팅 풀스택 인하우스 역량
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1.5 border border-blue-200 bg-blue-50/30 p-2.5 text-left">
                                    <span className="border-b border-blue-200 pb-1 text-[10px] font-bold text-blue-900">3. 안정적 과제 수행 및 성공 환경</span>
                                    <span className="text-[10px] leading-relaxed font-medium text-neutral-700">
                                        &middot; 핵심 인력 전원 지분 보유(92.4%)로 근속 및 몰입도 극대화
                                        <br />
                                        &middot; 외부 최고 수준 자문단 연계를 통한 리스크 조기 헷지
                                        <br />
                                        &middot; TRL 3단계(기본 성능 검증) 도달로 즉각적 사업화 실증
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* 고용 창출 로드맵 & 비목별 예산 집행 계획 (새 페이지) */}
            <div className="flex h-auto min-h-280.75 w-198.5 shrink-0 flex-col rounded-lg bg-white p-6 text-[11px] text-black">
                <BusinessPlanReportHeader />
                <section className="flex flex-col gap-6 py-6">
                    {/* 나. 고용 창출 및 단계별 인재 채용 로드맵 */}
                    <div className="flex flex-col items-start gap-2">
                        <span className="text-sm font-semibold text-neutral-900">나. 고용 창출 및 단계별 인재 채용 로드맵 (연차별 팀 스케일업)</span>
                        <div className="mt-2 flex w-full flex-col items-center gap-3 border border-neutral-500 bg-white p-3">
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-1.5 text-sm font-bold text-neutral-900">
                                    <Square fill="#1e3a8a" className="h-2.5 w-2.5 text-blue-900" />
                                    <span>[도 4-2] 3개년 연차별 신규 채용 및 직군별 인력 확충 로드맵</span>
                                </div>
                                <span className="border border-blue-300 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-900">
                                    3개년 누적 인원 : 4명 → 10명 → 18명
                                </span>
                            </div>
                            <Separator className="bg-neutral-300" />
                            {/* 연차별 타임라인 인포그래픽 */}
                            <div className="flex w-full items-stretch gap-2">
                                {[
                                    {
                                        year: "1차년도",
                                        period: "2025",
                                        headcount: "4명 → 6명",
                                        hires: "+2명 신규",
                                        isKey: false,
                                        roles: [
                                            { dept: "R&D", role: "AI 비전 엔지니어", count: 1 },
                                            { dept: "기획", role: "UX/서비스 기획자", count: 1 },
                                        ],
                                        goal: "MVP 검증 및 핵심 기술 내재화",
                                    },
                                    {
                                        year: "2차년도",
                                        period: "2026",
                                        headcount: "6명 → 12명",
                                        hires: "+6명 신규",
                                        isKey: false,
                                        roles: [
                                            { dept: "R&D", role: "MLOps / 데이터 엔지니어", count: 2 },
                                            { dept: "영업", role: "B2B 세일즈 / 파트너십", count: 2 },
                                            { dept: "운영", role: "고객성공(CS) / 운영기획", count: 2 },
                                        ],
                                        goal: "전국 확산 및 제휴 네트워크 구축",
                                    },
                                    {
                                        year: "3차년도",
                                        period: "2027",
                                        headcount: "12명 → 20명",
                                        hires: "+8명 신규",
                                        isKey: true,
                                        roles: [
                                            { dept: "R&D", role: "글로벌 AI 리서처", count: 2 },
                                            { dept: "사업", role: "해외사업개발(BD)", count: 2 },
                                            { dept: "마케팅", role: "그로스 마케터 / 브랜드", count: 2 },
                                            { dept: "재무", role: "CFO / 재무기획", count: 2 },
                                        ],
                                        goal: "동남아 진출 및 흑자 전환",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={item.year}
                                        className={`flex flex-1 flex-col gap-2 border ${item.isKey ? "border-blue-300 bg-blue-50/20" : "border-neutral-300 bg-white"} p-2.5 text-left`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <span
                                                    className={`flex h-5 w-5 items-center justify-center border ${item.isKey ? "border-blue-700 bg-blue-900 text-white" : "border-neutral-400 bg-neutral-100 text-neutral-800"} text-[9px] font-bold`}
                                                >
                                                    {i + 1}
                                                </span>
                                                <span className="font-bold text-neutral-900">
                                                    {item.year} <span className="font-normal text-neutral-500">({item.period})</span>
                                                </span>
                                            </div>
                                            <span
                                                className={`border ${item.isKey ? "border-blue-300 bg-blue-50 text-blue-900" : "border-neutral-200 bg-neutral-50 text-neutral-800"} px-2 py-0.5 text-[10px] font-bold`}
                                            >
                                                {item.hires}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between border-y border-neutral-200 bg-neutral-50 px-2 py-1 text-[10px]">
                                            <span className="text-neutral-500">누적 인원</span>
                                            <span className={`font-bold ${item.isKey ? "text-blue-950" : "text-neutral-900"}`}>{item.headcount}</span>
                                        </div>
                                        <div className="flex flex-col gap-1 py-1">
                                            {item.roles.map((r) => (
                                                <div key={r.role} className="flex items-start gap-1.5 text-[10px]">
                                                    <span className="mt-px flex shrink-0 items-center border border-neutral-300 bg-neutral-100 px-1 font-semibold text-neutral-700">
                                                        {r.dept}
                                                    </span>
                                                    <span className="text-neutral-700">
                                                        {r.role} ({r.count}명)
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div
                                            className={`mt-auto border-t border-neutral-200 pt-1.5 text-[10px] font-semibold ${item.isKey ? "text-blue-900" : "text-neutral-600"}`}
                                        >
                                            - {item.goal}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* 인원 성장 프로그레스 바 */}
                            <div className="flex w-full flex-col gap-2 border border-neutral-300 bg-neutral-50 p-3 text-left">
                                <span className="text-[10px] font-bold text-neutral-900">직군별 연차 인력 구성 (누적 기준)</span>
                                {[
                                    { dept: "R&D / 기술", y1: 4, y2: 6, y3: 10, max: 20, isTech: true },
                                    { dept: "영업 / 파트너십", y1: 0, y2: 2, y3: 4, max: 20, isTech: false },
                                    { dept: "운영 / CS", y1: 0, y2: 2, y3: 4, max: 20, isTech: false },
                                    { dept: "경영 지원", y1: 0, y2: 2, y3: 2, max: 20, isTech: false },
                                ].map((row) => (
                                    <div key={row.dept} className="flex items-center gap-2 text-[10px]">
                                        <span className={`w-24 shrink-0 font-medium ${row.isTech ? "font-bold text-blue-950" : "text-neutral-700"}`}>
                                            {row.dept}
                                        </span>
                                        <div className="relative flex h-3.5 flex-1 overflow-hidden border border-neutral-300 bg-white">
                                            <div
                                                className={`absolute top-0 left-0 h-full ${row.isTech ? "bg-blue-300" : "bg-neutral-300"}`}
                                                style={{ width: `${(row.y3 / row.max) * 100}%` }}
                                            />
                                            <div
                                                className={`absolute top-0 left-0 h-full ${row.isTech ? "bg-blue-600" : "bg-neutral-500"}`}
                                                style={{ width: `${(row.y2 / row.max) * 100}%` }}
                                            />
                                            <div
                                                className={`absolute top-0 left-0 h-full ${row.isTech ? "bg-blue-900" : "bg-neutral-800"}`}
                                                style={{ width: `${(row.y1 / row.max) * 100}%` }}
                                            />
                                        </div>
                                        <div className="flex w-28 shrink-0 items-center justify-end gap-1 text-neutral-500">
                                            <span>
                                                {row.y1} → {row.y2} →{" "}
                                                <strong className={`font-bold ${row.isTech ? "text-blue-900" : "text-neutral-900"}`}>{row.y3}</strong> 명
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-1 flex items-center justify-center gap-4 text-[9px] font-medium text-neutral-600">
                                    <span className="flex items-center gap-1.5">
                                        <span className="inline-block h-2 w-2 bg-blue-900"></span>1차년도
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="inline-block h-2 w-2 bg-blue-600"></span>2차년도
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="inline-block h-2 w-2 border border-blue-400 bg-blue-300"></span>3차년도
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 다. 총 사업비 산출 내역 및 비목별 예산 집행 계획 */}
                    <div className="flex flex-col items-start gap-2">
                        <span className="text-sm font-semibold text-neutral-900">다. 총 사업비 산출 내역 및 비목별 예산 집행 계획 (총 6.5억 원)</span>
                        <div className="mt-2 flex w-full flex-col items-center gap-3 border border-neutral-500 bg-white p-3">
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-1.5 text-sm font-bold text-neutral-900">
                                    <Square fill="#1e3a8a" className="h-2.5 w-2.5 text-blue-900" />
                                    <span>[도 4-3] 비목별 예산 집행 소요 명세 및 재원 배분</span>
                                </div>
                                <span className="border border-blue-300 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-900">
                                    총 사업비 650,000,000원 (정부 1.5억 + 민간 3.5억 + 자체 1.5억)
                                </span>
                            </div>
                            <Separator className="bg-neutral-300" />

                            {/* 재원 구성 바 */}
                            <div className="flex w-full flex-col gap-2 border border-neutral-300 bg-neutral-50 p-3 text-left">
                                <span className="text-[10px] font-bold text-neutral-900">재원 구성 비율</span>
                                <div className="flex h-4 w-full overflow-hidden border border-neutral-300">
                                    <div
                                        className="flex h-full items-center justify-center bg-blue-900 text-[9px] font-bold text-white"
                                        style={{ width: "23.1%" }}
                                    >
                                        정부 23.1%
                                    </div>
                                    <div
                                        className="flex h-full items-center justify-center bg-blue-700 text-[9px] font-bold text-white"
                                        style={{ width: "53.8%" }}
                                    >
                                        민간 53.8%
                                    </div>
                                    <div
                                        className="flex h-full items-center justify-center bg-blue-100 text-[9px] font-bold text-blue-900"
                                        style={{ width: "23.1%" }}
                                    >
                                        자체 23.1%
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-5 text-[10px] font-medium text-neutral-700">
                                    <span className="flex items-center gap-1.5">
                                        <span className="inline-block h-2 w-2 bg-blue-900"></span>정부출연금 150,000,000원
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="inline-block h-2 w-2 bg-blue-700"></span>민간투자금 350,000,000원
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="inline-block h-2 w-2 border border-blue-300 bg-blue-100"></span>자체부담금 150,000,000원
                                    </span>
                                </div>
                            </div>

                            {/* 비목별 예산 요약 */}
                            <div className="flex w-full flex-col gap-0.5 border border-neutral-300 bg-white p-3 text-left">
                                <span className="mb-1 text-[10px] font-bold text-neutral-900">비목별 예산 배분 현황</span>
                                {[
                                    { category: "인건비", amount: 260000000, ratio: 40.0, desc: "핵심 R&D 인력 4인 인건비 (풀타임)", isCore: true },
                                    {
                                        category: "연구개발비",
                                        amount: 130000000,
                                        ratio: 20.0,
                                        desc: "AI 모델 개발·데이터 수집·검증 비용",
                                        isCore: true,
                                    },
                                    { category: "외주용역비", amount: 97500000, ratio: 15.0, desc: "UX 디자인·보안 감리·특허 출원", isCore: false },
                                    { category: "마케팅·홍보비", amount: 65000000, ratio: 10.0, desc: "초기 고객 획득·B2B 영업 지원", isCore: false },
                                    { category: "기자재·장비비", amount: 52000000, ratio: 8.0, desc: "엣지 디바이스·서버 인프라 구축", isCore: false },
                                    { category: "간접비·기타", amount: 45500000, ratio: 7.0, desc: "운영비·보험·회계·법무 자문", isCore: false },
                                ].map((item, idx) => (
                                    <div key={item.category} className="flex flex-col gap-1">
                                        <div className="flex items-center justify-between text-[10px]">
                                            <div className="flex items-center gap-1.5">
                                                <span className={`w-16 font-bold ${item.isCore ? "text-blue-900" : "text-neutral-900"}`}>{item.category}</span>
                                                <span className="text-neutral-500">| {item.desc}</span>
                                            </div>
                                            <div className="flex shrink-0 items-center gap-3">
                                                <span className={`font-bold ${item.isCore ? "text-blue-900" : "text-neutral-800"}`}>
                                                    {(item.amount / 100000000).toFixed(2)}억 원
                                                </span>
                                                <span className="w-8 text-right font-medium text-neutral-500">{item.ratio}%</span>
                                            </div>
                                        </div>
                                        <div className="h-1.5 w-full overflow-hidden bg-neutral-100">
                                            <div className={`h-full ${item.isCore ? "bg-blue-800" : "bg-neutral-600"}`} style={{ width: `${item.ratio}%` }} />
                                        </div>
                                        {idx !== 5 && <div className="my-1 border-b border-dashed border-neutral-200"></div>}
                                    </div>
                                ))}
                            </div>

                            {/* 연차별 예산 집행 표 */}
                            <div className="flex w-full flex-col border border-blue-900 text-[10px]">
                                <div className="grid w-full grid-cols-5 border-b border-blue-900 bg-blue-900 font-bold text-white">
                                    <div className="flex items-center justify-center border-r border-blue-800 py-1.5">비목</div>
                                    <div className="flex items-center justify-center border-r border-blue-800 py-1.5">1차년도 (2025)</div>
                                    <div className="flex items-center justify-center border-r border-blue-800 py-1.5">2차년도 (2026)</div>
                                    <div className="flex items-center justify-center border-r border-blue-800 py-1.5">3차년도 (2027)</div>
                                    <div className="flex items-center justify-center py-1.5">합계</div>
                                </div>
                                {[
                                    { category: "인건비", y1: "8,000", y2: "10,000", y3: "8,000", total: "26,000", isCore: true },
                                    { category: "연구개발비", y1: "5,000", y2: "5,000", y3: "3,000", total: "13,000", isCore: true },
                                    { category: "외주용역비", y1: "4,000", y2: "3,500", y3: "2,250", total: "9,750", isCore: false },
                                    { category: "마케팅·홍보비", y1: "1,500", y2: "2,500", y3: "2,500", total: "6,500", isCore: false },
                                    { category: "기자재·장비비", y1: "3,200", y2: "1,500", y3: "500", total: "5,200", isCore: false },
                                    { category: "간접비·기타", y1: "1,500", y2: "1,750", y3: "1,300", total: "4,550", isCore: false },
                                ].map((row) => (
                                    <div key={row.category} className="grid w-full grid-cols-5 border-b border-neutral-300 text-neutral-700 last:border-b-0">
                                        <div
                                            className={`flex items-center justify-center border-r border-neutral-300 ${row.isCore ? "bg-blue-50/70 font-bold text-blue-900" : "bg-neutral-50 font-semibold text-neutral-800"} py-1.5`}
                                        >
                                            {row.category}
                                        </div>
                                        <div className="flex items-center justify-center border-r border-neutral-300 py-1.5">{row.y1}만원</div>
                                        <div className="flex items-center justify-center border-r border-neutral-300 py-1.5">{row.y2}만원</div>
                                        <div className="flex items-center justify-center border-r border-neutral-300 py-1.5">{row.y3}만원</div>
                                        <div className="flex items-center justify-center bg-neutral-50/90 py-1.5 font-bold text-neutral-900">
                                            {row.total}만원
                                        </div>
                                    </div>
                                ))}
                                <div className="grid w-full grid-cols-5 border-t border-blue-900 bg-blue-900 font-bold text-white">
                                    <div className="flex items-center justify-center border-r border-blue-800 py-2">합계</div>
                                    <div className="flex items-center justify-center border-r border-blue-800 py-2">23,200만원</div>
                                    <div className="flex items-center justify-center border-r border-blue-800 py-2">24,250만원</div>
                                    <div className="flex items-center justify-center border-r border-blue-800 py-2">17,550만원</div>
                                    <div className="flex items-center justify-center py-2 font-extrabold text-white">65,000만원</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default BusinessPlanTeamSection
