import { Badge, Card, Separator } from "@/components/ui"
import { ArrowBigDownDash, Square } from "lucide-react"
import BusinessPlanReportHeader from "./business-plan-report-header"

function BusinessPlanProblemSection() {
    return (
        <div className="flex h-auto min-h-280.75 w-198.5 shrink-0 flex-col rounded-lg bg-white p-6 text-[11px] text-black">
            <BusinessPlanReportHeader />

            <section className="flex flex-col gap-6 py-6">
                <div className="my-6 flex flex-col gap-2 text-center">
                    <h1 className="text-4xl font-bold tracking-widest">사 업 계 획 서</h1>
                    <span>[민관협력 창업성장기술개발 (TIPS R&D 연계) / 초기창업패키지 공통서식]</span>
                </div>
                <div className="flex w-full flex-col">
                    <div className="flex h-9 w-full items-center">
                        <div className="flex h-full w-1/5 min-w-1/5 items-center justify-center bg-blue-500/15 font-semibold">신청 과제명</div>
                        <div className="flex h-full w-4/5 min-w-4/5 items-center justify-center bg-blue-50 pl-3">
                            스마트 제로-웨이스트 다이닝 OS : 잔여 식재료 비전 인지 기반 인스턴트 밀키트화 플랫폼
                        </div>
                    </div>
                    <div className="flex h-9 w-full items-center">
                        <div className="flex h-full w-1/2 min-w-1/2 items-center border">
                            <div className="flex h-full w-2/5 min-w-2/5 items-center justify-center bg-blue-500/15 font-semibold">기술 분야</div>
                            <div className="flex h-full w-3/5 min-w-3/5 items-center justify-center border-b border-neutral-100 text-center break-keep">
                                푸드테크 / 온디바이스 비전 AI
                            </div>
                        </div>
                        <div className="flex h-full w-1/2 min-w-1/2 items-center border">
                            <div className="flex h-full w-2/5 min-w-2/5 items-center justify-center bg-blue-500/15 font-semibold">과제 구분</div>
                            <div className="flex h-full w-3/5 min-w-3/5 items-center justify-center border-b border-neutral-100 text-center break-keep">
                                상용화 R&D (민관공동투자형)
                            </div>
                        </div>
                    </div>
                    <div className="flex h-9 w-full items-center">
                        <div className="flex h-full w-1/2 min-w-1/2 items-center border">
                            <div className="flex h-full w-2/5 min-w-2/5 items-center justify-center bg-blue-500/15 font-semibold">주관연구개발기관</div>
                            <div className="flex h-full w-3/5 min-w-3/5 items-center justify-center border-b border-neutral-100 text-center break-keep">
                                (주) 준코딩 스튜디오
                            </div>
                        </div>
                        <div className="flex h-full w-1/2 min-w-1/2 items-center border">
                            <div className="flex h-full w-2/5 min-w-2/5 items-center justify-center bg-blue-500/15 font-semibold">대표자 (책임자)</div>
                            <div className="flex h-full w-3/5 min-w-3/5 items-center justify-center border-b border-neutral-100 text-center break-keep">
                                박 아무개 (꿈만장자)
                            </div>
                        </div>
                    </div>
                    <div className="flex h-9 w-full items-center">
                        <div className="flex h-full w-1/2 min-w-1/2 items-center border">
                            <div className="flex h-full w-2/5 min-w-2/5 items-center justify-center bg-blue-500/15 font-semibold">총 연구개발기간</div>
                            <div className="flex h-full w-3/5 min-w-3/5 items-center justify-center border-b border-neutral-100 text-center break-keep">
                                2026. 09. 01 ~ 2026. 09. 08 <br /> (2년 3개월)
                            </div>
                        </div>
                        <div className="flex h-full w-1/2 min-w-1/2 items-center border">
                            <div className="flex h-full w-2/5 min-w-2/5 items-center justify-center bg-blue-500/15 font-semibold">총 사업비</div>
                            <div className="flex h-full w-3/5 min-w-3/5 items-center justify-center border-b border-neutral-100 text-center break-keep">
                                650,000,000원 <br />
                                (정부 1.5억 + 민간 3.5억)
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-6 py-6">
                <div className="flex items-center justify-between border-b border-black pb-2">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="w-5! rounded-xs font-semibold">
                            1
                        </Badge>
                        <span className="text-base font-semibold">1. 문제인식 (Problem) - 창업아이템의 배경 및 개발 필요성</span>
                    </div>
                    <Badge className="rounded-xs text-[10px]">[평가배점 : 25점]</Badge>
                </div>
                <div className="flex flex-col items-start gap-1">
                    <span className="text-sm font-medium">가. 1인 가구 식생활 실태 및 3대 핵심 페인포인트 (Pain Points)</span>
                    <p className="text-justify indent-2">
                        통계청 인구총조사(2026년 기준)에 따르면 국내 1인 가구는 800만 가구(전체 가구의 34.5%)에 달하며, 이들의 월평균 식비 중 미사용 부패 폐기로
                        인한 직접 손실액이 가구당 연간 58.4만 원에 이르고 있음. 마트의 대용량 묶음 포장 유통 구조와 퇴근 후 조리 마찰 비용이 결합하여 심각한
                        자원 낭비와 배달 외식 고비용 고착화를 야기하고 있음.
                    </p>
                    <div className="mt-2 flex w-full flex-col items-center gap-3 rounded-sm border border-neutral-500 p-3">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-1 text-sm">
                                <Square fill="#000000" className="h-3 w-3" />
                                <span className="font-medium">[도 1-1] 1인 가구 식자재 낭비 및 외식 의존의 악순환 구조도</span>
                            </div>
                            <Badge className="rounded-xs text-[10px] font-medium">국내 연간 식자재 폐기 손실: 약 15.4조 원</Badge>
                        </div>
                        <Separator className="bg-neutral-500" />
                        <div className="grid grid-cols-4 gap-3">
                            <Card className="gap-2 rounded-sm bg-neutral-50 p-2 text-black">
                                <div className="flex items-center justify-center rounded-xs bg-blue-50 py-1 text-xs font-medium text-black">단계 ➀ - 구매</div>
                                <div className="my-1 flex flex-col gap-1">
                                    <span className="font-medium">대용량 번들 강제 구매</span>
                                    <p className="text-justify text-[11px] text-neutral-700">
                                        마트 소포장 부재로 묶음 채소&middot;대용량 조미료 비자발적 과대 구매
                                    </p>
                                </div>
                                <Separator className="bg-neutral-300" />
                                <span className="text-xs font-medium text-neutral-700">초과 비축 발생</span>
                            </Card>
                            <Card className="gap-2 rounded-sm bg-neutral-50 p-2 text-black">
                                <div className="flex items-center justify-center rounded-xs bg-blue-50 py-1 text-xs font-medium text-black">단계 ➁ - 구매</div>
                                <div className="my-1 flex flex-col gap-1">
                                    <span className="font-medium">냉장고 방치 및 망각</span>
                                    <p className="text-justify text-[11px] text-neutral-700">보유 재고 망각 및 레시피 탐색 피로도 가중 (탐색 평균 68분 소요)</p>
                                </div>
                                <Separator className="bg-neutral-300" />
                                <span className="text-xs font-medium text-neutral-700">평균 방치 11.4일</span>
                            </Card>
                            <Card className="gap-2 rounded-sm bg-neutral-50 p-2 text-black">
                                <div className="flex items-center justify-center rounded-xs bg-blue-50 py-1 text-xs font-medium text-black">단계 ③ - 폐기</div>
                                <div className="my-1 flex flex-col gap-1">
                                    <span className="font-medium">부패 및 음식물 폐기</span>
                                    <p className="text-justify text-[11px] text-neutral-700">구매 식자재의 43%가 미사용 부패 폐기되며 종량제 부담 초래</p>
                                </div>
                                <Separator className="bg-neutral-300" />
                                <span className="text-xs font-medium text-neutral-700">가구당 월 4.8만 원 손실</span>
                            </Card>
                            <Card className="gap-2 rounded-sm bg-neutral-50 p-2 text-black">
                                <div className="flex items-center justify-center rounded-xs bg-blue-50 py-1 text-xs font-medium text-black">단계 ④ - 의존</div>
                                <div className="my-1 flex flex-col gap-1">
                                    <span className="font-medium">배달앱 고비용 의존</span>
                                    <p className="text-justify text-[11px] text-neutral-700">조리 포기 후 1끼당 1.8~2.5만 원 고비용 배달 음식 악순환 반복</p>
                                </div>
                                <Separator className="bg-neutral-300" />
                                <span className="text-xs font-medium text-neutral-700">다시 단계 ➀ 회귀</span>
                            </Card>
                        </div>
                        <ArrowBigDownDash fill="#d4d4d4" className="-my-1.5 text-neutral-300" />
                        <div className="flex w-full items-center gap-2 rounded-sm bg-neutral-50 p-2">
                            <Badge className="rounded-xs text-[10px] font-medium">&#8251; 본 과제의 핵심 해결 메커니즘</Badge>
                            <p className="font-semibold whitespace-nowrap">
                                스마트폰 단 1초 인식 &#8594; 결손 부재료만 초소량 보충하여 악순환(단계 ➁ &#8594; ③) 근원적 차단 (
                                <span className="rounded-xs bg-amber-300/50 font-bold text-black">낭비 감축효율 78.4%</span>)
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-1">
                    <span className="text-sm font-medium">나. 기존 대체재와의 기술적&middot;경제적 비교 분석표</span>
                    <div className="flex w-full flex-col gap-0.5">
                        <div className="grid w-full grid-cols-4 gap-0.5">
                            <div className="flex h-full w-full items-center justify-center bg-blue-500/15 p-2.5 font-semibold">비교 항목</div>
                            <div className="flex h-full w-full items-center justify-center bg-blue-500/15 p-2.5 font-semibold">시판 기성 밀키트</div>
                            <div className="flex h-full w-full items-center justify-center bg-blue-500/15 p-2.5 font-semibold">배달 전문 음식</div>
                            <div className="flex h-full w-full items-center justify-center bg-blue-500/15 p-2.5 font-semibold">본 개발 솔루션</div>
                        </div>
                        <div className="grid w-full grid-cols-4 gap-0.5">
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-semibold">잔여 식자재 소진율</div>
                            <div className="flex h-full w-full items-center justify-center p-2.5">소진 불가 (고정 번들)</div>
                            <div className="flex h-full w-full items-center justify-center p-2.5">소진 불가 (완제품 배달)</div>
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-medium">100% 잔여재료 우선 소진</div>
                        </div>
                        <div className="grid w-full grid-cols-4 gap-0.5">
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-semibold">1식 평균 소요비용</div>
                            <div className="flex h-full w-full items-center justify-center p-2.5">14,000 ~ 18,000원</div>
                            <div className="flex h-full w-full items-center justify-center p-2.5">18,000 ~ 25,000원 (배달 팁)</div>
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-medium">3,500 ~ 5,500원 (결손 조미료만)</div>
                        </div>
                        <div className="grid w-full grid-cols-4 gap-0.5">
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-semibold">소비 리드타임</div>
                            <div className="flex h-full w-full items-center justify-center p-2.5">익일 새벽배송 대기</div>
                            <div className="flex h-full w-full items-center justify-center p-2.5">주문 후 45 ~ 60분 소요</div>
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-medium">
                                퀵커머스 20분 내 수령&middot;15분 완성
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BusinessPlanProblemSection
