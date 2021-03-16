const Router = require('@koa/router');
const mongoose = require('mongoose');
//const { getBody } = require('../../helpers/utils'); //默认会去找index
const { v4: uuidv4 } = require('uuid');
const InviteCode = mongoose.model('InviteCode');
// /auth/register
const router = new Router({
    //前缀
    prefix: '/invite'
})

router.get('/add', async(ctx) => {
    //uuid通过特定算法生成唯一的id
    const code = new InviteCode({
        code: uuidv4(),
        user: '',
    });

    const saved = await code.save();

    ctx.body = {
        code: 1,
        data: saved,
        msg: '创建成功'
    }
})


module.exports = router;