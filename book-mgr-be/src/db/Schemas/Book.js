const mongoose = require('mongoose');
const { getMeta } = require('../helpers');

const BookSchema = new mongoose.Schema({
    //书名
    name: String,
    //价格
    price: Number,
    //作者
    author: String,
    //出版日期
    publishDate: String,
    //分类
    classify: String,
    //库存
    count: Number,
    meta: getMeta(),
});
//我们可以用这个model和芒果db进行交互，但是目前还是注册不成功的，我们可以去db下的index.js进行注册执行
mongoose.model('Book', BookSchema);