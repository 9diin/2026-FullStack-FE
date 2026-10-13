import { AppPagination } from "@/components/common"
import { Badge, Button, Card, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Input, Separator } from "@/components/ui"
import { Download, FolderBookmark, PencilLine, Plus, Search, Trash2 } from "lucide-react"

const items1 = [
    { label: "최종 수정일", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
]

const items2 = [
    { label: "상태", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
]

function Projects() {
    return (
        <div className="flex flex-1 items-start justify-center">
            <div className="flex h-full min-h-0 w-[calc(100%-288px)] max-w-7xl flex-col gap-6 p-4 pt-0">
                {/* 헤더 영역 - 52px */}
                <div className="flex w-full shrink-0 justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">내 프로젝트 & 문서 보관함</h1>
                        <p className="text-neutral-400">인공지능이 구조화된 사업계획서, 린 캔버스 및 피치덱 데이터를 실시간 관리합니다.</p>
                    </div>
                    <Button variant="secondary" className="border border-neutral-700 font-semibold">
                        프로젝트 폴더 생성
                        <Plus />
                    </Button>
                </div>
                {/* 메인 콘텐츠 영역 */}
                <div className="flex min-h-0 w-full flex-1 flex-col gap-6">
                    {/* 136px */}
                    <div className="flex w-full shrink-0 flex-col gap-2">
                        <div className="flex w-full justify-between">
                            <span>주요 프로젝트 폴더</span>
                            <Button variant="link" className="h-fit p-0">
                                모두 보기 (5)
                            </Button>
                        </div>
                        <div className="flex w-full items-center gap-4 overflow-x-scroll">
                            <Card className="w-60 min-w-60 cursor-pointer gap-2 border bg-blue-950/40 p-3 ring-0">
                                <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-blue-50/10 text-blue-400">
                                    <FolderBookmark size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-medium">아이디어 인큐베이팅</span>
                                    <span className="text-xs text-neutral-400">문서 12건</span>
                                </div>
                            </Card>
                            <Card className="w-60 min-w-60 cursor-pointer gap-2 border bg-violet-950/40 p-3 ring-0">
                                <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-violet-50/10 text-violet-400">
                                    <FolderBookmark size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-medium">IR 피치덱 & 재무모델</span>
                                    <span className="text-xs text-neutral-400">문서 12건</span>
                                </div>
                            </Card>
                            <Card className="w-60 min-w-60 cursor-pointer gap-2 border bg-rose-950/40 p-3 ring-0">
                                <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-rose-50/10 text-rose-400">
                                    <FolderBookmark size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-medium">아이디어 인큐베이팅</span>
                                    <span className="text-xs text-neutral-400">문서 12건</span>
                                </div>
                            </Card>
                            <Card className="w-60 min-w-60 cursor-pointer gap-2 border bg-amber-950/40 p-3 ring-0">
                                <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-amber-50/10 text-amber-400">
                                    <FolderBookmark size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-medium">아이디어 인큐베이팅</span>
                                    <span className="text-xs text-neutral-400">문서 12건</span>
                                </div>
                            </Card>
                            <Card className="w-60 min-w-60 cursor-pointer gap-2 border bg-emerald-950/40 p-3 ring-0">
                                <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-emerald-50/10 text-emerald-400">
                                    <FolderBookmark size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-medium">아이디어 인큐베이팅</span>
                                    <span className="text-xs text-neutral-400">문서 12건</span>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="flex shrink-0 flex-col gap-1">
                        <Separator />
                        <Separator />
                    </div>
                    <div className="flex min-h-0 w-full flex-1 flex-col gap-4">
                        <div className="flex shrink-0 items-center gap-2">
                            <Input placeholder="검색어를 입력하세요" className="w-72" />
                            <Select items={items2}>
                                <SelectTrigger className="w-full max-w-24">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        {items2.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Select items={items1}>
                                <SelectTrigger className="w-full max-w-36">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        {items1.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Button size="icon" variant="secondary">
                                <Search />
                            </Button>
                        </div>
                        {/* 테이블 영역 */}
                        <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto rounded-md border">
                            <div className="flex h-10 min-h-10 w-full shrink-0 items-center border-b">
                                <div className="flex w-[42.5%] items-center justify-center">프로젝트 / 파일명</div>
                                <div className="flex w-[15%] items-center justify-center">최종 수정일</div>
                                <div className="flex w-[15%] items-center justify-center">소속 분류</div>
                                <div className="flex w-[10%] items-center justify-center">태그</div>
                                <div className="flex w-[17.5%] items-center justify-center">작업 관리</div>
                            </div>
                            <div className="flex h-10 min-h-10 w-full shrink-0 items-center border-b bg-card">
                                <div className="flex w-[42.5%] items-center justify-center"> B2B 물류 최적화 SaaS 아이디어 린 캔버스 & 가치제안서</div>
                                <div className="flex w-[15%] items-center justify-center">2026년 10월 13일</div>
                                <div className="flex w-[15%] items-center justify-center">아이디어 인큐베이팅</div>
                                <div className="flex w-[10%] items-center justify-center">
                                    <Badge>예비창업패키지</Badge>
                                </div>
                                <div className="flex w-[17.5%] items-center justify-center gap-1">
                                    <Button size="icon" variant="secondary">
                                        <PencilLine />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Download />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex h-10 min-h-10 w-full shrink-0 items-center border-b bg-card">
                                <div className="flex w-[42.5%] items-center justify-center"> B2B 물류 최적화 SaaS 아이디어 린 캔버스 & 가치제안서</div>
                                <div className="flex w-[15%] items-center justify-center">2026년 10월 13일</div>
                                <div className="flex w-[15%] items-center justify-center">아이디어 인큐베이팅</div>
                                <div className="flex w-[10%] items-center justify-center">
                                    <Badge>예비창업패키지</Badge>
                                </div>
                                <div className="flex w-[17.5%] items-center justify-center gap-1">
                                    <Button size="icon" variant="secondary">
                                        <PencilLine />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Download />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex h-10 min-h-10 w-full shrink-0 items-center border-b bg-card">
                                <div className="flex w-[42.5%] items-center justify-center"> B2B 물류 최적화 SaaS 아이디어 린 캔버스 & 가치제안서</div>
                                <div className="flex w-[15%] items-center justify-center">2026년 10월 13일</div>
                                <div className="flex w-[15%] items-center justify-center">아이디어 인큐베이팅</div>
                                <div className="flex w-[10%] items-center justify-center">
                                    <Badge>예비창업패키지</Badge>
                                </div>
                                <div className="flex w-[17.5%] items-center justify-center gap-1">
                                    <Button size="icon" variant="secondary">
                                        <PencilLine />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Download />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex h-10 min-h-10 w-full shrink-0 items-center border-b bg-card">
                                <div className="flex w-[42.5%] items-center justify-center"> B2B 물류 최적화 SaaS 아이디어 린 캔버스 & 가치제안서</div>
                                <div className="flex w-[15%] items-center justify-center">2026년 10월 13일</div>
                                <div className="flex w-[15%] items-center justify-center">아이디어 인큐베이팅</div>
                                <div className="flex w-[10%] items-center justify-center">
                                    <Badge>예비창업패키지</Badge>
                                </div>
                                <div className="flex w-[17.5%] items-center justify-center gap-1">
                                    <Button size="icon" variant="secondary">
                                        <PencilLine />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Download />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex h-10 min-h-10 w-full shrink-0 items-center border-b bg-card">
                                <div className="flex w-[42.5%] items-center justify-center"> B2B 물류 최적화 SaaS 아이디어 린 캔버스 & 가치제안서</div>
                                <div className="flex w-[15%] items-center justify-center">2026년 10월 13일</div>
                                <div className="flex w-[15%] items-center justify-center">아이디어 인큐베이팅</div>
                                <div className="flex w-[10%] items-center justify-center">
                                    <Badge>예비창업패키지</Badge>
                                </div>
                                <div className="flex w-[17.5%] items-center justify-center gap-1">
                                    <Button size="icon" variant="secondary">
                                        <PencilLine />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Download />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex h-10 min-h-10 w-full shrink-0 items-center border-b bg-card">
                                <div className="flex w-[42.5%] items-center justify-center"> B2B 물류 최적화 SaaS 아이디어 린 캔버스 & 가치제안서</div>
                                <div className="flex w-[15%] items-center justify-center">2026년 10월 13일</div>
                                <div className="flex w-[15%] items-center justify-center">아이디어 인큐베이팅</div>
                                <div className="flex w-[10%] items-center justify-center">
                                    <Badge>예비창업패키지</Badge>
                                </div>
                                <div className="flex w-[17.5%] items-center justify-center gap-1">
                                    <Button size="icon" variant="secondary">
                                        <PencilLine />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Download />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex h-10 min-h-10 w-full shrink-0 items-center border-b-0 bg-card">
                                <div className="flex w-[42.5%] items-center justify-center"> B2B 물류 최적화 SaaS 아이디어 린 캔버스 & 가치제안서</div>
                                <div className="flex w-[15%] items-center justify-center">2026년 10월 13일</div>
                                <div className="flex w-[15%] items-center justify-center">아이디어 인큐베이팅</div>
                                <div className="flex w-[10%] items-center justify-center">
                                    <Badge>예비창업패키지</Badge>
                                </div>
                                <div className="flex w-[17.5%] items-center justify-center gap-1">
                                    <Button size="icon" variant="secondary">
                                        <PencilLine />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Download />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* 페이지네이션 */}
                        <div className="flex shrink-0 justify-between">
                            <span className="mt-1.5 text-neutral-400">전체 32개 문서 중 1-6 항목 표시 중</span>
                            {/* 32px */}
                            <AppPagination />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects
