"use client"

import { useState } from "react"
import {
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
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui"
import { Eye, EyeOff, IdCard, UserPen } from "lucide-react"

function Account() {
    const [nickname, setNickname] = useState<string>("방배동 레버리지 Park")
    const [email, setEmail] = useState<string>("9diin@gmail.com")
    const [password, setPassword] = useState<string>("")
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)

    return (
        <div className="flex flex-1 items-start justify-center">
            <div className="flex h-full w-100 flex-col">
                <div className="relative h-30 w-full rounded-t-md bg-[url('/images/sample-001.png')] bg-cover bg-center">
                    <Tooltip>
                        <TooltipTrigger render={<Button variant="secondary" size="icon" className="absolute top-2 right-2" />}>
                            <UserPen />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>프로필 편집</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="-mt-10 ml-4 flex flex-col gap-4">
                    <Avatar className="h-20 w-20 rounded-md">
                        <AvatarImage src="https://github.com/daffy3.png" alt="@PROFILE" className="rounded-md" />
                        <AvatarFallback className="rounded-md">AP</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">방배동 레버리지 Park</span>
                        <Badge className="border border-violet-900/50 bg-violet-900/50 text-[10px] text-violet-500">예비창업가</Badge>
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
                                disabled
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">이메일</FieldLabel>
                            <Input id="password" type="text" required placeholder="이메일을 입력하세요." value={email} disabled />
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
                            <Button type="submit" variant="destructive" className="font-medium text-white">
                                회원탈퇴
                            </Button>
                        </Field>
                    </FieldGroup>
                </div>
            </div>
        </div>
    )
}

export default Account
