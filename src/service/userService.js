const User = require('../model/user.model');

class userService {
    async createUser(user) {
        // 注册逻辑
        const res = await User.create(user);
        return res;
    }

    async getUserInfo({ id, username, role }) {
        const whereOpt = {};
        // 短路运算：如果id不为空（id存在）时，则将 id 拷贝（assign）到 whereOpt对象中
        id && Object.assign(whereOpt, { id });
        username && Object.assign(whereOpt, { username });
        role && Object.assign(whereOpt, { role });

        // 返回第一个匹配的文档数据（按条件查询）
        return await User.findOne(whereOpt);
    }
}

module.exports = new userService();