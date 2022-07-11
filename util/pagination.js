const {operationSuccess} = require("./common_reponses");
const createError = require("http-errors");

module.exports = async (req , res, next, mongoSchema, filter) => {
    const page = req.query.page || 1;
    const perPage = req.query.limit || 10;
    const status = req.query.status;


    try {
        const totalItems = await mongoSchema.find(filter).countDocuments();
        const results = await mongoSchema.find(filter).skip((page - 1) * perPage).limit(perPage);
        return operationSuccess(res, {
            orders: results,
            totalItems: totalItems
        })
    } catch (error) {
        next(createError(500, 'Something went wrong with fetching orders' + error));
    }
}