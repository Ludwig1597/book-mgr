const mongoose = require('mongoose');
//导入公有的schema
const { getMeta } = require('../helpers');

const InviteCodeSchema = new mongoose.Schema({
    //邀请码
    code: String,
    //用来注册哪个账户
    user: String,

    meta: getMeta(),
});

//定义完要进行注册
mongoose.model('InviteCode', InviteCodeSchema);