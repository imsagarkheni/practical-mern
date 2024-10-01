const mongoConnection = require('../../utils/connections');
const responseManager = require('../../utils/response.manager');
const favoriterecipe = require('../../models/favorite.model');
const constants = require('../../utils/constants');
const mongoose = require('mongoose');

exports.list = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, ingredients } = req.body;
            if (req.token.userid && mongoose.Types.ObjectId.isValid(req.token.userid)) {
            let primary = mongoConnection.useDb(constants.DEFAULT_DB);
            let query = { userid : req.token.userid };

            if (ingredients && ingredients.length > 0) {
                query.ingredients = ingredients;
            }
            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ];
            }
            let favoriteData = await primary.model(constants.MODELS.favoriterecipe, favoriterecipe).paginate(
                query,
                { 
                    page: parseInt(page), 
                    limit: parseInt(limit), 
                    sort: { createdAt: -1 } 
                }
            );
            if (favoriteData && favoriteData.docs.length > 0) {
                return responseManager.onSuccess('Recipe list fetched successfully!', favoriteData, res);
            } else {
                return responseManager.onSuccess('No recipe found', [], res);
            }
        } else {
            return responseManager.badRequest({ message: 'Invalid token, please try again' }, res);
        }

    } catch (error) {
        console.error('Error in list API:', error);
        return responseManager.onError('An error occurred while fetching recipes.', error, res);
    }
};
