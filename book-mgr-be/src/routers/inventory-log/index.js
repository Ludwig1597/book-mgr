const Router = require('@koa/router');
const mongoose = require('mongoose');
//const { getBody } = require('../../helpers/utils'); //默认会去找index
const { v4: uuidv4 } = require('uuid');
const InventoryLog = mongoose.model('InventoryLog'); //去拿到InventoryLog的模型

const router = new Router({
    prefix: '/inventory-log',
})

router.get('/list', async(ctx) => {
    const {
        type,
    } = ctx.query;

    let {
        size,
        page,
    } = ctx.query;

    size = Number(size);
    page = Number(page);

    const list = await InventoryLog
        .find({
            type,
        })
        .sort({
            _id: -1, //倒序排序
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();
    const total = await InventoryLog.find({
        type,
    }).countDocuments().exec();
    ctx.body = {
        data: {
            total,
            list,
            page,
            size,
        },
        code: 1,
        msg: '获取列表成功'
    };
});
module.exports = router;