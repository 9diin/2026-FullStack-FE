"use client"

import { useRef, useState, type ChangeEvent, type SubmitEvent, type KeyboardEvent } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    Badge,
    Button,
    Card,
    Separator,
    Skeleton,
    Textarea,
} from "@/components/ui"
import { toast } from "@/components/ui/toast"
import { ArrowUpRight, Brain, Check, File, Paperclip, ScanSearch, Sprout } from "lucide-react"
import { useWorkspaceStore } from "@/store/workspace"
import type {
    BackendPainPointStep,
    BackendSolutionComparisonColumn,
    BackendSolutionMetric,
    BackendSolutionPipelineStep,
    ElaborationResponse,
    IdeaElaborationData,
    PainPointCycleStep,
    SolutionComparisonColumn,
    SolutionMetric,
    SolutionPipelineStep,
} from "@/types/idea-detail"
import { ContextLayout } from "../main"
import {
    createIdeaElaboration,
    createIdeaGeneration,
    getIdeaElaboration,
    IdeaGenerationApiError,
    selectGeneratedIdea,
    uploadSourceFile,
    type IdeaSuggestion,
    type SourceFileReference,
} from "@/api/idea-generation"

type LoadingSection = "sources" | "focus" | "ideas" | null

const LOADING_STEP_DELAY_MS = 3000

function IdeaCardSkeleton() {
    return (
        <Card aria-hidden="true" className="gap-1 border p-0">
            <div className="flex flex-col gap-2 bg-muted/20 px-3 py-2">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-3.5 w-20" />
                    <Skeleton className="h-3 w-14" />
                </div>
                <Skeleton className="h-3.5 w-11/12" />
            </div>
            <div className="flex flex-col gap-1.5 bg-black/30 px-3 py-2">
                <Skeleton className="h-2.5 w-11/12" />
                <Skeleton className="h-2.5 w-4/5" />
            </div>
        </Card>
    )
}

function AssetCardSkeleton({ className }: { className: string }) {
    return (
        <div aria-hidden="true" className={`flex h-7 items-center gap-1 rounded-sm bg-card p-1 pr-2 ${className}`}>
            <Skeleton className="h-4 w-8 rounded-sm" />
            <Skeleton className="h-3 flex-1" />
        </div>
    )
}

function getFileType(filename: string, mediaType: string): string {
    const extension = filename.split(".").at(-1)
    return extension && extension !== filename ? extension.toUpperCase() : (mediaType.split("/").at(-1)?.toUpperCase() ?? "FILE")
}

function mapSolutionMetric(metric: BackendSolutionMetric): SolutionMetric {
    return {
        label: metric.label,
        value: metric.value,
        unit: metric.unit,
        status: metric.status,
        basis: metric.basis,
        evidenceIds: metric.evidence_ids,
    }
}

function mapComparisonColumn(column: BackendSolutionComparisonColumn): SolutionComparisonColumn {
    const mapItem = (item: BackendSolutionComparisonColumn["items"][number]) => ({
        itemId: item.item_id,
        text: item.text,
        painPointIds: item.pain_point_ids,
        solutionStepIds: item.solution_step_ids ?? [],
    })

    return {
        label: column.label,
        metrics: column.metrics.map(mapSolutionMetric),
        items: [mapItem(column.items[0]), mapItem(column.items[1]), mapItem(column.items[2])],
    }
}

function mapPainPoint(item: BackendPainPointStep): PainPointCycleStep {
    return {
        painPointId: item.pain_point_id,
        step: item.step,
        stepName: item.step_name,
        title: item.title,
        description: item.description,
        highlightTag: item.highlight_tag,
    }
}

function mapPipelineStep(step: BackendSolutionPipelineStep): SolutionPipelineStep {
    return {
        solutionStepId: step.solution_step_id,
        order: step.order,
        category: step.category,
        title: step.title,
        subtitle: step.subtitle,
        description: step.description,
        technologyLabel: step.technology_label,
        addressesPainPointIds: step.addresses_pain_point_ids,
        metrics: step.metrics.map(mapSolutionMetric),
    }
}

