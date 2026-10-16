import { AxiosError } from "axios"
import { httpClient } from "."
import type {
    BackendPainPointStep,
    BackendSolutionComparisonColumn,
    BackendSolutionMetric,
    BackendSolutionPipelineStep,
    ElaborationRequest,
    ElaborationResponse,
    SolutionMetricStatus,
} from "@/types/idea-detail"

export interface IdeaSuggestion {
    id: string
    title: string
    details: string[]
}

export interface SourceFileReference {
    id: string
    filename: string
    media_type: string
}

export interface SourceFileUploadResponse extends SourceFileReference {
    size_bytes?: number
    status?: string
}

export interface IdeaGenerationResponse {
    generation_id: string
    created_at: string
    persisted: boolean
    context: {
        source_files: SourceFileReference[]
        focus_items: string[]
    }
    suggestions: IdeaSuggestion[]
}

const FOCUS_ITEM_MAX_LENGTH = "독창적인 음악 스타일과 개성을 살린 콘셉트 및 브랜딩 기획".length

export class IdeaGenerationApiError extends Error {
    constructor(
        message: string,
        readonly status?: number,
        readonly code?: string
    ) {
        super(message)
        this.name = "IdeaGenerationApiError"
    }
}

function getErrorMessage(data: unknown): { message?: string; code?: string } {
    if (!data || typeof data !== "object") {
        return {}
    }

    const body = data as {
        message?: unknown
        code?: unknown
        detail?: unknown
        error?: { message?: unknown; code?: unknown }
    }
    const error = body.error
    let message: string | undefined

    if (typeof error?.message === "string") {
        message = error.message
    } else if (typeof body.message === "string") {
        message = body.message
    } else if (typeof body.detail === "string") {
        message = body.detail
    } else if (Array.isArray(body.detail) && body.detail.length > 0) {
        // FastAPI ValidationError (422) 형태: [{ loc: [...], msg: "..." }]
        const firstError = body.detail[0]
        if (typeof firstError === "object" && firstError !== null && "msg" in firstError) {
            message = String(firstError.msg)
        }
    }

    const code = typeof error?.code === "string" ? error.code : typeof body.code === "string" ? body.code : undefined

    return { message, code }
}

function toApiError(error: unknown, fallbackMessage: string): IdeaGenerationApiError {
    if (error instanceof IdeaGenerationApiError) {
        return error
    }

    if (error instanceof AxiosError) {
        const { message, code } = getErrorMessage(error.response?.data)
        const networkMessage = error.response ? undefined : "서버에 연결할 수 없습니다. 네트워크와 백엔드 서버 상태를 확인해 주세요."

        return new IdeaGenerationApiError(message ?? networkMessage ?? fallbackMessage, error.response?.status, code)
    }

    return new IdeaGenerationApiError(fallbackMessage)
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string")
}

function requireString(value: unknown, field: string): string {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new IdeaGenerationApiError(`백엔드 구체화 응답의 ${field} 값이 올바르지 않습니다.`)
    }
    return value
}

function parseStringArray(value: unknown, field: string): string[] {
    if (!isStringArray(value) || value.some((item) => item.trim().length === 0)) {
        throw new IdeaGenerationApiError(`백엔드 구체화 응답의 ${field} 목록이 올바르지 않습니다.`)
    }
    return value
}

function parseThreeStrings(value: unknown, field: string): [string, string, string] {
    const items = parseStringArray(value, field)
    if (items.length !== 3) {
        throw new IdeaGenerationApiError(`백엔드 구체화 응답의 ${field} 항목 수가 올바르지 않습니다.`)
    }
    return [items[0], items[1], items[2]]
}

function parseMetricStatus(value: unknown, field: string): SolutionMetricStatus {
    if (value !== "measured" && value !== "target" && value !== "estimate" && value !== "unknown") {
        throw new IdeaGenerationApiError(`백엔드 구체화 응답의 ${field} 상태가 올바르지 않습니다.`)
    }
    return value
}

