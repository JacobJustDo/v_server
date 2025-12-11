const { createUser, getUserInfo } = require('../service/userService');

class UserController {
    // 用户注册
    async register(ctx, next) {
        const { username, password, role = 0 } = ctx.request.body;
        if (!username || !password) {
            ctx.status = 401;
            ctx.body = { code: 10001, message: 'Missing parameter', data: {} };
            return;
        }
        if (await getUserInfo({ username })) {
            ctx.status = 409;
            ctx.body = {
                code: 10002,
                message: "User already exists",
                data: "",
            };
            return;
        }
        const res = await createUser(username, password, role);
        console.log("=====", res);
        ctx.body = {
            code: 10000,
            message: "User registered successfully",
            data: {
                id: res._id,
                username: res.username,
            },
        };
    }

    // 用户登录
    async login(ctx, next) {
        console.log("Request Body:", ctx.request.body);
        const { username, password } = ctx.request.body;
        if (!username || !password) {
            ctx.body = { status: 'false', message: 'Missing parameter' };
        } else {
            // const res = _loginCheck(userId, userPassword);
            ctx.body = { status: 'true', message: 'Login successful' };
        }
    }
}

module.exports = new UserController;