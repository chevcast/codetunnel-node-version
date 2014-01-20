var blogController = require('../controllers/blogController'),
	db = require('../db'),
	authorize = require('./authorize'),
	storeRedirectUrl = require('./redirect');

exports.register = function (app) {
	// Bind post
	app.param('slug', function (req, res, next, slug) {
		db.collection('blogPosts').getPost(slug, function (err, blogPost) {
			if (err) next(err);
			else if (blogPost) req.blogPost = blogPost;
			next();
		});
	});

	app.param('commentId', function (req, res, next, commentId) {
		if (!req.blogPost) return next();
		req.blogPost.comments.forEach(function (comment) {
			if (comment._id.toString() === commentId.toString()) {
				req.comment = comment;
				next();
			}
		});
	});

	// Setup blog routes.
	app.post('/blog/post/:slug/comment/:commentId/delete', authorize.isCommentAuthor, blogController.deleteComment);
	app.post('/blog/post/:slug/comment/create', authorize.isAuthenticated, blogController.createComment);
	app.post('/blog/post/:slug/update', authorize.isPostAuthor, blogController.updatePost);
	app.get('/blog/post/:slug/edit', authorize.isPostAuthor, blogController.editPost);
	app.get(/^\/blog\/post\/(\d+)(\/.*)?$/i, function (req, res) {
		// Set named parameter to first capture group. Express, you need to figure this out >:(
		req.params.legacyId = req.params[0];
		blogController.legacyRedirect(req, res);
	});
	app.post('/blog/post/create', authorize.isAuthor, blogController.createPost);
	app.post('/blog/post/autosave', authorize.isAuthenticated, blogController.autoSave);
	app.get('/blog/post/new', authorize.isAuthor, blogController.newPost);
	app.get('/blog/post/:slug', storeRedirectUrl, blogController.post);
	app.get(/^(?:\/(?:blog\/)?page(\d+))?\/?$/i, storeRedirectUrl, function (req, res) {
		// Set named parameter to first capture group. Express, you need to figure this out >:(
		req.params.page = req.params[0];
		blogController.home(req, res);
	});
	app.get('/about', storeRedirectUrl, blogController.about);
	app.get('/resume', storeRedirectUrl, blogController.resume);
};