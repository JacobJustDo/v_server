const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/config.default");
const { tokenExpiredError, invalidToken } = require("../constant/err.type");

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");

  try {
    // 调用 jwt.verify 函数来验证一个 JWT 令牌，并将验证后的用户信息存储到上下文对象 ctx 的 state 属性中
    // token：这是之前从 HTTP 请求头部提取并处理过的 JWT 令牌
    // JWT_SECRET：这是一个密钥，用于验证 JWT 令牌的签名。这个密钥应该是保密的，并且只有授权的服务端才应该知道它。
    // user 中包含了 payload 的信息（id、username、role ......）
    const user = jwt.verify(token, JWT_SECRET);
    // jwt.verify 函数会返回一个对象，这个对象通常包含了在创建令牌时添加到载荷（payload）中的用户信息
    // 该中间件将验证后的用户数据直接返回给浏览器
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      // jsonwebtoken 库抛出的一个特定错误，表示尝试验证的 JWT令牌已经过期
      case "TokenExpiredError":
        console.error("token已过期", err);
        // 统一提交错误管理
        return ctx.app.emit("error", tokenExpiredError, ctx);
      // JsonWebTokenError 是一个更广泛的错误类型，它涵盖了与 JWT 相关的各种错误情况
      case "JsonWebTokenError":
        console.error("无效的token", err);
        // 统一提交错误管理
        return ctx.app.emit("error", invalidToken, ctx);
    }
  }

  await next();
};

module.exports = {
  auth,
};