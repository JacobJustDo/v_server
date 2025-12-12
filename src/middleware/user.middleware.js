const { getUserInfo } = require('../service/userService');
const { userFormateError, userAlreadyExists } = require('../constant/err.type');

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
    if (await getUserInfo({ username })) {
        ctx.status = 409;
        ctx.app.emit("error", { userAlreadyExists }, ctx);
        ctx.body = userAlreadyExists;
        return;
    }
    await next();
}

module.exports = {
    userValidate,
    userUniqueVerify
};