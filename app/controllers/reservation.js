/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Reservation = mongoose.model('Reservation'),
    _ = require('underscore');

/**
 * Find reservation by id
 */
exports.reservation = function(req, res, next, id) {
    Reservation.load(id, function(err, reservation) {
        if (err) return next(err);
        if (!reservation) return next(new Error('Failed to load reservation ' + id));
        req.reservation = reservation;
        next();
    });
};

/**
 * Create a reservation
 */
exports.create = function(req, res) {
    var reservation = new Reservation(req.body);

    reservation.save(function(err) {
        if (err) {
            return res.render('error', {
                status: 500 //TODO return error message
            });
        } else {
            res.jsonp(reservation); //TODO why jsonp?
        }
    });
};

/**
 * Update a reservation
 */
exports.update = function(req, res) {
    var reservation = req.reservation;

    reservation = _.extend(reservation, req.body);

    reservation.save(function(err) {
        res.jsonp(reservation);
    });
};

/**
 * Delete a reservation
 */
exports.destroy = function(req, res) {
    var reservation = req.reservation;

    reservation.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(reservation);
        }
    });
};

/**
 * Show a reservation
 */
exports.show = function(req, res) {
    res.jsonp(req.reservation);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Reservation.find().exec(function(err, reservations) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(reservations);
        }
    });
};
