var blogRoutes = require('./blogRoutes'),
	userRoutes = require('./userRoutes'),
	socialAuthRoutes = require('./socialAuthRoutes'),
	contentRoutes = require('./contentRoutes')
    demoRoutes = require('./demoRoutes');

exports.register = function (app) {
	blogRoutes.register(app);
	userRoutes.register(app);
	socialAuthRoutes.register(app);
	contentRoutes.register(app);
    demoRoutes.register(app);
};
