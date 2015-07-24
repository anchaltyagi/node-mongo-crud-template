var uuid = require('uuid');
var groceryModel;
exports.init = function(config) {
	var grocery = require('../models/grocery.js');
	groceryModel = grocery(config);
}

exports.get = function(id, callback) {
	return groceryModel.get(id, callback);
}

exports.find = function(searchQuery) {
	return groceryModel.find(searchQuery);
}

exports.insert = function(groceryItem) {
	if (!groceryItem.id) groceryItem.id = uuid.v4();
	if (!groceryItem.createdDate) groceryItem.createdDate = new Date();
	return groceryModel.insert(groceryItem);
}

exports.update = function(id, groceryItem, callback) {
	return groceryModel.update(id, groceryItem);
}

exports.delete = function(id, callback) {
	groceryModel.del(id);
}