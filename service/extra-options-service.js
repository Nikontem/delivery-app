`use strict`;

const BasicService = require('./basic-service');
const ExtraOption = require("../models/extra-option");

class ExtraOptionsService extends BasicService {
    constructor() {
        super(ExtraOption);
        if(ExtraOptionsService._instance){
            return ExtraOptionsService._instance;
        }
        ExtraOptionsService._instance = this;
    }
}

module.exports = new ExtraOptionsService();