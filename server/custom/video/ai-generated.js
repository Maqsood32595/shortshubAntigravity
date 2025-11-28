const db = require('../../utils/db');
const { verifyToken } = require('../../utils/auth');
const { getSignedUrl } = require('../../utils/storage');

module.exports = async (req, res) => {
    try {
        // Verify auth
        const user = verifyToken(req);
        if (!user) {
            res.status(401);
            return { error: 'Unauthorized' };
        }

        // Fetch AI-generated videos for this user
        // For now, fetch videos from the ai-generated folder
        const videos = await db.getUserVideos(user.userId);

        // Filter for AI-generated videos (those in the ai-generated folder path)
        const aiVideos = videos.filter(v => v.path && v.path.includes('/ai-generated/'));

        // Generate signed URLs for each video
        const formattedVideos = await Promise.all(aiVideos.map(async (v) => {
            let videoUrl = null;

            try {
                if (v.path && v.path.startsWith('gs://')) {
                    videoUrl = await getSignedUrl(v.path);
                }
            } catch (error) {
                console.error(`Failed to generate signed URL for ${v.path}:`, error);
            }

            return {
                id: v.id,
                title: v.title,
                thumbnail: v.thumbnailUrl || 'https://via.placeholder.com/320x180',
                url: videoUrl,
                views: v.views || 0,
                author: 'AI Generated',
                createdAt: v.createdAt
            };
        }));

        return formattedVideos;
    } catch (error) {
        console.error('Error fetching AI-generated videos:', error);
        res.status(500);
        return { error: 'Failed to fetch AI-generated videos' };
    }
};
