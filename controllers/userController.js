var db = require('../db');

exports.unsubscribe = function (req, res) {
	db.collection('notifications').findById(req.param('notificationId'), function (err, notification) {
		if (err) return req.next(err);
		if (!notification) return req.next(new Exception("No notification was found."));
        db.collection('notifications').removeById(req.param('notificationId'), function (err) {
            if (err) return req.next(err);
			var viewModel = {
				message: 'Notifications for this post were successfully disabled.'
			};
			res.renderView('shared/message', viewModel);
		});
	});
};

exports.login = function (req, res) {
	var viewModel = {
		title: 'Authenticate'
	};
	res.renderView('user/login', viewModel);
};

exports.profile = function (req, res) {
	var viewModel = {
		title: 'Create User'
	};
	if (!req.user.email)
		res.render('user/create', viewModel);
	else
		res.redirect(req.session.redirectUrl);
};

exports.create = function (req, res) {
	db.collection('users').updateById(req.user._id, { $set: { email: req.body.email.toLowerCase() }});
	res.redirect(req.session.redirectUrl);
};