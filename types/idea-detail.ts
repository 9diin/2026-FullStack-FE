export interface TargetPersona {
    title: string
    description: string
    evidencePoints: [string, string, string] // 각 20~25자 제한
}

export interface PainPointCycleStep {
    step: string // "단계 ①"
    stepName: string // "강제구매"
    title: string // "대용량 번들 포장"
    description: string // "소포장 부재로 묶음 채소 과대 구매"
    highlightTag: string // "비자발적 초과 비축 발생"
}

export interface ProblemSectionData {
    ideaId: string
    title: string
    summary: string // 2배 분량의 문제인식 문장
    persona: TargetPersona
    painPointCycle: [PainPointCycleStep, PainPointCycleStep, PainPointCycleStep]
    aiCoaching: {
        solutionEvidence: string // 종합 도출 솔루션 상세 문장
        feedbackReview: string // 확장된 심사위원 코칭 피드백 문장
    }
}

// 백엔드 FastAPI DTO
export interface BackendPainPointStep {
    step: string
    step_name: string
    title: string
    description: string
    highlight_tag: string
}

export interface BackendTargetPersona {
    title: string
    description: string
    evidence_points: [string, string, string]
}

export interface BackendAICoaching {
    solution_evidence: string
    feedback_review: string
}

export interface ElaborationRequest {
    selected_idea_id: string
    title?: string
    summary?: string
    persona?: BackendTargetPersona
    pain_point_cycle?: [BackendPainPointStep, BackendPainPointStep, BackendPainPointStep]
    ai_coaching?: BackendAICoaching
}

export interface ElaborationResponse {
    elaboration_id: string
    generation_id: string
    selected_idea_id: string
    title: string
    summary: string
    persona: BackendTargetPersona
    pain_point_cycle: [BackendPainPointStep, BackendPainPointStep, BackendPainPointStep]
    ai_coaching: BackendAICoaching
    created_at: string
}

