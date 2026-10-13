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
    // Next.js의 usePathname 훅은 현재 사용자가 위치한 경로(Pathname)의 URL 주소를 문자열로 가져오는 클라이언트 컴포넌트 전용 훅입니다.
    const pathname = usePathname() // => 현재 사용자가 위치한 경로(Pathname)의 URL 주소를 문자열로 가져옵니다.
    // 예를 들어, 사용자가 "/sign-in" 페이지에 있다면 pathname은 "/sign-in"이 되고, 메인 페이지에 있다면 "/"이 됩니다.

    // 조건부 UI 처리에 유용
    // 위 코드에서는 현재 페이지가 로그인(/sign-in)이나 회원가입(/sign-up) 페이지인지 판별(isAuthPage)하여,
    // 특정 레이아웃(예: 상단 내비게이션 바 등)을 숨기거나 다르게 보여줄 때 주로 사용됩니다.
    // 상단에 "use client"가 선언되어 있어야만 정상적으로 동작합니다.
    // Next.js의 App Router 환경에서 클라이언트 측 라우팅 변화를 실시간으로 감지할 수 있습니다.
    const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/me"
    // const isMyPage = pathname.startsWith("/me")

    return (
        <header className="flex min-h-8 w-full">
            {/* 로고 영역 */}
            <div className="flex w-72 cursor-pointer items-center gap-2" onClick={() => router.push("/")}>
                <Image src="/icons/earth.svg" alt="@LOGO" width={20} height={20} />
                <span className={comicNeue.className + " text-xl"}>I'deaverse ✨</span>
            </div>

            {!isAuthPage && (
                <div className="flex flex-1 items-center justify-between">
                    {/* 아이디어 구조화 & 사업계획서 도출 탭 영역 */}
                    <Tabs defaultValue="idea" className="pl-2">
                        <TabsList>
                            <TabsTrigger value="idea">아이디어 구조화</TabsTrigger>
                            <TabsTrigger value="biz-plan">사업계획서 도출</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    {/* 버튼 영역 */}
                    {user ? (
                        <AppUser user={user} />
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="outline">
                                <Image src="/icons/ai.svg" alt="@ICON" width={20} height={20} />
                                AI 연결
                            </Button>
                            <Button className="bg-linear-to-br from-blue-600 via-purple-500 to-pink-500 text-white" onClick={() => router.push("/sign-in")}>
                                로그인
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}

export default AppHeader
