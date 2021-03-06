var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models');

var Dish = mongoose.model('Dish');

var models = {
    User: mongoose.model('User'),
    Address: mongoose.model('Address'),
    Dish: mongoose.model('Dish'),
    Order: mongoose.model('Order'),
    Review: mongoose.model('Review'),
    Tag: mongoose.model('Tag')
};

var toSeed = require('../../testingseed.js');

describe('Dish model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (!mongoose.connection.db) {
            mongoose.connect(dbURI);
        }
        return toSeed(models, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Dish).to.be.a('function');
    });

    describe('statics', function() {

        describe('findAllDishes', function() {

            it('should exist', function() {
                expect(Dish.findAllDishes).to.be.a('function');
            });

            it('should return an array of dishes', function(done) {
                Dish.findAllDishes().then(function(dishes) {
                    expect(dishes).to.have.length.above(0);
                    done()
                });
            });

        });

        describe('findDish', function() {

            it('should exist', function() {
                expect(Dish.findDish).to.be.a('function');
            });

            it('should find one dish by id', function(done) {
                Dish.find({name:'Thai Curry'}).exec()
                .then(function(dish) {
                    return Dish.findDish(dish[0]._id)
                })
                .then(function(dish) {
                    expect(dish.name).to.equal('Thai Curry');
                    done()
                })
                .then(null, done);
            });

        });

        describe('findByTags', function() {

            it('should exist', function() {
                expect(Dish.findByTags).to.be.a('function');
            });

            it('should return an array of dishes', function(done) {
                Dish.findByTags([]).then(function(dishes) {
                    expect(dishes).to.have.length.above(0);
                    done();
                });
            });

            it('should return dishes that match a single tag or array of tags', function(done) {
                Dish.findByTags(['Paleo', 'Organic']).then(function(dishes) {
                    expect(dishes).to.have.length(1);
                    done()
                });
            });
        });

    });

})

