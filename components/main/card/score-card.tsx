import { Badge, Card } from "@/components/ui"

function ScoreCard({
    title,
    score,
    categoryCode,
}: {
    title: string
    score: string
    categoryCode: "P" | "S" | "T"
}) {
    return (
        <Card className="flex-row items-center justify-between p-2 pr-4">
            <div className="flex items-start gap-1">
                <Badge className="mt-0.5 aspect-square rounded-sm bg-violet-900/50 font-semibold text-violet-500">{categoryCode}</Badge>
                <div className="flex flex-col">
                    <span className="font-medium">{title}</span>
                    <span className="text-xs text-neutral-400">Vision AI 전공 인력 프로필 양호</span>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <span className="text-xs font-semibold">A</span>
                &middot;
                <span className="text-xs font-semibold">{score}점</span>
            </div>
        </Card>
    )
}

export default ScoreCard
