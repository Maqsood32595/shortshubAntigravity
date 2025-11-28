import React, { useState } from 'react';
import { useStore } from '../../core/state';
import { useUserAuth } from '../../generated/hooks/useUserAuth';

const Header: React.FC = () => {
    const { user, isAuthenticated } = useUserAuth();
    const logout = useStore((state: any) => state.logout);
    const [showMenu, setShowMenu] = useState(false);

    // Mock login for demo purposes since we don't have a full auth page yet
    // In a real app, this would navigate to /login
    const handleLogin = async () => {
        const email = prompt('Enter email (demo):', 'test@example.com');
        const password = prompt('Enter password (demo):', 'password123');
        if (email && password) {
            try {
                // We need to call the actual login action from the hook, but for now
                // let's just use the store directly or the hook if it exposes it.
                // The generated hook exposes 'login' action.
                const { login } = useUserAuth();
                await login(email, password);
                window.location.reload(); // Refresh to update state
            } catch (e) {
                alert('Login failed');
            }
        }
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.location.hash = '#/'}>
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg mr-2"></div>
                            <span className="font-bold text-xl text-gray-900 dark:text-white">ShortsHub</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => window.location.hash = '#/upload'}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
                            title="Upload Video"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </button>

                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                                        {user?.name?.[0] || 'U'}
                                    </div>
                                </button>

                                {showMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">
                                            {user?.email}
                                        </div>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setShowMenu(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleLogin}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                                >
                                    Log in
                                </button>
                                <button
                                    onClick={() => {
                                        const email = prompt('Email:', `user_${Date.now()}@example.com`);
                                        const password = 'password123';
                                        if (email) {
                                            // Trigger register flow (simplified)
                                            alert('Please use the API to register for now, or implement full register form.');
                                        }
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
                                >
                                    Sign up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
