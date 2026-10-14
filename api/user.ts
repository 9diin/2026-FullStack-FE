import { httpClient } from "."

export interface UserProfileRead {
    id?: number
    nickname?: string | null
    activity_type?: string | null
}

export interface UserProfileCreate {
    nickname: string
    activity_type: string
}

export type UserProfileUpdate = Partial<UserProfileCreate>

const PROFILE_URL = "/api/v1/user/profile"

export const getProfile = async (): Promise<UserProfileRead> => {
    const res = await httpClient.get<UserProfileRead>(PROFILE_URL)
    return res.data
}

export const createProfile = async (body: UserProfileCreate): Promise<UserProfileRead> => {
    const res = await httpClient.post<UserProfileRead>(PROFILE_URL, body)
    return res.data
}

export const updateProfile = async (body: UserProfileUpdate): Promise<UserProfileRead> => {
    const res = await httpClient.patch<UserProfileRead>(PROFILE_URL, body)
    return res.data
}

export const withdrawUser = async (): Promise<void> => {
    await httpClient.delete("/api/v1/user")
}
