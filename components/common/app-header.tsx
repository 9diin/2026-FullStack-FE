"use client"

import Image from "next/image"
import { Comic_Neue } from "next/font/google"
import { usePathname, useRouter } from "next/navigation"
import { Button, Tabs, TabsList, TabsTrigger } from "../ui"
import { useAuthStore } from "@/store/auth"
import { useWorkspaceStore, type WorkspaceView } from "@/store/workspace"
import { AppUser } from "./app-user"

const comicNeue = Comic_Neue({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
})

function AppHeader() {
    const router = useRouter()
    const user = useAuthStore((state) => state.user)
    const workspaceView = useWorkspaceStore((state) => state.view)
    const setWorkspaceView = useWorkspaceStore((state) => state.setView)
    const pathname = usePathname()
    const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up"
    const isMyPage = pathname === "/me" || pathname.startsWith("/me/")
    const isHomePage = pathname === "/"

    return (
        <header className="flex min-h-8 w-full items-center justify-between">
            {/* 로고 영역 */}
            <div className="flex w-72 shrink-0 cursor-pointer items-center gap-2" onClick={() => router.push("/")}>
                <Image src="/icons/logo.svg" alt="@LOGO" width={20} height={20} />
                <span className={comicNeue.className + " text-xl"}>ppoba dream 🤲🏻</span>
            </div>

            {!isAuthPage && (
                <div className="flex min-w-0 flex-1 items-center justify-between">
                    {isHomePage ? (
                        <Tabs
                            value={workspaceView}
                            onValueChange={(value) => {
                                if (value === "idea" || value === "analytics") {
                                    setWorkspaceView(value as WorkspaceView)
                                }
                            }}
                            className="pl-6"
                        >
                            <TabsList>
                                <TabsTrigger value="idea">아이디어 구조화</TabsTrigger>
                                <TabsTrigger value="analytics">사업계획서 도출</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    ) : (
                        <div />
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
