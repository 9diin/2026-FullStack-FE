import { Badge, Card, Separator } from "@/components/ui"
import { ArrowBigDownDash, Square } from "lucide-react"
import BusinessPlanReportHeader from "./business-plan-report-header"

function BusinessPlanFeasibilitySection() {
    return (
        <div className="flex h-auto min-h-280.75 w-198.5 shrink-0 flex-col rounded-lg bg-white p-6 text-[11px] text-black">
            <BusinessPlanReportHeader />

            <section className="flex flex-col gap-6 py-6">
                <div className="flex items-center justify-between border-b border-black pb-2">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="w-5! rounded-xs font-semibold">
                            2
                        </Badge>
                        <span className="text-base font-semibold">2. 실현 가능성 (Solution) - 온디바이스 Vision AI 및 결손 벌들 솔루션</span>
                    </div>
                    <Badge className="rounded-xs text-[10px]">기술성 및 사업화 타당성 A등급</Badge>
                </div>
                <div className="flex flex-col items-start gap-1">
                    <span className="text-sm font-medium">가. 핵심 기술 아키텍쳐 및 4단계 서비스 엔지니어링 파이프라인</span>
                    <p className="text-justify indent-2">
                        본 기술은 스마트폰 NPU 상에서 독립 구동되는 경량 객체인식 모델(YOLOv8s INT8)을 통해 사용자 냉장고 스냅샷 1장으로부터 840여 종 식자재 및
                        신선도를 1.2초 내로 식별합니다. 이후 pgvector 시맨틱 임베딩 기반 영양학 지식그래프를 활용하여 잔존 소비기한 순 최적 15분 레시피를
                        도출하고, 결손 필수 부재료만을 퀵커머스 배송망(B마트/요마트)으로 원터치 발주 시킵니다.
                    </p>
                    <div className="mt-2 flex w-full flex-col items-center gap-3 rounded-sm border border-neutral-500 p-3">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-1 text-sm">
                                <Square fill="#000000" className="h-3 w-3" />
                                <span className="font-medium">[도 2-1] 온디바이스 비전 AI 및 결손 조미료 매칭 4-Step 엔지니어링 파이프라인</span>
                            </div>
                            <Badge className="rounded-xs text-[10px] font-medium">End-to-End Latency: 1.2초 이내</Badge>
                        </div>
                        <Separator className="bg-neutral-500" />
                        <div className="grid grid-cols-4 gap-3">
                            <Card className="gap-2 rounded-sm bg-neutral-50 p-2 text-black">
                                <div className="flex w-full items-center justify-between">
                                    <Badge className="rounded-xs bg-violet-500 text-[10px] font-medium text-white">PHASE 1</Badge>
                                    <span className="text-[10px]">1단계</span>
                                </div>
                                <div className="my-1 flex flex-col items-start gap-1">
                                    <span className="font-medium">1초 냉장고 스냅샷</span>
                                    <p className="text-justify text-[11px] text-neutral-700">모바일 카메라 단일 샷 촬영 자동 노이즈/조도 보정 필터 구동</p>
                                </div>
                                <div className="flex w-full flex-col items-start gap-1 rounded-sm border border-neutral-200/75 bg-white p-2 text-[10px]">
                                    <div className="flex w-full items-center justify-between">
                                        <span>지연시간</span>
                                        <span className="font-medium">250ms</span>
                                    </div>
                                    <span>RGB-D 엣지 정제</span>
                                </div>
                            </Card>
                            <Card className="gap-2 rounded-sm bg-neutral-50 p-2 text-black">
                                <div className="flex w-full items-center justify-between">
                                    <Badge className="rounded-xs bg-violet-500 text-[10px] font-medium text-white">PHASE 2</Badge>
                                    <span className="text-[10px]">2단계</span>
                                </div>
                                <div className="my-1 flex flex-col items-start gap-1">
                                    <span className="font-medium">식재료&middot;신선도 추론</span>
                                    <p className="text-justify text-[11px] text-neutral-700">YOLOv8s INT8 모듈로 840종 식자재 및 소비기한 위험도 연산</p>
                                </div>
                                <div className="flex w-full flex-col items-start gap-1 rounded-sm border border-neutral-200/75 bg-white p-2 text-[10px]">
                                    <div className="flex w-full items-center justify-between">
                                        <span>mAP 정확도</span>
                                        <span className="font-medium">89.2%</span>
                                    </div>
                                    <span>온디바이스 NPU 구동</span>
                                </div>
                            </Card>
                            <Card className="gap-2 rounded-sm bg-neutral-50 p-2 text-black">
                                <div className="flex w-full items-center justify-between">
                                    <Badge className="rounded-xs bg-violet-500 text-[10px] font-medium text-white">PHASE 3</Badge>
                                    <span className="text-[10px]">3단계</span>
                                </div>
                                <div className="my-1 flex flex-col items-start gap-1">
                                    <span className="font-medium">시맨틱 RAG 레시피</span>
                                    <p className="text-justify text-[11px] text-neutral-700">pgvector 지식 그래프로 폐기 임박재료 중심 15분 레시피 매칭</p>
                                </div>
                                <div className="flex w-full flex-col items-start gap-1 rounded-sm border border-neutral-200/75 bg-white p-2 text-[10px]">
                                    <div className="flex w-full items-center justify-between">
                                        <span>레시피 DB</span>
                                        <span className="font-medium">12만 건</span>
                                    </div>
                                    <span>결손 추론 15ms</span>
                                </div>
                            </Card>
                            <Card className="gap-2 rounded-sm bg-neutral-50 p-2 text-black">
                                <div className="flex w-full items-center justify-between">
                                    <Badge className="rounded-xs bg-violet-500 text-[10px] font-medium text-white">PHASE 4</Badge>
                                    <span className="text-[10px]">4단계</span>
                                </div>
                                <div className="my-1 flex flex-col items-start gap-1">
                                    <span className="font-medium">결손 번들 퀵배송</span>
                                    <p className="text-justify text-[11px] text-neutral-700">
                                        부족한 마늘&middot;굴소스만 번들링 후 퀵커머스 20분 내 초고속 배송
                                    </p>
                                </div>
                                <div className="flex w-full flex-col items-start gap-1 rounded-sm border border-neutral-200/75 bg-white p-2 text-[10px]">
                                    <div className="flex w-full items-center justify-between">
                                        <span>배송 리드타임</span>
                                        <span className="font-medium">18.4분</span>
                                    </div>
                                    <span>B마트&middot;요마트 연동</span>
                                </div>
                            </Card>
                        </div>
                        <ArrowBigDownDash fill="#d4d4d4" className="-my-1.5 text-neutral-300" />
                        <div className="flex w-full items-center gap-2 rounded-sm bg-neutral-50 p-2">
                            <Badge className="rounded-xs text-[10px] font-medium">기술보호 및 데이터 보안</Badge>
                            <div className="flex w-full items-center justify-between">
                                <p className="font-semibold whitespace-nowrap">특허 출원 5건 완료 (식자재 객체 식별 및 결손 성분)</p>
                                <span className="font-semibold">외부 유출 차단 [NPU 온디바이스]</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-1">
                    <span className="text-sm font-medium">나. 주요 연구개발 목표치 및 정향적 달성 기준</span>
                    <div className="flex w-full flex-col gap-0.5">
                        <div className="grid w-full grid-cols-4 gap-0.5">
                            <div className="flex h-full w-full items-center justify-center bg-blue-500/15 p-2.5 font-semibold">핵심 성능지표(KPI)</div>
                            <div className="flex h-full w-full items-center justify-center bg-blue-500/15 p-2.5 font-semibold">현재 수준 (MVP)</div>
                            <div className="flex h-full w-full items-center justify-center bg-blue-500/15 p-2.5 font-semibold">최종 개발 목표치</div>
                            <div className="flex h-full w-full items-center justify-center bg-blue-500/15 p-2.5 font-semibold">공인시험기관 / 공인평가방법</div>
                        </div>
                        <div className="grid w-full grid-cols-4 gap-0.5">
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-semibold">
                                식재료 다중객체 검출 정확도(mAP)
                            </div>
                            <div className="flex h-full w-full items-center justify-center p-2.5">82.4%</div>
                            <div className="flex h-full w-full items-center justify-center p-2.5">
                                <span className="rounded-xs bg-amber-300/50 font-bold text-black">89.0% 이상</span>
                            </div>
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-medium">한국정보통신기술협회(TTA) 성적서</div>
                        </div>
                        <div className="grid w-full grid-cols-4 gap-0.5">
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-semibold">온디바이스 비전 추론 지연시간</div>
                            <div className="flex h-full w-full items-center justify-center p-2.5">420ms</div>
                            <div className="flex h-full w-full items-center justify-center p-2.5">
                                <span className="rounded-xs bg-green-300/50 font-bold text-black">250ms 이하 (INT8)</span>
                            </div>
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-medium">스마트폰 NPU 디바이스 벤치마크</div>
                        </div>
                        <div className="grid w-full grid-cols-4 gap-0.5">
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-semibold">결손 식자재 매칭 추천 적합도</div>
                            <div className="flex h-full w-full items-center justify-center p-2.5">79.0%</div>
                            <div className="flex h-full w-full items-center justify-center p-2.5">
                                <span className="rounded-xs bg-amber-300/50 font-bold text-black">92.0% 이상</span>
                            </div>
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-medium">
                                전문 셰프 및 영양학 평가단 블라인드 평가
                            </div>
                        </div>
                        <div className="grid w-full grid-cols-4 gap-0.5">
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-semibold">퀵커머스 주문 번들 생성 성공률</div>
                            <div className="flex h-full w-full items-center justify-center p-2.5">91.5%</div>
                            <div className="flex h-full w-full items-center justify-center p-2.5">
                                <span className="rounded-xs bg-green-300/50 font-bold text-black">99.5% 이상</span>
                            </div>
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 p-2.5 font-medium">
                                시스템 로그 자동 집계 및 부하 시험
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BusinessPlanFeasibilitySection
