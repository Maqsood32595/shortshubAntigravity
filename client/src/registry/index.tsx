import { lazy } from 'react';

// UI Kit components
// Note: These will be implemented later or stubbed if needed for compilation
// For now we assume they exist or will be created
import { Button } from './ui-kit/Button';
import { Card } from './ui-kit/Card';
import { Container } from './ui-kit/Container';
import { Input } from './ui-kit/Input';

// Feature components (lazy loaded)
const VideoUploadZone = lazy(() => import('./ui-kit/VideoUploadZone'));
const VideoPlayer = lazy(() => import('./ui-kit/VideoPlayer'));
const StatsGrid = lazy(() => import('./ui-kit/StatsGrid'));
const VideoGrid = lazy(() => import('./ui-kit/VideoGrid'));
const ActivityFeed = lazy(() => import('./ui-kit/ActivityFeed'));
const Header = lazy(() => import('./ui-kit/Header'));
const AppShell = lazy(() => import('./ui-kit/AppShell'));
const UploadProgressBar = lazy(() => import('./ui-kit/UploadProgressBar'));
const UploadHistory = lazy(() => import('./ui-kit/UploadHistory'));
const Sidebar = lazy(() => import('./ui-kit/Sidebar'));
const Text = lazy(() => import('./ui-kit/Text'));
const AIGenerationForm = lazy(() => import('./ui-kit/AIGenerationForm'));
const PlatformsPage = lazy(() => import('./ui-kit/PlatformsPage'));

// Component Registry
export const ComponentRegistry: Record<string, React.ComponentType<any>> = {
    // Basic UI
    'Button': Button,
    'Card': Card,
    'Container': Container,
    'Input': Input,
    'Text': Text,

    // Layout
    'AppShell': AppShell,
    'Header': Header,
    'Sidebar': Sidebar,

    // Video
    'VideoUploadZone': VideoUploadZone,
    'VideoPlayer': VideoPlayer,
    'VideoGrid': VideoGrid,

    // Dashboard
    'StatsGrid': StatsGrid,
    'ActivityFeed': ActivityFeed,

    // Upload
    'UploadProgressBar': UploadProgressBar,
    'UploadHistory': UploadHistory,

    // AI Generation
    'AIGenerationForm': AIGenerationForm,

    // Platforms
    'PlatformsPage': PlatformsPage
};

// Validation: Check if component exists
export const hasComponent = (type: string): boolean => {
    return type in ComponentRegistry;
};

// Get component with fallback
export const getComponent = (type: string): React.ElementType => {
    if (hasComponent(type)) {
        return ComponentRegistry[type];
    }

    // Support standard HTML tags
    const htmlTags = [
        'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'section', 'main', 'nav', 'footer', 'header',
        'button', 'input', 'form', 'label', 'img', 'a', 'article', 'aside'
    ];

    if (htmlTags.includes(type)) {
        return type as React.ElementType;
    }

    console.warn(`Component "${type}" not found in registry`);
    return () => <div className="text-red-500" > Unknown Component: {type} </div>;
};
