import { Badge, Card, Separator } from "@/components/ui"
import {
    ArrowRight,
    Bot,
    BriefcaseBusiness,
    Check,
    ChevronRight,
    CircleAlert,
    Code2,
    HeartHandshake,
    Megaphone,
    Plus,
    Rocket,
    Sparkles,
    Users,
} from "lucide-react"

const coreTeam = [
    {
        initials: "김",
        name: "김민서",
        role: "CEO · 사업 총괄",
        focus: "고객 인터뷰 · 사업개발 · 투자유치",
        strengths: ["고객 문제 발굴", "파트너십", "실행 리드"],
        color: "bg-violet-900/50 text-violet-300",
    },
    {
        initials: "이",
        name: "이도윤",
        role: "CTO · AI/백엔드",
        focus: "비전 AI · 데이터 파이프라인 · 인프라",
        strengths: ["모델 최적화", "백엔드 설계", "데이터 분석"],
        color: "bg-blue-900/50 text-blue-300",
    },
    {
        initials: "박",
        name: "박서연",
        role: "PO · 제품/UX",
        focus: "사용자 리서치 · 제품 기획 · 실험 설계",
        strengths: ["UX 리서치", "제품 지표", "프로토타이핑"],
        color: "bg-emerald-900/50 text-emerald-300",
    },
]

const hiringPlan = [
    {
        timing: "MVP 출시 전",
        role: "프론트엔드 엔지니어",
        reason: "냉장고 재고 관리와 레시피 탐색의 모바일 경험 구현",
        skills: ["React Native", "접근성", "실험 기반 개선"],
        priority: "최우선",
        color: "text-amber-400",
    },
    {
        timing: "초기 PMF 검증",
        role: "그로스 마케터",
        reason: "초기 고객 획득 채널과 구독 전환 퍼널 검증",
        skills: ["콘텐츠 실험", "퍼널 분석", "CRM"],
        priority: "다음 단계",
        color: "text-blue-400",
    },
]

const teamPrinciples = [
    { title: "고객 문제 우선", description: "기능보다 고객 인터뷰와 사용 데이터로 우선순위를 결정합니다." },
    { title: "작게 만들고 빠르게 검증", description: "2주 단위 실험으로 가설을 확인하고 배운 점을 제품에 반영합니다." },
    { title: "역할과 책임의 명확화", description: "핵심 지표별 책임자를 두고 결정 사항과 실행 결과를 투명하게 공유합니다." },
]

