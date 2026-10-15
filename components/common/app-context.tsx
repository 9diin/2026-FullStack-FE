"use client"

import { useRef, useState, type ChangeEvent, type SubmitEvent, type KeyboardEvent } from "react"
import { Badge, Button, Card, Separator, Skeleton, Textarea } from "@/components/ui"
import { toast } from "@/components/ui/toast"
import { ArrowUpRight, Brain, Check, File, Paperclip, ScanSearch, Sprout } from "lucide-react"
import { ContextLayout } from "../main"
import {
    createIdeaGeneration,
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
    const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null)
    const [pendingSelectionId, setPendingSelectionId] = useState<string | null>(null)
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
        setSuggestions([])
        setSelectedIdeaId(null)
        setGenerationId(null)
        setFocusItems([])

        try {
            setLoadingSection("sources")
            const generationResult = createIdeaGeneration(
                normalizedIdea,
                attachedFiles.map((sourceFile) => sourceFile.id)
            ).then(
                (response) => ({ response }) as const,
                (error: unknown) => ({ error }) as const
            )

            await new Promise((resolve) => setTimeout(resolve, LOADING_STEP_DELAY_MS))

            setLoadingSection("focus")
            await new Promise((resolve) => setTimeout(resolve, LOADING_STEP_DELAY_MS))

            setLoadingSection("ideas")
            const [result] = await Promise.all([generationResult, new Promise((resolve) => setTimeout(resolve, LOADING_STEP_DELAY_MS))])
            if ("error" in result) {
                throw result.error
            }

            const response = result.response
            if (response.suggestions.length !== 3) {
                throw new IdeaGenerationApiError("백엔드에서 아이디어 3개를 받지 못했습니다.")
            }

            setSuggestions(response.suggestions)
            setSourceFiles(response.context.source_files)
            setFocusItems(response.context.focus_items)
            setGenerationId(response.generation_id)
            setSelectedIdeaId(response.suggestions[0]?.id ?? null)
            setIdea("")
            toast.add({
                title: "아이디어 도출 완료",
                description: "원하는 아이디어를 선택해 주세요.",
                type: "success",
            })
        } catch (error) {
            console.error("아이디어 도출에 실패했습니다.", error)
            toast.add({
                title: "아이디어 도출 실패",
                description: error instanceof IdeaGenerationApiError ? error.message : "아이디어를 분석하지 못했습니다. 잠시 후 다시 시도해 주세요.",
                type: "error",
            })
        } finally {
            setLoadingSection(null)
            setIsSubmitting(false)
            submissionLock.current = false
        }
    }

    const handleSelectIdea = async (selectedId: string) => {
        if (selectionLock.current || !generationId || selectedId === selectedIdeaId) {
            return
        }

        selectionLock.current = true
        setPendingSelectionId(selectedId)

        try {
            await selectGeneratedIdea(generationId, selectedId)
            setSelectedIdeaId(selectedId)
        } catch (error) {
            console.error("아이디어 선택 저장에 실패했습니다.", error)
            toast.add({
                title: "선택 저장 실패",
                description: error instanceof IdeaGenerationApiError ? error.message : "선택한 아이디어를 저장하지 못했습니다. 다시 시도해 주세요.",
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
                                    <p className="text-xs text-muted-foreground">참조할 파일이 없습니다. 파일을 첨부하면 여기에 표시됩니다.</p>
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
                                <div className="flex flex-wrap items-center gap-1">
                                    {focusItems.map((focusItem) => (
                                        <Badge key={focusItem} className="bg-amber-900/30 text-[10px] text-amber-500">
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
                                                    className="flex w-full flex-col gap-2 rounded-t-lg bg-muted/20 px-3 py-2 text-left disabled:cursor-wait"
                                                    disabled={pendingSelectionId !== null}
                                                    onClick={() => void handleSelectIdea(suggestion.id)}
                                                >
                                                    <span className="flex w-full items-center justify-between">
                                                        <Badge variant="secondary" className="text-[10px]">
                                                            추천 아이디어 {index + 1}
                                                        </Badge>
                                                        <span aria-hidden={!isSelected} className="flex min-h-4 min-w-14 items-center justify-end gap-1">
                                                            {isSelected && (
                                                                <>
                                                                    <Check aria-hidden="true" className="size-3 text-green-500" />
                                                                    <span className="text-[10px] text-green-500">선택됨</span>
                                                                </>
                                                            )}
                                                        </span>
                                                    </span>
                                                    <span className="text-xs">{suggestion.title}</span>
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
                        </ContextLayout>
                    </>
                )}
            </div>
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
