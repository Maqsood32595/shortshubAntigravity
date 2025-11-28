const { verifyToken } = require('../../utils/auth');
const { jobs } = require('./generate');

module.exports = async (req, res) => {
    try {
        // Verify auth
        const user = verifyToken(req);
        if (!user) {
            res.status(401);
            return { error: 'Unauthorized' };
        }

        const { jobId } = req.params;

        // Get job from in-memory store (in production, this would be from database)
        const job = jobs.get(jobId);

        if (!job) {
            res.status(404);
            return { error: 'Job not found' };
        }

        // Verify ownership
        if (job.userId !== user.userId) {
            res.status(403);
            return { error: 'Forbidden' };
        }

        return {
            id: job.id,
            model: job.model,
            prompt: job.prompt,
            status: job.status,
            progress: job.progress,
            videoUrl: job.videoUrl,
            error: job.error,
            createdAt: job.createdAt,
            completedAt: job.completedAt,
            estimatedTime: job.estimatedTime
        };
    } catch (error) {
        console.error('Error fetching job status:', error);
        res.status(500);
        return { error: 'Failed to fetch job status' };
    }
};
