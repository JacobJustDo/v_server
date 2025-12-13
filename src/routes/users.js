const router = require('koa-router')()

const { register, login } = require('../controller/userController');

const { userValidate, userUniqueVerify, bcryptPassword, verifyLogin } = require('../middleware/user.middleware');

// 给路由设置一个统一的前缀
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

//注册路由
router.post(
  '/register',
  userValidate,
  userUniqueVerify,
  bcryptPassword,
  register,
);

router.post(
  '/login',
  userValidate,
  verifyLogin,
  login,
);


module.exports = router
