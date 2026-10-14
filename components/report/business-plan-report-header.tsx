import { Badge } from "../ui"

function BusinessPlanReportHeader() {
    return (
        <section className="flex items-center justify-between border-b border-black pb-2 text-[11px] text-black">
            <div className="flex items-center gap-2">
                <Badge className="rounded-xs text-[10px]">[별지 제1호 서식]</Badge>
                <span>2026년도 창업성장기술개발사업(TIPS / 초기창업패키지) 사업계획서</span>
            </div>
            <div>
                <span>과제접수번호 : </span>
                <span>2026-TIPS-IDEA-0908</span>
            </div>
        </section>
    )
}

export default BusinessPlanReportHeader
