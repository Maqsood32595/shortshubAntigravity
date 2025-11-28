import React, { useEffect, useState } from 'react';
import { api } from '../../connectors/api';

interface Video {
    id: string;
    title: string;
    createdAt: string;
    author: string;
}

const ActivityFeed: React.FC = () => {
    const [activities, setActivities] = useState<Video[]>([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await api.get('/api/video/list');
                if (response.data.success) {
                    // Take top 5 recent videos
                    setActivities(response.data.videos.slice(0, 5));
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchActivities();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {activity.author ? activity.author[0] : 'U'}
                                </span>
                            </div>
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm text-gray-900 dark:text-white">
                                <span className="font-medium">User {activity.author}</span> uploaded a new video
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {activity.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {new Date(activity.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
                {activities.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity.</p>
                )}
            </div>
        </div>
    );
};

export default ActivityFeed;
