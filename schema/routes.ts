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
    '/platforms': {
        layout: 'platforms',
        title: 'Platforms',
        requiresAuth: true,
        feature: 'platforms'
    },
    '/ai-generation': {
        layout: 'ai-generation',
        title: 'AI Video Generation',
        requiresAuth: true,
        feature: 'ai-generation'
    },
    '/library': {
        layout: 'library',
        title: 'Library',
        requiresAuth: true,
        feature: 'video-management'
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
    },
    '/upload': {
        layout: 'upload',
        title: 'Upload Video',
        requiresAuth: true,
        feature: 'video-upload'
    }
};
