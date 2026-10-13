// NEXT.js에서 서버 측에서 요청을 제어(응답/리다이렉트)하기 위한 도구를 가져옵니다.
import { NextResponse } from "next/server"
// 타입스크립트에서 사용자의 요청(Request) 데이터 타입을 안전하게 다루기 위해 가져옵니다.
import { NextRequest } from "next/server"

// [프록시(Proxy) 함수]
// 사용자가 웹사이트의 특정 페이지에 접속하려고 할 때, 페이지가 열리기도 전에
// 가장 먼저 요청을 가로채어 로그인 상태를 검사하고 출입을 통제하는 "정문 보안요원" 역할입니다.
export function proxy(request: NextRequest) {
    // 1. 현재 사용자가 접속하려고 시도하는 주소의 경로(Path)를 추출합니다. (예: "/sign-in", "/", "/sign-up")
    const { pathname } = request.nextUrl

    // 2. 브라우저 쿠키에 저장되어 있는 로그인 열쇠(access_token)를 가져옵니다.
    // 토큰이 존재하면 로그인된 상태, 존재하지 않거나 비어있으면 비로그인 상태로 판단합니다.
    const token = request.cookies.get("access_token")?.value

    // 3. 이미 로그인한 사용자가 절대 접근해서는 안 되는 페이지(로그인, 회원가입 페이지 등) 목록을 정의합니다.
    const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up"

    // [기능 A: 로그인된 유저의 로그인/회원가입 페이지 접근 차단]
    // 사용자가 이미 로그인(토큰 있음)을 했는데, 실수로 주소창에 '/sign-in' 등을 입력해 들어오려고 할 때 작동합니다.
    if (token && isAuthPage) {
        // 페이지를 보여주지 않고 메인 페이지("/")로 곧바로 쫓아냅니다. (리다이렉트)
        return NextResponse.redirect(new URL("/", request.url))
    }

    // [기능 B: 비로그인 유저의 보호된 페이지 접근 차단 (필요시 활성화)]
    // 반대로, 로그인을 반드시 해야만 들어갈 수 있는 페이지(마이페이지 등)을 보호하고 싶을 때 사용합니다.
    const isProtectedPage = pathname.startsWith("/users") || pathname.startsWith("/dashboard")

    if (!token && isProtectedPage) {
        // 로그인을 안 한 상태라면, 로그인 페이지("/sign-in")로 튕겨냅니다.
        return NextResponse.redirect(new URL("/sign-in", request.url))
    }

    // 4. 위의 차단 조건에 해당하지 않는다면, 아무런 제재 없이 원래 가려던 페이지로 정상 통과시킵니다.
    return NextResponse.next()
}

// [프록시 작동 범위 설정 (matcher)]
// 웹사이트의 모든 페이지를 일일이 감시하면 서버 성능이 떨어지므로,
// 보안 검문이 꼭 필요한 특정 주소 경로에서만 이 proxy 함수가 실행되도록 범위를 제한합니다.
export const config = {
    matcher: ["/sign-in", "/sign-up", "/users/:path*", "/dashboard/:path*"],
}
