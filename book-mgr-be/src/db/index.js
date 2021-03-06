const mongoose = require('mongoose');
//明确三件事
//给哪个数据库
//哪个集合
//添加什么格式的文档

//Schema一套规则
//Model可以理解成是根据Schema生成的一套方法，这套方法用来操作集合和集合下的文档
const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
    age: Number,
})
const UserModel = mongoose.model('User', UserSchema);
const connect = () => {
    mongoose.connect('mongodb://localhost/book-mgr', { useNewUrlParser: true });
    /* .then(() => console.log('数据库连接成功'))
    .catch(err => console.log('数据库连接失败', err)); */
    mongoose.connection.on('open', () => {
        console.log('连接成功');

        const user = new UserModel({
            nickname: 'nick',
            password: '123123',
            age: 15,
        });
        user.save();
    })
};

connect();