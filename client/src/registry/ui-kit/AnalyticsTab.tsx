import React from 'react';

export const AnalyticsTab: React.FC = () => {
    return (
        <div>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6">
                    <div className="text-blue-300 text-sm font-medium mb-2">Total Posts</div>
                    <div className="text-4xl font-bold text-white mb-1">0</div>
                    <div className="text-blue-300 text-xs">Across all platforms</div>
                </div>

                <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6">
                    <div className="text-purple-300 text-sm font-medium mb-2">Total Views</div>
                    <div className="text-4xl font-bold text-white mb-1">0</div>
                    <div className="text-purple-300 text-xs">Lifetime views</div>
                </div>

                <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6">
                    <div className="text-green-300 text-sm font-medium mb-2">Avg Engagement</div>
                    <div className="text-4xl font-bold text-white mb-1">0%</div>
                    <div className="text-green-300 text-xs">Likes + comments / views</div>
                </div>
            </div>

            {/* Platform Breakdown */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Platform Breakdown</h3>
                <div className="space-y-4">
                    {[
                        { name: 'YouTube Shorts', icon: '📺', posts: 0, views: 0, engagement: 0 },
                        { name: 'TikTok', icon: '🎵', posts: 0, views: 0, engagement: 0 },
                        { name: 'Instagram Reels', icon: '📷', posts: 0, views: 0, engagement: 0 },
                    ].map(platform => (
                        <div key={platform.name} className="flex items-center gap-4 p-4 bg-gray-750 rounded-lg">
                            <div className="text-2xl">{platform.icon}</div>
                            <div className="flex-1">
                                <div className="font-medium">{platform.name}</div>
                                <div className="text-sm text-gray-400">
                                    {platform.posts} posts • {platform.views.toLocaleString()} views • {platform.engagement}% engagement
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Best Performers */}
            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Best Performing Posts</h3>
                <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">📊</p>
                    <p className="mt-2">No data yet</p>
                    <p className="text-sm">Post content to see analytics here</p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsTab;
