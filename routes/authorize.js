module.exports = {
    isAuthor: function (req, res, next) {
        if (!req.user) return res.redirect('/login');
        if (!req.user.author) next(new Error('You are not authorized to access this area.'));
        next();
    },
	isPostAuthor: function (req, res, next) {
		if (!req.blogPost) return req.next();
		if (!req.user) return res.redirect('/login');

		if (req.user && req.user.author && req.blogPost.author._id.toString() === req.user._id.toString()) next();
		else next(new Error('You are not authorized to access this area.'));
	},
	isCommentAuthor: function (req, res, next) {
		if (!req.blogPost) return req.next();
		if (!req.user) return res.redirect('/login');

		var isPostAuthor = req.user.author && req.user._id.toString() === req.blogPost.author._id.toString(),
			isCommentAuthor = req.user._id.toString() === req.comment.author._id.toString();

		if (req.user && (isPostAuthor || isCommentAuthor)) next();
		else next(new Error('You are not authorized to access this area.'));
	},
	isAuthenticated: function (req, res, next) {
		if (!req.user) return res.redirect('/login');
		next();
	}
};