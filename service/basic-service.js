`use strict`;

module.exports = class BasicService {
    constructor(mongoSchema) {
        this.mongoSchema = mongoSchema;
    }

    async paginate(filterParams, paginationParams) {
        const page = paginationParams.page || 1;
        const perPage = paginationParams.limit || 10;

        const totalItems = await this.mongoSchema.find(filterParams).countDocuments();
        const results = await this.mongoSchema.find(filterParams).skip((page - 1) * perPage).limit(perPage);
        return {
            orders: results,
            totalItems: totalItems
        };
    }

    async createUpdateObject(dtoObject, objectType) {
        let menuItemId = dtoObject._id;
        let message;
        if (menuItemId) {
            menuItemId = await this.mongoSchema.updateOne(dtoObject);
            message = `${objectType} updated`;
        } else {
            await this.mongoSchema.create(dtoObject);
            message = `${objectType} created`;
        }
        return {_id: menuItemId, message: message};
    }

    async findById(id) {
        return await this.mongoSchema.findById(id);
    }

    async deleteById(id) {
        await this.mongoSchema.deleteOne({_id: id});
    }
}