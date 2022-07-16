const BasicService = require('./basic-service');
const MenuItems = require('../models/menu-item');
const ExtraOptions = require('../models/extra-option');
const {json} = require("express");

class MenuItemsService extends BasicService{
    constructor() {
        super(MenuItems);
        if(MenuItemsService._instance){
            return MenuItemsService._instance;
        }
        MenuItemsService._instance = this;
    }

    async fetchMenuItemWithExtraOptions(menuItemId){
        const menuItem = await MenuItems.findById(menuItemId);
        const extraOptions = await ExtraOptions.find({
            "categories" : {
                $in: [menuItem.category]
            }
        });
        menuItem.extraOptions = extraOptions;
        return menuItem;
    }
}

module.exports = new MenuItemsService();