function parseSolutionMetric(value: unknown, field: string): BackendSolutionMetric {
    if (!isRecord(value)) {
        throw new IdeaGenerationApiError(`백엔드 구체화 응답의 ${field} 지표 형식이 올바르지 않습니다.`)
    }

    const metricValue = value.value
    if (metricValue !== null && (typeof metricValue !== "number" || !Number.isFinite(metricValue))) {
        throw new IdeaGenerationApiError(`백엔드 구체화 응답의 ${field}.value 값이 올바르지 않습니다.`)
    }

    const basis = value.basis
    if (basis !== null && typeof basis !== "string") {
        throw new IdeaGenerationApiError(`백엔드 구체화 응답의 ${field}.basis 값이 올바르지 않습니다.`)
    }

    const status = parseMetricStatus(value.status, `${field}.status`)
    const evidenceIds = parseStringArray(value.evidence_ids, `${field}.evidence_ids`)
    if (typeof value.unit !== "string") {
        throw new IdeaGenerationApiError(`백엔드 구체화 응답의 ${field}.unit 값이 올바르지 않습니다.`)
    }
    if (status === "measured" && metricValue !== null && evidenceIds.length === 0) {
        throw new IdeaGenerationApiError(`실측 지표 ${field}에 근거 ID가 없습니다.`)
    }
    if (status === "unknown" && metricValue !== null) {
        throw new IdeaGenerationApiError(`미확인 지표 ${field}에 수치가 포함되어 있습니다.`)
    }

    return {
        label: requireString(value.label, `${field}.label`),
        value: metricValue,
        unit: value.unit,
        status,
        basis,
        evidence_ids: evidenceIds,
    }
}

function parsePipelineStep(value: unknown, index: number): BackendSolutionPipelineStep {
    const field = `solution.pipeline[${index}]`
    if (
        !isRecord(value) ||
        typeof value.order !== "number" ||
        !Number.isInteger(value.order) ||
        value.order !== index + 1 ||
        !Array.isArray(value.metrics)
    ) {
        throw new IdeaGenerationApiError(`백엔드 구체화 응답의 ${field} 단계 순서 또는 형식이 올바르지 않습니다.`)
    }

    const painPointIds = parseStringArray(value.addresses_pain_point_ids, `${field}.addresses_pain_point_ids`)
    if (painPointIds.length === 0) {
        throw new IdeaGenerationApiError(`${field}에 해결 대상 페인포인트가 연결되어 있지 않습니다.`)
    }

    return {
        solution_step_id: requireString(value.solution_step_id, `${field}.solution_step_id`),
        order: value.order,
        category: requireString(value.category, `${field}.category`),
        title: requireString(value.title, `${field}.title`),
        subtitle: requireString(value.subtitle, `${field}.subtitle`),
        description: requireString(value.description, `${field}.description`),
        technology_label: requireString(value.technology_label, `${field}.technology_label`),
        addresses_pain_point_ids: painPointIds,
        metrics: value.metrics.map((metric, metricIndex) => parseSolutionMetric(metric, `${field}.metrics[${metricIndex}]`)),
    }
}

function parseComparisonColumn(value: unknown, field: string, requireSolutionSteps: boolean): BackendSolutionComparisonColumn {
    if (!isRecord(value) || !Array.isArray(value.metrics) || !Array.isArray(value.items) || value.items.length !== 3) {
        throw new IdeaGenerationApiError(`백엔드 구체화 응답의 ${field} 형식이 올바르지 않습니다.`)
    }

    const items = value.items.map((item, index) => {
        const itemField = `${field}.items[${index}]`
        if (!isRecord(item)) {
            throw new IdeaGenerationApiError(`백엔드 구체화 응답의 ${itemField} 형식이 올바르지 않습니다.`)
        }
        const solutionStepIds =
            item.solution_step_ids === undefined
                ? []
                : parseStringArray(item.solution_step_ids, `${itemField}.solution_step_ids`)
        if (requireSolutionSteps && solutionStepIds.length === 0) {
            throw new IdeaGenerationApiError(`${itemField}에 연결된 해결 단계가 없습니다.`)
        }

        return {
            item_id: requireString(item.item_id, `${itemField}.item_id`),
            text: requireString(item.text, `${itemField}.text`),
            pain_point_ids: parseStringArray(item.pain_point_ids, `${itemField}.pain_point_ids`),
            solution_step_ids: solutionStepIds,
        }
    })

    return {
        label: requireString(value.label, `${field}.label`),
        metrics: value.metrics.map((metric, index) => parseSolutionMetric(metric, `${field}.metrics[${index}]`)),
        items: [items[0], items[1], items[2]],
    }
}

