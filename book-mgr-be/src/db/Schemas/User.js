const mongoose = require('mongoose');
//导入公有的schema
const { getMeta } = require('../helpers');

const UserSchema = new mongoose.Schema({
    account: String,
    password: String,

    meta: getMeta(),
});

//定义完要进行注册
mongoose.model('User', UserSchema);