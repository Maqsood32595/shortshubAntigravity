const { verifyToken } = require('../../utils/auth');

// Placeholder - will be replaced with database integration
const connections = new Map();

module.exports = async (req, res) => {
    try {
        // Verify auth
        const user = verifyToken(req);
        if (!user) {
            res.status(401);
            return { error: 'Unauthorized' };
        }

        // Get all platform connections for this user
        const userConnections = Array.from(connections.values())
            .filter(conn => conn.userId === user.userId);

        return userConnections.map(conn => ({
            platform: conn.platform,
            username: conn.username,
            profilePicture: conn.profilePicture,
            followers: conn.followers,
            lastPosted: conn.lastPosted
        }));
    } catch (error) {
        console.error('Error fetching platforms:', error);
        res.status(500);
        return { error: 'Failed to fetch platforms' };
    }
};

// Export for other handlers
module.exports.connections = connections;
