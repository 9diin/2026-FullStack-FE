import { BusinessPlanGrowthRoadmapChart } from "./business-plan-growth-roadmap-chart"
import { Badge, Card, Separator } from "@/components/ui"
import { Square } from "lucide-react"
import BusinessPlanReportHeader from "./business-plan-report-header"

function BusinessPlanGrowthStrategySection() {
    return (
        <>
            {/* 성장 전략 (시장 규모 & BM) */}
            <div className="flex h-auto min-h-280.75 w-198.5 shrink-0 flex-col rounded-lg bg-white p-6 text-[11px] text-black">
                <BusinessPlanReportHeader />
                <section className="flex flex-col gap-6 py-6">
                    <div className="flex items-center justify-between border-b border-black pb-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="w-5! rounded-xs font-semibold">
                                3
                            </Badge>
                            <span className="text-base font-semibold">3. 성장전략 (Scale-up) - 시장 규모 분석 및 비즈니스 모델 (BM)</span>
                        </div>
                        <Badge className="rounded-xs text-[10px]">수익모델 및 확장성 우수</Badge>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-medium">가. 목표 시장 규모 (TAM-SAM-SOM) 산출 근거 및 다이어그램</span>
                        <div className="mt-2 flex w-full flex-col items-center gap-3 rounded-sm border border-neutral-500 p-3">
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-1 text-sm">
                                    <Square fill="#000000" className="h-3 w-3" />
                                    <span className="font-medium">[도 3-1] 단계별 타깃 시장 규모 (통계청 및 농림축산식품부 유통통계 기준)</span>
                                </div>
                                <Badge className="rounded-xs text-[10px] font-medium">단위: 원화(KRW)</Badge>
                            </div>
                            <Separator className="bg-neutral-500" />
                            <div className="flex w-full items-center gap-3">
                                <div className="mx-3 flex w-fit items-center justify-center">
                                    <div className="relative flex h-50 w-50 items-center justify-center rounded-full border-2 border-blue-300/75 bg-blue-300/75 p-2 text-[10px]">
                                        <span className="absolute top-1.5 font-medium">TAM 14.2조원</span>
                                        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-2 border-blue-400/75 bg-blue-400/75">
                                            <span className="absolute top-1.5 font-medium">SAM 3.8조원</span>
                                            <div className="flex h-22 w-22 items-center justify-center rounded-full border-2 border-blue-500/75 bg-blue-500/75">
                                                <div className="flex flex-col items-center">
                                                    <span className="font-medium text-white">SOM (목표)</span>
                                                    <span className="text-sm font-semibold text-white">420억원</span>
                                                    <Separator className="my-1 w-8!" />
                                                    <span className="font-medium text-white">3차년도</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col gap-0.5">
                                    <div className="flex w-full items-center gap-0.5">
                                        <div className="flex h-full w-1/4 items-center justify-center bg-blue-500/15 p-2.5 font-semibold">시장 구분</div>
                                        <div className="flex h-full w-1/4 items-center justify-center bg-blue-500/15 p-2.5 font-semibold">규모</div>
                                        <div className="flex h-full w-1/2 items-center justify-center bg-blue-500/15 p-2.5 font-semibold">
                                            산출 정의 및 통계 근거
                                        </div>
                                    </div>
                                    <div className="flex w-full items-center gap-0.5">
                                        <div className="flex h-12.5 w-1/4 items-center justify-center bg-blue-50 p-2.5 font-semibold">전체 시장 (TAM)</div>
                                        <div className="flex h-12.5 w-1/4 items-center justify-center p-2.5">
                                            <span className="rounded-xs bg-amber-300/50 font-bold text-black">14.2조 원</span>
                                        </div>
                                        <div className="flex h-12.5 w-1/2 bg-blue-50 p-2.5 text-justify font-medium">
                                            국내 HMR 가정간편식 및 신선식품 온라인&middot;퀵커머스 거래 총액
                                        </div>
                                    </div>
                                    <div className="flex w-full items-center gap-0.5">
                                        <div className="flex h-12.5 w-1/4 items-center justify-center bg-blue-50 p-2.5 font-semibold">유효 시장 (SAM)</div>
                                        <div className="flex h-12.5 w-1/4 items-center justify-center p-2.5">
                                            <span className="rounded-xs bg-green-300/50 font-bold text-black">3.8조 원</span>
                                        </div>
                                        <div className="flex h-12.5 w-1/2 bg-blue-50 p-2.5 text-justify font-medium">
                                            수도권 및 5대 광역시 거주 2030 1&middot;2인 가구 식료품 정기 구매액
                                        </div>
                                    </div>
                                    <div className="flex w-full items-center gap-0.5">
                                        <div className="flex h-12.5 w-1/4 items-center justify-center bg-blue-50 p-2.5 font-semibold">수익 시장 (SOM)</div>
                                        <div className="flex h-12.5 w-1/4 items-center justify-center p-2.5">
                                            <span className="rounded-xs bg-amber-300/50 font-bold text-black">420억 원</span>
                                        </div>
                                        <div className="flex h-12.5 w-1/2 bg-blue-50 p-2.5 text-justify font-medium">
                                            3차년도 기준 수도권 결손 번들 구매 전환 고객 35만 명 대상 매출
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-medium">나. 3-Stream 가치사슬 비즈니스 모델(BM) 및 수익원 다각화 구조</span>
                        <div className="mt-2 flex w-full flex-col items-center gap-3 rounded-sm border border-neutral-500 p-3">
                            <div className="flex w-full items-center gap-1 text-sm">
                                <Square fill="#000000" className="h-3 w-3" />
                                <span className="font-medium">[도 3-2] I'deaverse Dining OS 플랫폼 양방향 가치 교환 및 수익 구조</span>
                            </div>
                            <Separator className="bg-neutral-500" />
                            <div className="grid w-full grid-cols-3 gap-3">
                                <Card className="w-full gap-2 rounded-sm bg-neutral-50 p-2 text-black">
                                    <div className="flex items-center justify-center rounded-xs bg-blue-50 py-1 text-xs font-medium text-black">
                                        소비자 (1인&middot;2인 가구)
                                    </div>
                                    <p className="text-center text-[11px] text-neutral-700">
                                        냉장고 식재료 78% 소진 <br /> 15분 완성 맞춤 레시피 획득
                                    </p>
                                    <p className="rounded-sm border border-neutral-200 bg-white p-2 text-[11px] text-neutral-700">
                                        결손 번들 소액 결제 <br />+ 월 4,900원 멤버십
                                    </p>
                                </Card>
                                <Card className="w-full gap-2 rounded-sm border-2 border-neutral-500/50 bg-neutral-50 p-2 text-black shadow-sm">
                                    <div className="flex items-center justify-center rounded-xs bg-blue-50 py-1 text-xs font-medium text-black">
                                        중개 플랫폼 (I'deaverse OS)
                                    </div>
                                    <p className="text-center text-[11px] text-neutral-700">
                                        온디바이스 Vision AI 엔진 <br /> pgvector 결손 RAG 최적화
                                    </p>
                                    <p className="rounded-sm border border-neutral-200 bg-white p-2 text-[11px] text-neutral-700">
                                        중개 수수료 5.8%
                                        <br />+ B2B 소비패턴 데이터 SaaS
                                    </p>
                                </Card>
                                <Card className="w-full gap-2 rounded-sm bg-neutral-50 p-2 text-black">
                                    <div className="flex items-center justify-center rounded-xs bg-blue-50 py-1 text-xs font-medium text-black">
                                        제휴사 (퀵커머스&middot;식품서)
                                    </div>
                                    <p className="text-center text-[11px] text-neutral-700">
                                        B마트 / 요마트 배송 연동 <br /> 식품 신제품 타깃 샘플링
                                    </p>
                                    <p className="rounded-sm border border-neutral-200 bg-white p-2 text-[11px] text-neutral-700">
                                        구매 전환 수수료 지급 <br />+ 신규 고객 획득 비용 절감
                                    </p>
                                </Card>
                            </div>
                            {/* 분석 텍스트 */}
                            <div className="flex w-full flex-col gap-2 pt-1 text-[11px] leading-relaxed text-neutral-700">
                                <p className="text-justify">
                                    본 플랫폼의 비즈니스 모델은 <span className="font-semibold text-black">소비자-플랫폼-제휴사</span>를 잇는 3-Stream 양방향
                                    가치 교환 구조로 설계되었다. 핵심 수익원은 ① 결손 번들 중개 수수료(5.8%), ② 프리미엄 멤버십 구독료(월 4,900원), ③ B2B
                                    소비패턴 데이터 SaaS 라이선스 세 축으로 구성되며, 단일 수익원 의존도를 낮추고 경기 변동에 대한 복원력을 확보한다.
                                </p>
                                <p className="text-justify">
                                    <span className="font-semibold text-black">소비자 측면</span>에서는 온디바이스 Vision AI가 냉장고 내 잔여 식재료를 자동
                                    인식하고, pgvector 기반 결손 RAG 엔진이 부족한 식재료만을 정확히 추출하여 최적 번들을 생성한다. 이를 통해 소비자는 평균
                                    78%의 식재료 소진율과 15분 이내 완성 가능한 맞춤형 레시피를 획득하며, 식재료 낭비를 연간 가구당 약 42만 원 절감할 수 있다.
                                    멤버십 가입자에게는 영양사 큐레이션, 프리미엄 레시피, 배송비 무료 등 차별화된 혜택을 제공하여 장기 잔존율(6개월 기준 72%
                                    목표)을 확보한다.
                                </p>
                                <p className="text-justify">
                                    <span className="font-semibold text-black">제휴사 측면</span>에서는 B마트·요마트 등 퀵커머스 사업자와 API 직연동을 통해 결손
                                    번들 주문을 실시간 라우팅하고, 식품 대기업에게는 익명화된 소비패턴 인사이트(식재료 조합 빈도, 시간대별 조리 트렌드 등)를
                                    SaaS 형태로 제공한다. 제휴사는 신규 고객 획득 비용(CAC)을 기존 대비 35% 절감하고, 타깃 샘플링을 통한 신제품 테스트 채널로
                                    활용할 수 있어 상호 윈-윈 구조가 성립한다.
                                </p>
                                <p className="text-justify">
                                    결과적으로,{" "}
                                    <span className="font-semibold text-black">
                                        3차년도 기준 수익 비중은 중개 수수료 48%, 멤버십 구독 31%, B2B 데이터 SaaS 21%
                                    </span>
                                    로 분산되며, 플랫폼 전체 Take Rate은 거래액 대비 8.3%를 목표로 한다. 이는 동종 푸드테크 플랫폼 대비 높은 수준이나,
                                    소비자에게 제공하는 식재료 절감 가치(연 42만 원)와 레시피 편의성을 고려할 때 충분히 수용 가능한 수준으로 판단된다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* 성장 전략 - 다. 연차별 로드맵 (새 페이지) */}
            <div className="flex h-auto min-h-280.75 w-198.5 shrink-0 flex-col rounded-lg bg-white p-6 text-[11px] text-black">
                <BusinessPlanReportHeader />
                <section className="flex flex-col gap-6 py-6">
                    <BusinessPlanGrowthRoadmapChart />
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-medium">다. 연차별 사업화 추진 로드맵 및 예상 손익계산 (BEP)</span>
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="grid w-full grid-cols-4 gap-0.5">
                                <div className="flex h-full w-full items-center justify-center bg-blue-500/15 p-2.5 font-semibold">구분</div>
                                <div className="flex h-full w-full items-center justify-center bg-blue-500/15 p-2.5 font-semibold">1차년도 (2025)</div>
                                <div className="flex h-full w-full items-center justify-center bg-blue-500/15 p-2.5 font-semibold">2차년도 (2026)</div>
                                <div className="flex h-full w-full items-center justify-center bg-blue-500/15 p-2.5 font-semibold">3차년도 (2027)</div>
                            </div>
                            <div className="grid w-full grid-cols-4 gap-0.5">
                                <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-semibold">핵심 마일스톤</div>
                                <div className="flex h-full w-full items-center justify-center p-2.5">수도권 거점 실증 및 MVP 검증</div>
                                <div className="flex h-full w-full items-center justify-center p-2.5">
                                    <span className="rounded-xs bg-amber-300/50 font-bold text-black">전국 5대 광역시 제휴 확대</span>
                                </div>
                                <div className="flex h-full w-full items-center justify-center p-2.5 font-medium">동남아 2개국 진출 및 흑자 전환</div>
                            </div>
                            <div className="grid w-full grid-cols-4 gap-0.5">
                                <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-semibold">월간 활성자 (MAU) </div>
                                <div className="flex h-full w-full items-center justify-center p-2.5">50,000 명</div>
                                <div className="flex h-full w-full items-center justify-center p-2.5">
                                    <span className="rounded-xs bg-green-300/50 font-bold text-black">220,000명</span>
                                </div>
                                <div className="flex h-full w-full items-center justify-center p-2.5 font-medium">500,000명 </div>
                            </div>
                            <div className="grid w-full grid-cols-4 gap-0.5">
                                <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-semibold">예상 연매출액 </div>
                                <div className="flex h-full w-full items-center justify-center p-2.5">8.4억 원</div>
                                <div className="flex h-full w-full items-center justify-center p-2.5">
                                    <span className="rounded-xs bg-amber-300/50 font-bold text-black">36.0억 원</span>
                                </div>
                                <div className="flex h-full w-full items-center justify-center p-2.5 font-medium">112.0억 원 (흑자 전환)</div>
                            </div>
                            <div className="grid w-full grid-cols-4 gap-0.5">
                                <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-semibold">영업이익 및 수익률 </div>
                                <div className="flex h-full w-full items-center justify-center p-2.5">초기 투자 구간 (적자)</div>
                                <div className="flex h-full w-full items-center justify-center p-2.5">
                                    <span className="rounded-xs bg-green-300/50 font-bold text-black">BEP 근접 (영업이익 4%)</span>
                                </div>
                                <div className="flex h-full w-full items-center justify-center p-2.5 font-medium">영업이익률 24.2% (27.1억)</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default BusinessPlanGrowthStrategySection
