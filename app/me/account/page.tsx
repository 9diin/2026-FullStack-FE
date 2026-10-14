"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"
import { IdCard, UserPen } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge,
    Button,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Separator,
    Skeleton,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui"
import { clearAccessTokenCookie } from "@/services/auth/session"
import { getOrCreateUserProfile, updateUserProfile, withdrawCurrentUser } from "@/services/user/profile"
import type { UserProfileRead, UserProfileUpdate } from "@/api/user"
import { clearAuthAndStorage, useAuthStore } from "@/store/auth"
import { toast } from "@/components/ui/toast"

const activityTypes = ["예비창업가", "스타트업 대표", "창업 멤버", "학생·연구자", "투자자·멘토"] as const

function AccountSkeleton() {
    return (
        <div className="flex flex-1 items-start justify-center" aria-label="프로필 불러오는 중" aria-busy="true">
            <div className="flex h-full w-100 flex-col">
                <div className="relative h-30 w-full">
                    <Skeleton className="h-full w-full rounded-t-md" />
                    <Skeleton className="absolute top-2 right-2 h-8 w-8" />
                </div>
                <div className="-mt-10 ml-4 flex flex-col gap-4">
                    <Skeleton className="h-20 w-20 rounded-md" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-7 w-40" />
                        <Skeleton className="h-4 w-20 rounded-full" />
                    </div>
                </div>
                <div className="mt-6 flex w-full flex-col gap-2 p-4">
                    <div className="flex items-center gap-1.5">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-6 w-28" />
                    </div>
                    <div className="mb-2 flex flex-col gap-1">
                        <Separator />
                        <Separator />
                    </div>
                    <FieldGroup>
                        {[0, 1, 2].map((field) => (
                            <Field key={field}>
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-8 w-full rounded-lg" />
                            </Field>
                        ))}
                        <div className="mb-2 flex flex-col gap-1">
                            <Separator />
                            <Separator />
                        </div>
                        <Skeleton className="h-8 w-full rounded-lg" />
                    </FieldGroup>
                </div>
            </div>
        </div>
    )
}

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof AxiosError) {
        const responseData: unknown = error.response?.data
        if (responseData && typeof responseData === "object") {
            if ("message" in responseData && typeof responseData.message === "string") return responseData.message
            if ("detail" in responseData && typeof responseData.detail === "string") return responseData.detail
        }
    }

    return error instanceof Error ? error.message : fallback
}

