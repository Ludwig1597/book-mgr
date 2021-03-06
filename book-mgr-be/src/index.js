const Koa = require('koa');

const app = new Koa();
//ctx=context
app.use((ctx) => {
    console.log(ctx.URL);
    const { path = '/' } = ctx;
    //相当于const path=ctx.path
    if (path === '/user/123') {
        ctx.body = '返回用户123的信息';
    }
})

app.listen(3000, () => {
    console.log('启动成功')
})

console.log(123123);