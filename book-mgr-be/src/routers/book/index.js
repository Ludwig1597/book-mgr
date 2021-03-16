const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
//把book的模型拿到
const Book = mongoose.model('Book');

const BOOK_CONST = {
    IN: 'IN_COUNT',
    OUT: 'OUT_COUNT',
};

const router = new Router({
        prefix: '/book',
    })
    //添加书籍列表，拿到前端传上来的数据，拿到一本书，
router.post('/add', async(ctx) => {
    const {
        name,
        price,
        author,
        publishDate,
        classify,
        count,
    } = getBody(ctx);

    const book = new Book({
        name,
        price,
        author,
        publishDate,
        classify,
        count,
    })

    const res = await book.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '添加成功',
    }
});

//写一下获取列表的接口
router.get('/list', async(ctx) => {
    //https://aa.cc.com/user?page=2&keyword=书名&size=20#dsfdsf
    /* {
        page:2,
        size:20,
    } */
    const {
        page = 1,
            keyword = '',
    } = ctx.query;

    let = {
        size = 10,
    } = ctx.query;

    size = Number(size);

    const query = {};
    if (keyword) {
        query.name = keyword;
    }
    const list = await Book
        .find(query)
        .skip((page - 1) * size) //跳过几条数据
        .limit(size)
        .exec();

    const total = await Book.countDocuments();

    ctx.body = {
        data: {
            list,
            total,
            page,
            size,
        },

        code: 1,
        msg: '获取列表成功'
    };
});
// METHOD DELETE
// /book/:id
// /book/123
//后端删除接口写好后--->和前端去联调--->去fe/src/service/book/index.js写一下前端接口
router.delete('/:id', async(ctx) => {
        const {
            id,
        } = ctx.params;

        const delMsg = await Book.deleteOne({
            _id: id,
        });
        ctx.body = {
            data: delMsg,
            msg: '删除成功',
            code: 1,
        }
    })
    //写一下出库入库的接口
router.post('/update/count', async(ctx) => {
    const {
        id, //先拿到请求中的id是为了拿到对应的书籍的
        type, //服务端规定的，比如1代表入库，2代表出库
    } = ctx.request.body;

    //num是变量需要修改
    let {
        num,
    } = ctx.request.body;

    num = Number(num);

    const book = await Book.findOne({
        _id: id,
    }).exec();
    if (!book) {
        ctx.body = {
            code: 0,
            msg: '没有找到书籍',
        };

        return;
    }

    //找到了书
    if (type === BOOK_CONST.IN) {
        //入库操作
        num = Math.abs(num);
    } else {
        //出库操作
        num = -Math.abs(num);
    }
    //console.log(BOOK_CONST.IN);
    if (book.count === null) {
        book.count = 0;
    }
    book.count = book.count + num;
    if (book.count < 0) {
        ctx.body = {
            code: 0,
            msg: '超出剩余量',
        };
        return;
    }

    const res = await book.save(); //告诉mangoose数据改完了同步到数据库

    ctx.body = {
        data: res,
        code: 1,
        msg: '操作成功',
    }
})

router.post('/update', async(ctx) => {
        const {
            id,
            ...others //剩余参数
        } = ctx.request.body;

        //修改数据要先找到数据
        const one = await Book.findOne({
            _id: id,
        }).exec();
        //如果没找到
        if (!one) {
            ctx.body = {
                msg: '没有找到书籍',
                code: 0,
            }
            return;
        }
        const newQuery = {};

        Object.entries(others).forEach(([key, value]) => {
            if (value) {
                newQuery[key] = value;
            }
        });
        Object.assign(one, newQuery);
        const res = await one.save();

        ctx.body = {
            data: res,
            code: 1,
            msg: '保存成功'
        }

    })
    //router.post('/update')
module.exports = router;