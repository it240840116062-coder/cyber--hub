const { getDbConnection } = require('../db/database');

module.exports.blog_list = async (req, res) => {
  try {
    const db = await getDbConnection();
    let query = `
      SELECT p.id, p.title, p.slug, p.category, p.excerpt, p.image_url, p.created_at, u.fullName as author_name 
      FROM posts p
      JOIN users u ON p.author_id = u.id
    `;
    const params = [];

    if (req.query.category) {
      query += ` WHERE p.category = ?`;
      params.push(req.query.category);
    }
    
    if (req.query.search) {
      query += req.query.category ? ` AND` : ` WHERE`;
      query += ` (p.title LIKE ? OR p.content LIKE ?)`;
      params.push(`%${req.query.search}%`, `%${req.query.search}%`);
    }

    query += ` ORDER BY p.created_at DESC`;

    const posts = await db.all(query, params);
    res.render('pages/blog/index', { title: 'Blog | CyberShield Hub', posts, search: req.query.search, category: req.query.category });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports.blog_single = async (req, res) => {
  try {
    const db = await getDbConnection();
    const post = await db.get(`
      SELECT p.*, u.fullName as author_name 
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.slug = ?
    `, [req.params.slug]);

    if (!post) {
      return res.status(404).render('pages/404', { title: 'Not Found' });
    }

    const comments = await db.all(`
      SELECT c.content, c.created_at, u.fullName as author_name
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at DESC
    `, [post.id]);

    const relatedPosts = await db.all(`
      SELECT id, title, slug, image_url, created_at FROM posts 
      WHERE category = ? AND id != ? 
      ORDER BY created_at DESC LIMIT 3
    `, [post.category, post.id]);

    res.render('pages/blog/single', { title: `${post.title} | CyberShield Hub`, post, comments, relatedPosts });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports.blog_create_get = (req, res) => {
  res.render('pages/blog/create', { title: 'Create Post | CyberShield Hub' });
};

module.exports.blog_create_post = async (req, res) => {
  const { title, slug, category, content, excerpt, image_url } = req.body;
  try {
    const db = await getDbConnection();
    await db.run(`
      INSERT INTO posts (title, slug, category, author_id, content, excerpt, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [title, slug, category, req.user.id, content, excerpt, image_url]);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).send('Error creating post. Slug might not be unique.');
  }
};

module.exports.blog_edit_get = async (req, res) => {
  try {
    const db = await getDbConnection();
    const post = await db.get(`SELECT * FROM posts WHERE id = ?`, [req.params.id]);
    if (!post) return res.status(404).send('Not found');
    if (post.author_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).send('Forbidden');
    }
    res.render('pages/blog/edit', { title: 'Edit Post | CyberShield Hub', post });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports.blog_edit_post = async (req, res) => {
  const { title, slug, category, content, excerpt, image_url } = req.body;
  try {
    const db = await getDbConnection();
    await db.run(`
      UPDATE posts SET title = ?, slug = ?, category = ?, content = ?, excerpt = ?, image_url = ?
      WHERE id = ? AND (author_id = ? OR ? = 'admin')
    `, [title, slug, category, content, excerpt, image_url, req.params.id, req.user.id, req.user.role]);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).send('Error updating post');
  }
};

module.exports.blog_delete_post = async (req, res) => {
  try {
    const db = await getDbConnection();
    // Delete comments first due to FK constraint
    await db.run(`DELETE FROM comments WHERE post_id = ?`, [req.params.id]);
    await db.run(`DELETE FROM posts WHERE id = ? AND (author_id = ? OR ? = 'admin')`, [req.params.id, req.user.id, req.user.role]);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Error deleting post');
  }
};

module.exports.blog_comment_post = async (req, res) => {
  const { content } = req.body;
  try {
    const db = await getDbConnection();
    const post = await db.get(`SELECT id FROM posts WHERE slug = ?`, [req.params.slug]);
    if (!post) return res.status(404).send('Not found');

    await db.run(`
      INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)
    `, [post.id, req.user.id, content]);
    
    res.redirect(`/blog/${req.params.slug}`);
  } catch (err) {
    res.status(500).send('Error adding comment');
  }
};
