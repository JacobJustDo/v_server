const { getUserInfo } = require('../service/userService');
const { userFormateError, userAlreadyExists, userRegisterError } = require('../constant/err.type');

const userValidate = async (ctx, next) => {
    const { username } = ctx.request.body;

    if (!username || !password) {
        console.error("Validation Error: Missing username or password");
        ctx.status = 400;
        ctx.app.emit("error", { userFormateError }, ctx);
        ctx.body = userFormateError;
        return;
    }
    await next();
}

const userUniqueVerify = async (ctx, next) => {
    const { username } = ctx.request.body;

    try {
        const res = await getUserInfo({ username });
        if (res) {
            ctx.status = 409;
            ctx.app.emit("error", { userAlreadyExists }, ctx);
            ctx.body = userAlreadyExists;
            return;
        }
    } catch (err) {
        console.error("获取用户信息错误", err);
        // 统一提交错误管理
        ctx.app.emit("error", userRegisterError, ctx);
        return;
    }
    await next();
}

module.exports = {
    userValidate,
    userUniqueVerify
};