const User = require('../model/user.model');

class userService {
    async createUser(user) {
        const res = await User.create(user);
        return res;
    }

    async getUserInfo({ id, username, role }) {
        const whereOpt = {};
        id && Object.assign(whereOpt, { id });
        username && Object.assign(whereOpt, { username });
        role && Object.assign(whereOpt, { role });

        return await User.findOne(whereOpt);
    }

    async updateById({ _id, username, password, role }) {
        const whereOpt = { _id }
        const newUser = {}

        username && Object.assign(newUser, { username })
        password && Object.assign(newUser, { password })
        role && Object.assign(newUser, { role })

        // const res = await User.update(newUser, { where: whereOpt })
        const res = await User.updateOne(
            whereOpt,
            { $set: newUser }
        )
        console.log(res)
        // 返回值为代码改动记录数
        return res.modifiedCount > 0 ? true : false
    }
}

module.exports = new userService();