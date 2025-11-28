import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStore } from '../../core/state';
import { api } from '../../connectors/api';

interface Props {
    maxSize: string; // e.g., "500MB"
    acceptedFormats: string[];
    onUpload?: (videoId: string) => void;
    enableChunked?: boolean;
}

export const VideoUploadZone: React.FC<Props> = ({
    maxSize = "500MB",
    acceptedFormats = ['mp4', 'mov', 'avi', 'mkv'],
    onUpload,
    enableChunked = false
}) => {
    const { addUpload, updateUploadProgress } = useStore();
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        const uploadId = generateId();

        // Add to state
        addUpload({
            id: uploadId,
            filename: file.name,
            progress: 0,
            status: 'uploading'
        });

        setUploading(true);

        try {
            let videoId;

            if (enableChunked && file.size > 100 * 1024 * 1024) {
                // Chunked upload for large files
                videoId = await uploadChunked(file, uploadId);
            } else {
                // Regular upload
                videoId = await uploadRegular(file, uploadId);
            }

            onUpload?.(videoId);
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    }, [addUpload, enableChunked, onUpload]);

    const uploadRegular = async (file: File, uploadId: string) => {
        const formData = new FormData();
        formData.append('video', file);

        const response = await api.post('/api/upload/video', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent: any) => {
                const progress = Math.round(
                    (progressEvent.loaded * 100) / (progressEvent.total || 1)
                );
                updateUploadProgress(uploadId, progress);
            }
        });

        return response.data.videoId;
    };

    const uploadChunked = async (file: File, uploadId: string) => {
        const chunkSize = 5 * 1024 * 1024; // 5MB chunks
        const chunks = Math.ceil(file.size / chunkSize);

        for (let i = 0; i < chunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);

            const formData = new FormData();
            formData.append('chunk', chunk);
            formData.append('chunkIndex', String(i));
            formData.append('totalChunks', String(chunks));
            formData.append('filename', file.name);

            await api.post('/api/upload/chunked', formData);

            const progress = Math.round(((i + 1) / chunks) * 100);
            updateUploadProgress(uploadId, progress);
        }

        // Finalize
        const response = await api.post('/api/upload/finalize', {
            filename: file.name,
            totalChunks: chunks
        });

        return response.data.videoId;
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFormats.reduce((acc, format) => ({
            ...acc,
            [`video/${format}`]: []
        }), {}),
        maxSize: parseSize(maxSize),
        disabled: uploading
    });

    return (
        <div
            {...getRootProps()}
            className={`
        border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
        transition-colors duration-200
        ${isDragActive
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-300 hover:border-primary'
                }
        ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
        >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center gap-4">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>

                {uploading ? (
                    <p className="text-lg">Uploading...</p>
                ) : isDragActive ? (
                    <p className="text-lg">Drop your video here</p>
                ) : (
                    <>
                        <p className="text-lg">Drag & drop a video, or click to select</p>
                        <p className="text-sm text-gray-500">
                            Supports: {acceptedFormats.join(', ')} • Max size: {maxSize}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default VideoUploadZone;

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function parseSize(size: string): number {
    const match = size.match(/^(\d+)(MB|GB)$/);
    if (!match) return 500 * 1024 * 1024; // Default 500MB

    const value = parseInt(match[1]);
    const unit = match[2];

    return value * (unit === 'GB' ? 1024 * 1024 * 1024 : 1024 * 1024);
}
