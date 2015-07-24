var chai = require("chai"),
	assert = chai.assert,
	expect = chai.expect,
	util = require("util"),
	request = require('supertest');

var groceryItem = {
	id: 1,
	name: "Wheat Floor",
	quantity: "10 kg",
	price: 534,
	createdDate: null
}

describe('GROCERY REST TESTS', function() {
	var HOST = "http://127.0.0.1:3000";
	request = request(HOST);

	before(function(done) {
		done();
	});

	after(function(done) {
		done();
	});

	describe('Grocery Add', function() {
		it('insert a grocery item', function() {
			request.post('/grocery/items')
				.send(groceryItem)
				.set('Accept', 'application/json')
				.expect(200)
				.end(function(err, result) {
					if (err) {
						console.log(err);
						done(err);
					} else {
						done();
					}
				});
		});
	});

	describe('Grocery Get', function() {
		it('get a grocery item by id', function() {
			request.get('/grocery/items/1')
				.set('Accept', 'application/json')
				.expect(200)
				.end(function(err, results) {
					if (err) {
						console.log(err);
						done(err);
					} else {
						expect(results.body.name).to.equal("Wheat Floor");
						done();
					}
				});
		});
	});

	describe('Grocery Update', function() {
		it('update a grocery item', function() {
			groceryItem.name = "Oil";
			groceryItem.price = 700;
			groceryItem.quantity = "5 ltrs";
			request.put('/grocery/items/1')
				.send(groceryItem)
				.set('Accept', 'application/json')
				.expect(200)
				.end(function(err, result) {
					if (err) {
						console.log(err);
						done(err);
					} else {
						done();
					}
				});
		});
	});


	describe.skip('Grocery Delete', function() {
		it('delete a grocery item by id', function() {
			request.delete('/grocery/items/1')
				.set('Accept', 'application/json')
				.expect(200)
				.end(function(err, results) {
					console.log(results);
					if (err) {
						console.log(err);
						done(err);
					} else {
						expect(results.body.name).to.equal("Wheat Floor");
						done();
					}
				});
		});
	});
});