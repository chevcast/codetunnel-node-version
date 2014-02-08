var contentController = require('../controllers/contentController');

exports.register = function (app) {
	app.get('/content/*', contentController.blobStorage);
};
