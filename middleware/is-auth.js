`use strict`;

const jwt = require('jsonwebtoken');

const {secretKey} = require('../util/env_params');

module.exports.isAuthenticated = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,secretKey,{}, ()=>{});
    }catch (err) {
        err.statusCode = 500;
        throw err;
    }

    if(!decodedToken){
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.userId =  decodedToken.userId;
    req.user._id = decodedToken.userId;
    req.user.isAdmin = decodedToken.isAdmin;
    next();
};

module.exports.isAdmin = (req, res, next) => {
    if(!req.isAdmin){
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        throw error;
    }
    next();
}