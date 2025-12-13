const { getUserInfo } = require('../service/userService');
const { userFormateError, userAlreadyExists, userRegisterError, userDoesNotExist, invalidPassword, userLoginError } = require('../constant/err.type');

const bcrypt = require('bcryptjs');

const userValidate = async (ctx, next) => {
    const { username, password } = ctx.request.body;

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
        ctx.app.emit("error", userRegisterError, ctx);
        return;
    }
    await next();
}

const bcryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    ctx.request.body.password = hash;
    await next();
}

const verifyLogin = async (ctx, next) => {
    const { username, password } = ctx.request.body;
    try {
        const res = await getUserInfo({ username });
        if (!res) {
            ctx.status = 400;
            ctx.app.emit("error", { userDoesNotExist }, ctx);
            return;
        }
        const isPasswordValid = bcrypt.compareSync(password, res.password);
        if (!isPasswordValid) {
            ctx.status = 400;
            ctx.app.emit("error", { invalidPassword }, ctx);
            return;
        }
        await next();
    } catch (err) {
        console.error("用户登录信息错误", err);
        ctx.app.emit("error", userLoginError, ctx);
        return;
    }
}

module.exports = {
    userValidate,
    userUniqueVerify,
    bcryptPassword,
    verifyLogin
};