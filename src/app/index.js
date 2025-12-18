const Koa = require('koa')

const views = require('koa-views')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// 导入统一响应状态码
const errHandler = require("./errHandler");
// 导入用户路由模块
const userRouter = require("../routes/users.js");
// 导入主路由模块
const indexRouter = require("../routes/index.js");

// 实例化 app（创建 Koa 应用实例）
const app = new Koa();

// 中间件
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// 加载路由（使用 app.use() 方法将 userRouter 的路由添加到 Koa 应用中）
// 路由必须在所有中间件之后
// 挂载主路由
app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());

// 挂载用户路由
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.on("error", errHandler);

// 导出 app 对象
module.exports = app;