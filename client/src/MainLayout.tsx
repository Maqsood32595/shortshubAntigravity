import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UniversalRenderer } from './layout/UniversalRenderer';
import { routes } from './schema/routes';
import { useStore } from './core/state';

export const MainLayout: React.FC = () => {
    const location = useLocation();
    const { isAuthenticated, setLayout } = useStore();
    const [layoutConfig, setLayoutConfig] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLayout();
    }, [location.pathname]);

    const loadLayout = async () => {
        setLoading(true);

        // Get route config
        const routeConfig = (routes as any)[location.pathname];

        if (!routeConfig) {
            setLayoutConfig(null);
            setLoading(false);
            return;
        }

        // Check auth
        if (routeConfig.requiresAuth && !isAuthenticated) {
            window.location.href = '/login';
            return;
        }

        // Load layout JSON
        try {
            const response = await fetch(`/layouts/${routeConfig.layout}.json`);
            const config = await response.json();

            setLayoutConfig(config);
            setLayout(routeConfig.layout);
        } catch (error) {
            console.error('Failed to load layout:', error);
            setLayoutConfig(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!layoutConfig) {
        return <div>404 - Page not found</div>;
    }

    return <UniversalRenderer node={layoutConfig.structure} />;
};
