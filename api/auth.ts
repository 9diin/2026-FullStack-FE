import { AxiosError } from "axios"
import { httpClient } from "."
import type { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "@/types/auth"

// 회원가입
export const signUp = async (params: SignUpRequest): Promise<SignUpResponse> => {
    try {
        const res = await httpClient.post<SignUpResponse>("/api/v1/auth/sign-up", params)
        return res.data
    } catch (error: unknown) {
        // 에러 발생 시, 컴포넌트에서 처리할 수 있도록 throw
        if (error instanceof AxiosError) {
            throw error.response?.data || { message: "회원가입 중 오류가 발생했습니다." }
        }
        throw { message: "회원가입 중 오류가 발생했습니다." }
    }
}

// 로그인
export const signIn = async (params: SignInRequest): Promise<SignInResponse> => {
    try {
        const res = await httpClient.post<SignInResponse>("/api/v1/auth/sign-in", params)
        if (typeof res.data?.access_token !== "string" || res.data.access_token.trim().length === 0) {
            throw new Error("로그인 응답에 유효한 access_token이 없습니다.")
        }
        return res.data
    } catch (error: unknown) {
        // 에러 발생 시, 컴포넌트에서 처리할 수 있도록 throw
        if (error instanceof AxiosError) {
            throw error.response?.data || { message: "로그인 중 오류가 발생했습니다." }
        }
        throw error
    }
}
