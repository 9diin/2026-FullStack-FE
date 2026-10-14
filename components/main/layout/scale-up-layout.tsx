import { Badge, Card, Separator } from "@/components/ui"
import { ArrowUpRight, Bot, Check, ChevronRight, CircleDollarSign, Globe2, MapPinned, Target, TrendingUp, Wallet } from "lucide-react"

const marketSegments = [
    {
        name: "TAM",
        label: "전체 시장",
        value: "2.4조 원",
        description: "국내 온라인 식품·신선식품 커머스",
        textColor: "text-violet-400",
        gradient: "from-violet-400 via-fuchsia-400 to-violet-300",
        glow: "rgba(139, 92, 246, 0.28)",
    },
    {
        name: "SAM",
        label: "유효 시장",
        value: "4,800억 원",
        description: "수도권 2030 1인 가구의 식생활 관리",
        textColor: "text-blue-400",
        gradient: "from-blue-400 via-cyan-300 to-blue-300",
        glow: "rgba(59, 130, 246, 0.26)",
    },
    {
        name: "SOM",
        label: "초기 목표 시장",
        value: "240억 원",
        description: "3년 내 유료 고객 5만 명 확보 목표",
        textColor: "text-emerald-400",
        gradient: "from-emerald-300 via-teal-300 to-emerald-400",
        glow: "rgba(16, 185, 129, 0.25)",
    },
]

const growthTracks = [
    { name: "제품·AI", detail: "MVP 출시 및 인식 정확도 고도화", start: 1, span: 7, color: "bg-violet-500", label: "MVP 출시 · 제품 고도화" },
    { name: "수익화", detail: "구독 전환 및 커머스 제휴 모델 검증", start: 3, span: 7, color: "bg-blue-500", label: "구독 · 제휴 매출" },
    { name: "시장 확장", detail: "수도권 검증 후 전국 서비스로 확장", start: 5, span: 8, color: "bg-emerald-500", label: "수도권 → 전국 확장" },
    { name: "수익성", detail: "단위 경제성 개선 및 손익분기점 달성", start: 8, span: 5, color: "bg-amber-500", label: "손익분기점 달성" },
]

const milestones = [
    {
        year: "2026",
        phase: "검증 · 출시",
        title: "핵심 고객 1만 명",
        items: ["수도권 1인 가구 MVP 출시", "퀵커머스 2개사 제휴", "월 활성 사용자 1만 명"],
        revenue: "매출 3억 원",
        color: "border-violet-500/50",
        textColor: "text-violet-300",
        separatorColor: "bg-violet-300",
    },
    {
        year: "2027",
        phase: "성장 · 수익화",
        title: "유료 고객 2만 명",
        items: ["프리미엄 구독 모델 안착", "가전·식품 브랜드 B2B 제휴", "월 반복 매출 1.2억 원"],
        revenue: "매출 12억 원",
        color: "border-blue-500/50",
        textColor: "text-blue-300",
        separatorColor: "bg-blue-300",
    },
    {
        year: "2028",
        phase: "확장 · 스케일업",
        title: "유료 고객 5만 명",
        items: ["전국 서비스 및 다국어 확장", "파트너 20개사 확보", "손익분기점 달성"],
        revenue: "매출 30억 원",
        color: "border-emerald-500/50",
        textColor: "text-emerald-300",
        separatorColor: "bg-emerald-300",
    },
]

const budgets = [
    { name: "제품·AI 고도화", amount: "1.2억", share: "40%", width: "40%", color: "bg-violet-400" },
    { name: "마케팅·고객 확보", amount: "0.9억", share: "30%", width: "30%", color: "bg-blue-400" },
    { name: "인건비·운영", amount: "0.6억", share: "20%", width: "20%", color: "bg-emerald-400" },
    { name: "제휴·실증", amount: "0.3억", share: "10%", width: "10%", color: "bg-amber-400" },
]

