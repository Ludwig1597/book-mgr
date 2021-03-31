const getMeta = () => {
    return {
        createdAt: {
            type: Number,
            default: (new Date()).getTime(), //拿到当前时间戳
        },
        updatedAt: {
            type: Number,
            default: (new Date()).getTime(),
        },
    }
}

const preSave = function(next) {
        if (this.isNew) {
            const ts = Date.now();

            this['meta'].createdAt = ts;
            this['meta'].updatedAt = ts;
        } else {
            this['meta'].updatedAt = Date.now();
        }
        next();
    }
    //将这个方法导出出去
module.exports = {
    getMeta,
    preSave,
};