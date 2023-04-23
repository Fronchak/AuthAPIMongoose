import User from "../models/user";


class UserService {

    public async findByEmail(email: string) {
        return await User.findOne({ email: email });
    }
}

export default new UserService();