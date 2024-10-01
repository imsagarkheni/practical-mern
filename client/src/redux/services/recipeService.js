import {
  GETRECIPELIST,
  ADDTOFAVORITE,
  GETFAVORITE,
  REMOVERECIPE,
} from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const getRecipeList = (payload) => {
  return apiInstance.post(GETRECIPELIST, payload, { headers: authHeader() });
};

export const getMyFavoriteList = (payload) => {
  return apiInstance.post(GETFAVORITE, payload, { headers: authHeader() });
};

export const addToFavoriteRecipe = (payload) => {
  return apiInstance.post(ADDTOFAVORITE, payload, { headers: authHeader() });
};

export const removeRecipe = (payload) => {
  return apiInstance.post(REMOVERECIPE, payload, { headers: authHeader() });
};
