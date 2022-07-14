/**
 * Module Dependencies
 */
const createError = require('http-errors');
const MenuItemsService = require('../service/menu-items-service');
const {operationSuccess} = require("../util/common_reponses");

exports.getMenuItems = async (req, res, next) => {
    try{
        const paginationParams = {
            page: req.params.page || 1,
            limit: req.params.limit || 10
        };
        const result = await MenuItemsService.paginate({},paginationParams);
        operationSuccess(res, result);
    }catch (error){
        next(createError(500,'Something went wrong'));
    }
}

exports.createUpdateMenuItem = async (req, res, next) => {
    try{
        const jsonExtraOption = req.body.extraOption;
        const successCreationObject = await MenuItemsService.createUpdateObject(jsonExtraOption, 'Menu Item');
        operationSuccess(res, successCreationObject);
    }catch (error){
        next(createError(500,'Something went wrong'));
    }
}

exports.getMenuItem = async (req, res, next) => {
    try{
        const extraOptionId = req.params.id;
        const extraOption = await MenuItemsService.findById(extraOptionId);
        operationSuccess(res, {extraOption: extraOption});
    }catch (error){
        next(createError(500,'Something went wrong'));
    }
}

exports.deleteMenuItem = async (req, res, next) => {
    try{
        const extraOptionId = req.params.id;
        await MenuItemsService.deleteById({_id: extraOptionId});
        operationSuccess(res, {message: "Extra option deleted"});
    }catch (error){
        next(createError(500,'Something went wrong'));
    }
}
