import { create } from "zustand"

export type WorkspaceView = "idea" | "analytics"

interface WorkspaceStore {
    view: WorkspaceView
    setView: (view: WorkspaceView) => void
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
    view: "idea",
    setView: (view) => set({ view }),
}))
