import { AxiosError } from "axios"

import { createProfile, getProfile, updateProfile, withdrawUser, type UserProfileCreate, type UserProfileRead, type UserProfileUpdate } from "@/api/user"

const defaultNicknames = [
    "아이디어 씨앗 수집가",
    "번뜩이는 생각 요정",
    "문제 해결 문어",
    "상상력 충전 중",
    "내일의 창업 고양이",
    "반짝이는 기획 다람쥐",
    "세상을 바꿀지도 몰라",
]

export function createDefaultUserProfile(): UserProfileCreate {
    const nickname = defaultNicknames[Math.floor(Math.random() * defaultNicknames.length)]

    return {
        nickname,
        activity_type: "예비창업가",
    }
}

export async function createUserProfile(profile: UserProfileCreate = createDefaultUserProfile()): Promise<UserProfileRead> {
    try {
        return await createProfile(profile)
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 409) {
            return getProfile()
        }

        throw error
    }
}

export async function createSignupUserProfile(): Promise<UserProfileRead> {
    const profile = createDefaultUserProfile()

    try {
        return await createProfile(profile)
    } catch (error: unknown) {
        if (!(error instanceof AxiosError) || error.response?.status !== 409) {
            throw error
        }

        await getProfile()
        return updateProfile({ nickname: profile.nickname })
    }
}

export const getUserProfile = (): Promise<UserProfileRead> => getProfile()

async function replaceLegacyNickname(profile: UserProfileRead): Promise<UserProfileRead> {
    if (profile.nickname?.trim() && profile.nickname !== "아이디어 탐험가") {
        return profile
    }

    return updateProfile({ nickname: createDefaultUserProfile().nickname })
}

let missingProfileCreation: Promise<UserProfileRead> | null = null

export async function getOrCreateUserProfile(): Promise<UserProfileRead> {
    try {
        return await replaceLegacyNickname(await getProfile())
    } catch (error: unknown) {
        if (!(error instanceof AxiosError) || error.response?.status !== 404) {
            throw error
        }

        if (!missingProfileCreation) {
            missingProfileCreation = createUserProfile().finally(() => {
                missingProfileCreation = null
            })
        }

        return replaceLegacyNickname(await missingProfileCreation)
    }
}

export const updateUserProfile = (profile: UserProfileUpdate): Promise<UserProfileRead> => updateProfile(profile)

export const withdrawCurrentUser = (): Promise<void> => withdrawUser()
