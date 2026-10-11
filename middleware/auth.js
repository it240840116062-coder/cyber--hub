const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const token = req.cookies.jwt;
  
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.error('JWT verification error:', err.message);
        res.redirect('/auth/login');
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.redirect('/auth/login');
  }
}

// Middleware to inject user into views
function checkUser(req, res, next) {
  const token = req.cookies.jwt;
  
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        res.locals.user = decodedToken; // contains id, username, role, etc.
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}

function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Forbidden: Admin access required.');
  }
}

module.exports = { requireAuth, checkUser, requireAdmin };
