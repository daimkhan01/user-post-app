const pool = require("../db/db");

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const [result] = await pool.query(
      "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)",
      [userId, title, content]
    );

    const [user] = await pool.query(
      "SELECT name, email FROM users WHERE id = ?",
      [userId]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      content,
      userId,
      userName: user[0].name,
      userEmail: user[0].email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all posts with pagination and search
exports.getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 9;
  const searchTerm = req.query.search || "";
  const offset = (page - 1) * pageSize;

  try {
    const [posts] = await pool.query(
      `SELECT posts.*, users.name AS userName, users.email AS userEmail 
       FROM posts 
       JOIN users ON posts.user_id = users.id 
       WHERE posts.title LIKE ? OR posts.content LIKE ?
       ORDER BY posts.created_at DESC
       LIMIT ? OFFSET ?`,
      [`%${searchTerm}%`, `%${searchTerm}%`, pageSize, offset]
    );

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM posts WHERE title LIKE ? OR content LIKE ?`,
      [`%${searchTerm}%`, `%${searchTerm}%`]
    );

    const totalPages = Math.ceil(total / pageSize);

    res.status(200).json({
      posts,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const [post] = await pool.query(
      `SELECT posts.*, users.name AS userName, users.email AS userEmail 
       FROM posts 
       JOIN users ON posts.user_id = users.id 
       WHERE posts.id = ?`,
      [postId]
    );

    if (!post.length) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const [post] = await pool.query("SELECT * FROM posts WHERE id = ?", [
      postId,
    ]);
    if (!post.length) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post[0].user_id !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await pool.query(
      "UPDATE posts SET title = ?, content = ?, updated_at = NOW() WHERE id = ?",
      [title, content, postId]
    );

    const [updatedPost] = await pool.query("SELECT * FROM posts WHERE id = ?", [
      postId,
    ]);

    res.status(200).json(updatedPost[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const [post] = await pool.query("SELECT * FROM posts WHERE id = ?", [
      postId,
    ]);
    if (!post.length) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post[0].user_id !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Delete the post
    await pool.query("DELETE FROM posts WHERE id = ?", [postId]);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//getPostsByUser to be consistent
exports.getPostsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const [posts] = await pool.query("SELECT * FROM posts WHERE user_id = ?", [
      userId,
    ]);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
