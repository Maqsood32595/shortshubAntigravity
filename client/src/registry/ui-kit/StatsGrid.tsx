import React, { useEffect, useState } from 'react';
// import { api } from '../../connectors/api';
import { Card } from './Card';

// Mock api
const api = {
    get: async (url: string) => {
        console.log('API GET', url);
        return {
            data: [
                { label: 'Total Views', value: '1.2M', change: 12 },
                { label: 'Subscribers', value: '5.4K', change: 5 },
                { label: 'Revenue', value: '$1,234', change: -2 },
                { label: 'Active Users', value: '890', change: 8 }
            ]
        };
    }
};

interface Stat {
    label: string;
    value: string | number;
    change?: number;
    icon?: string;
}

interface Props {
    dataSource: string; // API endpoint or state key
    columns?: number;
}

export const StatsGrid: React.FC<Props> = ({
    dataSource,
    columns = 4
}) => {
    const [stats, setStats] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, [dataSource]);

    const loadStats = async () => {
        setLoading(true);

        try {
            // Only fetch if dataSource is defined
            if (dataSource && typeof dataSource === 'string') {
                const response = await api.get(dataSource);
                setStats(response.data);
            } else {
                console.warn('StatsGrid: No valid dataSource provided');
                setStats([]);
            }
        } catch (error) {
            console.error('Failed to load stats:', error);
            setStats([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: columns }).map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <div className="h-20 bg-gray-200 rounded"></div>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-4`}>
            {stats.map((stat, index) => (
                <Card key={index} className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <p className="text-3xl font-bold mt-2">{stat.value}</p>
                            {stat.change !== undefined && (
                                <p className={`text-sm mt-2 ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
                                </p>
                            )}
                        </div>
                        {stat.icon && (
                            <div className="text-4xl">{stat.icon}</div>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default StatsGrid;
