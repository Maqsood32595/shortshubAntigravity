const { Video } = require('../../db/models');

module.exports = async (req, res) => {
    try {
        // Mock history logic: just get recent videos
        // In a real app, this would query a WatchHistory collection
        const videos = await Video.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('user', 'name');

        const formattedVideos = videos.map(v => ({
            id: v._id.toString(),
            title: v.title,
            thumbnail: v.thumbnailUrl || 'https://via.placeholder.com/320x180',
            views: v.views || 0,
            author: v.user ? v.user.name : 'Unknown',
            createdAt: v.createdAt
        }));

        return formattedVideos;
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500);
        return { error: 'Failed to fetch history' };
    }
};
