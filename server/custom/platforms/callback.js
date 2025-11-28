const { connections } = require('./list');

module.exports = async (req, res) => {
    try {
        const { platform } = req.params;
        const { code, state } = req.query;

        // TODO: Exchange code for OAuth tokens
        // This is a placeholder implementation

        console.log(`✅ [Platforms] OAuth callback received for ${platform}`);
        console.log(`   Code: ${code ? 'present' : 'missing'}`);

        // For now, just redirect to platforms page with success message
        res.redirect('/platforms?connected=' + platform);
    } catch (error) {
        console.error('Error in OAuth callback:', error);
        res.redirect('/platforms?error=connection_failed');
    }
};
