const dotenv = require('dotenv');
dotenv.config();

const { MONGODB_HOST, MONGODB_PORT, MONGODB_USER, MONGODB_PWD, MONGODB_DB } = process.env;
const mongoose = require('mongoose');
console.log(MONGODB_HOST, MONGODB_PORT, MONGODB_USER, MONGODB_PWD, MONGODB_DB);

mongoose
    .connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`)
    .then(() => {
        console.log("数据库连接成功 ！");
    })
    .catch((err) => {
        console.error("连接数据库失败 ！", err);
    });

module.exports = mongoose;