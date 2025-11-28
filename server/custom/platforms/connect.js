const { verifyToken } = require('../../utils/auth');

module.exports = async (req, res) => {
    try {
        // Verify auth
        const user = verifyToken(req);
        if (!user) {
            res.status(401);
            return { error: 'Unauthorized' };
        }

        const { platform } = req.params;

        // Generate OAuth URL based on platform
        const authUrl = generateOAuthUrl(platform, user.userId);

        console.log(`🔗 [Platforms] Generating OAuth URL for ${platform}`);
        console.log(`   User: ${user.email}`);

        return {
            authUrl,
            state: `${user.userId}_${Date.now()}`
        };
    } catch (error) {
        console.error('Error generating OAuth URL:', error);
        res.status(500);
        return { error: 'Failed to generate OAuth URL' };
    }
};

function generateOAuthUrl(platform, userId) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5002';
    const redirectUri = `${baseUrl}/api/platforms/callback/${platform}`;

    // Placeholder - replace with actual OAuth URLs
    const oauthUrls = {
        youtube: `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=${redirectUri}&response_type=code&scope=youtube`,
        tiktok: `https://www.tiktok.com/auth/authorize?client_key=YOUR_KEY&redirect_uri=${redirectUri}&response_type=code`,
        instagram: `https://api.instagram.com/oauth/authorize?client_id=YOUR_ID&redirect_uri=${redirectUri}&response_type=code`,
        twitter: `https://twitter.com/i/oauth2/authorize?client_id=YOUR_ID&redirect_uri=${redirectUri}&response_type=code`,
    };

    return oauthUrls[platform] || '#';
}
