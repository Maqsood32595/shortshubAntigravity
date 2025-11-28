const db = require('../../utils/db');

module.exports = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 6;

        // Fetch videos from DB
        const videos = await db.getVideos();

        // Sort by date descending
        const recentVideos = videos
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit);

        res.json(recentVideos);
    } catch (error) {
        console.error('Error fetching recent videos:', error);
        res.status(500).json({ error: 'Failed to fetch recent videos' });
    }
};
