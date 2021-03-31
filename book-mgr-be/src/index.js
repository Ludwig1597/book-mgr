//每个文件都是一个模块
const Koa = require('koa');
//const Router = require('@koa/router');写到router文件夹下
//把刚刚写的业务逻辑引进来
const koaBody = require('koa-body');
const { connect } = require('./db');
const registerRouters = require('./routers'); //和上面的不能写反
const koaStatic = require('koa-static');
const { middleware: koaJwtMiddleware, checkUser, catchTokenError } = require('./helpers/token');
const { logMiddleware } = require('./helpers/log');
const cors = require('@koa/cors'); //通过cors解决跨域问题
const path = require('path');
const config = require('./project.config');

const app = new Koa();

app.use(koaStatic(path.resolve(__dirname, '../public')));

connect().then(() => {
    app.use(cors());
    app.use(koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 200 * 1024 * 1024,
        }
    }));

    app.use(catchTokenError);

    //注释掉这句话可以关掉token校验
    koaJwtMiddleware(app);

    app.use(checkUser);

    app.use(logMiddleware);

    registerRouters(app);
    //开启一个http服务
    //接受http请求，并作处理，处理完后响应
    app.listen(config.SERVER_PORT, () => {
        console.log('启动成功');
    });
});