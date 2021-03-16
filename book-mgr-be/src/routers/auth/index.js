const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils'); //默认会去找index
const jwt = require('jsonwebtoken');
//拿到数据库中的表/文档
const User = mongoose.model('User');
const InviteCode = mongoose.model('InviteCode');
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
        inviteCode,
    } = getBody(ctx);
    //做表单校验
    if (account === '' || password === '' || inviteCode === '') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        };
        return;
    }
    //找有没有邀请码
    const findCode = await InviteCode.findOne({
        code: inviteCode,
    }).exec();

    // 没找到邀请码
    if ((!findCode) || findCode.user) {
        ctx.body = {
            code: 0,
            msg: '邀请码不正确',
            data: null,
        };
        return;
    }


    //去找account 为传递上来“account”的用户
    const one = await User.findOne({
        account,
    }).exec(); //寻找是一个异步操作，要等找完再说
    //如果有 表示已经存在
    if (one) {
        ctx.body = {
            code: 0,
            msg: '已存在该用户',
            data: null,
        };
        return;
    }
    //创建一个用户
    const user = new User({
        account,
        password,
    });


    //把创建的用户同步到mongodb
    const res = await user.save();

    findCode.user = res._id;
    findCode.meta.updatedAt = new Date().getTime();
    await findCode.save();

    //响应成功
    ctx.body = {
            code: 1,
            msg: '注册成功',
            data: res,
        }
        //console.log(ctx.request.body);
})

//登入接口
authRouter.post('/login', async(ctx) => {
    const {
        account,
        password,
    } = getBody(ctx);
    if (account === '' || password === '') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        };
        return;
    }

    const one = await User.findOne({
        account,
    }).exec();
    //console.log(one.password, password);
    if (one) {

        ctx.body = {
            code: 0,
            msg: '用户名或密码错误',
            data: null,
        }
    }

    const user = {
        account: one.account,
        _id: one._id,
    };
    if (one.password === password) {
        ctx.body = {
            code: 1,
            msg: '登入成功',
            data: {
                user,
                //token: jwt.sign(one.toJSON(), 'book-mgr'),
                token: jwt.sign(user, 'book-mgr'),
            },
        };
        //alert('登入成功');
        return;
    }
    //console.log(one);
    ctx.body = {
        code: 0,
        msg: '用户名或密码错误',
        data: null,
    };

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