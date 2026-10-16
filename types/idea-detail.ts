export interface TargetPersona {
    title: string
    description: string
    evidencePoints: [string, string, string] // 각 20~25자 제한
}

export interface PainPointCycleStep {
    painPointId: string
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

export type SolutionMetricStatus = "measured" | "target" | "estimate" | "unknown"

export interface SolutionMetric {
    label: string
    value: number | null
    unit: string
    status: SolutionMetricStatus
    basis: string | null
    evidenceIds: string[]
}

export interface SolutionValidation {
    status: SolutionMetricStatus
    score: number | null
    label: string
    evidenceIds: string[]
}

export interface SolutionPipelineStep {
    solutionStepId: string
    order: number
    category: string
    title: string
    subtitle: string
    description: string
    technologyLabel: string
    addressesPainPointIds: string[]
    metrics: SolutionMetric[]
}

export interface SolutionComparisonItem {
    itemId: string
    text: string
    painPointIds: string[]
    solutionStepIds: string[]
}

export interface SolutionComparisonColumn {
    label: string
    metrics: SolutionMetric[]
    items: [SolutionComparisonItem, SolutionComparisonItem, SolutionComparisonItem]
}

export interface SolutionSectionData {
    summary: string
    validation: SolutionValidation
    pipeline: [SolutionPipelineStep, SolutionPipelineStep, SolutionPipelineStep, SolutionPipelineStep]
    comparison: {
        asIs: SolutionComparisonColumn
        toBe: SolutionComparisonColumn
    }
}

export interface IdeaElaborationData {
    elaborationId: string
    generationId: string
    problem: ProblemSectionData
    solution: SolutionSectionData
}

// 백엔드 FastAPI DTO
export interface BackendPainPointStep {
    pain_point_id: string
    order: number
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

export interface BackendSolutionMetric {
    label: string
    value: number | null
    unit: string
    status: SolutionMetricStatus
    basis: string | null
    evidence_ids: string[]
}

export interface BackendSolutionValidation {
    status: SolutionMetricStatus
    score: number | null
    label: string
    evidence_ids: string[]
}

export interface BackendSolutionPipelineStep {
    solution_step_id: string
    order: number
    category: string
    title: string
    subtitle: string
    description: string
    technology_label: string
    addresses_pain_point_ids: string[]
    metrics: BackendSolutionMetric[]
}

export interface BackendSolutionComparisonItem {
    item_id: string
    text: string
    pain_point_ids: string[]
    solution_step_ids: string[]
}

export interface BackendSolutionComparisonColumn {
    label: string
    metrics: BackendSolutionMetric[]
    items: [BackendSolutionComparisonItem, BackendSolutionComparisonItem, BackendSolutionComparisonItem]
}

export interface BackendSolutionSection {
    summary: string
    validation: BackendSolutionValidation
    pipeline: [
        BackendSolutionPipelineStep,
        BackendSolutionPipelineStep,
        BackendSolutionPipelineStep,
        BackendSolutionPipelineStep,
    ]
    comparison: {
        as_is: BackendSolutionComparisonColumn
        to_be: BackendSolutionComparisonColumn
    }
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
    solution: BackendSolutionSection
    created_at: string
}
