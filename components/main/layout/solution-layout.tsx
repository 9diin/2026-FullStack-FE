import { Badge, Card, Separator } from "@/components/ui"
import { ArrowBigDown, ArrowBigRight, CheckIcon, ChevronRight, CornerDownRight, X } from "lucide-react"
import Image from "next/image"

function SolutionLayout() {
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
                        <Badge className="bg-green-900/50 text-[10px] text-green-500">검증 통과율 82%</Badge>
                    </div>
                </div>
                <p className="mt-3 text-neutral-400">온디바이스 비전 AI 객체 인식과 초개인화 RAG 레시피 합성, 퀵커머스 원클릭 파이프라인</p>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                    <Image src="/icons/ai.svg" alt="@ICON" width={18} height={18} />
                    <span className="mt-0.5 font-semibold">엔드투엔드 솔루션 아키텍처 파이프라인</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Card className="p-3">
                        <div className="flex items-center justify-between">
                            <span className="font-medium">비전 센싱</span>
                            <Badge variant="secondary" className="rounded-sm">
                                정확도 94.8% mAP
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-semibold">1</span>
                            <div className="gpa-2 flex flex-col">
                                <span className="font-semibold">식재료 자동 비전 인식</span>
                                <p className="text-xs text-emerald-400">문 열림 즉시 0.4초 만에 냉장고 52종 재료 감지</p>
                            </div>
                        </div>
                        <p className="text-justify text-xs text-neutral-400">ESP32-S3 엣지 모듈이 식재료와 신선도·유통기한을 실시간 인식합니다.</p>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CornerDownRight size={16} className="text-neutral-400" />
                                <Badge variant="secondary" className="rounded-sm font-medium">
                                    YOLOv8-Nano 경량엔진
                                </Badge>
                            </div>
                            <span className="text-xs font-medium text-emerald-400">지연시간 0.4s</span>
                        </div>
                    </Card>
                    <Card className="p-3">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold">RAG 레시피</span>
                            <Badge variant="secondary" className="rounded-sm">
                                생성 속도 0.78s
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-semibold">2</span>
                            <div className="gpa-2 flex flex-col">
                                <span className="font-medium">잔여 식재료 맞춤 레시피</span>
                                <p className="text-xs text-amber-400">유통기한 임박 재료 우선 소진 15분 레시피 추천</p>
                            </div>
                        </div>
                        <p className="text-justify text-xs text-neutral-400">
                            내 취향과 알레르기 정보, 냉장고 속 유통기한 임박 식재료까지 분석하여 단 15분 만에 완성하는 맞춤형 레시피를 추천해 드립니다.
                        </p>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CornerDownRight size={16} className="text-neutral-400" />
                                <Badge variant="secondary" className="rounded-sm font-medium">
                                    Milvus Vector RAG
                                </Badge>
                            </div>
                            <span className="text-xs font-medium text-amber-400">완주율 84.2%</span>
                        </div>
                    </Card>
                    <Card className="p-3">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold">커머스 연동</span>
                            <Badge variant="secondary" className="rounded-sm">
                                주문 전환율 18.4%
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-semibold">3</span>
                            <div className="gpa-2 flex flex-col">
                                <span className="font-medium">부족 부재료 원클릭 장보기</span>
                                <p className="text-xs text-blue-400">필요한 최소 단위 재료만 배민&middot;쿠팡 1시간 배송 바인딩</p>
                            </div>
                        </div>
                        <p className="text-justify text-xs text-neutral-400">부족한 재료만 골라 퀵커머스 장바구니에 담고 간편 결제를 지원합니다.</p>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CornerDownRight size={16} className="text-neutral-400" />
                                <Badge variant="secondary" className="rounded-sm font-medium">
                                    Quick-Commerce API
                                </Badge>
                            </div>
                            <span className="text-xs font-medium text-blue-400">45분 도착 보장</span>
                        </div>
                    </Card>
                    <Card className="p-3">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold">데이터 환류</span>
                            <Badge variant="secondary" className="rounded-sm">
                                식재료 낭비 -80%
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-semibold">4</span>
                            <div className="gpa-2 flex flex-col">
                                <span className="font-medium">폐기율 0% 피드백 루프</span>
                                <p className="text-xs text-violet-400">소비 데이터 축적 및 B2B 수요예측 인사이트 환류</p>
                            </div>
                        </div>
                        <p className="text-justify text-xs text-neutral-400">소비·폐기 데이터를 학습해 추천을 개선하고 파트너 수요예측에 활용합니다.</p>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CornerDownRight size={16} className="text-neutral-400" />
                                <Badge variant="secondary" className="rounded-sm font-medium">
                                    DP 프라이버시 루프
                                </Badge>
                            </div>
                            <span className="text-xs font-medium text-violet-400">월 3.2만 원 절감</span>
                        </div>
                    </Card>
                </div>
            </div>
            <Separator />
            <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-4">
                <Card className="h-full min-w-0 flex-1 gap-2 border border-rose-400 p-3">
                    <div className="flex w-full items-center justify-between">
                        <Badge className="bg-rose-900/50 text-rose-400">AS-IS</Badge>
                        <span className="text-xs text-rose-400">조리 포기율 62%</span>
                    </div>
                    <div className="grid grid-rows-3 gap-2">
                        <div className="flex items-start gap-1.5">
                            <X size={18} className="mt-0.5 min-w-4.5 text-rose-400" />
                            <span className="min-h-10 leading-5">
                                퇴근 후 냉장고를 열어도 재고가 한눈에 보이지 않아, 필요한 식재료를 찾는 데 시간과 집중력을 계속 소모합니다.
                            </span>
                        </div>
                        <div className="flex items-start gap-1.5">
                            <X size={18} className="mt-0.5 min-w-4.5 text-rose-400" />
                            <span className="min-h-10 leading-5">
                                식재료별 유통기한과 보관 상태를 제때 확인하기 어려워, 아직 먹을 수 있는 재료도 상한 뒤에야 발견합니다.
                            </span>
                        </div>
                        <div className="flex items-start gap-1.5">
                            <X size={18} className="mt-0.5 min-w-4.5 text-rose-400" />
                            <span className="min-h-10 leading-5">
                                요리에 필요한 재료나 양념이 하나라도 부족하면 대체 방법을 찾기 어려워, 결국 배달 주문으로 이어집니다.
                            </span>
                        </div>
                    </div>
                </Card>
                <ArrowBigRight className="min-w-6 self-center" fill="#ffffff" />
                <Card className="h-full min-w-0 flex-1 gap-2 border border-emerald-400 p-3">
                    <div className="flex w-full items-center justify-between">
                        <Badge className="bg-emerald-900/50 text-emerald-400">TO-BE</Badge>
                        <span className="text-xs text-emerald-400">월 3.2만 원 절감</span>
                    </div>
                    <div className="grid grid-rows-3 gap-2">
                        <div className="flex items-start gap-1.5">
                            <CheckIcon size={18} className="mt-0.5 min-w-4.5 text-emerald-400" />
                            <span className="min-h-10 leading-5">
                                냉장고 사진 한 장으로 식재료와 보관 상태를 인식하고, 각 재료의 유통기한과 D-day를 자동 기록합니다.
                            </span>
                        </div>
                        <div className="flex items-start gap-1.5">
                            <CheckIcon size={18} className="mt-0.5 min-w-4.5 text-emerald-400" />
                            <span className="min-h-10 leading-5">
                                퇴근 시간에 맞춰 보유 재료와 취향을 반영한 15분 레시피를 미리 추천해, 귀가 후 바로 조리할 수 있습니다.
                            </span>
                        </div>
                        <div className="flex items-start gap-1.5">
                            <CheckIcon size={18} className="mt-0.5 min-w-4.5 text-emerald-400" />
                            <span className="min-h-10 leading-5">
                                레시피에 필요한 재료 중 부족한 항목만 최소 단위로 골라, 퀵커머스 장보기와 빠른 배송을 연결합니다.
                            </span>
                        </div>
                    </div>
                </Card>
            </div>
        </Card>
    )
}

export default SolutionLayout
