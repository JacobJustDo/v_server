// 导入dotenv包 ，将环境变量从文件加载到进程中
const dotenv = require("dotenv");
// 读取配置信息
dotenv.config();

// console.log('从 .env 配置文件中读取的值：', process.env.APP_PORT)
// process 代表进程 ，env 代表环境变量

module.exports = process.env;