function TeamLayout() {
    return (
        <Card className="h-fit w-full gap-4 p-4">
            <div>
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <h2 className="text-xl font-semibold">4. 팀 구성 (Team)</h2>
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] text-neutral-400">PSST 프레임워크 구조화 진단</span>
                        <ChevronRight className="w-4 text-neutral-400" />
                        <span className="text-[10px] text-violet-400">팀 구성</span>
                        <ChevronRight className="w-4 text-neutral-400" />
                        <Badge className="bg-sky-900/50 text-[10px] text-sky-400">핵심 역할 구성 완료</Badge>
                    </div>
                </div>
                <p className="mt-3 text-neutral-400">
                    고객 문제를 빠르게 검증하고 제품으로 구현할 수 있도록, 사업·AI 기술·제품 경험을 잇는 실행 중심 팀을 구성합니다.
                </p>
            </div>

            <Separator />

            <section className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                        <Users size={17} className="text-sky-400" />
                        <h3 className="font-semibold">현재 핵심 팀</h3>
                    </div>
                    <Badge variant="secondary" className="rounded-sm border border-neutral-700 text-[10px]">
                        3개 핵심 역할 · 더미데이터
                    </Badge>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    {coreTeam.map((member) => (
                        <Card key={member.role} className="gap-3 bg-muted/30 p-3">
                            <div className="flex items-center gap-2">
                                <div className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${member.color}`}>
                                    {member.initials}
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col">
                                    <span className="font-semibold">{member.name}</span>
                                    <span className="text-xs text-neutral-400">{member.role}</span>
                                </div>
                                <Check size={15} className="shrink-0 text-emerald-400" />
                            </div>
                            <p className="min-h-8 text-xs leading-relaxed text-neutral-400">{member.focus}</p>
                            <div className="flex flex-wrap gap-1">
                                {member.strengths.map((strength) => (
                                    <Badge key={strength} variant="secondary" className="rounded-sm border border-neutral-700 text-[10px]">
                                        {strength}
                                    </Badge>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            <Separator />

            <section className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                        <BriefcaseBusiness size={17} className="text-amber-400" />
                        <h3 className="font-semibold">성장 단계별 채용 계획</h3>
                    </div>
                    <span className="text-[10px] text-neutral-400">필요 역량과 채용 시점을 기준으로 우선순위화</span>
                </div>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                    {hiringPlan.map((hire) => (
                        <Card key={hire.role} className="gap-3 bg-muted/30 p-3">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-neutral-400">{hire.timing}</span>
                                    <span className="font-semibold">{hire.role}</span>
                                </div>
                                <Badge variant="secondary" className={`shrink-0 rounded-sm border border-neutral-700 text-[10px] ${hire.color}`}>
                                    {hire.priority}
                                </Badge>
                            </div>
                            <p className="text-xs leading-relaxed text-neutral-400">{hire.reason}</p>
                            <div className="flex flex-wrap gap-1">
                                {hire.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="rounded-sm border border-neutral-700 text-[10px]">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="flex items-start gap-1.5 text-xs text-neutral-400">
                    <CircleAlert size={14} className="mt-0.5 shrink-0 text-amber-400" />
                    <p>초기에는 핵심 역할 중심으로 운영하고, 사용자 증가와 반복 업무 발생 시점에 맞춰 채용을 확장합니다.</p>
                </div>
            </section>

            <Separator />

            <section className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                    <HeartHandshake size={17} className="text-rose-400" />
                    <h3 className="font-semibold">팀 운영 원칙</h3>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    {teamPrinciples.map((principle, index) => (
                        <Card key={principle.title} className="gap-2 bg-muted/30 p-3">
                            <div className="flex items-center gap-2">
                                {index === 0 ? (
                                    <Megaphone size={15} className="text-violet-400" />
                                ) : index === 1 ? (
                                    <Rocket size={15} className="text-blue-400" />
                                ) : (
                                    <Code2 size={15} className="text-emerald-400" />
                                )}
                                <span className="text-xs font-semibold">{principle.title}</span>
                            </div>
                            <p className="text-xs leading-relaxed text-neutral-400">{principle.description}</p>
                        </Card>
                    ))}
                </div>
            </section>

            <Card className="gap-2 border border-sky-500/30 bg-sky-950/10 p-3">
                <div className="flex items-center gap-1.5">
                    <Bot size={17} className="text-sky-400" />
                    <span className="font-semibold">AI 팀 구성 코칭</span>
                    <Badge className="ml-auto rounded-sm bg-sky-900/50 text-[10px] text-sky-400">역할 간 협업 구조 구체화</Badge>
                </div>
                <p className="text-xs leading-relaxed text-neutral-300">
                    사업개발·AI 기술·제품 기획의 핵심 역할이 균형 있게 구성되어 있습니다. 다음 단계로 역할별 책임 지표를 정하고, 제품 출시 전{" "}
                    <strong className="text-foreground">프론트엔드 구현 역량</strong>을 보강하면 아이디어 검증부터 사용자 피드백 반영까지의 실행 속도를 높일 수
                    있습니다.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-sky-300">
                    <Sparkles size={14} />
                    <span>권장 다음 액션: 역할별 분기 목표 합의 → MVP 담당자 지정 → 주간 고객 피드백 리뷰</span>
                    <ArrowRight size={13} className="ml-auto shrink-0" />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                    <Plus size={12} />
                    <span>학력·출신 정보 대신 실제 담당 역할, 실행 경험, 보완할 역량 중심으로 팀을 진단합니다.</span>
                </div>
            </Card>
        </Card>
    )
}

export default TeamLayout
