import React from 'react';

export interface Platform {
    id: string;
    name: string;
    icon: string;
    color: string;
    connected: boolean;
    username?: string;
    profilePicture?: string;
    followers?: number;
    lastPosted?: string;
}

interface Props {
    platform: Platform;
    onConnect: (platformId: string) => void;
    onDisconnect: (platformId: string) => void;
    onPost: (platformId: string) => void;
    onSettings: (platformId: string) => void;
}

export const PlatformCard: React.FC<Props> = ({
    platform,
    onConnect,
    onDisconnect,
    onPost,
    onSettings
}) => {
    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`text-4xl`}>{platform.icon}</div>
                    <div>
                        <h3 className="font-semibold text-lg">{platform.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            {platform.connected ? (
                                <>
                                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-green-900 text-green-300 rounded">
                                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                        Connected
                                    </span>
                                </>
                            ) : (
                                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">
                                    <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                    Not Connected
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Info (if connected) */}
            {platform.connected && (
                <div className="mb-4 p-3 bg-gray-750 rounded border border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                        {platform.profilePicture && (
                            <img
                                src={platform.profilePicture}
                                alt={platform.username}
                                className="w-10 h-10 rounded-full"
                            />
                        )}
                        <div className="flex-1">
                            <p className="font-medium text-white">@{platform.username}</p>
                            {platform.followers !== undefined && (
                                <p className="text-sm text-gray-400">
                                    {platform.followers.toLocaleString()} followers
                                </p>
                            )}
                        </div>
                    </div>
                    {platform.lastPosted && (
                        <p className="text-xs text-gray-500">
                            Last post: {platform.lastPosted}
                        </p>
                    )}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
                {platform.connected ? (
                    <>
                        <button
                            onClick={() => onPost(platform.id)}
                            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                            Post Now
                        </button>
                        <button
                            onClick={() => onSettings(platform.id)}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                        >
                            ⚙️
                        </button>
                        <button
                            onClick={() => onDisconnect(platform.id)}
                            className="px-4 py-2 bg-red-900 hover:bg-red-800 text-red-300 rounded-lg transition-colors text-sm"
                        >
                            Disconnect
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => onConnect(platform.id)}
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-colors font-medium"
                    >
                        Connect {platform.name}
                    </button>
                )}
            </div>
        </div>
    );
};

export default PlatformCard;
