/**
 * Created by omeramsel on 11/25/13.
 */
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Room = mongoose.model('Room'),
    _ = require('underscore');

/**
 * Find room by id
 */
exports.room = function(req, res, next, id) {
    Room.load(id, function(err, room) {
        if (err) return next(err);
        if (!room) return next(new Error('Failed to load room ' + id));
        req.room = room;
        next();
    });
};

/**
 * Create a room
 */
exports.create = function(req, res) {
    var room = new Room(req.body);

    room.save(function(err) {
        if (err) {
            return res.render('error', {
                status: 500 //TODO return error message
            });
        } else {
            res.jsonp(room); //TODO why jsonp?
        }
    });
};

/**
 * Update a room
 */
exports.update = function(req, res) {
    var room = req.room;

    room = _.extend(room, req.body);

    room.save(function(err) {
        res.jsonp(room);
    });
};

/**
 * Delete a room
 */
exports.destroy = function(req, res) {
    var room = req.room;

    room.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(room);
        }
    });
};

/**
 * Show a room
 */
exports.show = function(req, res) {
    //res.jsonp(req.room);
    res.render('index', {
       room: req.room ? JSON.stringify(req.room) : "null"
    });
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Room.find().exec(function(err, rooms) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(rooms);
        }
    });
};
