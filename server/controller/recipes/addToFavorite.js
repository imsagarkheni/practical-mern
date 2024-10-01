let mongoConnection = require("../../utils/connections");
const responseManager = require("../../utils/response.manager");
const favoriterecipe = require("../../models/favorite.model");
const helper = require("../../utils/helper");
const constants = require("../../utils/constants");
const mongoose = require("mongoose");

exports.addToFavorite = async (req, res) => {
  try {
    const {id,...reqData} = req.body;
    if (req.token.userid && mongoose.Types.ObjectId.isValid(req.token.userid)) {
      try {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let favoriteData = await primary
          .model(constants.MODELS.favoriterecipe, favoriterecipe)
          .findOne({ id: id, userid: new mongoose.Types.ObjectId(req.token.userid) })
          .lean();
        if (favoriteData) {
          return responseManager.onSuccess("Already added to favorite", 0, res);
        } else {
          await primary
            .model(constants.MODELS.favoriterecipe, favoriterecipe)
            .create({ ...reqData, userid: req.token.userid, id: id });
          return responseManager.onSuccess("Added to favorite", 1, res);
        }
      } catch (error) {
        console.error("Error while saving the AddToFavorite:", error);
        return responseManager.onError(
          "Error while adding the AddToFavorite",
          res
        );
      }
    } else {
      return responseManager.badRequest(
        { message: "Invalid token, please try again" },
        res
      );
    }
  } catch (error) {
    console.error("Error in addToFavorite API:", error);
    return responseManager.onError("Internal server error", res);
  }
};
