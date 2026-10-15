import { create } from "zustand"
import type { ProblemSectionData } from "@/types/idea-detail"

export type WorkspaceView = "idea" | "analytics"

export const INITIAL_PROBLEM_DETAIL: ProblemSectionData = {
    ideaId: "idea-fridge-vision-01",
    title: "1인 가구 및 직장인을 위한 스마트 냉장고 잔여 식재료 기반 실시간 레시피 생성 및 자동 장보기 연동 서비스",
    summary:
        "국내 1인 가구 비중이 35%에 육박하는 급격한 인구구조 변화 속에서, 대용량 중심의 기형적인 마트 유통 규격과 야근·불규칙한 퇴근으로 인한 식생활 마찰은 미사용 식재료의 부패 폐기와 배달 음식 과의존이라는 구조적 악순환을 심화시키고 있습니다. 본 과제는 이러한 사회·환경적 손실과 개인의 가계 부담을 근본적으로 해소하기 위해, 온디바이스 비전 AI 기반의 신선도 판별 기술과 가전 IoT 센싱 데이터를 결합하여 냉장고 속 잔여 식자재를 실시간 인식·구조화하고, 15분 이내 초간편 조리가 가능한 잔여 식자재 최적화 레시피 큐레이션 및 부족분 초소량 자동 매칭 솔루션을 개발하는 것을 핵심 목표로 합니다.",
    persona: {
        title: "2030 1인 가구 직장인",
        description: "퇴근 후 장보기 및 조리 피로도가 높으나 배달음식의 고비용·건강 약화에 불만을 느끼는 2030 1인 가구 직장인",
        evidencePoints: [
            "마트 묶음 채소 절반 이상 버려지는 낭비",
            "퇴근 후 피로에 냉장고 속 재고 망각 방치",
            "한 끼 2만 원 넘는 잦은 배달 식비 부담",
        ],
    },
    painPointCycle: [
        {
            step: "단계 ①",
            stepName: "강제구매",
            title: "대용량 번들 포장",
            description: "소포장 부재로 묶음 채소 과대 구매",
            highlightTag: "비자발적 초과 비축 발생",
        },
        {
            step: "단계 ②",
            stepName: "방치망각",
            title: "냉장고 재고 망각",
            description: "탐색 피로(일 평균 68분)로 방치",
            highlightTag: "평균 방치 기간 11.4일",
        },
        {
            step: "단계 ③",
            stepName: "폐기손실",
            title: "음식물 쓰레기화",
            description: "가구당 월 4.8만원 직접 손실",
            highlightTag: "가구당 월 4.8만 원 손실",
        },
    ],
    aiCoaching: {
        solutionEvidence:
            "스마트폰 카메라를 통한 냉장고 선반 1초 촬영, 영수증 OCR 및 바코드 스캔 기술을 결합하여 냉장고 내 보유 식자재의 품목과 잔여 소비기한을 자동 구조화하고, 유통기한 임박 식재료를 최우선으로 소진하는 15분 맞춤형 저탄소 레시피를 실시간 추천합니다. 조리에 필수적인 미보유 부재료(1~2개)는 인근 퀵커머스 및 SSM 물류망과 실시간 API로 연동되어 1시간 내 초소량 묶음 장바구니로 원클릭 큐레이션되며, 사용자의 당뇨·알레르기·칼로리 목표 및 1구 인덕션·에어프라이어 등 보유 조리도구 제약까지 정밀 반영합니다. 1차 클로즈드 베타 테스터 100인 실증 검증을 통해 식재료 인식 정확도 94.8%를 확보하였으며, 정식 출시 30일 내 주간 재방문율 40% 및 가구당 월간 식비 12만 원 절감을 핵심 북극성 지표(OMTM)로 설정하여 비즈니스 타당성을 검증합니다.",
        feedbackReview:
            '"15분 즉석 조리 레시피 큐레이션 및 출시 30일 내 리텐션 40% 달성이라는 명확한 정량적 KPI와 초기 사용자 100명 인터뷰 기반의 실증 데이터는 심사위원 평가에서 매우 높은 설득력을 지닙니다. 다만 TIPS R&D 및 초기창업패키지 합격 안정권(90점 이상)에 확실하게 진입하기 위해서는, 퀵커머스 초소량 식자재 장바구니 연동에 따른 객단가별 제휴 중개 수수료율(Take Rate 8~12%)과 정기 구독 모델(프리미엄 밀키트 큐레이션) 간의 Unit Economics(LTV/CAC) 수익화 로직을 1~2문장으로 보강 기술할 것을 강력히 권고합니다."',
    },
}

