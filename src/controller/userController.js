const { createUser } = require('../service/userService');

class UserController {
    // 用户注册
    async register(ctx, next) {
        const { userId, userPassword } = ctx.request.body;
        const res = await createUser(userId, userPassword);
        console.log("=====",res);
        ctx.body = ctx.request.body;
    }

    // 用户登录
    async login(ctx, next) {
        console.log("Request Body:", ctx.request.body);
        const { userId, userPassword } = ctx.request.body;
        if (!userId || !userPassword) {
            ctx.body = { status: 'false', message: 'Missing parameter' };
        } else {
            // const res = _loginCheck(userId, userPassword);
            ctx.body = { status: 'true', message: 'Login successful' };
        }
    }
}

module.exports = new UserController;