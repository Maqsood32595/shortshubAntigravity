export const routes = {
    '/': {
        layout: 'home',
        title: 'ShortsHub - AI Video Platform',
        public: true
    },
    '/login': {
        layout: 'login',
        title: 'Login',
        public: true
    },
    '/register': {
        layout: 'register',
        title: 'Create Account',
        public: true
    },
    '/trending': {
        layout: 'trending',
        title: 'Trending',
        public: true
    },
    '/platforms': {
        layout: 'platforms',
        title: 'Platforms',
        requiresAuth: true,
        feature: 'platforms'
    },
    '/library': {
        layout: 'library',
        title: 'Library',
        requiresAuth: true
    },
    '/dashboard': {
        layout: 'dashboard',
        title: 'Dashboard',
        requiresAuth: true,
        feature: 'dashboard'
    },
    '/upload': {
        layout: 'upload',
        title: 'Upload Video',
        requiresAuth: true,
        feature: 'video-upload'
    },
    '/videos': {
        layout: 'video-management',
        title: 'My Videos',
        requiresAuth: true,
        feature: 'video-management'
    },
    '/ai-generation': {
        layout: 'ai-generation',
        title: 'AI Video Generation',
        requiresAuth: true,
        feature: 'ai-generation'
    },
    '/ai-generate': {
        layout: 'ai-generation',
        title: 'AI Video Generator',
        requiresAuth: true,
        feature: 'ai-generation'
    },
    '/analytics': {
        layout: 'analytics',
        title: 'Analytics',
        requiresAuth: true,
        feature: 'analytics-dashboard'
    }
};
