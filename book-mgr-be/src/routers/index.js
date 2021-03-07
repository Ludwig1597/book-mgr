const auth = require('./auth/index');

//app是当前koa的一个实例
module.exports = (app) => {
    //通过use去注册这个路由
    app.use(auth.routes());
}