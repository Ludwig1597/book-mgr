const auth = require('./auth/index');
const inviteCode = require('./invite-code');
const book = require('./book');
//app是当前koa的一个实例
module.exports = (app) => {
    //通过use去注册这个路由
    app.use(auth.routes());
    app.use(inviteCode.routes());
    app.use(book.routes());
};