/**
 * 아이디어 구체화 섹션 순차 로딩 단계
 * - idle: 초기 상태 (로딩 없음)
 * - problem: 문제인식 섹션 로딩 중
 * - solution: 솔루션 섹션 로딩 중 (문제인식 완료)
 * - scaleup: 성장전략 섹션 로딩 중 (솔루션 완료)
 * - team: 팀 빌딩 섹션 로딩 중 (성장전략 완료)
 * - done: 전체 완료
 */
export type ElaborationPhase = "idle" | "problem" | "solution" | "scaleup" | "team" | "done"

interface WorkspaceStore {
    view: WorkspaceView
    setView: (view: WorkspaceView) => void
    activeIdeaId: string | null
    problemDetail: ProblemSectionData
    setActiveIdea: (ideaId: string, title?: string) => void
    setProblemDetail: (detail: ProblemSectionData) => void
    elaborationPhase: ElaborationPhase
    setElaborationPhase: (phase: ElaborationPhase) => void
    startElaborationSequence: (detail: Promise<ProblemSectionData> | ProblemSectionData) => Promise<void>
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
    view: "idea",
    setView: (view) => set({ view }),
    activeIdeaId: "idea-fridge-vision-01",
    problemDetail: INITIAL_PROBLEM_DETAIL,
    setActiveIdea: (ideaId, title) =>
        set((state) => ({
            activeIdeaId: ideaId,
            problemDetail: {
                ...state.problemDetail,
                ideaId,
                title: title ?? state.problemDetail.title,
            },
        })),
    setProblemDetail: (detail) => set({ problemDetail: detail, activeIdeaId: detail.ideaId }),
    elaborationPhase: "idle",
    setElaborationPhase: (phase) => set({ elaborationPhase: phase }),
    startElaborationSequence: async (detailPromise: Promise<ProblemSectionData> | ProblemSectionData) => {
        // 1단계: 클릭 즉시 문제인식 스켈레톤 & 분석 상태로 즉각 전환 (최소 10초 유지 & 백엔드 통신 병렬 실행)
        set({ elaborationPhase: "problem" })

        try {
            const [detail] = await Promise.all([
                Promise.resolve(detailPromise),
                new Promise((resolve) => setTimeout(resolve, 10000)),
            ])

            // 2단계: 문제인식 완료 데이터 바인딩 -> 솔루션 생성 중 (10초)
            set({
                problemDetail: detail,
                activeIdeaId: detail.ideaId,
                elaborationPhase: "solution",
            })
            await new Promise((resolve) => setTimeout(resolve, 10000))

            // 3단계: 솔루션 완료 -> 성장전략 생성 중 (10초)
            set({ elaborationPhase: "scaleup" })
            await new Promise((resolve) => setTimeout(resolve, 10000))

            // 4단계: 성장전략 완료 -> 팀 빌딩 생성 중 (10초)
            set({ elaborationPhase: "team" })
            await new Promise((resolve) => setTimeout(resolve, 10000))

            // 5단계: 팀 빌딩 및 전체 완료
            set({ elaborationPhase: "done" })
        } catch (error) {
            // 통신 실패 시 idle 상태로 롤백
            set({ elaborationPhase: "idle" })
            throw error
        }
    },
}))
