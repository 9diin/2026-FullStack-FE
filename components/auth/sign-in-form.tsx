"use client"

import { useRouter } from "next/navigation"
import { useState, type SubmitEvent } from "react"
import { useAuthStore } from "@/store/auth"

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Field, FieldDescription, FieldGroup, FieldLabel, Input } from "@/components/ui"
import { signIn } from "@/api/auth"
import { saveAccessTokenCookie } from "@/services/auth/session"
import { toast } from "../ui/toast"

function SignInForm() {
    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Zustand 스토어에서 유저 정보 저장 함수 가져오기
    const setUser = useAuthStore((state) => state.setUser)

    // 로그인 폼 제출 핸들러
    // 필수 조건을 재검증한 뒤 API 비동기 가입을 실행
    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault() // 기본 폼 제출 새로고침 방지
        setIsLoading(true)

        try {
            const res = await signIn({ email, password })

            console.log(res)

            // [Zustand]와 [로컬 스토리지] 사용에 대한 가이드라인

            // 1. 로그인 토큰(열쇠)는 어디에 보관해야 할까요? (로컬 스토리지 vs 쿠키)
            // 로그인에 성공하면 백엔드 서버는 우리에게 "디지털 입장권(토큰)"을 줍니다.
            // 앞으로 서버에 요청할 때마다 "저 로그인한 사람이에요!"하고 이 입장권을 보여줘야 하죠.
            // 여기서의 문제는 이 입장권을 어디에 보관하여 필요할 때마다 꺼내쓰느냐 입니다.

            // ① 로컬 스토리지 (Local Storage)란?
            // 비유하자면: 브라우저가 제공하는 '내 방의 투명 서랍장'입니다.
            // 특징: 자바스크립트 코드로 넣고 빼기가 너무 쉬워서 초보 개발자들 사이에서 인기가 많습니다. (예: localStorage.setItem('token', '...'))
            // 문제점 (XSS 취약점): 웹사이트에 악성 코드가 들어오거나 해킹을 당하면, 해커가 이 투명 서랍장을 슥 열어서 내 입장권을 훔쳐갈 수 있습니다.
            // 내 입장권을 훔쳐 가면 해커가 나인 척 하고 내 계정으로 로그인할 수 있게 됩니다.

            // ② HttpOnly 쿠키란?
            // 비유하자면: 은행 지점의 '철통 보안 금고'입니다.
            // 특징: 브라우저의 자바스크립트 코드로는 이 금고를 열거나 볼 수조차 없습니다. 오직 브라우저와 서버가 알아서 주고받을 뿐입니다.
            // 장점: 해커가 웹사이트에 악성 코드를 심어놔도 입장권을 훔쳐 갈 수 없어서 훨씬 안전합니다.

            // 토이 프로젝트나 혼자 공부하는 용도라면 편하게 로컬 스토리지를 쓰거나 아까 본 zustand/middleware의 persist 기능을 써도 크게 문제없습니다.
            // 하지만 나중에 실제 사용자가 쓰는 서비스를 만든다면 쿠키 방식을 공부하는 것이 안전합니다.

            // 2. 꼭 Zustand를 써야 하나요?
            // 결론부터 말씀드리면, 꼭 써야 하는 것은 아닙니다. 하지만 쓰면 로그인 후의 화면 관리가 엄청나게 편해집니다.

            // ① Zustand가 없는 상황의 불편함:
            // Next.js로 웹사이트를 만들면 화면이 수많은 조각(컴포넌트)들로 나뉩니다.
            // 예를 들어 맨 위에는 '네비게이션 바', 중간에는 '로그인 폼', 오른쪽에는 '마이페이지'가 각각 따로 존재합니다.
            // 만약 사용자가 '로그인 폼'에서 로그인을 성공했을 때, 멀리 떨어져 있는 '네비게이션 바'의 "로그인" 글자를 "홍길동님 환영합니다!"로 바꿔야 합니다.
            // 리액트에서는 보통 부모가 자식에게 데이터를 계속 넘겨주는 방식(Props Drilling)을 써야 하는데, 컴포넌트 거리가 멀어지면 코드가 매우 지저분해지고 복잡해집니다.

            // ② Zustand를 쓰는 이유:
            // 비유하자면: Zustand는 우리 집 거실 벽에 걸어둔 '공용 화이트보드'입니다.
            // '로그인 폼'에서 로그인이 성공하면, 화이트보드에 크게 적어둡니다: [현재 로그인한 사람: 홍길동]
            // 그러면 '네비게이션 바'도, '마이페이지'도, 사이드바도 굳이 복잡하게 데이터를 전달받을 필요 없이, 그냥 거실 화이트보드만 힐끗 쳐다보고 "아, 지금 홍길동님이 로그인했구나!" 하고 즉시 알아차릴 수 있습니다.
            // 리액트에는 원래 Context API 같은 비슷한 기능도 있지만 설정이 복잡한 반면, Zustand는 코드 몇 줄만 쓰면 이 화이트보드를 아주 가볍고 쉽게 만들 수 있어서 널리 쓰입니다.

            // 3. Next.js App Router 환경에서의 활용 방안 (서버 컴포넌트와 클라이언트 컴포넌트의 역할 분담)
            // Next.js App Router는 서버 측에서 미리 HTML을 렌더링하는 '서버 컴포넌트(Server Component)'와
            // 브라우저에서 동적으로 작동하는 '클라이언트 컴포넌트(Client Component)'가 공존하는 구조입니다.
            // 이 아키텍처에서 인증과 상태를 관리할 때 서버와 클라이언트의 경계를 이해하고 역할을 나누어야 합니다.

            // ① 서버 컴포넌트와 클라이언트 컴포넌트의 이해:
            // - 서버 컴포넌트: 브라우저로 코드가 내려가지 않고 서버 환경에서 실행되어 완성된 HTML을 생성합니다. 클라이언트 메모리에 있는 상태(Zustand 등)를 접근할 수 없습니다.
            // - 클라이언트 컴포넌트 ("use client"): 브라우저 메모리에 로드되어 이벤트 처리, 훅 사용, 전역 상태 관리(Zustand) 등 동적인 인터랙션을 수행합니다.

            // ② 하이드레이션 에러(Hydration Mismatch) 발생 원인:
            // - 서버 컴포넌트가 렌더링한 초기 HTML 결과물과, 브라우저가 켜진 직후 클라이언트 컴포넌트(Zustand 등)의 상태가 달라 UI 구조가 어긋날 경우
            //   Next.js는 불일치 에러를 발생시키거나 화면 깜빡임(Flicker) 현상을 유발합니다.

            // ③ 최적의 아키텍처 설계 방안 (쿠키/미들웨어 + Zustand 분리):
            // - 인증 및 라우팅 제어 (서버 측): HttpOnly 쿠키에 토큰을 저장하고, 'middleware.ts'(Edge Runtime)를 통해
            //   페이지 진입 전 서버 레벨에서 유효성을 검사하여 권한 없는 접근을 원천 차단합니다.
            // - UI 상태 동기화 (클라이언트 측): 서버 컴포넌트가 쿠키를 기반으로 초기 인증 여부를 판단해 기본적인 레이아웃을 잡고,
            //   로그인 이후의 세부적인 사용자 정보 및 브라우저 내 인터랙션 상태는 Zustand를 통해 클라이언트 컴포넌트 간에 공유합니다.

            console.log("로그인 성공 응답:", res)

            // 백엔드 API 응답 구조에 맞춰 성공 상태 코드 확인 (일반적으로 200 또는 201)
            if (res.status === 200 || res.status === 201) {
                // [가이드라인 3번 반영]
                // 토큰은 백엔드가 HttpOnly 쿠키로 설정해주었다고 가정하고,
                // 브라우저 UI 동기화(예: 유저 이름 표시)를 위해 필요한 유저 정보만 Zustand 스토어에 반영합니다.
                // setUser(res.data.user)

                const { access_token, user } = res // 백엔드가 넘겨준 토큰과 유저 정보 구조라 가정
                // [보안/미들웨어용] 토큰을 쿠키에 저장
                // 만약 백엔드가 쿠키를 자동으로 심어주지 않는다면, 프론트엔드에서 아래와 같이 쿠키에 저장합니다.
                // (실무에서는 백엔드가 Set-Cookie로 HttpOnly 쿠키를 내려주는 것이 가장 안전합니다.)
                saveAccessTokenCookie(access_token)

                // 만약 'js-cookie'를 쓴다면:
                // Cookies.set("access_token", access_token, { expires: 1, secure: true, sameSite: "strict" })

                // 2. [UI 동기화용] 유저 정보를 Zustand 스토어에 저장
                setUser(user) 

                toast.add({
                    title: res.message || "로그인에 성공했습니다.",
                    type: "success",
                })

                // 3. 페이지 이동 및 서버 컴포넌트 갱신
                router.push("/")
                router.refresh()
            }
        } catch (error: any) {
            console.error("로그인 실패:", error)

            // [가이드라인 4번 반영] 백엔드 에러 메시지 우선 노출 (없을 경우 기본 메시지)
            const errorMessage = error.response?.data?.message || error.message || "로그인 중 오류가 발생했습니다."

            toast.add({
                title: errorMessage,
                type: "error",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold">로그인</CardTitle>
                <CardDescription>비즈니스의 시작점, 로그인하고 아이디어를 펼쳐보세요.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">이메일</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="이메일을 입력하세요."
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </Field>
                        <Field>
                            <div className="flex items-center">
                                <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                                <a href="#" className="ml-auto inline-block underline-offset-4 hover:underline">
                                    비밀번호를 잊으셨나요?
                                </a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="비밀번호를 입력하세요."
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </Field>
                        <Field>
                            <Button type="submit" className="bg-linear-to-br from-blue-600 via-purple-500 to-pink-500 font-medium text-white">
                                {isLoading ? "로그인 중..." : "로그인"}
                            </Button>
                            <Button variant="outline" type="button">
                                Google로 로그인
                            </Button>
                            <FieldDescription className="text-center">
                                계정이 없으신가요? <a href="/sign-up">가입하기</a>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

export default SignInForm
