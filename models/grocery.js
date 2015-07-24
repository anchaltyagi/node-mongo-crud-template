module.exports = function(config) {
	var mongoose = require('mongoose');
	var groceryItemSchema = new mongoose.Schema({
		id: String,
		name: String,
		quantity: String,
		price: Number,
		createdDate: Date
	});
	var db = mongoose.connect('mongodb://' + config.mongo.host + '/' + config.mongo.db);
	var connection = mongoose.connection;
	mongoose.connection.on('error', function(err) {
		console.log(err);
	});

	var groceryModel = db.model('GroceriesData', groceryItemSchema);

	var get = function(id, callback) {
		return groceryModel.findOne({
			'id': id
		}).lean().exec(callback);
	}

	var find = function(searchQuery) {
		return groceryModel.find(searchQuery)
			.lean()
			.exec();
	}

	var insert = function(groceryItem) {
		return groceryModel.create(groceryItem);
	}

	var update = function(id, groceryItem, callback) {
		console.log(groceryItem);
		groceryModel.update({
				'id': id
			}, {$set: {'name':groceryItem.name, 'quantity': groceryItem.quantity, 'price': groceryItem.price}}).exec(callback);
	}

	var del = function(id, callback) {
		groceryModel.findOne({
			'id': id
		}, function(err, groceryItem) {
			if (groceryItem) {
				groceryModel.remove(function(err, object) {
					callback(err, groceryItem);
				});
			}
		});
	}

	return {
		get: get,
		find: find,
		insert: insert,
		update: update,
		del: del
	};
}