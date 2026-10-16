"use client"

import { Badge, Card, Separator } from "@/components/ui"
import { ArrowBigRight, CheckIcon, ChevronRight, CornerDownRight, X } from "lucide-react"
import Image from "next/image"
import { useWorkspaceStore } from "@/store/workspace"
import type { SolutionMetric, SolutionMetricStatus } from "@/types/idea-detail"

const METRIC_STATUS_LABEL: Record<SolutionMetricStatus, string> = {
    measured: "실측",
    target: "목표",
    estimate: "추정",
    unknown: "미확인",
}

const STEP_ACCENTS = ["text-emerald-400", "text-amber-400", "text-blue-400", "text-violet-400"] as const

function metricText(metric: SolutionMetric): string {
    if (metric.value === null) {
        return `${metric.label}: 미확인`
    }

    const value = metric.value.toLocaleString("ko-KR")
    const unit = metric.unit ? ` ${metric.unit}` : ""
    return `${metric.label} ${value}${unit} · ${METRIC_STATUS_LABEL[metric.status]}`
}

function MetricBadges({ metrics }: { metrics: SolutionMetric[] }) {
    if (metrics.length === 0) {
        return null
    }

    return (
        <div className="flex flex-wrap justify-end gap-1">
            {metrics.map((metric, index) => (
                <Badge key={`${metric.label}-${metric.status}-${index}`} variant="secondary" className="rounded-sm" title={metric.basis ?? undefined}>
                    {metricText(metric)}
                </Badge>
            ))}
        </div>
    )
}

