const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config');
const { verify, getToken } = require('../../helpers/token');

const User = mongoose.model('User');

const router = new Router({
    prefix: '/profile',
})

router.post('/update/password', async(ctx) => {
    const {
        password,
        oldPassword,
    } = ctx.request.body;

    //用token取到当前的payload当前用户
    //const { _id } = verify(getToken(ctx));
    const payload = await verify(getToken(ctx));
    const { _id } = payload;

    const user = await User.findOne({
        _id,
    }).exec();
    //console.log(user, _id, payload);
    if (!user) {
        ctx.body = {
            msg: '用户不存在',
            code: 0,
        };

        return;
    }

    if (user.password !== oldPassword) {
        ctx.body = {
            msg: '原密码错误',
            code: 0,
        };
        return;
    }

    user.password = password;

    //const res=await user.save(); //这个res不要了，因为它会把我们的密码返回回来
    await user.save();

    ctx.body = {
        msg: '修改成功',
        code: 1,
    }
})
module.exports = router;