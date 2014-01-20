var express = require('express'),
	passport = require('passport'),
	stylus = require('stylus'),
	path = require('path'),
	socialAuth = require('./socialAuth'),
	db = require('../db'),
	MongoSkinSessionStore = require('connect-mongoskin'),
	moment = require('moment'),
	markdown = require('marked');

exports.config = function (app) {

	socialAuth.config();

	// Default configuration.
	app.configure(function () {

        // Redirect www.codetunnel.com requests to codetunnel.com.
        app.use(function (req, res, next) {
            if (req.get('host').match(/^www.*$/i))
                res.redirect('http://codetunnel.com' + req.url);
            else
                next();
        });

		// Never cache crap by default. (I'm looking at you IE)
		app.use(function (req, res, next) {
			res.header("Cache-Control", "no-cache, no-store, must-revalidate");
			res.header("Pragma", "no-cache");
			res.header("Expires", 0);
			next();
		});

		app.set('views', __dirname + '/../views');
		app.set('view engine', 'jade');
		app.use(express.favicon(__dirname + '/../public/images/favicon.ico'));
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser('Tide goes in, tide goes out.'));
		app.use(express.session({ store: new MongoSkinSessionStore(db) }));
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(stylus.middleware(__dirname + '/../public'));
		app.use(express.static(path.join(__dirname, '/../public')));

		app.locals = {
			title: process.env.BANNER_TEXT,
			bannerText: process.env.BANNER_TEXT,
			moment: moment,
			markdown: markdown
		};

		app.use(function (req, res, next) {
			if (!req.session.redirectUrl)
				req.session.redirectUrl = '/';
			res.renderView = function (viewName, viewModel) {
				if (!req.xhr)
					res.render(viewName + '_full', viewModel);
				else
					res.render(viewName, viewModel, function (err, view) {
						if (err) return next(err);
						res.json({
							title: viewModel.title || app.locals.title,
							bannerText: viewModel.bannerText || app.locals.bannerText,
							view: view,
							url: req.url
						});
					});
			};
			res.locals = {
				user: req.user,
				currentUrl: encodeURIComponent(req.url)
			};
			next();
		});

		// Handle routes for this request.
		app.use(app.router);

		// Handle 404 errors.
		app.use(function (req, res, next) {
			try {
				res.status(404);
				var viewModel = {
					title: 'Page Not Found',
					bannerText: 'Page Not Found',
					url: req.url
				};
				res.renderView('shared/404', viewModel);
			}
			catch (err) {
				next(err);
			}
		});

		// Handle server errors.
		app.use(function (err, req, res, next) {
			try {
				var statusCode = err.status || 500;
				res.status(statusCode);
				var viewModel = {
					title: statusCode + ' server error',
					bannerText: 'Uh oh!',
					statusCode: statusCode,
					error: err
				};
				res.renderView('shared/500', viewModel);
			}
			catch (ex) {
				console.log('Error while rendering error view.');
				console.log(ex.stack);
				next(err);
			}
		});
	});
    // Development configuration.
	app.configure('development', function () {
		app.use(express.errorHandler());
	});
};
