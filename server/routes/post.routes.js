const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const {validateTokenJwt} = require("../controllers/middlewares/validateTokenJwt.middleware");
const multer = require('multer');
const upload = multer();

/**
 * Get all Posts
 * @route POST /api/posts
 * @param validateTokenJwt - Validate the JWT token to protect this route
 */
router.route('/posts').get(validateTokenJwt, PostController.getPosts);

/**
 * Get one post by cuid
 * @route POST /api/posts/:cuid'
 * @param validateTokenJwt - Validate the JWT token to protect this route
 */
router.route('/posts/:cuid').get(validateTokenJwt, PostController.getPost);

/**
 * Add a new Post
 * @route POST /api/posts
 * @param validateTokenJwt - Validate the JWT token to protect this route
 */
router.route('/posts').post(validateTokenJwt, PostController.addPost);

/**
 * Delete a post by cuid
 * @route DELETE /api/posts/:cuid
 * @param validateTokenJwt - Validate the JWT token to protect this route
 */
router.route('/posts/:cuid').delete(validateTokenJwt, PostController.deletePost);

module.exports = router;
