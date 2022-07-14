/**
 * Module Dependencies
 */
const createError = require('http-errors');

/**
 * Custom Dependencies
 */
const UserService = require('../service/users-service');
const {operationSuccess} = require("../util/common_reponses");

exports.createUpdateUser = async (req, res, next) => {
    try {
        const jsonUser = req.body.user;
        const user = await UserService.createUpdateObject(jsonUser, 'User');
        operationSuccess(res, user);
    } catch (error) {
        next(createError(500, "User Creation Failed"));
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await UserService.findById(userId);
        operationSuccess(res, user);
    }catch (error){
        next(createError(500, "Something Went Wrong"));
    }
};

exports.deleteUser = async (req, res, next) => {

    try{
        const userId = req.params.user;
        await UserService.deleteById(userId);
    }catch(error){
        next(createError(500, 'Something Went Wrong'));
    }

}