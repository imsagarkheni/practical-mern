let express = require("express");
let router = express.Router();
const helper = require("../../../utils/helper");

const listCtrl = require('../../../controller/recipes/list')
const getFavoritesCtrl = require('../../../controller/recipes/getFavorites')
const addToFavoriteCtrl = require('../../../controller/recipes/addToFavorite')
const removeRecipeCtrl = require('../../../controller/recipes/removeRecipe')


router.post('/list', helper.authenticateToken, listCtrl.list);
router.post('/getFavorites', helper.authenticateToken, getFavoritesCtrl.list);
router.post('/addToFavorite', helper.authenticateToken, addToFavoriteCtrl.addToFavorite);
router.post('/removeRecipe', helper.authenticateToken, removeRecipeCtrl.removeRecipe);


module.exports = router;
