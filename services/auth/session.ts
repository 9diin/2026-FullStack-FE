const ACCESS_TOKEN_COOKIE = "access_token"

export function saveAccessTokenCookie(accessToken: string): void {
    if (typeof document === "undefined") {
        throw new Error("브라우저 환경에서만 인증 쿠키를 저장할 수 있습니다.")
    }

    const secure = window.location.protocol === "https:" ? "; secure" : ""
    document.cookie = `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(accessToken)}; path=/; max-age=86400; samesite=strict${secure}`
}

export function clearAccessTokenCookie(): void {
    if (typeof document === "undefined") {
        throw new Error("브라우저 환경에서만 인증 쿠키를 삭제할 수 있습니다.")
    }

    document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/; max-age=0; samesite=strict`
}
