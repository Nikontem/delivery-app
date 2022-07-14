const BasicService = require('./basic-service');
const MenuItems = require('../models/menu-item');
const {json} = require("express");

class MenuItemsService extends BasicService{
    constructor() {
        super(MenuItems);
        if(MenuItemsService._instance){
            return MenuItemsService._instance;
        }
        MenuItemsService._instance = this;
    }
}

module.exports = new MenuItemsService();
