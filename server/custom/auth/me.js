const jwt = require('jsonwebtoken');
const db = require('../../utils/db');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';

module.exports = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401);
        return { error: 'No token provided' };
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await db.findUserById(decoded.userId);

        if (!user) {
            res.status(404);
            return { error: 'User not found' };
        }

        const { password: _, ...userWithoutPassword } = user;
        return { success: true, user: userWithoutPassword };
    } catch (error) {
        res.status(401);
        return { error: 'Invalid token' };
    }
};
