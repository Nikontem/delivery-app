`use strict`;

import {validationResult} from "express-validator";
import createError from "http-errors";

module.exports = class BasicController {

    validationErrors(req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            this.forwardError(next, 'Request Validation Failed', 422);
        }
    }

    forwardError(next, msg, status){
        next(createError(status, msg));
    }
}