function mapElaborationResponse(response: ElaborationResponse): IdeaElaborationData {
    const [firstPainPoint, secondPainPoint, thirdPainPoint] = response.pain_point_cycle
    const [firstStep, secondStep, thirdStep, fourthStep] = response.solution.pipeline

    return {
        elaborationId: response.elaboration_id,
        generationId: response.generation_id,
        problem: {
            ideaId: response.selected_idea_id,
            title: response.title,
            summary: response.summary,
            persona: {
                title: response.persona.title,
                description: response.persona.description,
                evidencePoints: response.persona.evidence_points,
            },
            painPointCycle: [mapPainPoint(firstPainPoint), mapPainPoint(secondPainPoint), mapPainPoint(thirdPainPoint)],
            aiCoaching: {
                solutionEvidence: response.ai_coaching.solution_evidence,
                feedbackReview: response.ai_coaching.feedback_review,
            },
        },
        solution: {
            summary: response.solution.summary,
            validation: {
                status: response.solution.validation.status,
                score: response.solution.validation.score,
                label: response.solution.validation.label,
                evidenceIds: response.solution.validation.evidence_ids,
            },
            pipeline: [
                mapPipelineStep(firstStep),
                mapPipelineStep(secondStep),
                mapPipelineStep(thirdStep),
                mapPipelineStep(fourthStep),
            ],
            comparison: {
                asIs: mapComparisonColumn(response.solution.comparison.as_is),
                toBe: mapComparisonColumn(response.solution.comparison.to_be),
            },
        },
    }
}

