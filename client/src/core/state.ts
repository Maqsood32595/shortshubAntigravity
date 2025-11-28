import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface User {
    id: string;
    email: string;
    name: string;
    token: string;
}

export interface Upload {
    id: string;
    filename: string;
    progress: number;
    status: 'uploading' | 'processing' | 'complete' | 'error';
}

export interface AppState {
    // Auth state (from user-auth feature)
    user: User | null;
    isAuthenticated: boolean;

    // Upload state (from video-upload feature)
    uploads: Upload[];
    uploadProgress: { [id: string]: number };

    // UI state
    currentLayout: string;
    sidebarOpen: boolean;

    // Actions
    setUser: (user: User | null) => void;
    addUpload: (upload: Upload) => void;
    updateUploadProgress: (id: string, progress: number) => void;
    setLayout: (layout: string) => void;
    toggleSidebar: () => void;
}

export const useStore = create<AppState>()(
    devtools(
        persist(
            (set) => ({
                // Initial state
                user: null,
                isAuthenticated: false,
                uploads: [],
                uploadProgress: {},
                currentLayout: 'dashboard',
                sidebarOpen: true,

                // Actions
                setUser: (user) => set({
                    user,
                    isAuthenticated: !!user
                }),

                addUpload: (upload) => set((state) => ({
                    uploads: [...state.uploads, upload]
                })),

                updateUploadProgress: (id, progress) => set((state) => ({
                    uploadProgress: {
                        ...state.uploadProgress,
                        [id]: progress
                    }
                })),

                setLayout: (layout) => set({ currentLayout: layout }),

                toggleSidebar: () => set((state) => ({
                    sidebarOpen: !state.sidebarOpen
                }))
            }),
            {
                name: 'shortshub-storage',
                partialize: (state) => ({
                    user: state.user,
                    sidebarOpen: state.sidebarOpen
                })
            }
        )
    )
);