function SolutionLayout() {
    const solution = useWorkspaceStore((state) => state.solutionDetail)
    const painPoints = useWorkspaceStore((state) => state.problemDetail.painPointCycle)

    if (!solution) {
        return <Card className="h-fit w-full p-4 text-sm text-muted-foreground">해결방안 데이터가 아직 준비되지 않았습니다.</Card>
    }

    const painPointLabels = new Map(painPoints.map((painPoint) => [painPoint.painPointId, `${painPoint.stepName}: ${painPoint.title}`]))
    const solutionStepLabels = new Map(solution.pipeline.map((step) => [step.solutionStepId, `${step.category}: ${step.title}`]))
    const validationIsMeasured = solution.validation.status === "measured"

    return (
        <Card className="h-fit w-full items-center gap-4 p-4">
            <div className="w-full">
                <div className="flex items-start justify-between">
                    <h2 className="text-xl font-semibold">2. 해결방안 (Solution)</h2>
                    <div className="-mt-1 flex items-center gap-1">
                        <span className="text-[10px] text-neutral-400">PSST 프레임워크 구조화 진단</span>
                        <ChevronRight className="w-4 text-neutral-400" />
                        <span className="text-[10px] text-violet-400">해결방안</span>
                        <ChevronRight className="w-4 text-neutral-400" />
                        <Badge className={validationIsMeasured ? "bg-green-900/50 text-[10px] text-green-500" : "bg-muted text-[10px] text-muted-foreground"}>
                            {solution.validation.label}
                            {solution.validation.score !== null && ` ${solution.validation.score}%`}
                        </Badge>
                    </div>
                </div>
                <p className="mt-3 text-neutral-400">{solution.summary}</p>
            </div>
            <Separator />
            <div className="flex w-full flex-col gap-2">
                <div className="flex items-center gap-1">
                    <Image src="/icons/ai.svg" alt="AI" width={18} height={18} />
                    <span className="mt-0.5 font-semibold">엔드투엔드 솔루션 아키텍처 파이프라인</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {solution.pipeline.map((step, index) => (
                        <Card key={step.solutionStepId} className="gap-2 p-3">
                            <div className="flex items-center justify-between gap-2">
                                <span className="font-medium">{step.category}</span>
                                <MetricBadges metrics={step.metrics.slice(0, 1)} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-4xl font-semibold ${STEP_ACCENTS[index]}`}>{step.order}</span>
                                <div className="flex min-w-0 flex-col gap-1">
                                    <span className="font-semibold">{step.title}</span>
                                    <p className={`text-xs ${STEP_ACCENTS[index]}`}>{step.subtitle}</p>
                                </div>
                            </div>
                            <p className="text-justify text-xs text-neutral-400">{step.description}</p>
                            <div className="flex flex-wrap items-center gap-1">
                                <CornerDownRight size={16} className="shrink-0 text-neutral-400" />
                                <Badge variant="secondary" className="rounded-sm font-medium">
                                    {step.technologyLabel}
                                </Badge>
                                {step.metrics.length > 1 && <MetricBadges metrics={step.metrics.slice(1)} />}
                            </div>
                            <div className="flex flex-wrap gap-1 border-t pt-2">
                                <span className="w-full text-[10px] text-muted-foreground">해결하는 문제</span>
                                {step.addressesPainPointIds.map((painPointId) => (
                                    <Badge key={painPointId} variant="outline" className="rounded-sm text-[10px]">
                                        {painPointLabels.get(painPointId)}
                                    </Badge>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
            <Separator />
            <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-4">
                <Card className="h-full min-w-0 flex-1 gap-2 border border-rose-400 p-3">
                    <div className="flex w-full flex-wrap items-start justify-between gap-2">
                        <Badge className="h-auto max-w-full whitespace-normal break-words bg-rose-900/50 py-1 text-left leading-4 text-rose-400">
                            {solution.comparison.asIs.label}
                        </Badge>
                        <MetricBadges metrics={solution.comparison.asIs.metrics} />
                    </div>
                    <div className="flex flex-col gap-3">
                        {solution.comparison.asIs.items.map((item) => (
                            <div key={item.itemId} className="flex flex-col items-start gap-1">
                                <div className="flex min-w-0 items-start gap-1.5">
                                    <X size={18} className="mt-0.5 min-w-4.5 text-rose-400" />
                                    <span className="min-w-0 leading-5 break-words">{item.text}</span>
                                </div>
                                <div className="ml-6 flex min-w-0 flex-wrap gap-1">
                                    {item.painPointIds.map((painPointId) => (
                                        <Badge
                                            key={painPointId}
                                            variant="outline"
                                            className="h-auto max-w-full rounded-sm whitespace-normal break-words py-1 text-left text-[10px] leading-4"
                                        >
                                            문제: {painPointLabels.get(painPointId)}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
                <ArrowBigRight className="min-w-6 self-center" fill="#ffffff" />
                <Card className="h-full min-w-0 flex-1 gap-2 border border-emerald-400 p-3">
                    <div className="flex w-full flex-wrap items-start justify-between gap-2">
                        <Badge className="h-auto max-w-full whitespace-normal break-words bg-emerald-900/50 py-1 text-left leading-4 text-emerald-400">
                            {solution.comparison.toBe.label}
                        </Badge>
                        <MetricBadges metrics={solution.comparison.toBe.metrics} />
                    </div>
                    <div className="flex flex-col gap-3">
                        {solution.comparison.toBe.items.map((item) => (
                            <div key={item.itemId} className="flex flex-col items-start gap-1">
                                <div className="flex min-w-0 items-start gap-1.5">
                                    <CheckIcon size={18} className="mt-0.5 min-w-4.5 text-emerald-400" />
                                    <span className="min-w-0 leading-5 break-words">{item.text}</span>
                                </div>
                                <div className="ml-6 flex min-w-0 flex-wrap gap-1">
                                    {item.painPointIds.map((painPointId) => (
                                        <Badge
                                            key={`problem-${painPointId}`}
                                            variant="outline"
                                            className="h-auto max-w-full rounded-sm whitespace-normal break-words py-1 text-left text-[10px] leading-4"
                                        >
                                            문제: {painPointLabels.get(painPointId)}
                                        </Badge>
                                    ))}
                                    {item.solutionStepIds.map((solutionStepId) => (
                                        <Badge
                                            key={solutionStepId}
                                            variant="secondary"
                                            className="h-auto max-w-full rounded-sm whitespace-normal break-words py-1 text-left text-[10px] leading-4"
                                        >
                                            해결: {solutionStepLabels.get(solutionStepId)}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </Card>
    )
}

export default SolutionLayout
