const mongoose = require('mongoose');
//导入公有的schema
const { getMeta, preSave } = require('../helpers');

const CharacterSchema = new mongoose.Schema({
    name: String,
    title: String, //成员 管理员
    power: Object, //是一个对象类型，对应的是一张权限表
    meta: getMeta(),
});
CharacterSchema.pre('save', preSave);

mongoose.model('Character', CharacterSchema);