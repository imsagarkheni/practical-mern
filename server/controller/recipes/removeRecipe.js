const mongoConnection = require('../../utils/connections');
const responseManager = require('../../utils/response.manager');
const FavoriteRecipe = require('../../models/favorite.model');
const constants = require('../../utils/constants');
const mongoose = require('mongoose');

exports.removeRecipe = async (req, res) => {
    try {
        if (req.token && req.token.userid && mongoose.Types.ObjectId.isValid(req.token.userid)) {
            try {
                const primary = mongoConnection.useDb(constants.DEFAULT_DB);
                const recipeData = await primary.model(constants.MODELS.favoriterecipe, FavoriteRecipe)
                    .findOneAndDelete({ _id: req.body.recipeId, userid: req.token.userid })
                    .lean();
                if (recipeData) {
                    return responseManager.onSuccess('Recipe removed from favorites', 1, res);
                } else {
                    return responseManager.onError({ message: 'Recipe not found or not in favorites' }, res);
                }
            } catch (error) {
                console.error('Error while deleting the recipe:', error);
                return responseManager.onError(error, res);
            }
        } else {
            return responseManager.badRequest({ message: 'Invalid token, please try again' }, res);
        }
    } catch (error) {
        console.error('Error in removeRecipe API:', error);
        return responseManager.onError('Internal server error', res);
    }
};
