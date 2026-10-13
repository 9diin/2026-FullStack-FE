"use client"

import { useState } from "react"
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
    Separator,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui"
import { Eye, EyeOff, IdCard, UserPen } from "lucide-react"

const userRoles = ["예비창업가", "스타트업 대표", "창업 멤버", "학생·연구자", "투자자·멘토"] as const
type UserRole = (typeof userRoles)[number]

function isUserRole(value: string | null): value is UserRole {
    return userRoles.some((role) => role === value)
}

function Account() {
    const [nickname, setNickname] = useState<string>("방배동 레버리지 Park")
    const [email, setEmail] = useState<string>("9diin@gmail.com")
    const [password, setPassword] = useState<string>("")
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [savedNickname, setSavedNickname] = useState<string>("방배동 레버리지 Park")
    const [role, setRole] = useState<UserRole>("예비창업가")
    const [savedRole, setSavedRole] = useState<UserRole>("예비창업가")

    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)
    const canSave = nickname.trim().length > 0 && (!password || isPasswordValid)

    function handleCancelEditing() {
        setNickname(savedNickname)
        setRole(savedRole)
        setPassword("")
        setIsPasswordVisible(false)
        setIsEditing(false)
    }

    function handleSaveProfile() {
        if (!canSave) return

        const updatedNickname = nickname.trim()
        setNickname(updatedNickname)
        setSavedNickname(updatedNickname)
        setSavedRole(role)
        setPassword("")
        setIsPasswordVisible(false)
        setIsEditing(false)
    }

    return (
        <div className="flex flex-1 items-start justify-center">
            <div className="flex h-full w-100 flex-col">
                <div className="relative h-30 w-full rounded-t-md bg-[url('/images/sample-001.png')] bg-cover bg-center">
                    {isEditing ? (
                        <div className="absolute top-2 right-2 flex gap-2">
                            <Button type="button" variant="secondary" onClick={handleCancelEditing}>
                                취소
                            </Button>
                            <Button type="button" onClick={handleSaveProfile} disabled={!canSave}>
                                저장
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
                        <AvatarImage src="https://github.com/daffy3.png" alt="@PROFILE" className="rounded-md" />
                        <AvatarFallback className="rounded-md">AP</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">{savedNickname}</span>
                        <Badge className="border border-violet-900/50 bg-violet-900/50 text-[10px] text-violet-500">{savedRole}</Badge>
                    </div>
                </div>
                {/* Account Security */}
                <div className="mt-6 flex w-full flex-col gap-2 p-4">
                    <div className="flex items-center gap-1.5">
                        <IdCard size={20} />
                        <span className="text-base font-medium">개인정보 설정</span>
                    </div>
                    <div className="mb-2 flex flex-col gap-1">
                        <Separator />
                        <Separator />
                    </div>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="password">닉네임</FieldLabel>
                            <Input
                                id="nickname"
                                type="text"
                                required
                                placeholder="닉네임을 입력하세요."
                                value={nickname}
                                onChange={(event) => setNickname(event.target.value)}
                                disabled={!isEditing}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">이메일</FieldLabel>
                            <Input id="password" type="text" required placeholder="이메일을 입력하세요." value={email} disabled />
                        </Field>
                        <Field>
                            <FieldLabel>활동 유형</FieldLabel>
                            <Select
                                value={role}
                                onValueChange={(value) => {
                                    if (isUserRole(value)) setRole(value)
                                }}
                            >
                                <SelectTrigger className="w-full" disabled={!isEditing}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {userRoles.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">새 비밀번호</FieldLabel>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder="변경할 때만 입력하세요."
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    disabled={!isEditing}
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className="absolute top-1/2 right-1 -translate-y-1/2 text-neutral-400"
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    disabled={!isEditing}
                                >
                                    {isPasswordVisible ? <EyeOff /> : <Eye />}
                                </Button>
                            </div>
                            {isEditing && password.length > 0 && !isPasswordValid && (
                                <span className="text-xs text-destructive">영문과 숫자를 포함해 8자 이상 입력해 주세요.</span>
                            )}
                        </Field>
                        <div className="mb-2 flex flex-col gap-1">
                            <Separator />
                            <Separator />
                        </div>
                        <Field>
                            <AlertDialog>
                                <AlertDialogTrigger
                                    disabled={isEditing}
                                    render={
                                        <Button type="button" variant="destructive" className="border-destructive/40 font-medium" disabled={isEditing}>
                                            회원탈퇴
                                        </Button>
                                    }
                                ></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>정말 회원 탈퇴하시겠어요?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            회원 탈퇴 후에는 계정에 다시 로그인할 수 없습니다. 탈퇴를 진행하시겠습니까?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>취소</AlertDialogCancel>
                                        <AlertDialogAction variant="destructive" className="border-destructive/40">
                                            회원 탈퇴
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </Field>
                    </FieldGroup>
                </div>
            </div>
        </div>
    )
}

export default Account
