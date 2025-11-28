const { verifyToken } = require('../../utils/auth');

module.exports = async (req, res) => {
    try {
        // Verify auth
        const user = verifyToken(req);
        if (!user) {
            res.status(401);
            return { error: 'Unauthorized' };
        }

        const { prompt } = req.body;

        if (!prompt || !prompt.trim()) {
            res.status(400);
            return { error: 'Prompt is required' };
        }

        // Placeholder: This would call Gemini API in production
        // For now, return a simple enhanced version
        const optimizedPrompt = enhancePrompt(prompt);

        console.log(`🪄 [Prompt Optimizer] Optimized prompt for user ${user.email}`);
        console.log(`   Original: ${prompt}`);
        console.log(`   Optimized: ${optimizedPrompt}`);

        return {
            originalPrompt: prompt,
            optimizedPrompt
        };
    } catch (error) {
        console.error('Error optimizing prompt:', error);
        res.status(500);
        return { error: 'Failed to optimize prompt' };
    }
};

// Simple prompt enhancement (replace with Gemini API call)
function enhancePrompt(prompt) {
    const enhancements = [
        ', captured with cinematic lighting and composition',
        ', shot with professional camera equipment and cinematic framing',
        ', featuring dramatic lighting and shallow depth of field',
        ', with smooth camera movement and professional color grading',
        ', rendered in stunning 4K quality with realistic textures and lighting'
    ];

    const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];

    // Add cinematic details
    let enhanced = prompt.trim();
    if (!enhanced.endsWith('.')) {
        enhanced += randomEnhancement;
    } else {
        enhanced = enhanced.slice(0, -1) + randomEnhancement + '.';
    }

    return enhanced;
}
