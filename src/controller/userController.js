const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");

const { createUser, getUserInfo, updateById } = require('../service/userService');
const { userRegisterError, changePasswordError } = require("../constant/err.type");

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
        const { username } = ctx.request.body;
        try {
            const user = await getUserInfo({ username });
            const { _doc: { password, ...res } } = user;
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                data: {
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
                },
            }
        } catch (err) {
            console.error('用户登录失败', err)
        }
    }
    
    // 修改密码
    async changePassword(ctx, next) {
        // 1、获取数据
        // 获取 auth 中间件中将验证后的用户数据，其中的 _id
        const _id = ctx.state.user._id
        // 用户密码
        const password = ctx.request.body.password

        try {
            // 2、操作数据库
            if (await updateById({ _id, password })) {
                // a.b 模拟修改密码失败返回错误
                ctx.body = {
                    code: 0,
                    message: '修改密码成功',
                    data: '',
                }
            }
        } catch (err) {
            console.error('修改密码失败', err)
            ctx.app.emit('error', changePasswordError, ctx)
        }
        // 3、返回结果
    }
}

module.exports = new UserController;