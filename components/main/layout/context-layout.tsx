import { Check } from "lucide-react"
import { Badge } from "@/components/ui"

function ContextLayout({ label, icon, children, status }: { label: string; icon: React.ReactNode; children: React.ReactNode; status?: React.ReactNode }) {
    return (
        <div className="flex shrink-0 flex-col gap-2">
            {/* 레이아웃 라벨 영역 */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    {icon}
                    <span className="font-medium">{label}</span>
                </div>
                {status}
                {!status && label === "참조 소스 컨텍스트" && (
                    <Badge className="rounded-full bg-violet-900/50 text-[10px] text-violet-500">활성화된 파일 2개</Badge>
                )}
                {!status && label === "핵심 분석 아이디어" && (
                    <div className="flex items-center gap-1">
                        <Check className="w-3 text-green-500" />
                        <span className="text-[10px] text-green-500">분석 완료</span>
                    </div>
                )}
            </div>
            {/* 레이아웃 콘텐츠 영역 */}
            {children}
        </div>
    )
}

export default ContextLayout