function AppContext() {
    const [idea, setIdea] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [loadingSection, setLoadingSection] = useState<LoadingSection>(null)
    const [suggestions, setSuggestions] = useState<IdeaSuggestion[]>([])
    const [attachedFiles, setAttachedFiles] = useState<SourceFileReference[]>([])
    const [sourceFiles, setSourceFiles] = useState<SourceFileReference[]>([])
    const [focusItems, setFocusItems] = useState<string[]>([])
    const [generationId, setGenerationId] = useState<string | null>(null)
    const [generationPersisted, setGenerationPersisted] = useState(false)
    const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null)
    const [pendingSelectionId, setPendingSelectionId] = useState<string | null>(null)
    const confirmingIdea = useWorkspaceStore((state) => state.confirmingIdea)
    const setActiveIdea = useWorkspaceStore((state) => state.setActiveIdea)
    const setWorkspaceSuggestions = useWorkspaceStore((state) => state.setIdeaSuggestions)
    const setIdeaGenerationPersisted = useWorkspaceStore((state) => state.setIdeaGenerationPersisted)
    const setConfirmingIdea = useWorkspaceStore((state) => state.setConfirmingIdea)
    const setWorkspaceIdeaError = useWorkspaceStore((state) => state.setIdeaGenerationError)
    const setElaborationPhase = useWorkspaceStore((state) => state.setElaborationPhase)
    const startElaborationSequence = useWorkspaceStore((state) => state.startElaborationSequence)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const submissionLock = useRef(false)
    const selectionLock = useRef(false)
    const showContext = isSubmitting || suggestions.length > 0

    const handleFilesSelected = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.currentTarget.files ?? [])
        event.currentTarget.value = ""

        if (files.length === 0) {
            return
        }

        setIsUploading(true)
        const errors: string[] = []

        try {
            for (const file of files) {
                try {
                    const uploadedFile = await uploadSourceFile(file)
                    setAttachedFiles((currentFiles) => [...currentFiles, uploadedFile])
                } catch (error) {
                    errors.push(error instanceof Error ? error.message : "참조 파일을 업로드하지 못했습니다.")
                }
            }

            if (errors.length > 0) {
                toast.add({
                    title: "일부 파일을 업로드하지 못했습니다",
                    description: errors[0],
                    type: "error",
                })
            } else {
                toast.add({
                    title: "참조 파일 업로드 완료",
                    description: `${files.length}개 파일을 분석에 사용할 수 있습니다.`,
                    type: "success",
                })
            }
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (submissionLock.current || isUploading) {
            return
        }

        const normalizedIdea = idea.trim()
        if (!normalizedIdea) {
            toast.add({
                title: "아이디어를 입력해 주세요",
                description: "해결하고 싶은 문제나 떠오른 사업 아이디어를 작성한 뒤 다시 시도해 주세요.",
                type: "error",
            })
            return
        }

        submissionLock.current = true
        setIsSubmitting(true)
        setActiveIdea(null)
        setElaborationPhase("idle")
        setSuggestions([])
        setWorkspaceSuggestions([])
        setIdeaGenerationPersisted(false)
        setConfirmingIdea(null)
        setWorkspaceIdeaError(null)
        setSelectedIdeaId(null)
        setGenerationId(null)
        setGenerationPersisted(false)
        setFocusItems([])

        const loadingTimers: ReturnType<typeof setTimeout>[] = []

        try {
            setLoadingSection("sources")
            loadingTimers.push(setTimeout(() => setLoadingSection("focus"), LOADING_STEP_DELAY_MS))
            loadingTimers.push(setTimeout(() => setLoadingSection("ideas"), LOADING_STEP_DELAY_MS * 2))

            const response = await createIdeaGeneration(
                normalizedIdea,
                attachedFiles.map((sourceFile) => sourceFile.id)
            )
            if (response.suggestions.length !== 3) {
                throw new IdeaGenerationApiError("백엔드에서 아이디어 3개를 받지 못했습니다.")
            }

            setSuggestions(response.suggestions)
            setWorkspaceSuggestions(response.suggestions)
            setWorkspaceIdeaError(null)
            setSourceFiles(response.context.source_files)
            setFocusItems(response.context.focus_items)
            setGenerationId(response.generation_id)
            setGenerationPersisted(response.persisted)
            setIdeaGenerationPersisted(response.persisted)
            setIdea("")
            toast.add({
                title: "아이디어 도출 완료",
                description: response.persisted
                    ? "아이디어 카드를 클릭하여 [아이디어 구체화] 데이터를 확인해 보세요."
                    : "비로그인 결과는 현재 화면에서만 확인할 수 있습니다. 구체화하려면 로그인해 주세요.",
                type: "success",
            })
        } catch (error) {
            setWorkspaceSuggestions([])
            const message =
                error instanceof IdeaGenerationApiError
                    ? error.message
                    : "아이디어를 분석하지 못했습니다. 잠시 후 다시 시도해 주세요."
            setWorkspaceIdeaError(message)
            console.error("아이디어 도출에 실패했습니다.", error)
            toast.add({
                title: "아이디어 도출 실패",
                description: message,
                type: "error",
            })
        } finally {
            loadingTimers.forEach(clearTimeout)
            setLoadingSection(null)
            setIsSubmitting(false)
            submissionLock.current = false
        }
    }

    const handleClickIdeaCard = (targetSuggestion: IdeaSuggestion) => {
        if (!generationPersisted) {
            toast.add({
                title: "로그인 후 구체화할 수 있습니다",
                description: "비로그인 상태에서는 아이디어 생성 결과만 확인할 수 있습니다.",
                type: "info",
            })
            return
        }
        setConfirmingIdea(targetSuggestion)
    }

    const handleConfirmElaboration = async () => {
        if (!confirmingIdea || selectionLock.current) {
            return
        }

        const targetIdea = confirmingIdea
        setConfirmingIdea(null)

        selectionLock.current = true
        setPendingSelectionId(targetIdea.id)

        try {
            if (!generationId) {
                throw new IdeaGenerationApiError("아이디어 생성 정보를 찾을 수 없습니다. 아이디어를 다시 도출해 주세요.")
            }

            setSelectedIdeaId(targetIdea.id)
            setActiveIdea(targetIdea.id, targetIdea.title)

            // 즉각적인 작업 시작 피드백 토스트
            toast.add({
                title: "아이디어 구체화 작업을 시작합니다",
                description: `"${targetIdea.title}" 기반으로 4대 영역 진단 데이터를 생성하고 있습니다.`,
                type: "info",
            })

            const fetchElaboratedDataPromise = (async (): Promise<IdeaElaborationData> => {
                await selectGeneratedIdea(generationId, targetIdea.id)
                const response = await createIdeaElaboration(generationId, {
                    selected_idea_id: targetIdea.id,
                })
                return mapElaborationResponse(response)
            })()

            // 선택한 아이디어의 문제인식과 해결방안을 같은 백엔드 구체화 응답으로 연결합니다.
            await startElaborationSequence(fetchElaboratedDataPromise)
            toast.add({
                title: "아이디어 구체화 반영 완료",
                description: "선택한 아이디어 기반 PSST 4대 진단 데이터 생성이 완료되었습니다.",
                type: "success",
            })
        } catch (error) {
            console.error("아이디어 구체화 연동 실패:", error)
            toast.add({
                title: "구체화 반영 실패",
                description: error instanceof IdeaGenerationApiError ? error.message : "선택한 아이디어를 반영하지 못했습니다. 다시 시도해 주세요.",
                type: "error",
            })
        } finally {
            selectionLock.current = false
            setPendingSelectionId(null)
        }
    }

    const handleTextareaKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) {
            return
        }

        event.preventDefault()
        event.currentTarget.form?.requestSubmit()
    }

    return (
        <div className="flex h-full w-72 flex-col gap-2">
            <div className="scrollbar-hidden flex min-h-0 w-full flex-1 flex-col gap-6 overflow-y-auto overscroll-contain rounded-md bg-card/50 p-3">
                {!showContext ? (
                    <div className="flex h-full flex-col items-center justify-center gap-3 px-3 text-center">
                        <div className="flex size-9 items-center justify-center rounded-full bg-violet-500/10 text-violet-400">
                            <Sprout aria-hidden="true" className="size-4" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold">아이디어 씨앗을 심어볼까요?</p>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                해결하고 싶은 불편을 한 줄로 적어주세요.
                                <br />세 갈래 사업 아이디어로 키워드릴게요!
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <ContextLayout
                            label="참조 소스 컨텍스트"
                            icon={<File size={16} />}
                            status={
                                <Badge className="rounded-full bg-muted text-[10px] text-muted-foreground">
                                    {(isSubmitting ? attachedFiles : sourceFiles).length > 0
                                        ? `업로드된 파일 ${(isSubmitting ? attachedFiles : sourceFiles).length}개`
                                        : "업로드된 파일 없음"}
                                </Badge>
                            }
                        >
                            {loadingSection === "sources" ? (
                                <div aria-label="참조 소스 불러오는 중" className="flex flex-col gap-1" role="status">
                                    <AssetCardSkeleton className="w-[92%]" />
                                    <AssetCardSkeleton className="w-[78%]" />
                                    <AssetCardSkeleton className="w-full" />
                                </div>
                            ) : (isSubmitting ? attachedFiles : sourceFiles).length > 0 ? (
                                <div className="flex shrink-0 flex-col gap-1">
                                    {(isSubmitting ? attachedFiles : sourceFiles).map((sourceFile) => (
                                        <div key={sourceFile.id} className="flex items-center gap-1 rounded-sm bg-card p-1 pr-2">
                                            <Badge variant="outline" className="rounded-sm text-[10px] text-neutral-400">
                                                {getFileType(sourceFile.filename, sourceFile.media_type)}
                                            </Badge>
                                            <span className="truncate text-xs text-neutral-400">{sourceFile.filename}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex min-h-[92px] shrink-0 items-center justify-center rounded-sm border border-dashed border-border/70 px-3 text-center">
                                    <p className="text-xs text-muted-foreground">
                                        참조할 파일이 없습니다.
                                        <br />
                                        파일을 첨부하면 여기에 표시됩니다.
                                    </p>
                                </div>
                            )}
                        </ContextLayout>
                        <ContextLayout label="구조화 포커스 레이어" icon={<ScanSearch size={16} />}>
                            {loadingSection === "focus" ? (
                                <div aria-label="분석 포커스 준비 중" className="flex flex-wrap gap-1" role="status">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <Skeleton key={index} className="h-5 w-20" />
                                    ))}
                                </div>
                            ) : focusItems.length > 0 ? (
                                <div className="flex min-w-0 flex-wrap items-center gap-1">
                                    {focusItems.map((focusItem) => (
                                        <Badge
                                            key={focusItem}
                                            className="h-auto min-w-0 max-w-full whitespace-normal break-words bg-amber-900/30 py-1 text-left text-[10px] leading-4 text-amber-500"
                                        >
                                            # {focusItem}
                                        </Badge>
                                    ))}
                                </div>
                            ) : isSubmitting ? (
                                <p className="text-xs text-muted-foreground">분석 포커스를 준비하고 있습니다.</p>
                            ) : (
                                <p className="text-xs text-muted-foreground">분석 결과가 생성되면 포커스가 표시됩니다.</p>
                            )}
                        </ContextLayout>
                        <ContextLayout
                            label="핵심 분석 아이디어"
                            icon={<Brain size={16} />}
                            status={
                                <span className="text-[10px] text-muted-foreground">
                                    {loadingSection === "ideas" ? "아이디어 생성 중" : suggestions.length > 0 ? "3개 도출" : "대기 중"}
                                </span>
                            }
                        >
                            {loadingSection === "ideas" ? (
                                <div aria-label="아이디어 생성 중" className="flex flex-col gap-2" role="status">
                                    <IdeaCardSkeleton />
                                    <IdeaCardSkeleton />
                                    <IdeaCardSkeleton />
                                </div>
                            ) : suggestions.length > 0 ? (
                                <div className="flex flex-col gap-2">
                                    {suggestions.map((suggestion, index) => {
                                        const isSelected = suggestion.id === selectedIdeaId

                                        return (
                                            <Card
                                                key={suggestion.id}
                                                className={`gap-1 border-transparent p-0 ring-1 transition-colors ring-inset ${isSelected ? "ring-violet-500/70" : "ring-foreground/10"}`}
                                            >
                                                <button
                                                    type="button"
                                                    aria-pressed={isSelected}
                                                    className="flex w-full cursor-pointer flex-col gap-2 rounded-t-lg bg-muted/20 px-3 py-2 text-left hover:bg-muted/30 disabled:cursor-wait"
                                                    disabled={pendingSelectionId !== null}
                                                    onClick={() => handleClickIdeaCard(suggestion)}
                                                >
                                                    <span className="flex w-full items-center justify-between">
                                                        <Badge variant="secondary" className="text-[10px]">
                                                            추천 아이디어 {index + 1}
                                                        </Badge>
                                                        <span aria-hidden={!isSelected} className="flex min-h-4 min-w-14 items-center justify-end gap-1">
                                                            {isSelected && (
                                                                <>
                                                                    <Check aria-hidden="true" className="size-3 text-green-500" />
                                                                    <span className="text-[10px] text-green-500">구체화됨</span>
                                                                </>
                                                            )}
                                                        </span>
                                                    </span>
                                                    <span className="text-xs font-medium">{suggestion.title}</span>
                                                </button>
                                                <div className="flex flex-col gap-1.5 rounded-b-lg bg-black/30 px-3 py-2">
                                                    {suggestion.details.map((detail) => (
                                                        <div key={detail} className="flex items-start gap-2">
                                                            <div className="mt-1.25 h-1 w-1 shrink-0 rounded-full bg-neutral-500" />
                                                            <span className="text-xs text-neutral-400">{detail}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Card>
                                        )
                                    })}
                                </div>
                            ) : (
                                <p className="text-xs text-muted-foreground">아이디어를 입력하고 도출 버튼을 눌러보세요.</p>
                            )}
                            {suggestions.length > 0 && !generationPersisted && (
                                <p className="mt-2 text-xs text-muted-foreground">
                                    비로그인 결과는 이 화면에서만 확인할 수 있습니다.{" "}
                                    <a className="text-primary underline underline-offset-2" href="/sign-in">
                                        로그인하고 구체화하기
                                    </a>
                                </p>
                            )}
                        </ContextLayout>
                    </>
                )}
            </div>

            {/* 아이디어 구체화 확정 Alert Dialog */}
            <AlertDialog open={confirmingIdea !== null} onOpenChange={(open) => !open && setConfirmingIdea(null)}>
                <AlertDialogContent className="max-w-md border border-border/70 bg-card/95 p-4 shadow-2xl ring-1 ring-violet-500/20 backdrop-blur-xl sm:max-w-lg">
                    <AlertDialogHeader className="place-items-start gap-3 text-left">
                        <div className="flex items-center gap-2">
                            {/* <div className="flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20">
                                <Sparkles className="size-4" />
                            </div> */}
                            <div className="flex items-center gap-1.5">
                                <Badge className="border border-violet-500/30 bg-violet-900/40 text-[10px] text-violet-300">PSST 아이디어 구체화</Badge>
                                <span className="text-[11px] text-muted-foreground">TIPS R&amp;D 공통서식</span>
                            </div>
                        </div>

                        <div className="flex w-full flex-col gap-1">
                            <AlertDialogTitle className="text-base font-bold tracking-tight text-foreground">
                                [아이디어 구체화] 데이터를 생성하시겠습니까?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-xs text-muted-foreground">
                                선택하신 아이디어를 분석하여 심사용 사업계획서 [문제인식] 탭의 진단 데이터를 즉시 도출합니다.
                            </AlertDialogDescription>
                        </div>

                        {/* 선택된 아이디어 프리뷰 카드 */}
                        <div className="flex w-full flex-col gap-2 rounded-lg border border-violet-500/30 bg-muted/40 p-3.5">
                            <span className="text-xs font-semibold text-violet-400">도출 대상 아이디어</span>
                            <p className="leading-relaxed font-semibold text-foreground">{confirmingIdea?.title}</p>
                        </div>

                        {/* 생성될 구체화 데이터 안내 리스트 */}
                        <div className="flex w-full flex-col gap-1.5 rounded-md border border-border/40 bg-background/50 p-3 text-xs">
                            <span className="mb-0.5 text-[11px] font-medium text-muted-foreground">반영 항목 미리보기</span>
                            <div className="flex items-center gap-2 text-foreground/90">
                                <div className="size-1.5 shrink-0 rounded-full bg-green-500" />
                                <span className="text-xs font-medium">3대 페인포인트 악순환 구조도</span>
                                <span className="text-[10px] text-muted-foreground">(강제구매 → 방치망각 → 폐기손실)</span>
                            </div>
                            <div className="flex items-center gap-2 text-foreground/90">
                                <div className="size-1.5 shrink-0 rounded-full bg-violet-500" />
                                <span className="text-xs font-medium">핵심 타깃 페르소나 및 3대 근거</span>
                                <span className="text-[10px] text-muted-foreground">(20~25자 정량 근거 맵핑)</span>
                            </div>
                            <div className="flex items-center gap-2 text-foreground/90">
                                <div className="size-1.5 shrink-0 rounded-full bg-pink-500" />
                                <span className="text-xs font-medium">실시간 AI 검증 피드백 코칭</span>
                                <span className="text-[10px] text-muted-foreground">(수익화 및 90점대 진입 코칭)</span>
                            </div>
                        </div>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex-row justify-end gap-2">
                        <AlertDialogCancel className="cursor-pointer" onClick={() => setConfirmingIdea(null)}>
                            취소
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="cursor-pointer bg-linear-to-br from-blue-600 via-purple-500 to-pink-500 font-semibold text-white shadow-md shadow-purple-500/20 transition-opacity hover:opacity-95"
                            onClick={() => void handleConfirmElaboration()}
                        >
                            구체화 데이터 반영하기
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="flex flex-col gap-1">
                <Separator />
                <Separator />
            </div>
            {/* 프롬프트 작성 영역 */}
            <form className="flex w-full shrink-0 flex-col gap-2" onSubmit={handleSubmit}>
                <Textarea
                    aria-label="도출할 사업 아이디어"
                    placeholder="해결하고 싶은 문제나 떠오른 사업 아이디어를 자유롭게 적어보세요."
                    className="h-30 resize-none"
                    value={idea}
                    onChange={(event) => setIdea(event.target.value)}
                    onKeyDown={handleTextareaKeyDown}
                    disabled={isSubmitting}
                />
                {attachedFiles.length > 0 && (
                    <div className="flex w-full flex-wrap items-center gap-1" aria-label="첨부된 참조 파일">
                        {attachedFiles.map((sourceFile) => (
                            <Badge key={sourceFile.id} variant="secondary" className="max-w-full truncate text-[10px]">
                                {sourceFile.filename}
                            </Badge>
                        ))}
                    </div>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="sr-only"
                    aria-label="참조 파일 선택"
                    onChange={handleFilesSelected}
                    disabled={isSubmitting || isUploading}
                />
                <div className="flex w-full items-center justify-between">
                    <Button
                        type="button"
                        size="icon"
                        aria-label="참조 자료 첨부"
                        disabled={isSubmitting || isUploading}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Paperclip />
                    </Button>
                    <Button
                        type="submit"
                        size="icon"
                        className="bg-linear-to-br from-blue-600 via-purple-500 to-pink-500"
                        aria-label="아이디어 도출"
                        disabled={!idea.trim() || isSubmitting || isUploading}
                    >
                        {isSubmitting || isUploading ? (
                            <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        ) : (
                            <ArrowUpRight className="text-white" />
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AppContext
