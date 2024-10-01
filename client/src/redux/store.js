import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/auth/authSlice";
import recipeSlice from "../components/Dashboard/recipeSlice";

const combineReducer = combineReducers({
  auth: authSlice,
  recipe: recipeSlice,
});

const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export default store;
