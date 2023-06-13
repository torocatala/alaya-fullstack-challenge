const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const ImageService = require('../services/image.service')

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (req, res) => {

	Post.find().sort('-dateAdded').exec((err, posts) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({
			posts
		});
	});
};

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
addPost = async (req, res) => {
	
	if (!req.body.post.username || !req.body.post.title || !req.body.post.content) {
		return res.status(403).end();
	}

	try {
		const newPost = new Post(req.body.post);
		const imgService = new ImageService();

		// Sanitizes the inputs that the user typed manually and appending values to our Post object
		newPost.title = sanitizeHtml(newPost.title);
		newPost.content = sanitizeHtml(newPost.content);

		newPost.slug = slug(newPost.title.toLowerCase(), {
			lowercase: true
		});
		newPost.cuid = cuid();

		// If post contains image, we proceed to save it, by calling a method of ImageService class
		if (req.body.post.image) {
			const response = await imgService.upload(req.body.post.image);
			
			// If the image was uploaded correctly, we append the url to our Post object.
			if (response.success) {
				newPost.image_url = response.url
			}
		}
		
		// We create the post sending our Post object.
		newPost.save((err, saved) => {
			return res.send({ success: true, post: saved });
		});
	} 
	catch (error) {
		console.log('Unexpected error:', error);
		return res.status(409).json({success: false, msg: 'There was an issue with your request.', err: error});
	}

	
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
getPost = async (req, res) => {
	Post.findOne({
		cuid: req.params.cuid
	}).exec((err, post) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({
			post
		});
	});
};

/**
 * Delete a post and it's image from Cloudinary
 * @param req
 * @param res
 * @returns void
 */
deletePost = async (req, res) => {
	const imgService = new ImageService();

	const post = await Post.findOne({ cuid: req.params.cuid });

	post.remove( async () => {
		await imgService.deleteImage(post.image_url);
		res.status(200).end();
	});
};

module.exports = {
	getPosts,
	addPost,
	getPost,
	deletePost
};