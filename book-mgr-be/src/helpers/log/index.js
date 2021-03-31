const { verify, getToken } = require('../token');
const mongoose = require('mongoose');

const Log = mongoose.model('Log');
const LogResponse = mongoose.model('LogResponse');

const logMiddleware = async(ctx, next) => {
    const startTime = Date.now();
    //怎么知道事件结束了就用next来分隔
    await next();

    //通过解析token拿到用户的相关数据
    let payload = {};

    try {
        payload = await verify(getToken(ctx));
        //verify方法来自be/src/helpers/token/index.js,返回的是一个promise
    } catch (e) {
        payload = {
            account: '未知用户',
            id: '',
        };
    }

    const url = ctx.url;
    const method = ctx.method;
    const status = ctx.status;
    let show = true;

    if (url === '/log/delete') {
        show = false;
    }

    //解析responseBody也记得我们数据库中
    let responseBody = '';
    if (typeof ctx.body === 'string') {
        responseBody = ctx.body;
    } else {
        try {
            responseBody = JSON.stringify(ctx.body);
        } catch {
            responseBody = '';
        }

    }

    //console.log(url, payload);
    const endTime = Date.now();

    const log = new Log({
        user: {
            account: payload.account,
            id: payload.id,
        },
        request: {
            url,
            //responseBody,
            method,
            status,
        },
        endTime,
        startTime,
        show,
    });


    log.save();

    const logRes = new LogResponse({
        logId: log._id,
        data: responseBody,
    });

    logRes.save();

};

module.exports = {
    logMiddleware,
}