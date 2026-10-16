// 회원가입 요청 파라미터 타입
export interface SignUpRequest {
    email: string
    password: string
    terms_agreed: boolean
    privacy_agreed: boolean
    marketing_agreed: boolean
}

export interface SignInRequest {
    email: string
    password: string
}

export interface SignInUser {
    id: number
    email: string
    name: string
    avatar: string
}

export interface SignInResponse {
    access_token: string
    user?: SignInUser
    message?: string
}

export interface SignUpResponse {
    message?: string
}
