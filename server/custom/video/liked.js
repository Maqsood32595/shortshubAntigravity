const { Video } = require('../../db/models');

module.exports = async (req, res) => {
    try {
        // Mock liked videos logic
        // In a real app, this would query a Likes collection
        const videos = await Video.find()
            .sort({ views: -1 }) // Just using views as a proxy for "liked" for now
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
        console.error('Error fetching liked videos:', error);
        res.status(500);
        return { error: 'Failed to fetch liked videos' };
    }
};
