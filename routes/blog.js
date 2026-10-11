const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/', blogController.blog_list);

// Admin / Author routes
router.get('/create', requireAuth, requireAdmin, blogController.blog_create_get);
router.post('/create', requireAuth, requireAdmin, blogController.blog_create_post);

router.get('/edit/:id', requireAuth, requireAdmin, blogController.blog_edit_get);
router.post('/edit/:id', requireAuth, requireAdmin, blogController.blog_edit_post);

router.post('/delete/:id', requireAuth, requireAdmin, blogController.blog_delete_post);

// Single post view (must be after /create, /edit etc to avoid matching 'create' as a slug)
router.get('/:slug', blogController.blog_single);
router.post('/:slug/comment', requireAuth, blogController.blog_comment_post);

module.exports = router;
