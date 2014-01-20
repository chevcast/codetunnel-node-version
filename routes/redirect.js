module.exports = function (req, res, next) {
	req.session.redirectUrl = req.url;
	next();
};