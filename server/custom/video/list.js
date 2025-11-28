const db = require('../../utils/db');

module.exports = async (req, res) => {
    const videos = await db.getVideos();

    return {
        success: true,
        videos: videos.map(v => ({
            id: v.id,
            title: v.title || v.filename,
            thumbnail: '/placeholder-thumb.jpg',
            author: v.author,
            views: Math.floor(Math.random() * 1000),
            createdAt: v.createdAt
        }))
    };
};
