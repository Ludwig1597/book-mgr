require('./Schemas/User'); //require一个文件就会去执行一个文件，执行之后schema就会被注册
require('./Schemas/InviteCode');
require('./Schemas/Book'); //注册好以后我们就可以通过mongoose.model去拿到注册好的模型去做一个数据库的操作
require('./Schemas/InventoryLog'); //注册完毕
require('./Schemas/Character'); //注册完毕
require('./Schemas/Log'); //注册完毕
require('./Schemas/LogResponse'); //注册完毕
require('./Schemas/ForgetPassword');
require('./Schemas/BookClassify');

const mongoose = require('mongoose');
//明确三件事
//给哪个数据库
//哪个集合
//添加什么格式的文档

//Schema一套规则
//Model可以理解成是根据Schema生成的一套方法，这套方法用来操作集合和集合下的文档

const connect = () => {
    //改造成promise
    return new Promise((resolve) => {
        //连接数据库
        mongoose.connect('mongodb://localhost/book-mgr', { useNewUrlParser: true });
        //当数据库被打开时做一些事情
        mongoose.connection.on('open', () => {
            console.log('数据库连接成功');

            resolve();
        });
    });
};

//connect();
module.exports = {
    connect,
};