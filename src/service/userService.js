class userService {
    async createUser(userId, userPassword) {
        // 注册逻辑
        return { status: 'true', message: 'User registered successfully' };
    }
}

module.exports = new userService();