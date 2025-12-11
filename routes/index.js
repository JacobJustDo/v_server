const router = require('koa-router')()

//校验路由
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

//登录路由
router.post('/login', async (ctx, next) => {
  console.log("==========", ctx); 
  console.log("Request Body:", ctx.request.body);
  const { userId, userPassword } = ctx.request.body;
  if (!userId || !userPassword) {
    ctx.body = { status: 'false', message: 'Missing parameter' };
  } else {
    ctx.body = { received: ctx.request.body };
  }
})

module.exports = router
