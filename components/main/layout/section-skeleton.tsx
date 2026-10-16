import { Fragment } from "react"
import { Card, Separator, Skeleton } from "@/components/ui"

/**
 * 1. 문제인식(Problem) 섹션 스켈레톤
 * - ProblemLayout의 높이와 컴포넌트 구조(헤더, 요약, 페르소나 카드, 3대 페인포인트 고리, AI 코칭)를 1:1로 미러링
 */
export function ProblemSkeleton() {
    return (
        <Card className="h-fit w-full gap-4 p-4">
            {/* 헤더 & 요약문 */}
            <div>
                <div className="flex items-start justify-between">
                    <Skeleton className="h-7 w-52" />
                    <div className="-mt-1 flex items-center gap-1">
                        <Skeleton className="h-3.5 w-28" />
                        <Skeleton className="h-3.5 w-12" />
                        <Skeleton className="h-4.5 w-24 rounded-full" />
                    </div>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[98%]" />
                    <Skeleton className="h-4 w-[94%]" />
                    <Skeleton className="h-4 w-[76%]" />
                </div>
            </div>

            <Separator />

            {/* 핵심 타깃 페르소나 카드 */}
            <Card className="gap-0 bg-muted/30 p-4">
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-3.5 w-24" />
                    <Skeleton className="mt-0.5 h-5 w-4/5" />
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Skeleton className="h-4 w-4 shrink-0" />
                    <Skeleton className="h-5 w-48 rounded-sm" />
                    <Skeleton className="h-5 w-52 rounded-sm" />
                    <Skeleton className="h-5 w-48 rounded-sm" />
                </div>
            </Card>

            {/* 검증된 3대 페인포인트 악순환 고리 */}
            <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-60" />
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-2">
                    {[0, 1, 2].map((i) => (
                        <Fragment key={i}>
                            <Card className="min-w-0 gap-0 bg-muted/30 p-4">
                                <Skeleton className="h-3.5 w-20" />
                                <Skeleton className="mt-1 h-5 w-28" />
                                <div className="mt-2 flex h-[5.625rem] flex-col justify-between py-0.5">
                                    <Skeleton className="h-2.5 w-full" />
                                    <Skeleton className="h-2.5 w-11/12" />
                                    <Skeleton className="h-2.5 w-full" />
                                    <Skeleton className="h-2.5 w-4/5" />
                                    <Skeleton className="h-2.5 w-3/4" />
                                </div>
                                <Skeleton className="mt-2 h-3.5 w-28" />
                            </Card>
                            {i < 2 && <Skeleton className="h-4.5 w-4.5 shrink-0 self-center rounded-full" />}
                        </Fragment>
                    ))}
                </div>
            </div>

            <Separator />

            {/* 실시간 AI 검증 피드백 코칭 */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                    <Skeleton className="h-4.5 w-4.5 rounded-sm" />
                    <Skeleton className="h-5 w-52" />
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[98%]" />
                    <Skeleton className="h-4 w-[94%]" />
                    <Skeleton className="h-4 w-[85%]" />
                </div>
                <div className="mt-1 flex items-start gap-2 rounded-md bg-violet-950/20 p-3 ring-1 ring-violet-500/20">
                    <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />
                    <div className="flex flex-1 flex-col gap-1.5">
                        <Skeleton className="h-3.5 w-full" />
                        <Skeleton className="h-3.5 w-[96%]" />
                        <Skeleton className="h-3.5 w-[70%]" />
                    </div>
                </div>
            </div>
        </Card>
    )
}

/**
 * 2. 솔루션(Solution) 섹션 스켈레톤
 * - SolutionLayout의 높이와 아키텍처 파이프라인(4개 카드) 및 AS-IS vs TO-BE 3열 그리드를 1:1로 미러링
 */
export function SolutionSkeleton() {
    return (
        <Card className="h-fit w-full items-center gap-4 p-4">
            {/* 헤더 & 부제목 */}
            <div className="w-full">
                <div className="flex items-start justify-between">
                    <Skeleton className="h-7 w-52" />
                    <div className="-mt-1 flex items-center gap-1">
                        <Skeleton className="h-3.5 w-28" />
                        <Skeleton className="h-3.5 w-12" />
                        <Skeleton className="h-4.5 w-24 rounded-full" />
                    </div>
                </div>
                <Skeleton className="mt-3 h-4 w-4/5" />
            </div>

            <Separator />

            {/* 엔드투엔드 솔루션 아키텍처 파이프라인 (2x2 그리드) */}
            <div className="flex w-full flex-col gap-2">
                <div className="flex items-center gap-1">
                    <Skeleton className="h-4.5 w-4.5 rounded-sm" />
                    <Skeleton className="h-5 w-64" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((i) => (
                        <Card key={i} className="gap-2 p-3">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-5 w-24 rounded-sm" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-9 w-6" />
                                <div className="flex flex-1 flex-col gap-1">
                                    <Skeleton className="h-4.5 w-36" />
                                    <Skeleton className="h-3 w-56" />
                                </div>
                            </div>
                            <Skeleton className="h-3.5 w-full" />
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-5 w-28 rounded-sm" />
                                </div>
                                <Skeleton className="h-3.5 w-20" />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <Separator />

            {/* AS-IS vs TO-BE 정밀 비교 그리드 */}
            <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-4">
                <Card className="h-full min-w-0 flex-1 gap-2 border border-rose-400/30 p-3">
                    <div className="flex w-full flex-wrap items-start justify-between gap-2">
                        <Skeleton className="h-5 w-14 rounded-sm" />
                        <Skeleton className="h-3.5 w-20" />
                    </div>
                    <div className="flex flex-col gap-3">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="flex items-start gap-1.5">
                                <Skeleton className="mt-0.5 h-4.5 w-4.5 shrink-0" />
                                <div className="flex min-h-10 flex-1 flex-col justify-center gap-1">
                                    <Skeleton className="h-3.5 w-full" />
                                    <Skeleton className="h-3.5 w-4/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
                <div className="flex items-center self-center px-1">
                    <Skeleton className="h-6 w-6 rounded-sm" />
                </div>
                <Card className="h-full min-w-0 flex-1 gap-2 border border-emerald-400/30 p-3">
                    <div className="flex w-full flex-wrap items-start justify-between gap-2">
                        <Skeleton className="h-5 w-14 rounded-sm" />
                        <Skeleton className="h-3.5 w-20" />
                    </div>
                    <div className="flex flex-col gap-3">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="flex items-start gap-1.5">
                                <Skeleton className="mt-0.5 h-4.5 w-4.5 shrink-0" />
                                <div className="flex min-h-10 flex-1 flex-col justify-center gap-1">
                                    <Skeleton className="h-3.5 w-full" />
                                    <Skeleton className="h-3.5 w-4/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </Card>
    )
}

/**
 * 3. 성장전략(ScaleUp) 섹션 스켈레톤
 * - ScaleUpLayout의 시장 규모(TAM-SAM-SOM), 3개년 성장 로드맵 간트차트, 2열 수익모델/예산안, AI 코칭을 1:1로 미러링
 */
export function ScaleUpSkeleton() {
    return (
        <Card className="h-fit w-full gap-4 p-4">
            {/* 헤더 & 부제목 */}
            <div>
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <Skeleton className="h-7 w-52" />
                    <div className="flex items-center gap-1">
                        <Skeleton className="h-3.5 w-28" />
                        <Skeleton className="h-3.5 w-12" />
                        <Skeleton className="h-4.5 w-32 rounded-full" />
                    </div>
                </div>
                <Skeleton className="mt-3 h-4 w-3/4" />
            </div>

            <Separator />

            {/* 시장 규모 및 초기 진입 기회 */}
            <section className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-5 w-44" />
                    </div>
                    <Skeleton className="h-4.5 w-24 rounded-sm" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[0, 1, 2].map((i) => (
                        <Card key={i} className="gap-2 bg-muted/30 p-3">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-3.5 w-8" />
                                        <Skeleton className="h-3.5 w-14" />
                                    </div>
                                    <Skeleton className="h-7 w-24" />
                                </div>
                                <Skeleton className="mt-0.5 h-4 w-4" />
                            </div>
                            <Skeleton className="h-3.5 w-full" />
                        </Card>
                    ))}
                </div>
                <div className="flex items-start gap-1.5">
                    <Skeleton className="mt-px h-3.5 w-3.5 shrink-0" />
                    <Skeleton className="h-3.5 w-3/4" />
                </div>
            </section>

            <Separator />

            {/* 3개년 성장 로드맵 (간트 차트 + 마일스톤) */}
            <section className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-5 w-36" />
                </div>
                <Card className="gap-3 bg-muted/30 p-3">
                    <div className="overflow-x-auto">
                        <div className="min-w-125 space-y-2">
                            <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-x-2">
                                <Skeleton className="h-3 w-14" />
                                <div className="grid grid-cols-3 gap-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </div>
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="grid grid-cols-[100px_minmax(0,1fr)] items-center gap-x-2 py-1">
                                    <div className="flex flex-col gap-1">
                                        <Skeleton className="h-3.5 w-16" />
                                        <Skeleton className="h-2.5 w-20" />
                                    </div>
                                    <div className="h-6 w-full rounded-full bg-muted/40 p-0.5">
                                        <Skeleton className="h-full rounded-full" style={{ width: `${55 + i * 12}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 border-t border-border pt-3 sm:grid-cols-3">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-3.5 w-10" />
                                    <Skeleton className="h-3.5 w-14" />
                                </div>
                                <div className="flex flex-col gap-1 rounded-md border border-white/5 bg-white/4 px-2.5 py-2">
                                    <Skeleton className="h-3.5 w-24" />
                                    <Skeleton className="h-2.5 w-16" />
                                </div>
                                <div className="mt-1 flex flex-col gap-1.5">
                                    <Skeleton className="h-2.5 w-3/4" />
                                    <Skeleton className="h-2.5 w-4/5" />
                                    <Skeleton className="h-2.5 w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </section>

            {/* 수익 모델 & 초기 사업화 예산안 (2열 그리드) */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <section className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-5 w-36" />
                    </div>
                    <Card className="h-full gap-3 bg-muted/30 p-3">
                        <div className="flex items-center justify-between gap-2">
                            <Skeleton className="h-3.5 w-32" />
                            <Skeleton className="h-5 w-24 rounded-sm" />
                        </div>
                        <Skeleton className="h-2 w-full rounded-full" />
                        <div className="grid grid-cols-3 gap-2">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <Skeleton className="h-3 w-16" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            ))}
                        </div>
                        <Skeleton className="mt-1 h-3.5 w-full" />
                    </Card>
                </section>

                <section className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-5 w-32" />
                    </div>
                    <Card className="h-full gap-3 bg-muted/30 p-3">
                        <div className="flex items-center justify-between gap-2">
                            <Skeleton className="h-3.5 w-36" />
                            <Skeleton className="h-5 w-16" />
                        </div>
                        <Skeleton className="h-2 w-full rounded-full" />
                        <div className="flex flex-col gap-2">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="size-2 rounded-full" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                    <Skeleton className="h-3.5 w-16" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>
            </div>

            {/* AI 성장전략 코칭 */}
            <Card className="gap-2 border border-amber-500/30 bg-amber-950/10 p-3">
                <div className="flex items-center gap-1.5">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4.5 w-32" />
                    <Skeleton className="ml-auto h-4.5 w-28 rounded-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-3/4" />
                </div>
                <div className="flex items-center gap-1.5">
                    <Skeleton className="h-3.5 w-3.5" />
                    <Skeleton className="h-3.5 w-80" />
                </div>
            </Card>
        </Card>
    )
}

/**
 * 4. 팀 구성(Team) 섹션 스켈레톤
 * - TeamLayout의 핵심 팀 3인 카드, 단계별 채용 계획, 팀 운영 원칙, AI 팀 구성 코칭을 1:1로 미러링
 */
export function TeamSkeleton() {
    return (
        <Card className="h-fit w-full gap-4 p-4">
            {/* 헤더 & 부제목 */}
            <div>
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <Skeleton className="h-7 w-48" />
                    <div className="flex items-center gap-1">
                        <Skeleton className="h-3.5 w-28" />
                        <Skeleton className="h-3.5 w-12" />
                        <Skeleton className="h-4.5 w-28 rounded-full" />
                    </div>
                </div>
                <Skeleton className="mt-3 h-4 w-3/4" />
            </div>

            <Separator />

            {/* 현재 핵심 팀 (3인 그리드) */}
            <section className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-5 w-28" />
                    </div>
                    <Skeleton className="h-4.5 w-28 rounded-sm" />
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    {[0, 1, 2].map((i) => (
                        <Card key={i} className="gap-3 bg-muted/30 p-3">
                            <div className="flex items-center gap-2">
                                <Skeleton className="size-9 rounded-full" />
                                <div className="flex min-w-0 flex-1 flex-col gap-1">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="size-4 rounded-full" />
                            </div>
                            <Skeleton className="min-h-8 w-full" />
                            <div className="flex flex-wrap gap-1">
                                <Skeleton className="h-4 w-16 rounded-sm" />
                                <Skeleton className="h-4 w-14 rounded-sm" />
                                <Skeleton className="h-4 w-16 rounded-sm" />
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            <Separator />

            {/* 성장 단계별 채용 계획 */}
            <section className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-5 w-36" />
                    </div>
                    <Skeleton className="h-3 w-48" />
                </div>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                    {[0, 1].map((i) => (
                        <Card key={i} className="gap-3 bg-muted/30 p-3">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex flex-col gap-1">
                                    <Skeleton className="h-2.5 w-16" />
                                    <Skeleton className="h-4 w-28" />
                                </div>
                                <Skeleton className="h-4.5 w-12 rounded-sm" />
                            </div>
                            <Skeleton className="h-3.5 w-full" />
                            <div className="flex flex-wrap gap-1">
                                <Skeleton className="h-4 w-16 rounded-sm" />
                                <Skeleton className="h-4 w-12 rounded-sm" />
                                <Skeleton className="h-4 w-20 rounded-sm" />
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="flex items-start gap-1.5">
                    <Skeleton className="mt-px h-3.5 w-3.5 shrink-0" />
                    <Skeleton className="h-3.5 w-96" />
                </div>
            </section>

            <Separator />

            {/* 팀 운영 원칙 (3인 그리드) */}
            <section className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-5 w-28" />
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    {[0, 1, 2].map((i) => (
                        <Card key={i} className="gap-2 bg-muted/30 p-3">
                            <div className="flex items-center gap-2">
                                <Skeleton className="size-4" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-3.5 w-full" />
                            <Skeleton className="h-3.5 w-4/5" />
                        </Card>
                    ))}
                </div>
            </section>

            {/* AI 팀 구성 코칭 */}
            <Card className="gap-2 border border-sky-500/30 bg-sky-950/10 p-3">
                <div className="flex items-center gap-1.5">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4.5 w-28" />
                    <Skeleton className="ml-auto h-4.5 w-32 rounded-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-4/5" />
                </div>
                <div className="flex items-center gap-1.5">
                    <Skeleton className="h-3.5 w-3.5" />
                    <Skeleton className="h-3.5 w-96" />
                </div>
                <div className="flex items-center gap-1">
                    <Skeleton className="h-3 w-3" />
                    <Skeleton className="h-2.5 w-80" />
                </div>
            </Card>
        </Card>
    )
}
