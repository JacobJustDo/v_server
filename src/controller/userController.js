const { createUser, getUserInfo } = require('../service/userService');
const { userRegisterError } = require("../constant/err.type");

class UserController {
    // 用户注册
    async register(ctx, next) {
        const user = ctx.request.body;
        try {
            const res = await createUser(user);
            ctx.body = {
                code: 10000,
                message: "User registered successfully",
                data: {
                    id: res._id,
                    username: res.username,
                },
            };
        } catch (error) {
            console.error("Error fetching user info during registration:", error);
            ctx.app.emit("error", userRegisterError, ctx);
            return;
        }
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