function parseElaborationResponse(value: unknown): ElaborationResponse {
    if (
        !isRecord(value) ||
        typeof value.elaboration_id !== "string" ||
        typeof value.generation_id !== "string" ||
        typeof value.selected_idea_id !== "string" ||
        typeof value.created_at !== "string" ||
        typeof value.title !== "string" ||
        typeof value.summary !== "string" ||
        !isRecord(value.persona) ||
        !isRecord(value.ai_coaching) ||
        !Array.isArray(value.pain_point_cycle) ||
        value.pain_point_cycle.length !== 3 ||
        !isRecord(value.solution)
    ) {
        throw new IdeaGenerationApiError("백엔드의 아이디어 구체화 응답 형식이 올바르지 않습니다.")
    }

    const painPoints = value.pain_point_cycle.map((item, index): BackendPainPointStep => {
        const field = `pain_point_cycle[${index}]`
        if (!isRecord(item) || typeof item.order !== "number" || !Number.isInteger(item.order) || item.order !== index + 1) {
            throw new IdeaGenerationApiError(`백엔드 구체화 응답의 ${field} 순서 또는 형식이 올바르지 않습니다.`)
        }
        return {
            pain_point_id: requireString(item.pain_point_id, `${field}.pain_point_id`),
            order: item.order,
            step: requireString(item.step, `${field}.step`),
            step_name: requireString(item.step_name, `${field}.step_name`),
            title: requireString(item.title, `${field}.title`),
            description: requireString(item.description, `${field}.description`),
            highlight_tag: requireString(item.highlight_tag, `${field}.highlight_tag`),
        }
    })
    const painPointIds = painPoints.map((item) => item.pain_point_id)
    if (new Set(painPointIds).size !== painPointIds.length) {
        throw new IdeaGenerationApiError("백엔드 구체화 응답에 중복된 페인포인트 ID가 있습니다.")
    }

    const validation = value.solution.validation
    const pipeline = value.solution.pipeline
    const comparison = value.solution.comparison
    if (
        typeof value.solution.summary !== "string" ||
        !isRecord(validation) ||
        !Array.isArray(pipeline) ||
        pipeline.length !== 4 ||
        !isRecord(comparison)
    ) {
        throw new IdeaGenerationApiError("백엔드의 해결방안 응답 형식이 올바르지 않습니다.")
    }

    const parsedPipeline = pipeline.map((item, index) => parsePipelineStep(item, index))
    const solutionStepIds = parsedPipeline.map((item) => item.solution_step_id)
    if (new Set(solutionStepIds).size !== solutionStepIds.length) {
        throw new IdeaGenerationApiError("백엔드 해결방안 응답에 중복된 해결 단계 ID가 있습니다.")
    }
    if (parsedPipeline.some((step) => step.addresses_pain_point_ids.some((id) => !painPointIds.includes(id)))) {
        throw new IdeaGenerationApiError("해결 단계가 현재 문제인식에 없는 페인포인트를 참조합니다.")
    }
    if (painPointIds.some((id) => !parsedPipeline.some((step) => step.addresses_pain_point_ids.includes(id)))) {
        throw new IdeaGenerationApiError("해결방안 파이프라인에서 연결되지 않은 페인포인트가 있습니다.")
    }

    const parsedAsIs = parseComparisonColumn(comparison.as_is, "solution.comparison.as_is", false)
    const parsedToBe = parseComparisonColumn(comparison.to_be, "solution.comparison.to_be", true)
    const allItems = [...parsedAsIs.items, ...parsedToBe.items]
    if (new Set(allItems.map((item) => item.item_id)).size !== allItems.length) {
        throw new IdeaGenerationApiError("해결방안 비교 항목 ID가 중복되었습니다.")
    }
    if (
        allItems.some(
            (item) =>
                item.pain_point_ids.length === 0 ||
                item.pain_point_ids.some((id) => !painPointIds.includes(id)) ||
                item.solution_step_ids?.some((id) => !solutionStepIds.includes(id))
        )
    ) {
        throw new IdeaGenerationApiError("해결방안 비교 항목에 유효하지 않은 문제 또는 해결 단계 참조가 있습니다.")
    }
    if (
        parsedToBe.items.some((item) =>
            item.pain_point_ids.some(
                (painPointId) =>
                    !item.solution_step_ids.some((solutionStepId) =>
                        parsedPipeline
                            .find((step) => step.solution_step_id === solutionStepId)
                            ?.addresses_pain_point_ids.includes(painPointId)
                    )
            )
        )
    ) {
        throw new IdeaGenerationApiError("TO-BE 비교 항목의 해결 단계가 연결된 페인포인트를 직접 해결하지 않습니다.")
    }

    const score = validation.score
    if (score !== null && (typeof score !== "number" || !Number.isInteger(score) || score < 0 || score > 100)) {
        throw new IdeaGenerationApiError("백엔드 해결방안 검증 점수가 올바르지 않습니다.")
    }
    if (validation.status === "unknown" && score !== null) {
        throw new IdeaGenerationApiError("검증 상태가 미확인인 해결방안에 점수가 포함되어 있습니다.")
    }
    const validationEvidenceIds = parseStringArray(validation.evidence_ids, "solution.validation.evidence_ids")
    if (validation.status === "measured" && score !== null && validationEvidenceIds.length === 0) {
        throw new IdeaGenerationApiError("실측 해결방안 검증 점수에 근거 ID가 없습니다.")
    }

    return {
        elaboration_id: requireString(value.elaboration_id, "elaboration_id"),
        generation_id: requireString(value.generation_id, "generation_id"),
        selected_idea_id: requireString(value.selected_idea_id, "selected_idea_id"),
        title: requireString(value.title, "title"),
        summary: requireString(value.summary, "summary"),
        persona: {
            title: requireString(value.persona.title, "persona.title"),
            description: requireString(value.persona.description, "persona.description"),
            evidence_points: parseThreeStrings(value.persona.evidence_points, "persona.evidence_points"),
        },
        pain_point_cycle: [painPoints[0], painPoints[1], painPoints[2]],
        ai_coaching: {
            solution_evidence: requireString(value.ai_coaching.solution_evidence, "ai_coaching.solution_evidence"),
            feedback_review: requireString(value.ai_coaching.feedback_review, "ai_coaching.feedback_review"),
        },
        solution: {
            summary: requireString(value.solution.summary, "solution.summary"),
            validation: {
                status: parseMetricStatus(validation.status, "solution.validation.status"),
                score,
                label: requireString(validation.label, "solution.validation.label"),
                evidence_ids: validationEvidenceIds,
            },
            pipeline: [parsedPipeline[0], parsedPipeline[1], parsedPipeline[2], parsedPipeline[3]],
            comparison: {
                as_is: parsedAsIs,
                to_be: parsedToBe,
            },
        },
        created_at: requireString(value.created_at, "created_at"),
    }
}

