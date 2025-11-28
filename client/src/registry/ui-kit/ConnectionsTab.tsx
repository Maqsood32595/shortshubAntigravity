import React, { useState } from 'react';
import PlatformCard, { Platform } from './PlatformCard';
import { api } from '../../connectors/api';

const AVAILABLE_PLATFORMS: Platform[] = [
    {
        id: 'youtube',
        name: 'YouTube Shorts',
        icon: '📺',
        color: '#FF0000',
        connected: false
    },
    {
        id: 'instagram',
        name: 'Instagram Reels',
        icon: '📷',
        color: '#E4405F',
        connected: false
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        icon: '🎵',
        color: '#000000',
        connected: false
    },
    {
        id: 'twitter',
        name: 'X (Twitter)',
        icon: '🐦',
        color: '#1DA1F2',
        connected: false
    },
    {
        id: 'facebook',
        name: 'Facebook Reels',
        icon: '👥',
        color: '#1877F2',
        connected: false
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: '💼',
        color: '#0A66C2',
        connected: false
    },
    {
        id: 'snapchat',
        name: 'Snapchat',
        icon: '👻',
        color: '#FFFC00',
        connected: false
    },
    {
        id: 'pinterest',
        name: 'Pinterest',
        icon: '📌',
        color: '#E60023',
        connected: false
    }
];

export const ConnectionsTab: React.FC = () => {
    const [platforms, setPlatforms] = useState<Platform[]>(AVAILABLE_PLATFORMS);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        fetchPlatforms();
    }, []);

    const fetchPlatforms = async () => {
        try {
            const response = await api.get('/api/platforms/list');
            // Ensure we have an array
            const connected = Array.isArray(response.data) ? response.data : [];

            setPlatforms(prev => prev.map(p => {
                const conn = connected.find((c: any) => c.platform === p.id);
                if (conn) {
                    return {
                        ...p,
                        connected: true,
                        username: conn.username,
                        profilePicture: conn.profilePicture,
                        followers: conn.followers,
                        lastPosted: conn.lastPosted
                    };
                }
                return p;
            }));
        } catch (error) {
            console.error('Failed to fetch platforms:', error);
            // Don't update state on error, keep defaults
        }
    };

    const handleConnect = async (platformId: string) => {
        setLoading(true);
        try {
            const response = await api.post(`/api/platforms/connect/${platformId}`);
            // Open OAuth URL in new window
            if (response.data.authUrl) {
                window.open(response.data.authUrl, '_blank', 'width=600,height=700');
                // TODO: Listen for OAuth callback
                alert('Complete the authorization in the popup window');
            }
        } catch (error: any) {
            console.error('Failed to connect platform:', error);
            alert(error.response?.data?.error || 'Failed to connect platform');
        } finally {
            setLoading(false);
        }
    };

    const handleDisconnect = async (platformId: string) => {
        if (!confirm('Are you sure you want to disconnect this platform?')) {
            return;
        }

        try {
            await api.delete(`/api/platforms/disconnect/${platformId}`);
            // Update local state
            setPlatforms(prev => prev.map(p =>
                p.id === platformId ? { ...p, connected: false, username: undefined, profilePicture: undefined, followers: undefined } : p
            ));
            alert('Platform disconnected successfully');
        } catch (error) {
            console.error('Failed to disconnect platform:', error);
            alert('Failed to disconnect platform');
        }
    };

    const handlePost = (platformId: string) => {
        // TODO: Open post modal
        alert(`Post to ${platformId} - Coming soon!`);
    };

    const handleSettings = (platformId: string) => {
        // TODO: Open settings modal
        alert(`Settings for ${platformId} - Coming soon!`);
    };

    const connectedCount = platforms.filter(p => p.connected).length;

    return (
        <div>
            {/* Summary */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">Connected Platforms</h2>
                        <p className="text-gray-400 text-sm mt-1">
                            {connectedCount} of {platforms.length} platforms connected
                        </p>
                    </div>
                    <button
                        onClick={fetchPlatforms}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                        🔄 Refresh
                    </button>
                </div>
            </div>

            {/* Platform Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {platforms.map(platform => (
                    <PlatformCard
                        key={platform.id}
                        platform={platform}
                        onConnect={handleConnect}
                        onDisconnect={handleDisconnect}
                        onPost={handlePost}
                        onSettings={handleSettings}
                    />
                ))}
            </div>

            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6">
                        <p className="text-white">Connecting...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConnectionsTab;
