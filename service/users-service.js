const BasicService = require('./basic-service');

const User = require('../models/user');

class UsersService extends BasicService{
    constructor() {
        super(User);
        if(UsersService._instance){
            return UsersService._instance;
        }
        UsersService._instance = this;
    }

}

module.exports = new UsersService();