function validateElaborationIdentity(response: ElaborationResponse, generationId: string, selectedIdeaId?: string): ElaborationResponse {
    if (response.generation_id !== generationId || (selectedIdeaId !== undefined && response.selected_idea_id !== selectedIdeaId)) {
        throw new IdeaGenerationApiError("백엔드 구체화 응답이 요청한 아이디어와 일치하지 않습니다.")
    }
    return response
}

function parseSourceFile(value: unknown): SourceFileReference {
    if (!isRecord(value) || typeof value.id !== "string" || typeof value.filename !== "string" || typeof value.media_type !== "string") {
        throw new IdeaGenerationApiError("백엔드의 참조 파일 응답 형식이 올바르지 않습니다.")
    }

    return {
        id: value.id,
        filename: value.filename,
        media_type: value.media_type,
    }
}

function parseIdeaGenerationResponse(value: unknown): IdeaGenerationResponse {
    if (!isRecord(value) || typeof value.generation_id !== "string" || typeof value.created_at !== "string" || !isRecord(value.context)) {
        throw new IdeaGenerationApiError("백엔드의 아이디어 도출 응답 형식이 올바르지 않습니다.")
    }

    const { source_files: sourceFiles, focus_items: focusItems } = value.context
    const suggestions = value.suggestions
    if (
        !Array.isArray(sourceFiles) ||
        !isStringArray(focusItems) ||
        focusItems.length !== 3 ||
        focusItems.some((item) => item.length > FOCUS_ITEM_MAX_LENGTH) ||
        !Array.isArray(suggestions) ||
        suggestions.length !== 3
    ) {
        throw new IdeaGenerationApiError(
            "백엔드 응답에 참조 파일, 32자 이내의 분석 해시태그 3개 또는 추천 아이디어 3개가 올바르게 포함되지 않았습니다."
        )
    }

    const parsedSuggestions = suggestions.map((suggestion) => {
        if (
            !isRecord(suggestion) ||
            typeof suggestion.id !== "string" ||
            typeof suggestion.title !== "string" ||
            suggestion.title.trim().length === 0 ||
            !isStringArray(suggestion.details) ||
            suggestion.details.length === 0
        ) {
            throw new IdeaGenerationApiError("백엔드 추천 아이디어 응답 형식이 올바르지 않습니다.")
        }

        return {
            id: suggestion.id,
            title: suggestion.title,
            details: suggestion.details,
        }
    })

    if (new Set(parsedSuggestions.map((suggestion) => suggestion.id)).size !== parsedSuggestions.length) {
        throw new IdeaGenerationApiError("백엔드 추천 아이디어 ID가 중복되었습니다.")
    }

    return {
        generation_id: value.generation_id,
        created_at: value.created_at,
        persisted: value.persisted !== false,
        context: {
            source_files: sourceFiles.map(parseSourceFile),
            focus_items: focusItems,
        },
        suggestions: parsedSuggestions,
    }
}

