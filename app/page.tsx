import { AppContext } from "@/components/common"
import { ProblemLayout, RadialChart, ScaleUpLayout, ScoreCard, SolutionLayout } from "@/components/main"
import { Badge, Card, Separator } from "@/components/ui"
import { ArrowRight, Check, ChevronRight, CircleAlert, TrendingUp } from "lucide-react"

// [요구 사항]
// ⭐️ 화면 명세서 => 기능 명세서 => 화면 설계서 => 컴포넌트 설계서 => 컴포넌트 구현
function Home() {
    return (
        <div className="flex h-full w-full gap-2">
            <AppContext />
            {/* 아이디어 구조화 / 사업계획서 도출 */}
            <div className="flex flex-1 justify-center rounded-md border border-card bg-card/50 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px] p-4 text-card-foreground">
                {/* 콘텐츠 영역 */}
                <div className="flex max-w-7xl flex-1 flex-col gap-4">
                    <div>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] text-neutral-400">프로젝트 워크스페이스</span>
                            <ChevronRight className="w-4 text-neutral-400" />
                            <span className="text-[10px] text-violet-400">PSST 프레임워크 구조화 진단</span>
                        </div>
                        <h1 className="text-2xl font-bold">
                            1인 가구 및 직장인을 위한 스마트 냉장고 잔여 식재료 기반 실시간 레시피 생성 및 자동 장보기 연동 서비스
                        </h1>
                    </div>
                    <Card className="h-29.25 min-h-29.25 flex-row px-4">
                        {/* 차트 & 점수 표기 영역 */}
                        <div>
                            {/* 차트 */}
                            <div></div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">구체화 성숙도</span>
                                    <Badge className="bg-violet-900/50 text-[10px] text-violet-500">TIPS B+등급</Badge>
                                </div>
                                <span className="text-xs text-neutral-400">정량 데이터와 페인포인트 맵핑 우수</span>
                            </div>
                        </div>
                        <Separator orientation="vertical" />
                        {/* 문제인식 - 솔루션 - 성장전략 - 팀 빌딩 선택 카드 영역 */}
                        <div className="flex flex-1 items-center justify-between">
                            <Card className="w-full gap-2 bg-muted/30 p-3 pb-1.25">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Badge className="aspect-square rounded-sm bg-green-900/50 font-semibold text-green-500">P</Badge>
                                        <span className="font-medium">문제인식</span>
                                    </div>
                                    <span className="font-semibold text-green-500">92점</span>
                                </div>
                                <p className="-my-1 text-xs text-neutral-400">통계청 800만 가구 데이터 ...</p>
                                <div className="flex items-center gap-1">
                                    <Check className="w-3 text-green-500" />
                                    <span className="text-[10px] text-green-500">논리 구조 완벽</span>
                                </div>
                            </Card>
                            <ArrowRight className="mx-1.5 w-20 text-neutral-400" />
                            <Card className="w-full gap-2 bg-muted/30 p-3 pb-1.25">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Badge className="aspect-square rounded-sm bg-amber-900/50 font-semibold text-amber-500">S</Badge>
                                        <span className="font-medium">실현가능성</span>
                                    </div>
                                    <span className="font-semibold text-amber-500">80점</span>
                                </div>
                                <p className="-my-1 text-xs text-neutral-400">비전 AI 모델 및 온디바이스 ...</p>
                                <div className="flex items-center gap-1">
                                    <TrendingUp className="w-3 text-amber-500" />
                                    <span className="text-[10px] text-amber-500">기술 타당성 높음</span>
                                </div>
                            </Card>
                            <ArrowRight className="mx-1.5 w-20 text-neutral-400" />
                            <Card className="w-full gap-2 bg-muted/30 p-3 pb-1.25">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Badge className="aspect-square rounded-sm bg-rose-900/50 font-semibold text-rose-500">S</Badge>
                                        <span className="font-medium">성장전략</span>
                                    </div>
                                    <span className="font-semibold text-rose-500">65점</span>
                                </div>
                                <p className="-my-1 text-xs text-neutral-400">커머스 제휴 수수료 구조 ...</p>
                                <div className="flex items-center gap-1">
                                    <CircleAlert className="w-3 text-rose-500" />
                                    <span className="text-[10px] text-rose-500">보완 권고 레이어</span>
                                </div>
                            </Card>
                            <ArrowRight className="mx-1.5 w-20 text-neutral-400" />
                            <Card className="w-full gap-2 bg-muted/30 p-3 pb-1.25">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Badge className="aspect-square rounded-sm bg-sky-900/50 font-semibold text-sky-500">T</Badge>
                                        <span className="font-medium">팀구성</span>
                                    </div>
                                    <span className="font-semibold text-sky-500">75점</span>
                                </div>
                                <p className="-my-1 text-xs text-neutral-400">AI 연구인력 중원 계획 정비 ...</p>
                                <div className="flex items-center gap-1">
                                    <Check className="w-3 text-sky-500" />
                                    <span className="text-[10px] text-sky-500">요건 충족</span>
                                </div>
                            </Card>
                        </div>
                    </Card>
                    <div className="flex flex-col gap-1">
                        <Separator />
                        <Separator />
                    </div>
                    <div className="flex w-full gap-4">
                        {/* 문제인식 - 솔루션 - 성장전략 - 팀 빌딩 선택 후 보이는 콘텐츠 영역 */}
                        <div className="flex w-3/5 flex-col gap-4">
                            <ProblemLayout />
                            <div className="flex flex-col gap-1">
                                <Separator />
                                <Separator />
                            </div>
                            <SolutionLayout />
                            <div className="flex flex-col gap-1">
                                <Separator />
                                <Separator />
                            </div>
                            <ScaleUpLayout />
                        </div>
                        {/* AI 분석 레포트 영역 */}
                        <Card className="w-2/5 gap-4 p-4">
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
    )
}

export default Home
