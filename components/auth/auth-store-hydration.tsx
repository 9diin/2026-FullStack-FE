"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/store/auth"

export function AuthStoreHydration() {
    useEffect(() => {
        void useAuthStore.persist.rehydrate()
    }, [])

    return null
}