export async function uploadSourceFile(file: File): Promise<SourceFileUploadResponse> {
    const formData = new FormData()
    formData.append("file", file, file.name)

    try {
        const response = await httpClient.post<SourceFileUploadResponse>("/api/v1/source-files", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 30_000,
        })
        return {
            ...parseSourceFile(response.data),
            size_bytes: response.data.size_bytes,
            status: response.data.status,
        }
    } catch (error) {
        throw toApiError(error, "참조 파일을 업로드하지 못했습니다.")
    }
}

export async function createIdeaGeneration(prompt: string, sourceFileIds: string[]): Promise<IdeaGenerationResponse> {
    try {
        const response = await httpClient.post<IdeaGenerationResponse>(
            "/api/v1/idea-generations",
            {
                prompt,
                source_file_ids: sourceFileIds,
                project_id: null,
            },
            { timeout: 120_000 }
        )
        return parseIdeaGenerationResponse(response.data)
    } catch (error) {
        throw toApiError(error, "아이디어를 도출하지 못했습니다.")
    }
}

export async function selectGeneratedIdea(generationId: string, selectedIdeaId: string): Promise<void> {
    try {
        await httpClient.post(
            `/api/v1/idea-generations/${encodeURIComponent(generationId)}/selection`,
            {
                selected_idea_id: selectedIdeaId,
            },
            {
                timeout: 30_000,
            }
        )
    } catch (error) {
        throw toApiError(error, "아이디어 선택을 저장하지 못했습니다.")
    }
}

export async function createIdeaElaboration(
    generationId: string,
    request: ElaborationRequest
): Promise<ElaborationResponse> {
    try {
        const response = await httpClient.post<unknown>(
            `/api/v1/idea-generations/${encodeURIComponent(generationId)}/elaboration`,
            request,
            { timeout: 30_000 }
        )
        return validateElaborationIdentity(parseElaborationResponse(response.data), generationId, request.selected_idea_id)
    } catch (error) {
        // 이미 생성된 경우(409 Conflict) 기존 구체화 데이터를 조회하여 반환
        if (error instanceof AxiosError && error.response?.status === 409) {
            const existing = await getIdeaElaboration(generationId)
            return validateElaborationIdentity(existing, generationId, request.selected_idea_id)
        }
        throw toApiError(error, "아이디어 구체화 데이터를 생성하지 못했습니다.")
    }
}

export async function getIdeaElaboration(
    generationId: string
): Promise<ElaborationResponse> {
    try {
        const response = await httpClient.get<unknown>(
            `/api/v1/idea-generations/${encodeURIComponent(generationId)}/elaboration`,
            { timeout: 30_000 }
        )
        return validateElaborationIdentity(parseElaborationResponse(response.data), generationId)
    } catch (error) {
        throw toApiError(error, "아이디어 구체화 데이터를 조회하지 못했습니다.")
    }
}
