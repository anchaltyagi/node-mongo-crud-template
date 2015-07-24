module.exports = function(server, config) {
	var groceryCtrl = require('../controller/grocery.js');
	groceryCtrl.init(config);

	server.get('/grocery/items/:itemId', function(req, res, next) {
		groceryCtrl.get(req.params.itemId, function(err, groceryItem) {
			if (err) {
				console.error('SERVICE ERR: ' + err);
				res.status(500).send(err);
			}
			res.send(groceryItem);
		});
	});

	server.put('/grocery/items/:itemId', function(req, res, next) {
		groceryCtrl.update(req.params.itemId, req.body, function(err, obj) {
			if (err) {
				res.status(500).send(err);
			} else if (obj) {
				res.status(200).send("Updated grocery item");
			} else {
				res.status(404).send('NOT FOUND');
			}
		});
	});

	server.post('/grocery/items', function(req, res, next) {
		groceryCtrl.insert(req.body)
			.then(function(groceryItem) {
				if (!groceryItem) {
					res.status(404).send('NOT FOUND');
				} else {
					res.send(groceryItem);
				}
			})
			.end(function(err) {
				console.error('SERVICE ERR: ' + util.inspect(err));
				res.status(500).send(err);
			});
	});

	server.del('/grocery/items/:itemId', function(req, res, next) {
		groceryCtrl.delete(req.params.itemId, function(err, obj) {
			if (err) {
				res.status(500).send(err);
			} else if (obj) {
				res.status(200).send("Deleted grocery item");
			} else {
				res.status(404).send('NOT FOUND');
			}
		});
	});
}