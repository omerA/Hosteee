/**
 * Created by omeramsel on 11/25/13.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/*
 * Room Schema
 */

var ReservationSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    start: {
        type: Date
    },

    end: {
        type: Date
    },

    approved: {
        type: Boolean,
        default: false
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    telephone: {
        type: String,
        default: 0
    },
    freeText: {
        type: String,
        default: ''
    }
});

/**
 * Statics
 */
ReservationSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};

mongoose.model('Reservation', ReservationSchema);