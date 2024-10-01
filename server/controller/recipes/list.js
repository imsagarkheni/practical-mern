const mongoConnection = require('../../utils/connections');
const responseManager = require('../../utils/response.manager');
const constants = require('../../utils/constants');
const mongoose = require('mongoose');
const axios = require('axios');

exports.list = async (req, res) => {
    try {
        const {  limit = 10, search, ingredients } = req.body;
        
        if (req.token.userid && mongoose.Types.ObjectId.isValid(req.token.userid)) {
            let primary = mongoConnection.useDb(constants.DEFAULT_DB);
            let query = { };

            if (ingredients && ingredients.length > 0) {
                query.ingredients = ingredients;
            }
             

            const ingredientsParam = ingredients ? ingredients.join(',') : 'carrots';

            let recipeData = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
                params: {
                    ingredients: ingredientsParam,
                    number: limit,
                    apiKey: process.env.SPOONACULAR_API_KEY
                }
            });

            if (recipeData.data && recipeData.data.length > 0) {
                return responseManager.onSuccess('Recipe list fetched successfully!', recipeData.data, res);
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
