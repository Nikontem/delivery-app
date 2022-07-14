const {Error} = require("mongoose");

module.exports = class BasicService {
    constructor(mongoSchema) {
        this.mongoSchema = mongoSchema;
    }

    async paginate (filterParams, paginationParams){
        try {

            const page = paginationParams.page || 1;
            const perPage = paginationParams.limit || 10;

            const totalItems = await this.mongoSchema.find(filterParams).countDocuments();
            const results = await this.mongoSchema.find(filterParams).skip((page - 1) * perPage).limit(perPage);
            return {
                orders: results,
                totalItems: totalItems
            };
        } catch (error) {
            return Error(error);
        }
    }

    async createUpdateObject(jsonObject, objectType){
        try{
            let menuItemId = jsonObject._id;
            let message;
            if(menuItemId){
                menuItemId = await this.mongoSchema.updateOne(jsonObject);
                message = `${objectType} updated`;
            }else{
                await this.mongoSchema.create(jsonObject);
                message = `${objectType} created`;
            }
            return {_id: menuItemId, message: message};
        }catch (error){
            return Error(error);
        }
    }

    async findById(extraOptionId){
        try{
            return await this.mongoSchema.findById(extraOptionId);
        }catch (error){
            return Error(error);
        }
    }

    async deleteById(extraOptionId){
        try{
            await this.mongoSchema.deleteOne({_id: extraOptionId});
        }catch (error){
            return Error(error);
        }
    }
}