const Router = require('@koa/router');
const mongoose = require('mongoose');
//const { getBody } = require('../../helpers/utils'); //默认会去找index
const { v4: uuidv4 } = require('uuid');
const Character = mongoose.model('Character'); //去拿到InventoryLog的模型

const router = new Router({
    prefix: '/character',
})

router.get('/list', async(ctx) => {
    const list = await Character.find().exec();
    ctx.body = {
        data: list,
        code: 1,
        msg: '获取列表成功',
    }
});
module.exports = router;