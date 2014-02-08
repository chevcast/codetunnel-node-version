var demosController = require('../controllers/demosController');

exports.register = function (app) {
	app.get('/demos/shotgun', demosController.shotgunDemo);
};

