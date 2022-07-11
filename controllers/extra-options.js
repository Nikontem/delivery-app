/**
 * Module Dependencies
 */
const mongoose = require('mongoose');
const createError = require('http-errors');

const ExtraOption = require('../models/extra-option');
const {operationSuccess} = require("../util/common_reponses");

module.exports.getExtraOptions = (req, res, next) => {

}

module.exports.createUpdateExtraOption = async (req, res, next) => {
    const jsonExtraOption = req.body.extraOption;
    try {
        let extraOptionId = jsonExtraOption._id;
        let message;
        if(jsonExtraOption._id){
            extraOptionId = await ExtraOption.updateOne(jsonExtraOption);
            message = "Option updated";
        }else{
            await ExtraOption.create(jsonExtraOption);
            message = "Option created"
        }
        operationSuccess(res, {_id: extraOptionId, message: message});
    }catch(error){
        next(createError(500, 'Creation failed '));
    }
}

module.exports.getExtraOption = (req, res, next) => {

}

module.exports.deleteExtraOptions = (req, res, next) => {

}
