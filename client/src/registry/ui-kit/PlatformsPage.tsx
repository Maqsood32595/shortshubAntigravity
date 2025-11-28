import React, { useState } from 'react';
import ConnectionsTab from './ConnectionsTab';
import ScheduleTab from './ScheduleTab';
import AnalyticsTab from './AnalyticsTab';

type TabType = 'connections' | 'schedule' | 'analytics';

export const PlatformsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('connections');

    const tabs = [
        { id: 'connections' as TabType, label: 'Connections', icon: '🔗' },
        { id: 'schedule' as TabType, label: 'Schedule', icon: '📅' },
        { id: 'analytics' as TabType, label: 'Analytics', icon: '📊' }
    ];

    return (
        <div className="h-full flex flex-col">
            {/* Tab Navigation */}
            <div className="border-b border-gray-700 mb-6">
                <nav className="flex gap-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 font-medium transition-colors relative ${activeTab === tab.id
                                    ? 'text-blue-400'
                                    : 'text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <span>{tab.icon}</span>
                                {tab.label}
                            </span>
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === 'connections' && <ConnectionsTab />}
                {activeTab === 'schedule' && <ScheduleTab />}
                {activeTab === 'analytics' && <AnalyticsTab />}
            </div>
        </div>
    );
};

export default PlatformsPage;
