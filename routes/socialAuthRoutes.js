var passport = require('passport');

function addHashTag (req, res, next) {
	if (req.param('hashTag')) req.session.redirectUrl += '#' + req.param('hashTag');
	next();
}

exports.register = function (app) {
	// Social auth provider routes.
	app.get('/auth/google', addHashTag, passport.authenticate('google', { scope: [ 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email' ] }));
	app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/user/create', failureRedirect: '/login' }));
	app.get('/auth/twitter', addHashTag, passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/user/create', failureRedirect: '/login' }));
	app.get('/auth/facebook', addHashTag, passport.authenticate('facebook', { scope: ['email'] }));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/user/create', failureRedirect: '/login' }));
};