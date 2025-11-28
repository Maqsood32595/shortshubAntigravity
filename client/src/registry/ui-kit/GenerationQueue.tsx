import React, { useEffect, useState } from 'react';
import { api } from '../../connectors/api';

interface GenerationJob {
    id: string;
    model: string;
    prompt: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    videoUrl?: string;
    error?: string;
    createdAt: string;
    estimatedTime?: number;
}

interface Props {
    jobs: GenerationJob[];
    onRefresh: () => void;
}

export const GenerationQueue: React.FC<Props> = ({ jobs, onRefresh }) => {
    // Ensure jobs is always an array
    const safeJobs = Array.isArray(jobs) ? jobs : [];

    useEffect(() => {
        // Auto-refresh every 3 seconds if there are active jobs
        const hasActiveJobs = safeJobs.some(j => j.status === 'pending' || j.status === 'processing');

        if (hasActiveJobs) {
            const interval = setInterval(onRefresh, 3000);
            return () => clearInterval(interval);
        }
    }, [safeJobs, onRefresh]);

    const activeJobs = safeJobs.filter(j => j.status === 'pending' || j.status === 'processing');
    const completedJobs = safeJobs.filter(j => j.status === 'completed');

    const getStatusIcon = (status: GenerationJob['status']) => {
        switch (status) {
            case 'pending': return '⏳';
            case 'processing': return '🎬';
            case 'completed': return '✅';
            case 'failed': return '❌';
        }
    };

    const getStatusColor = (status: GenerationJob['status']) => {
        switch (status) {
            case 'pending': return 'text-yellow-400';
            case 'processing': return 'text-blue-400';
            case 'completed': return 'text-green-400';
            case 'failed': return 'text-red-400';
        }
    };

    return (
        <div className="space-y-6">
            {/* Active Generations */}
            {activeJobs.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-3">
                        Generating... ({activeJobs.length})
                    </h3>
                    <div className="space-y-3">
                        {activeJobs.map((job) => (
                            <div key={job.id} className="bg-gray-700 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-lg ${getStatusColor(job.status)}`}>
                                                {getStatusIcon(job.status)}
                                            </span>
                                            <span className="font-medium">{job.model}</span>
                                        </div>
                                        <p className="text-sm text-gray-300 line-clamp-2">
                                            {job.prompt}
                                        </p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                {job.status === 'processing' && (
                                    <div className="mt-3">
                                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                                            <span>Progress</span>
                                            <span>{job.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-600 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${job.progress}%` }}
                                            />
                                        </div>
                                        {job.estimatedTime && (
                                            <p className="text-xs text-gray-400 mt-1">
                                                ETA: ~{Math.ceil(job.estimatedTime / 60)} min
                                            </p>
                                        )}
                                    </div>
                                )}

                                {job.status === 'pending' && (
                                    <p className="text-xs text-gray-400 mt-2">
                                        Waiting in queue...
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recently Completed */}
            {completedJobs.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-3">
                        Recently Generated ({completedJobs.length})
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {completedJobs.slice(0, 4).map((job) => (
                            <div key={job.id} className="bg-gray-700 rounded-lg overflow-hidden">
                                {job.videoUrl && (
                                    <video
                                        src={job.videoUrl}
                                        controls
                                        className="w-full aspect-video object-cover"
                                    />
                                )}
                                <div className="p-2">
                                    <p className="text-xs text-gray-300 line-clamp-2">
                                        {job.prompt}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {safeJobs.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">🎬</p>
                    <p className="mt-2">No generations yet</p>
                    <p className="text-sm">Start by creating your first AI video!</p>
                </div>
            )}
        </div>
    );
};

export default GenerationQueue;
