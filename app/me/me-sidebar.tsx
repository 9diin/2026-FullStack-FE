"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FolderBookmark, IdCard, UserRound } from "lucide-react"
import { cn } from "cn"
import { buttonVariants, Avatar, AvatarFallback, AvatarImage, Separator } from "@/components/ui"

const navigationItems = [
    {
        href: "/me/projects",
        label: "프로젝트 & 문서",
        icon: FolderBookmark,
    },
    {
        href: "/me/account",
        label: "개인정보 설정",
        icon: IdCard,
    },
]

function MeSidebar() {
    const pathname = usePathname()

    return (
        <aside className="flex h-full w-72 min-w-72 shrink-0 flex-col gap-4 rounded-md bg-card/50 p-4">
            <div className="flex items-center gap-2">
                <Avatar className="rounded-md">
                    <AvatarImage src="https://github.com/kakao.png" alt="@PROFILE" className="rounded-md" />
                    <AvatarFallback className="rounded-md">AP</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-semibold">마이페이지</span>
                    <span className="text-xs text-muted-foreground">내 프로젝트와 계정 관리</span>
                </div>
            </div>
            <Separator />
            <nav aria-label="마이페이지 메뉴" className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">내 공간</span>
                {navigationItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href || pathname.startsWith(`${href}/`)

                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                                buttonVariants({
                                    variant: isActive ? "default" : "ghost",
                                    className: "h-9 w-full justify-start px-3 active:translate-y-0",
                                })
                            )}
                        >
                            <Icon />
                            {label}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}

export default MeSidebar
