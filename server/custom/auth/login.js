const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../utils/db');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';

module.exports = async (req, res) => {
    const { email, password } = req.body;

    console.log('🔵 [Backend] Login attempt:', { email });

    if (!email || !password) {
        console.log('❌ [Backend] Missing email or password');
        res.status(400);
        return { error: 'Email and password are required' };
    }

    const user = await db.findUserByEmail(email);
    if (!user) {
        console.log('❌ [Backend] User not found:', email);
        res.status(401);
        return { error: 'Invalid credentials' };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        console.log('❌ [Backend] Invalid password for:', email);
        res.status(401);
        return { error: 'Invalid credentials' };
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    console.log('✅ [Backend] Login successful for:', email);

    const { password: _, ...userWithoutPassword } = user;
    return { success: true, token, user: userWithoutPassword };
};
