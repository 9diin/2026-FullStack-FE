import { httpClient } from "."

export interface EmailVerificationSendRequest {
    email: string
}

export interface EmailVerificationCheckRequest extends EmailVerificationSendRequest {
    code: string
}

export interface EmailVerificationResult {
    message: string
    verified: boolean
}

export async function sendEmailVerification(email: string): Promise<EmailVerificationResult> {
    const response = await httpClient.post<EmailVerificationResult>("/api/v1/auth/email-verification/send", { email })
    return response.data
}

export async function verifyEmailCode(email: string, code: string): Promise<EmailVerificationResult> {
    const response = await httpClient.post<EmailVerificationResult>("/api/v1/auth/email-verification/verify", {
        email,
        code,
    })
    return response.data
}
