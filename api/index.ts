import axios from "axios"

// Next.js 클라이언트 환경 변수 규칙 적용 (NEXT_PUBLIC_ 필수)
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"

export const httpClient = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

// 요청 인터셉터: 인증 토큰 자동 주입
httpClient.interceptors.request.use(
    (config) => {
        // SSR 환경에서는 브라우저 쿠키에 접근할 수 없습니다.
        if (typeof window !== "undefined") {
            const accessTokenCookie = document.cookie
                .split(";")
                .map((cookie) => cookie.trim())
                .find((cookie) => cookie.startsWith("access_token="))
            const accessToken = accessTokenCookie?.slice("access_token=".length)

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 응답 인터셉터: 공통 에러 및 상태 코드 처리
httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error

        if (response) {
            switch (response.status) {
                case 401:
                    console.error("인증 정보가 만료되었거나 유효하지 않습니다.")
                    break
                case 403:
                    console.error("접근 권한이 없습니다.")
                    break
                case 500:
                    console.error("서버 내부 오류가 발생했습니다.")
                    break
                default:
                    console.error(`API 에러 [${response.status}]:`, response.data)
            }
        } else {
            console.error("네트워크 연결을 확인해주세요.", error.message)
        }

        return Promise.reject(error)
    }
)
