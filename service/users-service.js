const jwt = require('jsonwebtoken');

const BasicService = require('./basic-service');
const User = require('../models/user');
const {secretKey} = require('../util/env_params');

class UsersService extends BasicService {
    constructor() {
        super(User);
        if (UsersService._instance) {
            return UsersService._instance;
        }
        UsersService._instance = this;
    }

    async login(loginDTO) {
        const user = await User.findOne({email: loginDTO.email});
        checkEmailPassword(user);
        const verifiedPassword = await bcrypt.compare(loginDTO.password, user.password);
        checkEmailPassword(verifiedPassword);
        const token = jwt.sign({
                email: user.email,
                userId: user._id.toString(),
                isAdmin: user.isAdmin
            },
            secretKey,
            {expireIn: '1h'}
        );

    }
}

const checkEmailPassword = (toCheck) => {
    if (!toCheck) {
        const error = new Error('No User withs this e-mail found');
        error.status = 404;
        throw error;
    }
}

module.exports = new UsersService();