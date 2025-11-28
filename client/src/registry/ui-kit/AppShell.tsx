import React from 'react';
import { Link } from 'react-router-dom';

interface AppShellProps {
    children?: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* The Header is typically rendered by the UniversalRenderer if it's part of the layout JSON, 
          but if AppShell wraps everything, it might be inside or outside. 
          Based on our layout JSONs, Header is a sibling to Container. 
          So AppShell here acts more like a wrapper for the 'Container' part or the whole page.
          
          However, looking at `client/src/layout/AppShell.tsx` (the logic one), it renders `UniversalRenderer`.
          And `UniversalRenderer` renders components from the registry.
          
          If this `ui-kit/AppShell` is used inside a layout, it should wrap its children.
      */}
            <div className="flex">
                {/* Sidebar (Hidden on mobile for now) */}
                <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 pt-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {[
                                { name: 'Home', icon: '🏠', href: '/' },
                                { name: 'Trending', icon: '🔥', href: '/trending' },
                                { name: 'Subscriptions', icon: '📺', href: '/subscriptions' },
                                { name: 'Library', icon: '📚', href: '/library' },
                                { name: 'Upload', icon: '⬆️', href: '/upload' },
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                >
                                    <span className="mr-3 text-lg">{item.icon}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 pt-20">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppShell;
