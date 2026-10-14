"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/store/auth"

export function AuthHydration() {
    useEffect(() => {
        void Promise.resolve(useAuthStore.persist.rehydrate()).catch((error: unknown) => {
            console.error("인증 상태를 복원하지 못했습니다.", error)
        })
    }, [])

    return null
}
