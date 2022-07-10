/**
 * Module Dependencies
 */
const mongoose = require('mongoose');
const createError = require('http-errors');

const session = await mongoose.startSession();


/**
 * Custom Dependencies
 */
const User = require('../models/user');
const {operationSuccess} = require("../util/common_reponses");

exports.createUser = (async (req, res, next) => {
    const user = createUserObject(req.body.user);

    try {
        await session.withTransaction(async () => {
            await User.create([user], {session});
        });
        await session.commitTransaction();
        operationSuccess(res, {message: 'User Created'});
    } catch (error) {
        await session.abortTransaction();
        next(createError(500, "User Creation Failed"));
    }
    return user;
});

exports.updateUser = (async (req, res, next) => {
    const user = createUserObject(req.body.user);
    try{
        await session.withTransaction( async () => {
            await User.findOneAndUpdate([ user ], { session });
        });
        await session.commitTransaction();
        operationSuccess(res, {message: 'User Updated'});
    }catch (error){
        await session.abortTransaction();
        next(createError(500, 'User Updated failed with error' + error));
    }
});


const createUserObject = (jsonUser) => {
    return new User({
        _id: jsonUser._id,
        name: jsonUser.name,
        lastname: jsonUser.lastname,
        address: jsonUser.address,
        email: jsonUser.email,
        language: jsonUser.language,
        admin: jsonUser.isAdmin
    });
}