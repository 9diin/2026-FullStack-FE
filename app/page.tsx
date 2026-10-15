"use client"

import { AppContext } from "@/components/common"
import {
    ProblemLayout,
    ProblemSkeleton,
    RadialChart,
    ScaleUpLayout,
    ScaleUpSkeleton,
    ScoreCard,
    SolutionLayout,
    SolutionSkeleton,
    TeamLayout,
    TeamSkeleton,
} from "@/components/main"
import { BusinessPlanReport } from "@/components/report"
import { Badge, Card, Separator } from "@/components/ui"
import { ArrowRight, Check, ChevronRight, CircleAlert, TrendingUp } from "lucide-react"
import { useWorkspaceStore } from "@/store/workspace"
import type { ElaborationPhase } from "@/store/workspace"

// 각 섹션의 순차 로딩 완료 여부 판별 유틸리티
const PHASE_ORDER: ElaborationPhase[] = ["idle", "problem", "solution", "scaleup", "team", "done"]
function isPastPhase(current: ElaborationPhase, target: ElaborationPhase): boolean {
    return PHASE_ORDER.indexOf(current) > PHASE_ORDER.indexOf(target)
}

// [요구 사항]
// ⭐️ 화면 명세서 => 기능 명세서 => 화면 설계서 => 컴포넌트 설계서 => 컴포넌트 구현
function Home() {
    const workspaceView = useWorkspaceStore((state) => state.view)
    const problemDetail = useWorkspaceStore((state) => state.problemDetail)
    const elaborationPhase = useWorkspaceStore((state) => state.elaborationPhase)

    // 로딩 중인 단계인지 확인 (스켈레톤 표시 여부)
    const isElaborating = elaborationPhase !== "idle" && elaborationPhase !== "done"
    const showProblemContent = elaborationPhase === "idle" || isPastPhase(elaborationPhase, "problem")
    const showSolutionContent = elaborationPhase === "idle" || isPastPhase(elaborationPhase, "solution")
    const showScaleUpContent = elaborationPhase === "idle" || isPastPhase(elaborationPhase, "scaleup")
    const showTeamContent = elaborationPhase === "idle" || isPastPhase(elaborationPhase, "team")

    return (
        <div className="flex h-full min-h-0 w-full gap-2 overflow-hidden">
            <aside className="h-full min-h-0 shrink-0 rounded-md border border-card bg-card/50 p-2">
                <AppContext />
            </aside>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                {workspaceView === "idea" ? (
                    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-md border border-card bg-card/50 p-0 text-card-foreground">
                        {/* 아이디어 구조화 */}
                        <div className="flex min-h-0 min-w-0 flex-1 justify-center overflow-y-auto overscroll-contain bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px] p-4">
                            {/* 콘텐츠 영역 */}
                            <div className="flex max-w-7xl flex-1 flex-col gap-4">
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-[10px] text-neutral-400">프로젝트 워크스페이스</span>
                                        <ChevronRight className="w-4 text-neutral-400" />
                                        <span className="text-[10px] text-violet-400">PSST 프레임워크 구조화 진단</span>
                                    </div>
                                    <h1 className="text-2xl font-bold">{problemDetail.title}</h1>
                                </div>
                                <Card className="h-29.25 min-h-29.25 flex-row px-4">
                                    {/* 차트 & 점수 표기 영역 */}
                                    <div>
                                        {/* 차트 */}
                                        <div></div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">구체화 성숙도</span>
                                                <Badge className="h-4 bg-violet-900/50 text-[10px] text-violet-500">TIPS B+등급</Badge>
                                            </div>
                                            <span className="text-xs text-neutral-400">정량 데이터와 페인포인트 맵핑 우수</span>
                                        </div>
                                    </div>
                                    <Separator orientation="vertical" />
                                    {/* 문제인식 - 솔루션 - 성장전략 - 팀 빌딩 선택 카드 영역 */}
                                    <div className="flex flex-1 items-center justify-between">
                                        {/* 1. 문제인식 (P) */}
                                        <Card
                                            className={`w-full gap-2 border p-3 pb-1.25 transition-colors duration-300 ${
                                                elaborationPhase === "problem" ? "border-green-500/50 bg-green-500/5" : "border-border/40 bg-muted/30"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    <Badge className="aspect-square rounded-sm bg-green-900/50 font-semibold text-green-500">P</Badge>
                                                    <span className="font-medium">문제인식</span>
                                                </div>
                                                <div className="flex h-5 items-center">
                                                    {elaborationPhase === "problem" ? (
                                                        <span className="animate-pulse text-sm font-semibold text-green-400">분석 중...</span>
                                                    ) : (
                                                        <span className="text-sm font-semibold text-green-500">92점</span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="-my-1 text-xs text-neutral-400">통계청 800만 가구 데이터 ...</p>
                                            <div className="flex h-4 items-center gap-1">
                                                {elaborationPhase === "problem" ? (
                                                    <span className="text-[10px] text-green-400">데이터 수집 및 구조화</span>
                                                ) : (
                                                    <>
                                                        <Check className="w-3 text-green-500" />
                                                        <span className="text-[10px] text-green-500">논리 구조 완벽</span>
                                                    </>
                                                )}
                                            </div>
                                        </Card>
                                        <ArrowRight className="mx-1.5 w-20 text-neutral-400" />

                                        {/* 2. 실현가능성 (S) */}
                                        <Card
                                            className={`w-full gap-2 border p-3 pb-1.25 transition-colors duration-300 ${
                                                elaborationPhase === "solution" ? "border-amber-500/50 bg-amber-500/5" : "border-border/40 bg-muted/30"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    <Badge className="aspect-square rounded-sm bg-amber-900/50 font-semibold text-amber-500">S</Badge>
                                                    <span className="font-medium">실현가능성</span>
                                                </div>
                                                <div className="flex h-5 items-center">
                                                    {elaborationPhase === "solution" ? (
                                                        <span className="animate-pulse text-sm font-semibold text-amber-400">설계 중...</span>
                                                    ) : elaborationPhase === "problem" ? (
                                                        <span className="text-sm font-semibold text-neutral-500">대기 중</span>
                                                    ) : (
                                                        <span className="text-sm font-semibold text-amber-500">80점</span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="-my-1 text-xs text-neutral-400">비전 AI 모델 및 온디바이스 ...</p>
                                            <div className="flex h-4 items-center gap-1">
                                                {elaborationPhase === "solution" ? (
                                                    <span className="text-[10px] text-amber-400">파이프라인 최적화 중</span>
                                                ) : elaborationPhase === "problem" ? (
                                                    <span className="text-[10px] text-neutral-500">이전 단계 대기 중</span>
                                                ) : (
                                                    <>
                                                        <TrendingUp className="w-3 text-amber-500" />
                                                        <span className="text-[10px] text-amber-500">기술 타당성 높음</span>
                                                    </>
                                                )}
                                            </div>
                                        </Card>
                                        <ArrowRight className="mx-1.5 w-20 text-neutral-400" />

                                        {/* 3. 성장전략 (S) */}
                                        <Card
                                            className={`w-full gap-2 border p-3 pb-1.25 transition-colors duration-300 ${
                                                elaborationPhase === "scaleup" ? "border-rose-500/50 bg-rose-500/5" : "border-border/40 bg-muted/30"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    <Badge className="aspect-square rounded-sm bg-rose-900/50 font-semibold text-rose-500">S</Badge>
                                                    <span className="font-medium">성장전략</span>
                                                </div>
                                                <div className="flex h-5 items-center">
                                                    {elaborationPhase === "scaleup" ? (
                                                        <span className="animate-pulse text-sm font-semibold text-rose-400">수립 중...</span>
                                                    ) : elaborationPhase === "problem" || elaborationPhase === "solution" ? (
                                                        <span className="text-sm font-semibold text-neutral-500">대기 중</span>
                                                    ) : (
                                                        <span className="text-sm font-semibold text-rose-500">65점</span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="-my-1 text-xs text-neutral-400">커머스 제휴 수수료 구조 ...</p>
                                            <div className="flex h-4 items-center gap-1">
                                                {elaborationPhase === "scaleup" ? (
                                                    <span className="text-[10px] text-rose-400">로드맵 및 수익모델 연산</span>
                                                ) : elaborationPhase === "problem" || elaborationPhase === "solution" ? (
                                                    <span className="text-[10px] text-neutral-500">이전 단계 대기 중</span>
                                                ) : (
                                                    <>
                                                        <CircleAlert className="w-3 text-rose-500" />
                                                        <span className="text-[10px] text-rose-500">보완 권고 레이어</span>
                                                    </>
                                                )}
                                            </div>
                                        </Card>
                                        <ArrowRight className="mx-1.5 w-20 text-neutral-400" />

                                        {/* 4. 팀구성 (T) */}
                                        <Card
                                            className={`w-full gap-2 border p-3 pb-1.25 transition-colors duration-300 ${
                                                elaborationPhase === "team" ? "border-sky-500/50 bg-sky-500/5" : "border-border/40 bg-muted/30"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    <Badge className="aspect-square rounded-sm bg-sky-900/50 font-semibold text-sky-500">T</Badge>
                                                    <span className="font-medium">팀구성</span>
                                                </div>
                                                <div className="flex h-5 items-center">
                                                    {elaborationPhase === "team" ? (
                                                        <span className="animate-pulse text-sm font-semibold text-sky-400">매칭 중...</span>
                                                    ) : elaborationPhase !== "idle" && elaborationPhase !== "done" ? (
                                                        <span className="text-sm font-semibold text-neutral-500">대기 중</span>
                                                    ) : (
                                                        <span className="text-sm font-semibold text-sky-500">75점</span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="-my-1 text-xs text-neutral-400">AI 연구인력 중원 계획 정비 ...</p>
                                            <div className="flex h-4 items-center gap-1">
                                                {elaborationPhase === "team" ? (
                                                    <span className="text-[10px] text-sky-400">역할 및 채용 계획 진단</span>
                                                ) : elaborationPhase !== "idle" && elaborationPhase !== "done" ? (
                                                    <span className="text-[10px] text-neutral-500">이전 단계 대기 중</span>
                                                ) : (
                                                    <>
                                                        <Check className="w-3 text-sky-500" />
                                                        <span className="text-[10px] text-sky-500">요건 충족</span>
                                                    </>
                                                )}
                                            </div>
                                        </Card>
                                    </div>
                                </Card>
                                <div className="flex flex-col gap-1">
                                    <Separator />
                                    <Separator />
                                </div>
                                <div className="flex w-full items-start gap-4 pb-4">
                                    {/* 문제인식 - 솔루션 - 성장전략 - 팀 빌딩 선택 후 보이는 콘텐츠 영역 */}
                                    <div className="flex w-[65%] flex-col gap-4">
                                        {/* 문제인식 섹션 */}
                                        {showProblemContent ? (
                                            <div className="animate-in duration-500 fade-in">
                                                <ProblemLayout />
                                            </div>
                                        ) : (
                                            <div className="animate-in duration-500 fade-in">
                                                <ProblemSkeleton />
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-1">
                                            <Separator />
                                            <Separator />
                                        </div>
                                        {/* 솔루션 섹션 */}
                                        {showSolutionContent ? (
                                            <div className="animate-in duration-500 fade-in">
                                                <SolutionLayout />
                                            </div>
                                        ) : (
                                            <div className="animate-in duration-500 fade-in">
                                                <SolutionSkeleton />
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-1">
                                            <Separator />
                                            <Separator />
                                        </div>
                                        {/* 성장전략 섹션 */}
                                        {showScaleUpContent ? (
                                            <div className="animate-in duration-500 fade-in">
                                                <ScaleUpLayout />
                                            </div>
                                        ) : (
                                            <div className="animate-in duration-500 fade-in">
                                                <ScaleUpSkeleton />
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-1">
                                            <Separator />
                                            <Separator />
                                        </div>
                                        {/* 팀 빌딩 섹션 */}
                                        {showTeamContent ? (
                                            <div className="animate-in duration-500 fade-in">
                                                <TeamLayout />
                                            </div>
                                        ) : (
                                            <div className="animate-in duration-500 fade-in">
                                                <TeamSkeleton />
                                            </div>
                                        )}
                                    </div>
                                    {/* AI 분석 레포트 영역 */}
                                    <Card className="sticky top-0 max-h-[calc(100vh-6rem)] w-[35%] gap-4 overflow-y-auto p-4">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-xl font-semibold">AI 정밀 적합도 진단 보고서</span>
                                            <p className="text-neutral-400">
                                                단순 임의 점수가 아닌, 중소벤처기업부 TIPS 공고 심사 평가지표 12개 항목 및{" "}
                                                <strong className="text-white">2,400개 합격 사업계획서 임베딩 벡터</strong>와 비교 분석된 정량적 데이터입니다.
                                            </p>
                                            <RadialChart />
                                        </div>
                                        <Separator />
                                        <div className="flex flex-col gap-2">
                                            <span className="font-semibold">PSST 4대 영역별 배점 스코어카드</span>
                                            <div className="flex flex-col gap-2 pb-4">
                                                <ScoreCard title="문제인식 (내재적 관점 & 외재적 관점)" score="81" categoryCode="P" />
                                                <ScoreCard title="실현방안 (기술 구체성 및 MVP)" score="81" categoryCode="S" />
                                                <ScoreCard title="시장성 (수익성 & 확장성)" score="81" categoryCode="S" />
                                                <ScoreCard title="팀 구성 (기술 개발 역량)" score="81" categoryCode="T" />
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="scrollbar-hidden flex h-full w-full min-w-0 flex-1 flex-col items-center justify-start gap-6 overflow-y-auto rounded-xl border border-border/60 bg-card/50 bg-[radial-gradient(oklch(1_0_0/0.12)_1.5px,transparent_1.5px)] bg-size-[20px_20px] p-6 text-center">
                        <BusinessPlanReport />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
