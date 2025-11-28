import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar: React.FC = () => {
    const location = useLocation();

    const navigation = [
        { name: 'Home', icon: '🏠', href: '/' },
        { name: 'Platforms', icon: '🔗', href: '/platforms' },
        { name: 'AI Generation', icon: '🤖', href: '/ai-generation' },
        { name: 'Library', icon: '📚', href: '/library' },
        { name: 'Upload', icon: '⬆️', href: '/upload' },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 pt-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-10">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 space-y-1">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150
                                    ${isActive
                                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <span className="mr-3 text-lg">{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
