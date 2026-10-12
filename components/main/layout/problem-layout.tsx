import { Badge, Card, Separator } from "@/components/ui"
import { Bot, ChevronRight, CircleArrowRight, CornerDownRight } from "lucide-react"

function ProblemLayout() {
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
                <p className="mt-3 text-neutral-400">
                    본 과제는 1인 가구의 불규칙한 식생활과 급증하는 식재료 폐기 문제를 해결하기 위해, 스마트 홈 가전 연동 기술과 비전 AI 모델을 결합한 지능형
                    식자재 관리 및 레시피 큐레이션 솔류션을 개발하는 것을 목표로 합니다.
                </p>
            </div>
            <Separator />
            <Card className="bg-muted/30 p-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-green-500">핵심 타깃 페르소나</span>
                    <p className="text-base font-medium">
                        "퇴근 후 장보기 및 조리 피로도가 높으나 배달음식의 고비용&middot;건강 약화에 불만을 느끼는 2030 1인 가구 직장인"
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <CornerDownRight className="w-4 text-neutral-400" />
                    <Badge variant="secondary" className="rounded-sm border border-neutral-700">
                        국내 1인 가구 800만 (전체 34.5%)
                    </Badge>
                    <Badge variant="secondary" className="rounded-sm border border-neutral-700">
                        월 평균 식비 중 43% 미사용 폐기
                    </Badge>
                </div>
            </Card>
            <div className="flex flex-col gap-2">
                <span className="font-semibold">&#8251; 검증된 3대 페인포인트 악순환 고리</span>
                <div className="flex items-center gap-2">
                    <Card className="w-full gap-0 bg-muted/30 p-4">
                        <span className="text-neutral-400">단계 &#9312; 강제구매</span>
                        <span className="text-base font-semibold">대용량 번들 포장</span>
                        <p className="mt-2 text-xs text-neutral-400">소포장 부재로 묶음 채소 과대 구매</p>
                    </Card>
                    <CircleArrowRight className="min-w-4.5 text-neutral-400" />
                    <Card className="w-full gap-0 bg-muted/30 p-4">
                        <span className="text-neutral-400">단계 &#9313; 방치망각</span>
                        <span className="text-base font-semibold">냉장고 재고 망각</span>
                        <p className="mt-2 text-xs text-neutral-400">탐색 피로(일 평균 68분)로 방치</p>
                    </Card>
                    <CircleArrowRight className="min-w-4.5 text-neutral-400" />
                    <Card className="w-full gap-0 bg-muted/30 p-4">
                        <span className="text-neutral-400">단계 &#9314; 폐기손실</span>
                        <span className="text-base font-semibold text-rose-400">음식물 쓰레기화</span>
                        <p className="mt-2 text-xs text-neutral-400">가구당 월 4.8만원 직접 손실</p>
                    </Card>
                </div>
            </div>
            <Separator />

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                    <Bot size={18} />
                    <span className="mt-0.5 font-semibold">실시간 AI 검증 피드백 코칭</span>
                </div>
                <p className="text-justify text-neutral-400">
                    냉장고 사진&middot;바코드&middot;수기 입력으로 식재료와 유통기한을 구조화하고, 남은 재료를 우선 소진하는 15분 맞춤형 레시피를 실시간
                    추천합니다. 부족한 필수 식재료는 1시간 퀵커머스 장바구니로 자동 큐레이션 연결하며, 사용자 알레르기&middot;칼로리&middot;보유 조리도구
                    조건까지 반영합니다. 초기 사용자 100명 인터뷰를 통해 문제와 추천 품질을 검증하고, 출시 30일 내 재사용률 40% 달성을 핵심 실행 지표로
                    설정합니다. MVP 단계에서 식재료 인식 정확도와 주문 전환율을 주 단위로 측정해 서비스 타당성을 입증합니다.
                </p>
                <div className="flex items-start gap-1">
                    <CornerDownRight />
                    <p className="mt-1.25 text-justify font-medium">
                        "15분 조리 시간 및 30일 내 재사용률 40% 수치 제시는 매우 우수합니다. 단, 비즈니스 모델(수익화)과의 직접 연계를 1문장 더 보강하면 합격
                        안정권(90점대) 진입이 예상됩니다.
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default ProblemLayout
