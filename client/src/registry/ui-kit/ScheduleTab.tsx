import React, { useState } from 'react';

interface ScheduledPost {
    id: string;
    date: string;
    platforms: string[];
    videoTitle: string;
    status: 'scheduled' | 'posted' | 'failed';
}

export const ScheduleTab: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);

    // Generate calendar days
    const getDaysInMonth = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        // Add actual days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    };

    const getPostsForDate = (day: number) => {
        const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return scheduledPosts.filter(p => p.date.startsWith(dateStr));
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleSchedulePost = () => {
        // TODO: Open schedule modal
        alert('Schedule post modal - Coming soon!');
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handlePrevMonth}
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                    >
                        ←
                    </button>
                    <h2 className="text-xl font-bold">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h2>
                    <button
                        onClick={handleNextMonth}
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                    >
                        →
                    </button>
                </div>
                <button
                    onClick={handleSchedulePost}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                    + Schedule Post
                </button>
            </div>

            {/* Calendar */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
                {/* Day headers */}
                <div className="grid grid-cols-7 border-b border-gray-700">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-3 text-center font-medium text-gray-400 text-sm">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7">
                    {getDaysInMonth().map((day, index) => {
                        const posts = day ? getPostsForDate(day) : [];
                        const isToday = day &&
                            day === new Date().getDate() &&
                            currentMonth.getMonth() === new Date().getMonth() &&
                            currentMonth.getFullYear() === new Date().getFullYear();

                        return (
                            <div
                                key={index}
                                className={`min-h-24 p-2 border-b border-r border-gray-700 ${!day ? 'bg-gray-900' : 'bg-gray-800 hover:bg-gray-750 cursor-pointer'
                                    } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                                onClick={() => day && handleSchedulePost()}
                            >
                                {day && (
                                    <>
                                        <div className="font-medium text-sm mb-1">{day}</div>
                                        {posts.map(post => (
                                            <div
                                                key={post.id}
                                                className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded mb-1"
                                            >
                                                🎥 {post.platforms.length} platforms
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Empty State */}
            {scheduledPosts.length === 0 && (
                <div className="text-center py-12 text-gray-500 mt-6">
                    <p className="text-lg">📅</p>
                    <p className="mt-2">No scheduled posts yet</p>
                    <p className="text-sm">Click any date or the "Schedule Post" button to get started</p>
                </div>
            )}
        </div>
    );
};

export default ScheduleTab;