function ScaleUpLayout() {
    return (
        <Card className="h-fit w-full gap-4 p-4">
            <div>
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <h2 className="text-xl font-semibold">3. 성장전략 (Scale-up)</h2>
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] text-neutral-400">PSST 프레임워크 구조화 진단</span>
                        <ChevronRight className="w-4 text-neutral-400" />
                        <span className="text-[10px] text-violet-400">성장전략</span>
                        <ChevronRight className="w-4 text-neutral-400" />
                        <Badge className="bg-amber-900/50 text-[10px] text-amber-400">보완 후 성장 가능성 높음</Badge>
                    </div>
                </div>
                <p className="mt-3 text-neutral-400">수도권 1인 가구를 시작으로 구독·커머스 제휴 매출을 검증하고, 데이터 기반 식생활 플랫폼으로 확장합니다.</p>
            </div>

            <Separator />

            <section className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                        <Globe2 size={15} className="text-violet-400" />
                        <h3 className="font-semibold">시장 규모 및 초기 진입 기회</h3>
                    </div>
                    <Badge variant="secondary" className="rounded-sm border border-neutral-700 text-[10px]">
                        출처 기반 추정 · 2026
                    </Badge>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {marketSegments.map((market) => (
                        <Card key={market.name} className="relative gap-2 bg-muted/30 p-3">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -top-8 -right-8 size-28 rounded-full opacity-80 blur-2xl"
                                style={{ background: `radial-gradient(circle, ${market.glow}, transparent 72%)` }}
                            />
                            <div className="relative z-10 flex items-start justify-between gap-2">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-bold ${market.textColor}`}>{market.name}</span>
                                        <span className="text-xs text-neutral-400">{market.label}</span>
                                    </div>
                                    <strong className={`bg-linear-to-r ${market.gradient} bg-clip-text text-xl font-bold text-transparent`}>
                                        {market.value}
                                    </strong>
                                </div>
                                <ArrowUpRight size={15} className={`mt-0.5 shrink-0 ${market.textColor}`} />
                            </div>
                            <p className="relative z-10 text-xs text-neutral-400">{market.description}</p>
                        </Card>
                    ))}
                </div>
                <div className="flex items-start gap-1.5 text-xs text-neutral-400">
                    <MapPinned size={13} className="mt-px shrink-0 text-neutral-500" />
                    <p>진입 순서: 수도권 2030 1인 가구 → 전국 1인·맞벌이 가구 → 식품·가전사 대상 데이터 제휴</p>
                </div>
            </section>

            <Separator />

            <section className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                    <TrendingUp size={16} className="text-blue-400" />
                    <h3 className="font-semibold">3개년 성장 로드맵</h3>
                </div>
                <Card className="gap-3 bg-muted/30 p-3">
                    <div className="overflow-x-auto">
                        <div className="min-w-125 space-y-1">
                            <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-x-2">
                                <span className="pb-2 text-[10px] text-neutral-500">실행 과제</span>
                                <div className="grid grid-cols-12">
                                    {milestones.map((milestone, yearIndex) => (
                                        <div
                                            key={milestone.year}
                                            className={`col-span-4 border-b pb-2 text-center text-xs font-semibold ${milestone.textColor}`}
                                        >
                                            {yearIndex + 1}년 차 · {milestone.year}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-x-2">
                                <span aria-hidden="true" />
                                <div className="grid grid-cols-12 text-center text-[9px] text-neutral-500">
                                    {Array.from({ length: 12 }, (_, quarterIndex) => (
                                        <span key={quarterIndex}>Q{(quarterIndex % 4) + 1}</span>
                                    ))}
                                </div>
                            </div>
                            {growthTracks.map((track) => (
                                <div key={track.name} className="grid grid-cols-[100px_minmax(0,1fr)] items-center gap-x-2">
                                    <div className="flex flex-col py-2 pr-2">
                                        <span className="text-xs font-medium">{track.name}</span>
                                        <span className="text-[10px] text-neutral-500">{track.detail}</span>
                                    </div>
                                    <div className="relative grid h-8 grid-cols-12 items-center gap-x-1 border-b border-border/60 last:border-0">
                                        <div className="pointer-events-none absolute inset-0 grid grid-cols-12">
                                            {Array.from({ length: 12 }, (_, quarterIndex) => (
                                                <span key={quarterIndex} className="border-l border-border/30 last:border-r" />
                                            ))}
                                        </div>
                                        <div
                                            className={`z-10 flex h-5 items-center overflow-hidden rounded-full ${track.color} px-2 text-[10px] font-medium whitespace-nowrap text-white shadow-sm`}
                                            style={{ gridColumn: `${track.start} / span ${track.span}` }}
                                        >
                                            {track.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 border-t border-border pt-3 sm:grid-cols-3">
                        {milestones.map((milestone) => (
                            <div key={milestone.year} className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs font-semibold ${milestone.textColor}`}>{milestone.year}</span>
                                    <Separator orientation="vertical" className={`mt-0.75 h-2.5 ${milestone.separatorColor}`} />
                                    <span className="text-xs font-medium text-neutral-300">{milestone.phase}</span>
                                </div>
                                <div className="flex flex-col gap-0.5 rounded-md border border-white/5 bg-white/4 px-2.5 py-2">
                                    <span className="text-xs font-semibold">{milestone.title}</span>
                                    <span className="text-[10px] font-medium text-neutral-400">{milestone.revenue}</span>
                                </div>
                                <ul className="mt-1 flex flex-col gap-1 text-[10px] text-neutral-400">
                                    {milestone.items.map((item) => (
                                        <li key={item} className="flex items-start gap-1">
                                            <Check size={11} className="mt-0.5 shrink-0 text-emerald-400" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Card>
            </section>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <section className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                        <CircleDollarSign size={16} className="text-emerald-400" />
                        <h3 className="font-semibold">수익 모델 및 매출 목표</h3>
                    </div>
                    <Card className="h-full gap-3 bg-muted/30 p-3">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-neutral-400">매출 구성 · 3년 차 목표</span>
                            <Badge className="rounded-sm bg-emerald-900/50 text-emerald-400">연 매출 30억 원</Badge>
                        </div>
                        <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                            <div className="w-[55%] bg-violet-400" />
                            <div className="w-[30%] bg-blue-400" />
                            <div className="w-[15%] bg-emerald-400" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                                <span className="text-neutral-400">프리미엄 구독</span>
                                <p className="mt-1 font-semibold">55% · 16.5억</p>
                            </div>
                            <div>
                                <span className="text-neutral-400">커머스 수수료</span>
                                <p className="mt-1 font-semibold">30% · 9억</p>
                            </div>
                            <div>
                                <span className="text-neutral-400">B2B 제휴</span>
                                <p className="mt-1 font-semibold">15% · 4.5억</p>
                            </div>
                        </div>
                        <p className="border-t border-border pt-2 text-xs leading-relaxed text-neutral-400">
                            월 구독료 4,900원과 제휴 주문 수수료를 주 수익원으로 설정하고, 식품·가전 브랜드 대상 인사이트 리포트를 추가 수익으로 검증합니다.
                        </p>
                    </Card>
                </section>

                <section className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                        <Wallet size={16} className="text-amber-400" />
                        <h3 className="font-semibold">초기 사업화 예산안</h3>
                    </div>
                    <Card className="h-full gap-3 bg-muted/30 p-3">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-neutral-400">정부지원금 기준 · 1차 연도</span>
                            <strong className="text-sm font-semibold">총 3억 원</strong>
                        </div>
                        <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                            {budgets.map((budget) => (
                                <div key={budget.name} className={budget.color} style={{ width: budget.width }} />
                            ))}
                        </div>
                        <div className="flex flex-col gap-2">
                            {budgets.map((budget) => (
                                <div key={budget.name} className="flex items-center justify-between gap-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className={`size-2 rounded-full ${budget.color}`} />
                                        <span className="text-neutral-400">{budget.name}</span>
                                    </div>
                                    <span className="shrink-0 font-medium">
                                        {budget.amount} <span className="text-neutral-500">({budget.share})</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>
            </div>

            <Card className="gap-2 border border-amber-500/30 bg-amber-950/10 p-3">
                <div className="flex items-center gap-1.5">
                    <Bot size={16} className="mb-px text-amber-400" />
                    <span className="font-semibold">AI 성장전략 코칭</span>
                    <Badge className="ml-auto rounded-sm bg-amber-900/50 text-[10px] text-amber-400">실행 지표 구체화 권고</Badge>
                </div>
                <p className="text-xs leading-relaxed text-neutral-300">
                    시장 진입 단계와 3개년 매출 목표의 연결이 명확합니다. 다만 TAM/SAM 산정에 사용한 가구 수·객단가 출처를 사업계획서에 명시하고, 1차 연도에는{" "}
                    <strong className="text-foreground">유료 전환율 5%·월 이탈률 4% 이하</strong>를 핵심 검증 지표로 추가하면 고객 확보 비용과 수익성 가정의
                    신뢰도를 높일 수 있습니다.
                </p>
                <div className="flex items-start gap-1.5 text-xs text-amber-300">
                    <Target size={14} className="mt-0.5 shrink-0" />
                    <span>다음 액션: 100명 베타 테스트 → 구독 전환율 검증 → 제휴 채널별 CAC 비교</span>
                </div>
            </Card>
        </Card>
    )
}

export default ScaleUpLayout
