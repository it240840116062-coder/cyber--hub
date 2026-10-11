require('dotenv').config();
const express = require('express');
const path = require('path');
const os = require('os');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const { initDB } = require('./db/database');
const { checkUser } = require('./middleware/auth');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blog');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
// Disable specific helmet features that interfere with local testing (like CSP for external images/fonts) if needed, but we keep it basic
app.use(helmet({ contentSecurityPolicy: false })); 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  message: 'Too many login attempts, please try again after 15 minutes'
});
app.use('/auth/login', loginLimiter);

// Inject user into all views
app.use(checkUser);

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/blog', blogRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).render('pages/404', { title: '404 - Not Found' });
});

// Init DB and Start Server
initDB().then(() => {
  const host = '0.0.0.0';
  app.listen(PORT, host, () => {
    const interfaces = os.networkInterfaces();
    const addresses = Object.values(interfaces)
      .flat()
      .filter((details) => details && details.family === 'IPv4' && !details.internal)
      .map((detail) => detail.address);

    const localUrl = addresses.length ? `http://${addresses[0]}:${PORT}` : `http://localhost:${PORT}`;
    console.log(`Server is running on ${localUrl}`);
    console.log(`Use this on your mobile browser: ${localUrl}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
});
