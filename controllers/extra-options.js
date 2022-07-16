`use strict`;

/**
 * Module Dependencies
 */

const {operationSuccess} = require("../util/common_reponses");
const BasicController = require('./basic-controller');
const ExtraOptionsService = require('../service/extra-options-service');


class ExtraOptionsController extends BasicController {
    async getExtraOptions(req, res, next) {
        this.validationErrors(req,res,next);

        const paginationParams = {
            page: req.params.page || 1,
            limit: req.params.limit || 10
        };
        try {
            const resultObject = await ExtraOptionsService.paginate({}, paginationParams);
            operationSuccess(res, resultObject);
        } catch (error) {
            this.forwardError(next, 'Something went wrong', 500);
        }
    }

    async createUpdateExtraOption(req, res, next) {
        this.validationErrors(req,res,next);

        const extraOptionDTO = req.body.extraOption;
        try {
            const successCreationObject = await ExtraOptionsService.createUpdateObject(extraOptionDTO, 'Extra Option');
            operationSuccess(res, successCreationObject);
        } catch (error) {
            this.forwardError(next, 'Creation failed', 500);
        }
    }

    async getExtraOption(req, res, next) {
        this.validationErrors(req,res,next);

        this.validationErrors(req, res, next);
        const extraOptionId = req.params.id;
        try {
            const extraOption = await ExtraOptionsService.findById(extraOptionId);
            operationSuccess(res, {extraOption: extraOption});
        } catch (error) {
            this.forwardError(next, 'Something Went Wrong', 500);
        }

    }

    async deleteExtraOptions(req, res, next) {
        this.validationErrors(req,res,next);

        this.validationErrors(req, res, next);

        const extraOptionId = req.params.id;
        try {
            await ExtraOptionsService.deleteById({_id: extraOptionId});
            operationSuccess(res, {message: "Extra option deleted"});
        } catch (error) {
            this.forwardError(next, 'Delete Failed', 500);
        }
    }

}

module.exports = new ExtraOptionsController();
