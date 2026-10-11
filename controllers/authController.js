const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDbConnection } = require('../db/database');

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

const createToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, role: user.role, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};

module.exports.login_get = (req, res) => {
  res.render('pages/auth/login', { title: 'Login | CyberShield Hub' });
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = await getDbConnection();
    const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);
    
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({ user: user.id });
      }
      return res.status(400).json({ error: 'Incorrect password' });
    }
    return res.status(400).json({ error: 'Incorrect email' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports.register_get = (req, res) => {
  res.render('pages/auth/register', { title: 'Register | CyberShield Hub' });
};

module.exports.register_post = async (req, res) => {
  const { fullName, username, email, password } = req.body;
  try {
    const db = await getDbConnection();
    
    // Check if user exists
    const existingUser = await db.get(`SELECT * FROM users WHERE email = ? OR username = ?`, [email, username]);
    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already in use' });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.run(
      `INSERT INTO users (fullName, username, email, password) VALUES (?, ?, ?, ?)`,
      [fullName, username, email, hashedPassword]
    );

    res.status(201).json({ user: result.lastID });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user' });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

module.exports.forgot_password_get = (req, res) => {
  res.render('pages/auth/forgot-password', { title: 'Forgot Password | CyberShield Hub' });
};

module.exports.forgot_password_post = (req, res) => {
  // Simulating reset flow
  res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
};

module.exports.dashboard_get = async (req, res) => {
  const db = await getDbConnection();
  let myPosts = [];
  if (req.user.role === 'admin') {
      myPosts = await db.all(`SELECT id, title, slug, category, created_at FROM posts WHERE author_id = ? ORDER BY created_at DESC`, [req.user.id]);
  }
  res.render('pages/auth/dashboard', { title: 'Dashboard | CyberShield Hub', myPosts });
};
