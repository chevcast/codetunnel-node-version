var async = require('async'),
  db = require('mongoskin').db(process.env.MONGODB_CONNECTION_STRING, {
	  auto_reconnect: true,
	  poolSize: 3,
	  socketOptions: {
		  keepAlive: 1,
		  timeout: 0,
		  noDelay: true
	  },
	  safe: false
  });

db.bind('blogPosts', {
	// Retrieve blog post by slug and populate the author.
	getPost: function (slug, fn) {
		this.findOne({ slug: slug }, function (err, blogPost) {
			if (err) return fn(err);
			if (!blogPost) return fn();
			blogPost.comments.sort(function(a, b) {
				a = new Date(a.date);
				b = new Date(b.date);
				return a>b ? -1 : a<b ? 1 : 0;
			});
			var operationsArray = [];
			operationsArray.push(function (callback) {
				db.collection('users').findOne({ _id: blogPost.author }, function (err, user) {
					if (err) return callback(err);
					blogPost.author = user;
					callback(null, null);
				});
			});
            blogPost.comments.forEach(function (comment) {
                operationsArray.push(function (callback) {
                    db.collection('users').findById(comment.author, function (err, user) {
                        if (err) return callback(err);
                        comment.author = user;
                        callback(null, null);
                    });
                });
            });
            async.parallel(operationsArray, function (err) {
                fn(err, blogPost);
			});
		});
	},
	// Retrieve a page of blog posts and populate the authors.
	getPage: function (page, itemsPerPage, fn) {
		this.find({}, { skip: ((page - 1) * itemsPerPage), limit: itemsPerPage, sort: { date: -1 } }).toArray(function (err, blogPosts) {
			if (err) return fn(err);
			if (!blogPosts) return fn();
			var operationsArray = [];
			blogPosts.forEach(function (blogPost) {
				operationsArray.push(function (callback) {
					db.collection('users').findOne({ _id: blogPost.author }, function (err, user) {
						if (err) return callback(err);
						blogPost.author = user;
						callback(null, blogPost);
					});
				});
			});
			async.parallel(operationsArray, function (err, blogPosts) {
				if (err) return fn(err);
				db.collection('blogPosts').count(function (err, totalPosts) {
					if (err) return fn(err);
					fn(null, {
						totalPages: Math.ceil(totalPosts / itemsPerPage),
						blogPosts: blogPosts
					});
				});
			});
		});
	}
});

module.exports = db;