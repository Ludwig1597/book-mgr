const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const LogResponseSchema = new mongoose.Schema({
    logId: String,
    data: String, //成员 管理员

    meta: getMeta(),
});
LogResponseSchema.pre('save', preSave);

mongoose.model('LogResponse', LogResponseSchema);