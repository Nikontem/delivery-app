`use strict`;

const BasicService = require('./basic-service');
const MenuItems = require('../models/menu-item');
const ExtraOptions = require('../models/extra-option');

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
        menuItem.extraOptions = await ExtraOptions.find({
            "categories": {
                $in: [menuItem.category]
            }
        });
        return menuItem;
    }
}

module.exports = new MenuItemsService();
