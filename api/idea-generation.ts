import { AxiosError } from "axios"
import { httpClient } from "."

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
    context: {
        source_files: SourceFileReference[]
        focus_items: string[]
    }
    suggestions: IdeaSuggestion[]
}

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
    if (!Array.isArray(sourceFiles) || !isStringArray(focusItems) || !Array.isArray(suggestions) || suggestions.length !== 3) {
        throw new IdeaGenerationApiError("백엔드 응답에 참조 파일, 분석 포커스 또는 아이디어 3개가 누락되었습니다.")
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
    request: import("@/types/idea-detail").ElaborationRequest
): Promise<import("@/types/idea-detail").ElaborationResponse> {
    try {
        const response = await httpClient.post<import("@/types/idea-detail").ElaborationResponse>(
            `/api/v1/idea-generations/${encodeURIComponent(generationId)}/elaboration`,
            request,
            { timeout: 30_000 }
        )
        return response.data
    } catch (error) {
        // 이미 생성된 경우(409 Conflict) 기존 구체화 데이터를 조회하여 반환
        if (error instanceof AxiosError && error.response?.status === 409) {
            return await getIdeaElaboration(generationId)
        }
        throw toApiError(error, "아이디어 구체화 데이터를 생성하지 못했습니다.")
    }
}

export async function getIdeaElaboration(
    generationId: string
): Promise<import("@/types/idea-detail").ElaborationResponse> {
    try {
        const response = await httpClient.get<import("@/types/idea-detail").ElaborationResponse>(
            `/api/v1/idea-generations/${encodeURIComponent(generationId)}/elaboration`,
            { timeout: 30_000 }
        )
        return response.data
    } catch (error) {
        throw toApiError(error, "아이디어 구체화 데이터를 조회하지 못했습니다.")
    }
}

