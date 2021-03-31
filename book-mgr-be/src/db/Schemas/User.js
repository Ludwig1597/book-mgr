const mongoose = require('mongoose');
//导入公有的schema
const { getMeta, preSave } = require('../helpers');

const UserSchema = new mongoose.Schema({
    account: String,
    password: String,
    character: String, //文案 类型/权限

    meta: getMeta(),
});
UserSchema.pre('save', preSave);
//定义完要进行注册
mongoose.model('User', UserSchema);