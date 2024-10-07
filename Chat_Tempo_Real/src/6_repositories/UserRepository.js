const User = require('../7_models/UserModel');

class UserRepository {
    async getUserByEmail(email) {
        return await User.findOne({ email });
    }
    
    async getAllUsers() {
        return await User.find();
    }

    async getUserByID(id) {
        return await User.findById(id);
    }

    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async update(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }
}

module.exports = new UserRepository();
