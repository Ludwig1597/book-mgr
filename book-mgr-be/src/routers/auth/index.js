const Router = require('@koa/router');
const mongoose = require('mongoose');

const User = mongoose.model('User');
// /auth/register
const authRouter = new Router({
    //前缀
    prefix: '/auth'
})

// 注册接口逻辑模块
authRouter.post('/register', async(ctx) => {

    //ctx.body = '注册成功';
    const {
        account,
        password,
    } = ctx.request.body;

    const one = await User.findOne({
        account,
    }).exec(); //寻找是一个异步操作，要等找完再说

    if (one) {
        ctx.body = {
            code: 0,
            msg: '已存在该用户',
            data: null,
        };
        return
    }

    const user = new User({
        account,
        password,
    });



    const res = await user.save();

    ctx.body = {
            code: 1,
            msg: '注册成功',
            data: res,
        }
        //console.log(ctx.request.body);
})

//登入接口
authRouter.post('/login', async(ctx) => {
    ctx.body = '登入成功';
})

module.exports = authRouter;





















//app.use(authRouter.routes()); //注册中间件


/* const bookRouter = new Router({
    //前缀
    prefix: '/book'
})

bookRouter.get('/add', async(ctx) => {
    ctx.body = '添加成功';
})

app.use(bookRouter.routes()); */