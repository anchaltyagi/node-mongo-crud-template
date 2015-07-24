var chai = require("chai"),
	assert = chai.assert,
	expect = chai.expect,
	util = require("util")
groceryMongo = require('../models/grocery.js'),
groceryModel = {};

var config = {
	"mongo": {
		"host": "localhost",
		"db": "groceries"
	}
}


var groceryItem = {
	id: 123,
	name: "Wheat Floor",
	quantity: "10kb",
	price: 350,
	createdDate: null
}

describe('GROCERY MODEL TESTS', function() {
	before(function(done) {
		groceryModel = groceryMongo(config);
		if(groceryModel)
				done();
	});

	after(function(done) {
		done();
	});

	describe.skip('Grocery Add to mongo', function() {		
		it('insert a grocery item', function() {
			groceryModel.insert(groceryItem).then(function(item) {
				//console.log(groceryItem);
				expect(groceryItem.name).to.equal("Food1");
				done();
			}, function(err){
				//console.log(typeof err);
				done(err);
			});
		});
	});

	describe.skip('Get grocery item from mongo', function() {		
		it('get a grocery item', function() {
			groceryModel.get(groceryItem.id).then(function(item) {
				console.log(groceryItem);
				expect(groceryItem.name).to.equal("Anchal");
				done();
			});
		});
	});
});