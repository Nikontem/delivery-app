const {body, param} = require('express-validator');

const User = require('../models/user');

module.exports.signUpValidator = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom(async (value, {req}) => {
            const user = await User.findOne({email: value})
            if (user) {
                return Promise.resolve('E-mail in use');
            }
        }).normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 3})
        .withMessage('Please use at least 3 characters'),
    body('name')
        .trim()
        .not()
        .isEmpty()
];

module.exports.orderValidator = body('address')
    .custom(async (value, {req}) => {
        if (!req.userId || !value) {
            return Promise.reject('Please log in or provide an address');
        }
        let addressInfo;
        if (req.userId) {
            addressInfo = await User.findById(req.userId).select(['address.postalCode','address.street', '-_id']);
            req.address = addressInfo.street+ ", " + addressInfo.postalCode;
        }else{
            req.address = value;
        }
    });

module.exports.idParamValidator = param('id')
                                .notEmpty()
                                .withMessage('Invalid request');
