/**
 * Module Dependencies
 */

const BasicController = require('./basic-controller');
const MenuItemsService = require('../service/menu-items-service');
const {operationSuccess} = require("../util/common_reponses");

class MenuItemsController extends BasicController{
    async getMenuItems(req, res, next){
        this.validationErrors(req,res,next);

        try{
            const paginationParams = {
                page: req.params.page || 1,
                limit: req.params.limit || 10
            };
            const result = await MenuItemsService.paginate({},paginationParams);
            operationSuccess(res, result);
        }catch (error){
            this.forwardError(next,'Something went wrong', 500);
        }
    }

    async createUpdateMenuItem(req, res, next){
        this.validationErrors(req,res,next);

        try{
            const jsonExtraOption = req.body.extraOption;
            const successCreationObject = await MenuItemsService.createUpdateObject(jsonExtraOption, 'Menu Item');
            operationSuccess(res, successCreationObject);
        }catch (error){
            this.forwardError(next,'Something went wrong', 500);
        }
    }

    async getMenuItem(req, res, next){
        this.validationErrors(req,res,next);

        try{
            this.validationErrors(req,res,next);

            const extraOptionId = req.params.id;
            const extraOption = await MenuItemsService.fetchMenuItemWithExtraOptions(extraOptionId);
            operationSuccess(res, {extraOption: extraOption});
        }catch (error){
            this.forwardError(next,'Something went wrong', 500);
        }
    }

    async deleteMenuItem(req, res, next){
        this.validationErrors(req,res,next);

        try{
            this.validationErrors(req,res,next);

            const extraOptionId = req.params.id;
            await MenuItemsService.deleteById({_id: extraOptionId});
            operationSuccess(res, {message: "Extra option deleted"});
        }catch (error){
            this.forwardError(next,'Something went wrong', 500);
        }
    }
}

module.exports = new MenuItemsController();