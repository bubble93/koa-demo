var fs = require('fs');
var imgData = '';
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();



// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
    fs.readFile('./111.png', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            imgData = data;
            console.log(data.length + ' bytes');
        }
    });
    //设置允许跨域的域名，*代表允许任意域名跨域
    ctx.response.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    ctx.response.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    ctx.response.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    ctx.response.type = 'text/html';
    ctx.response.body = `
        {
            src: ${imgData}
        }
    `;
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');