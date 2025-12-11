//导入Schema
const { Schema } = require('mongoose');

//导入数据库连接对象
const mongoose = require('../db/db');

//创建用户模型
const UserSchema = new Schema({
        username: {
            type: String,
            required: true, // 必填
            unique: true, // 唯一，不重复
        },
        password: String,
        age: Number,
        city: String,
        // 性别
        gender: {
            type: Number,
            // 默认值
            default: 0, // 0 - 保密，1 - 男，2 - 女
        },
        phone: {
            type: String,
            required: false,
            validate: {
                validator: function (v) {
                    // 这里使用正则表达式来验证手机号格式
                    // 假设你的手机号格式是11位数字
                    return /^\d{11}$/.test(v);
                },
                message: "手机号格式不正确，请输入11位数字",
            },
        },
        email: {
            type: String,
            required: false,
            validate: {
                validator: function (v) {
                    // 这里使用正则表达式来验证邮箱格式
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "邮箱格式不正确",
            },
        },
        // 角色
        role: {
            type: Number,
            enum: [0, 1], // 枚举类型，限制 role字段只能为 0 - 普通用户（默认） 或 1 - 管理员
            default: 0, // 默认值为 0，即普通用户
        },
    },
    {
        timestamps: true, // 时间戳，自动添加文档的创建时间和更新时间
    }
);

module.exports = mongoose.model('User', UserSchema);