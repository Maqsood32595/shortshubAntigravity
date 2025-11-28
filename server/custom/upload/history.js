const db = require('../../utils/db');

module.exports = async (req, res) => {
    try {
        // In a real app, filter by authenticated user
        // const userId = req.user.id;

        // Fetch videos from DB
        const videos = await db.getVideos();

        // Sort by date descending and take top 5
        const history = videos
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)
            .map(v => ({
                id: v.id,
                filename: v.title, // Using title as filename for now
                status: 'completed', // Mock status
                date: v.createdAt,
                size: '15MB' // Mock size
            }));

        res.json(history);
    } catch (error) {
        console.error('Error fetching upload history:', error);
        res.status(500).json({ error: 'Failed to fetch upload history' });
    }
};
