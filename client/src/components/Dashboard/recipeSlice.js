import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRecipeList, addToFavoriteRecipe, getMyFavoriteList,removeRecipe } from "../../redux/services/recipeService";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const initialState = {
  recipe: null,
  myfavorite: null,
};

export const getRecipeListThunk = createAsyncThunk("recipe/list", async (payload) => {
  return await getRecipeList(payload);
});

export const addToFavoriteRecipeDetails = createAsyncThunk("recipe/addToFavoriteRecipe", async (payload) => {
  return await addToFavoriteRecipe(payload);
});

export const getMyFavoriteListThunk = createAsyncThunk("recipe/getFavorites", async (payload) => {
  return await getMyFavoriteList(payload);
});

export const removeRecipeThunk = createAsyncThunk("recipe/remove", async (payload) => {
  return await removeRecipe(payload);
});

const RecipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecipeListThunk.fulfilled, (state, action) => {
      state.recipe = action.payload.data.Data;
    });
    builder.addCase(getMyFavoriteListThunk.fulfilled, (state, action) => {
      state.myfavorite = action.payload.data.Data;
    });
  },
});

export default RecipeSlice.reducer;

const selectRecipeList = (state) => state.recipe.recipe;
export const useRecipeList = () => {
  const recipe = useSelector(selectRecipeList);
  return useMemo(() => recipe, [recipe]);
};

const selectFavoriteList = (state) => state.recipe.myfavorite;
export const useFavoriteRecipe = () => {
  const favoriteRecipes = useSelector(selectFavoriteList);
  console.log("favoriteRecipes>>>>>>>>",favoriteRecipes)
  return useMemo(() => favoriteRecipes, [favoriteRecipes]);
};
