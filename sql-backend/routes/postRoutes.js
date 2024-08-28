const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostsByUser,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:postId", getPostById);

router.post("/", protect, createPost);
router.put("/:postId", protect, updatePost);
router.delete("/:postId", protect, deletePost);
router.get("/user/:userId", getPostsByUser);

module.exports = router;
