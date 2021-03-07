//每个文件都是一个模块
const Koa = require('koa');
//const Router = require('@koa/router');写到router文件夹下
//把刚刚写的业务逻辑引进来
const koaBody = require('koa-body');
const { connect } = require('./db');
const registerRouters = require('./routers'); //和上面的不能写反
const cors = require('@koa/cors'); //通过cors解决跨域问题

const app = new Koa();

connect().then(() => {
    app.use(cors());
    app.use(koaBody());
    registerRouters(app);
    //开启一个http服务
    //接受http请求，并作处理，处理完后响应
    app.listen(3000, () => {
        console.log('启动成功');
    });
});