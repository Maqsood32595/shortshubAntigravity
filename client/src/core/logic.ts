import { AppState, User } from './state';

export type Action =
    | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
    | { type: 'LOGOUT' }
    | { type: 'UPLOAD_START'; payload: { id: string; filename: string } }
    | { type: 'UPLOAD_PROGRESS'; payload: { id: string; progress: number } }
    | { type: 'UPLOAD_COMPLETE'; payload: { id: string } };

// Pure function - calculates next state
export const calculateNextState = (
    currentState: Partial<AppState>,
    action: Action
): Partial<AppState> => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...currentState,
                user: action.payload.user,
                isAuthenticated: true
            };

        case 'LOGOUT':
            return {
                ...currentState,
                user: null,
                isAuthenticated: false
            };

        case 'UPLOAD_START':
            return {
                ...currentState,
                uploads: [
                    ...(currentState.uploads || []),
                    {
                        id: action.payload.id,
                        filename: action.payload.filename,
                        progress: 0,
                        status: 'uploading'
                    }
                ]
            };

        case 'UPLOAD_PROGRESS':
            return {
                ...currentState,
                uploadProgress: {
                    ...(currentState.uploadProgress || {}),
                    [action.payload.id]: action.payload.progress
                }
            };

        case 'UPLOAD_COMPLETE':
            return {
                ...currentState,
                uploads: (currentState.uploads || []).map(upload =>
                    upload.id === action.payload.id
                        ? { ...upload, status: 'complete', progress: 100 }
                        : upload
                )
            };

        default:
            return currentState;
    }
};

// Business rules
export const canUploadVideo = (state: Partial<AppState>): boolean => {
    if (!state.isAuthenticated) return false;

    const activeUploads = (state.uploads || []).filter(
        u => u.status === 'uploading'
    );

    return activeUploads.length < 3; // Max 3 concurrent uploads
};

export const calculateUploadETA = (
    progress: number,
    fileSize: number,
    startTime: number
): number => {
    const elapsed = Date.now() - startTime;
    const rate = (progress / 100) / (elapsed / 1000); // % per second
    const remaining = 100 - progress;
    return remaining / rate; // seconds
};
