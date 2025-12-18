const router = require('koa-router')()

const { register, login, changePassword } = require('../controller/userController');

const { userValidate, userUniqueVerify, bcryptPassword, verifyLogin } = require('../middleware/user.middleware');
const { auth } = require("../middleware/auth.middleware");

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

// 修改用户密码
// 修改密码前，添加 auth 中间件，进行 token 身份认证
router.patch(
  "/",
  auth,
  bcryptPassword,
  changePassword,
);


module.exports = router
