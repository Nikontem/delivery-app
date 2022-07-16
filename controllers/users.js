`use strict`;

/**
 * Module Dependencies
 */

/**
 * Custom Dependencies
 */
const UserService = require('../service/users-service');
const BasicController = require('./basic-controller');
const {operationSuccess} = require("../util/common_reponses");

class UsersController extends BasicController{
    async login(req, res, next){
        this.validationErrors(req,res,next);

        try{
            await UserService.login();
        }catch(error){
            this.forwardError(next, 500, "Unable To Login")
        }
    }

    async createUpdateUser(req, res, next){
        this.validationErrors(req,res,next);

        try {
            const jsonUser = req.body.user;
            const user = await UserService.createUpdateObject(jsonUser, 'User');
            operationSuccess(res, user);
        } catch (error) {
            error.status = error.status || 500;
            this.forwardError(next, error.status, error);
        }
    };

    async getUser(req, res, next){
        this.validationErrors(req,res,next);

        try {
            const userId = req.params.userId;
            const user = await UserService.findById(userId);
            operationSuccess(res, user);
        }catch (error){
            this.forwardError(next, 500, "Something Went Wrong");
        }
    };

    async deleteUser(req, res, next){
        this.validationErrors(req,res,next);

        try{
            const userId = req.params.user;
            await UserService.deleteById(userId);
        }catch(error){
            this.forwardError(next, 500, 'Something Went Wrong');
        }

    }
}

module.exports = new UsersController();