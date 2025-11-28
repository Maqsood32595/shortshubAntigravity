const bcrypt = require('bcrypt');
const db = require('../../utils/db');

module.exports = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    res.status(400);
    return { error: 'Email and password are required' };
  }

  const existingUser = await db.findUserByEmail(email);
  if (existingUser) {
    res.status(409);
    return { error: 'User already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.createUser({
    email,
    password: hashedPassword,
    name: name || email.split('@')[0]
  });

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return { success: true, user: userWithoutPassword };
};
