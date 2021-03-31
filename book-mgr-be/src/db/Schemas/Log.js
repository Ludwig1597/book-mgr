const mongoose = require('mongoose');
//导入公有的schema
const { getMeta, preSave } = require('../helpers');

const LogSchema = new mongoose.Schema({
    user: {
        account: String,
        id: String,
    },
    request: {
        method: String,
        url: String,
        //responseBody: String,
        status: Number,
    },

    startTime: Number,
    endTime: Number,

    show: Boolean,

    meta: getMeta(),
});
LogSchema.pre('save', preSave);

mongoose.model('Log', LogSchema);