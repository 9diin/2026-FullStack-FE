"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BadgeCheck, LogOut } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui"
import { clearAccessTokenCookie } from "@/services/auth/session"
import { getUserProfile } from "@/services/user/profile"
import { clearAuthAndStorage } from "@/store/auth"
import { toast } from "@/components/ui/toast"

export function AppUser({
    user,
}: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const router = useRouter()
    const [nickname, setNickname] = useState(user.name || "")

    useEffect(() => {
        let isCurrent = true

        async function loadNickname() {
            try {
                const profile = await getUserProfile()
                if (isCurrent && profile.nickname?.trim()) {
                    setNickname(profile.nickname)
                }
            } catch (error: unknown) {
                console.error("프로필 닉네임을 불러오지 못했습니다.", error)
            }
        }

        void loadNickname()
        return () => {
            isCurrent = false
        }
    }, [])

    function handleLogout() {
        // 로그아웃 API가 준비되면 이 위치에서 서버 세션/refresh token도 함께 폐기합니다.
        clearAccessTokenCookie()
        clearAuthAndStorage()
        toast.add({ title: "로그아웃되었습니다." })
        router.replace("/sign-in")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex w-fit cursor-pointer items-center gap-2 rounded-lg text-left">
                <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">AP</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side={"bottom"} align="end" sideOffset={4}>
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium text-white">{nickname || "사용자"}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/me/account")}>
                        <BadgeCheck />
                        계정 설정
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut />
                        로그아웃
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
