const { Video } = require('../../db/models');

module.exports = async (req, res) => {
    try {
        // Mock subscriptions logic: just get random videos for now
        // In a real app, this would filter by subscribed channels
        const videos = await Video.find()
            .sort({ createdAt: -1 })
            .limit(20)
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
        console.error('Error fetching subscription videos:', error);
        res.status(500);
        return { error: 'Failed to fetch subscription videos' };
    }
};
