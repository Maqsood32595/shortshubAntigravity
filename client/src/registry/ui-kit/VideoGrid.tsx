import React, { useEffect, useState } from 'react';
import { api } from '../../connectors/api';

interface Video {
    id: string;
    title: string;
    thumbnail: string;
    views: number;
    createdAt: string;
}

const VideoGrid: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await api.get('/api/video/list');
                if (response.data.success) {
                    console.log('📹 Fetched videos:', response.data.videos);
                    setVideos(response.data.videos);
                } else {
                    setError('Failed to load videos');
                }
            } catch (err) {
                setError('Error fetching videos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-3">
                        <div className="aspect-video bg-gray-200 rounded-lg dark:bg-gray-700" />
                        <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-700" />
                        <div className="h-4 bg-gray-200 rounded w-1/2 dark:bg-gray-700" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center py-8">{error}</div>;
    }

    if (videos.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p className="text-lg">No videos found.</p>
                <p className="text-sm">Be the first to upload one!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video: any) => (
                <div key={video.id} className="group cursor-pointer space-y-2">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        {video.url ? (
                            <video
                                src={video.url}
                                controls
                                className="w-full h-full object-cover"
                                poster={video.thumbnail}
                                onError={(e) => {
                                    console.error('❌ Video playback error for:', video.title, video.url);
                                    console.error('Error details:', e);
                                }}
                                onLoadStart={() => {
                                    console.log('▶️ Loading video:', video.title, video.url);
                                }}
                            />
                        ) : (
                            <>
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).parentElement!.classList.add('bg-gradient-to-br', 'from-purple-500', 'to-pink-500');
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </>
                        )}
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {video.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <span>{video.views.toLocaleString()} views</span>
                            <span className="mx-1">•</span>
                            <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideoGrid;
