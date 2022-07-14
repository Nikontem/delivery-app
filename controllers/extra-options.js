/**
 * Module Dependencies
 */
const createError = require('http-errors');

const {operationSuccess} = require("../util/common_reponses");
const ExtraOptionsService = require('../service/extra-options-service');

exports.getExtraOptions = async (req, res, next) => {
    const paginationParams = {
        page: req.params.page || 1,
        limit: req.params.limit || 10
    };
    try{
        const resultObject = await ExtraOptionsService.paginate({},paginationParams);
        operationSuccess(res, resultObject);
    }catch (error){
        next(createError(500,'Something went wrong'));
    }
}

exports.createUpdateExtraOption = async (req, res, next) => {
    const jsonExtraOption = req.body.extraOption;
    try {
        const successCreationObject = await ExtraOptionsService.createUpdateObject(jsonExtraOption, 'Extra Option');
        operationSuccess(res, successCreationObject);
    }catch(error){
        next(createError(500, 'Creation failed '));
    }
}

exports.getExtraOption = async (req, res, next) => {
    const extraOptionId = req.params.id;
    try{
        const extraOption = await ExtraOptionsService.findById(extraOptionId);
        operationSuccess(res, {extraOption: extraOption});
    }catch (error){
        next(createError(500, 'Creation failed '));
    }

}

exports.deleteExtraOptions = async (req, res, next) => {
    const extraOptionId = req.params.id;
    try{
        await ExtraOptionsService.deleteById({_id: extraOptionId});
        operationSuccess(res, {message: "Extra option deleted"});
    }catch (error){
        next(createError(500, 'Delete Failed'));
    }
}