function Account() {
    const router = useRouter()
    const user = useAuthStore((state) => state.user)
    const [profile, setProfile] = useState<UserProfileRead | null>(null)
    const [nickname, setNickname] = useState("")
    const [activityType, setActivityType] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isWithdrawing, setIsWithdrawing] = useState(false)
    const [loadError, setLoadError] = useState<string | null>(null)
    const [reloadKey, setReloadKey] = useState(0)

    useEffect(() => {
        let isCurrent = true

        async function loadProfile() {
            setIsLoading(true)
            setLoadError(null)

            try {
                const loadedProfile = await getOrCreateUserProfile()
                if (!isCurrent) return
                setProfile(loadedProfile)
                setNickname(loadedProfile.nickname ?? "")
                setActivityType(loadedProfile.activity_type ?? "")
            } catch (error: unknown) {
                if (isCurrent) {
                    setLoadError(getErrorMessage(error, "프로필을 불러오지 못했습니다."))
                }
            } finally {
                if (isCurrent) setIsLoading(false)
            }
        }

        void loadProfile()
        return () => {
            isCurrent = false
        }
    }, [reloadKey])

    const canSave = nickname.trim().length > 0 && !isSaving

    if (isLoading) {
        return <AccountSkeleton />
    }

    // 취소 버튼 클릭 시, 상태값 초기화
    function cancelEditing() {
        setNickname(profile?.nickname ?? "")
        setActivityType(profile?.activity_type ?? "")
        setIsEditing(false)
    }

    async function saveProfile() {
        if (!canSave) return

        const update: UserProfileUpdate = { nickname: nickname.trim() }
        if (activityType) update.activity_type = activityType

        setIsSaving(true)
        try {
            const updatedProfile = await updateUserProfile(update)

            setProfile(updatedProfile)
            setNickname(updatedProfile.nickname ?? nickname.trim())
            setActivityType(updatedProfile.activity_type ?? activityType)
            setIsEditing(false)
            toast.add({ title: "프로필이 수정되었습니다." })
        } catch (error: unknown) {
            toast.add({ title: getErrorMessage(error, "프로필 수정 중 오류가 발생했습니다.") })
        } finally {
            setIsSaving(false)
        }
    }

    async function withdrawUser() {
        setIsWithdrawing(true)
        try {
            await withdrawCurrentUser()
            clearAccessTokenCookie()
            clearAuthAndStorage()
            toast.add({ title: "회원 탈퇴가 완료되었습니다." })
            router.replace("/sign-in")
        } catch (error: unknown) {
            toast.add({ title: getErrorMessage(error, "회원 탈퇴 중 오류가 발생했습니다.") })
        } finally {
            setIsWithdrawing(false)
        }
    }

    return (
        <div className="flex flex-1 items-start justify-center">
            <div className="flex h-full w-100 flex-col">
                <div className="relative h-30 w-full rounded-t-md bg-[url('/images/sample-001.png')] bg-cover bg-center">
                    {isEditing ? (
                        <div className="absolute top-2 right-2 flex gap-2">
                            <Button type="button" variant="secondary" onClick={cancelEditing}>
                                취소
                            </Button>
                            <Button type="button" onClick={() => void saveProfile()} disabled={!canSave}>
                                {isSaving ? "저장 중..." : "저장"}
                            </Button>
                        </div>
                    ) : (
                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={() => setIsEditing(true)}
                                        aria-label="프로필 편집"
                                        disabled={isLoading || Boolean(loadError)}
                                    />
                                }
                            >
                                <UserPen />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>프로필 편집</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>
                <div className="-mt-10 ml-4 flex flex-col gap-4">
                    <Avatar className="h-20 w-20 rounded-md">
                        <AvatarImage src="https://github.com/daffy3.png" alt="프로필 이미지" className="rounded-md" />
                        <AvatarFallback className="rounded-md">IA</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">{isLoading ? "불러오는 중..." : nickname || "닉네임을 설정해주세요"}</span>
                        <Badge className="border border-violet-900/50 bg-violet-900/50 text-[10px] text-violet-500">
                            {profile?.activity_type || "활동 유형 미설정"}
                        </Badge>
                    </div>
                </div>
                <div className="mt-6 flex w-full flex-col gap-2 p-4">
                    <div className="flex items-center gap-1.5">
                        <IdCard size={20} />
                        <span className="text-base font-medium">개인정보 설정</span>
                    </div>
                    <div className="mb-2 flex flex-col gap-1">
                        <Separator />
                        <Separator />
                    </div>
                    {loadError ? (
                        <div className="flex flex-col gap-3 text-sm text-destructive">
                            <p>{loadError}</p>
                            <Button type="button" variant="outline" onClick={() => setReloadKey((key) => key + 1)}>
                                다시 시도
                            </Button>
                        </div>
                    ) : (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="nickname">닉네임</FieldLabel>
                                <Input
                                    id="nickname"
                                    type="text"
                                    required
                                    placeholder="닉네임을 입력하세요."
                                    value={nickname}
                                    onChange={(event) => setNickname(event.target.value)}
                                    disabled={!isEditing || isLoading}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">이메일</FieldLabel>
                                <Input id="email" type="email" value={user?.email ?? ""} disabled />
                            </Field>
                            <Field>
                                <FieldLabel>활동 유형</FieldLabel>
                                <Select value={activityType || null} onValueChange={(value) => setActivityType(value ?? "")}>
                                    <SelectTrigger className="w-full" disabled={!isEditing || isLoading}>
                                        <SelectValue placeholder="활동 유형을 선택하세요." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {activityTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                            <div className="mb-2 flex flex-col gap-1">
                                <Separator />
                                <Separator />
                            </div>
                            <Field>
                                <AlertDialog>
                                    <AlertDialogTrigger
                                        disabled={isEditing || isLoading || isWithdrawing}
                                        render={
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                className="border-destructive/40 font-medium"
                                                disabled={isEditing || isLoading || isWithdrawing}
                                            >
                                                회원탈퇴
                                            </Button>
                                        }
                                    />
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>정말 회원 탈퇴하시겠어요?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                회원 탈퇴 후에는 계정에 다시 로그인할 수 없습니다. 탈퇴를 진행하시겠습니까?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>취소</AlertDialogCancel>
                                            <AlertDialogAction
                                                variant="destructive"
                                                className="border-destructive/40"
                                                onClick={() => void withdrawUser()}
                                                disabled={isWithdrawing}
                                            >
                                                {isWithdrawing ? "탈퇴 중..." : "회원 탈퇴"}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </Field>
                        </FieldGroup>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Account
