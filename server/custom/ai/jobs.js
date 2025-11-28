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

        // Get all jobs for this user (in production, query from database)
        const userJobs = Array.from(jobs.values())
            .filter(job => job.userId === user.userId)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 20); // Limit to 20 most recent

        return userJobs.map(job => ({
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
        }));
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500);
        return { error: 'Failed to fetch jobs' };
    }
};
