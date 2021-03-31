const auth = require('./auth/index');
const inviteCode = require('./invite-code');
const book = require('./book');
const inventoryLog = require('./inventory-log');
const user = require('./user');
const character = require('./character');
const log = require('./log');
const forgetPassword = require('./forget-password');
const bookClassify = require('./book-classify');
const profile = require('./profile');
const dashboard = require('./dashboard');
const upload = require('./upload');

//app是当前koa的一个实例
module.exports = (app) => {
    //通过use去注册这个路由
    app.use(auth.routes());
    app.use(inviteCode.routes());
    app.use(book.routes());
    app.use(inventoryLog.routes());
    app.use(user.routes());
    app.use(character.routes());
    app.use(log.routes());
    app.use(forgetPassword.routes());
    app.use(bookClassify.routes());
    app.use(profile.routes()); //注册成中间件
    app.use(dashboard.routes()); //注册成中间件
    app.use(upload.routes()); //注册成中间件
};