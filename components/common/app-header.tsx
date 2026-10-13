"use client"

import Image from "next/image"
import { Comic_Neue } from "next/font/google"
import { usePathname, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger, Button } from "../ui"
import { useAuthStore } from "@/store/auth"
import { AppUser } from "./app-user"

const comicNeue = Comic_Neue({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
})

function AppHeader() {
    const router = useRouter()
    const user = useAuthStore((state) => state.user)
    const pathname = usePathname()
    const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up"
    const isMyPage = pathname === "/me" || pathname.startsWith("/me/")

    return (
        <header className="flex min-h-8 w-full">
            {/* 로고 영역 */}
            <div className="flex w-72 cursor-pointer items-center gap-2" onClick={() => router.push("/")}>
                <Image src="/icons/earth.svg" alt="@LOGO" width={20} height={20} />
                <span className={comicNeue.className + " text-xl"}>I'deaverse ✨</span>
            </div>

            {!isAuthPage && (
                <div className="flex flex-1 items-center justify-between">
                    {!isMyPage && (
                        <Tabs defaultValue="idea" className="pl-2">
                            <TabsList>
                                <TabsTrigger value="idea">아이디어 구조화</TabsTrigger>
                                <TabsTrigger value="biz-plan">사업계획서 도출</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    )}
                    {user ? (
                        <AppUser user={user} />
                    ) : !isMyPage ? (
                        <div className="flex items-center gap-2">
                            <Button variant="outline">
                                <Image src="/icons/ai.svg" alt="@ICON" width={20} height={20} />
                                AI 연결
                            </Button>
                            <Button className="bg-linear-to-br from-blue-600 via-purple-500 to-pink-500 text-white" onClick={() => router.push("/sign-in")}>
                                로그인
                            </Button>
                        </div>
                    ) : null}
                </div>
            )}
        </header>
    )
}

export default AppHeader
