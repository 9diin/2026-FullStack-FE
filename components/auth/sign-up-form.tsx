"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Checkbox,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Input,
    Separator,
} from "@/components/ui"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "../ui/toast"
import { signIn, signUp } from "@/api/auth"
import { sendEmailVerification, verifyEmailCode } from "@/api/email-verification"
import { saveAccessTokenCookie } from "@/services/auth/session"
import { createSignupUserProfile } from "@/services/user/profile"
import { useAuthStore } from "@/store/auth"

function SignUpForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const setUser = useAuthStore((state) => state.setUser)

    const [email, setEmail] = useState<string>("")
    const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [authCode, setAuthCode] = useState<string>("") // 인증번호
    const [isSendingCode, setIsSendingCode] = useState(false)
    const [isVerifyingCode, setIsVerifyingCode] = useState(false)
    const [hasSentCode, setHasSentCode] = useState(false)

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false)

    const [termsAgreed, setTermsAgreed] = useState<boolean>(false) // 서비스 이용약관 동의
    const [privacyAgreed, setPrivacyAgreed] = useState<boolean>(false) // 개인정보 처리방침 동의
    const [marketingAgreed, setMarketingAgreed] = useState<boolean>(false) // 마케팅 광고 수신 동의

    // 입력 형식과 필수 약관 동의 여부를 계산해 가입 기능 여부를 결정
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)
    const doPasswordMatch = password === confirmPassword && confirmPassword.length > 2
    const areRequiredTermsAgreed = termsAgreed && privacyAgreed
    const areAllAgreed = termsAgreed && privacyAgreed && marketingAgreed
    const isEmailVerified = verifiedEmail === email.trim()
    const canSubmit = isEmailValid && isEmailVerified && isPasswordValid && doPasswordMatch && areRequiredTermsAgreed

    async function handleSendVerificationCode() {
        if (!isEmailValid || isSendingCode) return

        setIsSendingCode(true)
        try {
            const result = await sendEmailVerification(email.trim())
            setHasSentCode(true)
            setAuthCode("")
            setVerifiedEmail(null)
            toast.add({ title: result.message || "인증번호를 발송했습니다.", type: "info" })
        } catch (error: unknown) {
            toast.add({ title: getErrorMessage(error, "인증번호 발송에 실패했습니다."), type: "error" })
        } finally {
            setIsSendingCode(false)
        }
    }

    async function handleVerifyEmailCode() {
        const code = authCode.trim()
        if (!hasSentCode || !code || isVerifyingCode) return

        setIsVerifyingCode(true)
        try {
            const result = await verifyEmailCode(email.trim(), code)
            if (!result.verified) {
                toast.add({ title: result.message || "인증번호를 확인해 주세요.", type: "warning" })
                return
            }

            setVerifiedEmail(email.trim())
            toast.add({ title: result.message || "이메일 인증이 완료되었습니다.", type: "success" })
        } catch (error: unknown) {
            toast.add({ title: getErrorMessage(error, "인증번호 확인에 실패했습니다."), type: "error" })
        } finally {
            setIsVerifyingCode(false)
        }
    }

    function getErrorMessage(error: unknown, fallback: string): string {
        if (
            error &&
            typeof error === "object" &&
            "response" in error &&
            error.response &&
            typeof error.response === "object" &&
            "data" in error.response &&
            error.response.data &&
            typeof error.response.data === "object"
        ) {
            const responseData = error.response.data
            if ("message" in responseData && typeof responseData.message === "string") {
                return responseData.message
            }
            if ("detail" in responseData && typeof responseData.detail === "string") {
                return responseData.detail
            }
        }

        return error instanceof Error ? error.message : fallback
    }

    function handleEmailChange(value: string) {
        setEmail(value)
        setAuthCode("")
        setHasSentCode(false)
        setVerifiedEmail(null)
    }

    // 필수 조건을 재검증한 뒤 API 비동기 가입을 실행
    const handleSubmit = async () => {
        if (!canSubmit) {
            toast.add({
                title: "입력 정보를 확인하고 필수 약관에 동의해 주세요.",
                type: "warning",
            })
            return
        }
        setIsLoading(true)

        try {
            const res = await signUp({
                email: email.trim(),
                password,
                terms_agreed: termsAgreed,
                privacy_agreed: privacyAgreed,
                marketing_agreed: marketingAgreed,
            })

            if (res.status === 201) {
                const loginResponse = await signIn({ email: email.trim(), password })
                if (typeof loginResponse.access_token !== "string" || !loginResponse.access_token) {
                    throw new Error("로그인 토큰을 확인할 수 없습니다.")
                }

                saveAccessTokenCookie(loginResponse.access_token)
                if (loginResponse.user) {
                    setUser(loginResponse.user)
                }
                try {
                    await createSignupUserProfile()
                } catch (error: unknown) {
                    console.error("프로필 생성 실패:", error)
                    toast.add({
                        title: "회원가입과 로그인은 완료했지만 프로필 생성에 실패했습니다. 계정 페이지에서 다시 시도해 주세요.",
                        type: "warning",
                    })
                    router.push("/me/account")
                    return
                }

                toast.add({
                    title: res.message || "회원가입과 프로필 생성이 완료되었습니다.",
                    type: "success",
                })
                router.push("/")
            }
        } catch (error: any) {
            console.error("회원가입 실패:", error)

            toast.add({
                title: error.response?.data?.message || error.message || "회원가입 중 오류가 발생했습니다.",
                type: "error",
            })
        } finally {
            // 5. 성공하든 실패하든 로딩 상태 해제
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold">회원가입</CardTitle>
                <CardDescription>비즈니스의 시작점, 회원가입하고 아이디어를 펼쳐보세요.</CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        void handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">이메일</FieldLabel>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="이메일을 입력하세요."
                                    value={email}
                                    onChange={(event) => handleEmailChange(event.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="text-neutral-400"
                                    onClick={() => void handleSendVerificationCode()}
                                    disabled={!isEmailValid || isSendingCode}
                                >
                                    {isSendingCode ? "발송 중..." : hasSentCode ? "재발송" : "인증번호 발송"}
                                </Button>
                            </div>
                            {!isEmailValid && email.length > 0 && <span className="text-xs text-destructive">올바른 이메일 형식을 입력해주세요.</span>}
                            {isEmailVerified && <span className="text-xs text-green-500">이메일 인증이 완료되었습니다.</span>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="verification-code">인증번호</FieldLabel>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="verification-code"
                                    type="password"
                                    placeholder="인증번호를 입력하세요."
                                    value={authCode}
                                    onChange={(event) => {
                                        setAuthCode(event.target.value)
                                        setVerifiedEmail(null)
                                    }}
                                    required
                                    disabled={!hasSentCode || isEmailVerified}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="text-neutral-400"
                                    onClick={() => void handleVerifyEmailCode()}
                                    disabled={!hasSentCode || !authCode.trim() || isVerifyingCode || isEmailVerified}
                                >
                                    {isVerifyingCode ? "확인 중..." : isEmailVerified ? "인증 완료" : "인증번호 확인"}
                                </Button>
                            </div>
                            {!hasSentCode && <span className="text-xs text-muted-foreground">먼저 이메일로 인증번호를 발송해 주세요.</span>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={isPasswordVisible ? "text" : "password"}
                                    required
                                    placeholder="비밀번호를 입력하세요."
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className="absolute top-1/2 right-1 -translate-y-1/2 text-neutral-400"
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                >
                                    {isPasswordVisible ? <EyeOff /> : <Eye />}
                                </Button>
                            </div>
                            {!isPasswordValid && <span className="text-xs text-destructive">영문과 숫자를 포함해 8자 이상 입력해 주세요.</span>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">비밀번호 확인</FieldLabel>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={isConfirmPasswordVisible ? "text" : "password"}
                                    required
                                    placeholder="비밀번호를 한 번 더 입력하세요."
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event?.target.value)}
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className="absolute top-1/2 right-1 -translate-y-1/2 text-neutral-400"
                                    onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                >
                                    {isConfirmPasswordVisible ? <EyeOff /> : <Eye />}
                                </Button>
                            </div>
                            {!doPasswordMatch && <span className="text-xs text-destructive">비밀번호가 일치하지 않습니다.</span>}
                        </Field>
                        <div className="mb-2 flex flex-col gap-1">
                            <Separator />
                            <Separator />
                        </div>
                        <Field className="relative">
                            <FieldLabel
                                htmlFor="password"
                                className="absolute -top-3 left-3 flex w-16! items-center justify-center rounded-sm bg-card px-1 py-0.5"
                            >
                                약관 동의
                            </FieldLabel>
                            <div className="rounded-md border p-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="agree-all"
                                        checked={areAllAgreed}
                                        onCheckedChange={(checked) => {
                                            setTermsAgreed(checked)
                                            setPrivacyAgreed(checked)
                                            setMarketingAgreed(checked)
                                        }}
                                    />
                                    <label htmlFor="agree-all">전체 동의</label>
                                </div>
                                <Separator className="my-3" />
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="agree-terms" checked={termsAgreed} onCheckedChange={setTermsAgreed} />
                                        <div className="flex items-center gap-1">
                                            <span className="text-neutral-400">(필수)</span>
                                            <label htmlFor="agree-terms">서비스 이용약관 동의</label>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="agree-privacy" checked={privacyAgreed} onCheckedChange={setPrivacyAgreed} />
                                        <div className="flex items-center gap-1">
                                            <span className="text-neutral-400">(필수)</span>
                                            <label htmlFor="agree-privacy">개인정보 처리방침 동의</label>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="agree-marketing" checked={marketingAgreed} onCheckedChange={setMarketingAgreed} />
                                        <div className="flex items-center gap-1">
                                            <span className="text-neutral-400">(선택)</span>
                                            <label htmlFor="agree-marketing">마케팅 정보 수신 동의</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Field>
                        <Field>
                            <Button
                                type="submit"
                                disabled={!canSubmit || isLoading}
                                className="bg-linear-to-br from-blue-600 via-purple-500 to-pink-500 font-medium text-white"
                            >
                                회원가입
                            </Button>
                            <FieldDescription className="text-center">
                                이미 계정이 있으신가요? <a href="/sign-in">로그인</a>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

export default SignUpForm
