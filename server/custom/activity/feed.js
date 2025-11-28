module.exports = async (req, res) => {
    try {
        // Mock activity feed
        const activity = [
            {
                id: '1',
                type: 'upload',
                message: 'You uploaded "My New Vlog"',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
            },
            {
                id: '2',
                type: 'comment',
                message: 'John Doe commented on "Tech Review"',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() // 5 hours ago
            },
            {
                id: '3',
                type: 'like',
                message: 'Your video "Funny Cat" reached 1k likes',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
            },
            {
                id: '4',
                type: 'system',
                message: 'Welcome to ShortsHub!',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() // 2 days ago
            }
        ];

        res.json(activity);
    } catch (error) {
        console.error('Error fetching activity feed:', error);
        res.status(500).json({ error: 'Failed to fetch activity feed' });
    }
};
