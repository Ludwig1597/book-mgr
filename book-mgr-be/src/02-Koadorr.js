const Koa = require('koa');

const app = new Koa();

//通过app.use()注册中间件，参数是一个函数
//中间件本质上，他就是一个函数
//函数里有个参数叫上下文，context-当前请求的相关信息都在里面
app.use((context) => {
    //对象的解构赋值 加冒号可以重命名
    const { request: req } = context;
    //相当于const request=context.request;
    const { url } = req;
    //相当于const url=req.url
    if (url === '/user') {
        context.body = 'abcd';
        return;
    }
    context.body = "??";
})





//开启一个http服务
//搜索http请求，并作处理，处理完后响应
app.listen(3000, () => {
    console.log('启动成功')
})