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

        // Fetch videos uploaded by this user
        const videos = await db.getUserVideos(user.userId);

        // Generate signed URLs for each video
        const formattedVideos = await Promise.all(videos.map(async (v) => {
            let videoUrl = null;

            try {
                if (v.path && v.path.startsWith('gs://')) {
                    // Try to generate signed URL
                    videoUrl = await getSignedUrl(v.path);
                }
            } catch (error) {
                console.error(`Failed to generate signed URL for ${v.path}:`, error);
                // Fallback to public URL
                if (v.path && v.path.startsWith('gs://')) {
                    const parts = v.path.replace('gs://', '').split('/');
                    const bucket = parts.shift();
                    const path = parts.join('/');
                    videoUrl = `https://storage.googleapis.com/${bucket}/${path}`;
                    console.log(`Using public URL fallback: ${videoUrl}`);
                }
            }

            return {
                id: v.id,
                title: v.title,
                thumbnail: v.thumbnailUrl || 'https://via.placeholder.com/320x180',
                url: videoUrl, // Add video URL
                views: v.views || 0,
                author: 'You',
                createdAt: v.createdAt
            };
        }));

        return formattedVideos;
    } catch (error) {
        console.error('Error fetching uploaded videos:', error);
        res.status(500);
        return { error: 'Failed to fetch uploaded videos' };
    }
};
