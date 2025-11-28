const { verifyToken } = require('../../utils/auth');
const { connections } = require('./list');

module.exports = async (req, res) => {
    try {
        // Verify auth
        const user = verifyToken(req);
        if (!user) {
            res.status(401);
            return { error: 'Unauthorized' };
        }

        const { platform } = req.params;

        // Find and remove connection
        const connectionKey = `${user.userId}_${platform}`;
        if (connections.has(connectionKey)) {
            connections.delete(connectionKey);
            console.log(`🔌 [Platforms] Disconnected ${platform} for user ${user.email}`);
            return { success: true };
        }

        res.status(404);
        return { error: 'Connection not found' };
    } catch (error) {
        console.error('Error disconnecting platform:', error);
        res.status(500);
        return { error: 'Failed to disconnect platform' };
    }
};
