var azure = require('azure');

exports.blobStorage = function (req, res) {

	var blobService = azure.createBlobService(),
		containerName = 'miscellaneous',
		path = req.params[0],
		blobName = path.toLowerCase();

	if (path.indexOf('/') !== -1) {
		blobName = path.substr(path.lastIndexOf('/') + 1).toLowerCase();
		containerName = path.substr(0, path.lastIndexOf('/')).replace(/[\\\/& _]/g, '-').toLowerCase();
	}

	blobService.listContainers(function (err, containers) {
		if (err) return req.next(err);
		var containerExists = false;
		containers.forEach(function (container) {
			if (!containerExists) containerExists = container.name.toLowerCase() === containerName;
		});
		if (!containerExists) req.next();
		else {
			blobService.listBlobs(containerName, function(err, blobs){
				if (err) return req.next(err);
				var blobExists = false;
				blobs.forEach(function (blob) {
					if (!blobExists) blobExists = blob.name.toLowerCase() === blobName;
				});
				if (!blobExists) req.next();
				else {
					blobService.getBlobToStream(containerName, blobName, res, function(err) {
						if (err) return req.next(err);
						res.end();
					});
				}
			});
		}
	});

};