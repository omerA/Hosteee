/**
 * Created by omeramsel on 11/25/13.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/*
 * Room Schema
 */

var RoomSchema = new Schema({
    capacity: {
       type: Number,
       default: 2
    },

    name: {
        type: String,
        default: ''
    },

    price: {
        type: Number,
        default: 0
    }
});

/**
 * Statics
 */
RoomSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};

mongoose.model('Room', RoomSchema);