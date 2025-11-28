const db = require('../../utils/db');

module.exports = async (req, res) => {
    // Determine feed type from path
    const path = req.path;
    let videos = [];

    try {
        const allVideos = await db.getVideos();

        if (path.includes('trending')) {
            // Mock trending: sort by "views" (random for now)
            videos = allVideos
                .map(v => ({ ...v, views: Math.floor(Math.random() * 10000) }))
                .sort((a, b) => b.views - a.views);
        } else if (path.includes('featured')) {
            // Mock featured: just take first 5
            videos = allVideos.slice(0, 5);
        } else if (path.includes('subscriptions')) {
            // Mock subscriptions: random subset
            videos = allVideos.filter(() => Math.random() > 0.5);
        } else if (path.includes('history')) {
            // Mock history: random subset
            videos = allVideos.slice(0, 3);
        } else {
            videos = allVideos;
        }

        return {
            success: true,
            videos: videos.map(v => ({
                id: v.id,
                title: v.title || v.filename,
                thumbnail: '/placeholder-thumb.jpg',
                author: v.author || 'Unknown User',
                views: v.views || Math.floor(Math.random() * 1000),
                createdAt: v.createdAt || new Date().toISOString()
            }))
        };
    } catch (error) {
        console.error('Feed Error:', error);
        return {
            success: false,
            error: 'Failed to fetch video feed'
        };
    }
};
