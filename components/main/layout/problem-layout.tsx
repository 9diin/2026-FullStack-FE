import { Fragment } from "react"
import { Badge, Card, Separator } from "@/components/ui"
import { Bot, ChevronRight, CircleArrowRight, CornerDownRight } from "lucide-react"

import { useWorkspaceStore } from "@/store/workspace"

function ProblemLayout() {
    const problemDetail = useWorkspaceStore((state) => state.problemDetail)

    return (
        <Card className="h-fit w-full gap-4 p-4">
            <div>
                <div className="flex items-start justify-between">
                    <h2 className="text-xl font-semibold">1. 문제인식 (Problem)</h2>
                    <div className="-mt-1 flex items-center gap-1">
                        <span className="text-[10px] text-neutral-400">PSST 프레임워크 구조화 진단</span>
                        <ChevronRight className="w-4 text-neutral-400" />
                        <span className="text-[10px] text-violet-400">문제인식</span>
                        <ChevronRight className="w-4 text-neutral-400" />
                        <Badge className="bg-green-900/50 text-[10px] text-green-500">검증 통과율 88%</Badge>
                    </div>
                </div>
                <p className="mt-3 text-justify leading-relaxed text-neutral-300">
                    {problemDetail.summary}
                </p>
            </div>
            <Separator />
            <Card className="bg-muted/30 p-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-green-500">핵심 타깃 페르소나</span>
                    <p className="text-base font-medium">
                        &quot;{problemDetail.persona.description}&quot;
                    </p>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                    <CornerDownRight className="w-4 shrink-0 text-neutral-400" />
                    {problemDetail.persona.evidencePoints.map((point) => (
                        <Badge key={point} variant="secondary" className="rounded-sm border border-neutral-700 font-normal">
                            {point}
                        </Badge>
                    ))}
                </div>
            </Card>
            <div className="flex flex-col gap-2">
                <span className="font-semibold">&#8251; 검증된 3대 페인포인트 악순환 고리</span>
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-2">
                    {problemDetail.painPointCycle.map((step, idx) => (
                        <Fragment key={step.step}>
                            <Card className="min-w-0 gap-0 bg-muted/30 p-4">
                                <span className="text-xs text-neutral-400">{step.step} &middot; {step.stepName}</span>
                                <span className={`text-base font-semibold ${idx === 2 ? "text-rose-400" : ""}`}>
                                    {step.title}
                                </span>
                                <p className="mt-2 h-[5.625rem] overflow-hidden text-xs leading-[1.125rem] text-neutral-400 line-clamp-5">
                                    {step.description}
                                </p>
                                <span className="mt-2 inline-block text-[11px] font-medium text-neutral-500">
                                    {step.highlightTag}
                                </span>
                            </Card>
                            {idx < problemDetail.painPointCycle.length - 1 && (
                                <CircleArrowRight className="min-w-4.5 shrink-0 self-center text-neutral-400" />
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
            <Separator />

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                    <Bot size={18} />
                    <span className="mt-0.5 font-semibold">실시간 AI 검증 피드백 코칭</span>
                </div>
                <p className="text-justify leading-relaxed text-neutral-400">
                    {problemDetail.aiCoaching.solutionEvidence}
                </p>
                <div className="mt-1 flex items-start gap-2 rounded-md bg-violet-950/20 p-3 ring-1 ring-violet-500/30">
                    <CornerDownRight className="mt-0.5 size-4 shrink-0 text-violet-400" />
                    <p className="text-justify text-xs font-medium leading-relaxed text-violet-200">
                        {problemDetail.aiCoaching.feedbackReview}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default ProblemLayout
