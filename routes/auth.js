const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/register', authController.register_get);
router.post('/register', authController.register_post);
router.get('/logout', authController.logout_get);

router.get('/forgot-password', authController.forgot_password_get);
router.post('/forgot-password', authController.forgot_password_post);

router.get('/dashboard', requireAuth, authController.dashboard_get);

module.exports = router;
