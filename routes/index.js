const express = require('express');
const router = express.Router();
const { getDbConnection } = require('../db/database');

// View home page
router.get('/', async (req, res) => {
  const db = await getDbConnection();
  const recentPosts = await db.all(`SELECT id, title, slug, category, excerpt, image_url, created_at FROM posts ORDER BY created_at DESC LIMIT 3`);
  res.render('pages/index', { recentPosts, title: 'Home | CyberShield Hub' });
});

// About page
router.get('/about', (req, res) => {
  res.render('pages/about', { title: 'About | CyberShield Hub' });
});

// Threats page
router.get('/threats', (req, res) => {
  res.render('pages/threats', { title: 'Threats & Attacks | CyberShield Hub' });
});

// Defense page
router.get('/defense', (req, res) => {
  res.render('pages/defense', { title: 'Defense & Best Practices | CyberShield Hub' });
});

// Careers page
router.get('/careers', (req, res) => {
  res.render('pages/careers', { title: 'Careers & Learning | CyberShield Hub' });
});

// Interactive Tools page
router.get('/tools', (req, res) => {
  res.render('pages/tools', { title: 'Interactive Tools | CyberShield Hub' });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('pages/contact', { title: 'Contact | CyberShield Hub' });
});

module.exports = router;
