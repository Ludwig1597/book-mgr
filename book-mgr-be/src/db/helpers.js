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

//将这个方法导出出去
module.exports = {
    getMeta,
};