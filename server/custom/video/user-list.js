const db = require('../../utils/db');
const { verifyToken } = require('../../utils/auth');

module.exports = async (req, res) => {
    const user = verifyToken(req);
    if (!user) {
        res.status(401);
        return { error: 'Unauthorized' };
    }

    const videos = await db.getUserVideos(user.userId);

    return {
        success: true,
        videos: videos.map(v => ({
            id: v.id,
            title: v.title || v.filename,
            thumbnail: '/placeholder-thumb.jpg',
            views: Math.floor(Math.random() * 1000),
            createdAt: v.createdAt,
            status: 'processed'
        }))
    };
};
