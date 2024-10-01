import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipeListThunk, useRecipeList, addToFavoriteRecipeDetails } from "./recipeSlice";
import Select from 'react-select';

const Dashboard = () => {
  const dispatch = useDispatch();
  const recipeList = useRecipeList();

  const [pageLimit, setPageLimit] = useState(10);
  const [selectedIngredients, setSelectedIngredients] = useState([
    { value: 'carrots', label: 'Carrots' }
  ]);

  const fetchRecipes = async () => {
    try {
      const payload = { limit: pageLimit, ingredients: selectedIngredients.map(item => item.value) };
      await dispatch(getRecipeListThunk(payload)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToFavorite = async (recipe) => {
    try {
      let response = await dispatch(addToFavoriteRecipeDetails(recipe)).unwrap();
      alert(response.data.Message);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [pageLimit, selectedIngredients]);

  const handleLimitChange = (e) => {
    setPageLimit(Number(e.target.value));
  };

  const ingredientOptions = [
    { value: 'carrots', label: 'Carrots' },
    { value: 'tomatoes', label: 'Tomatoes' },
    { value: 'onions', label: 'Onions' },
    { value: 'cucumbers', label: 'Cucumbers' },
    { value: 'mozzarella', label: 'Mozzarella' },
  ];

  return (
    <div className="container">
      <div className="row">
        <h3 className="">Recipes</h3>
      </div>

      <div className="row justify-content-between align-items-center mb-2">
        <div className="col-md-4">
          <Select
            options={ingredientOptions}
            isMulti
            value={selectedIngredients}
            onChange={setSelectedIngredients}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select ingredients..."
          />
        </div>
        <div className="col-md-2">
          <select className="form-control selectpicker maingroup" value={pageLimit} onChange={handleLimitChange}>
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
          </select>
        </div>
      </div>

      <table className="table table-striped home-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Title</th>
            <th>Image</th>
            <th>Used Ingredients</th>
            <th>Missed Ingredients</th>
            <th>Likes</th>
            <th>Add to Favorite</th>
          </tr>
        </thead>
        <tbody>
          {recipeList?.length === 0 ? (
            <tr style={{ textAlign: "center" }}>
              <td colSpan="7">No data found</td>
            </tr>
          ) : (
            recipeList?.map((recipe, index) => (
              <tr key={recipe.id}>
                <td>{index + 1}</td>
                <td>{recipe.title}</td>
                <td>
                  <img src={recipe.image} alt={recipe.title} style={{ width: "100px", height: "auto" }} />
                </td>
                <td>
                  <ul>
                    {recipe.usedIngredients.map((ingredient) => (
                      <li key={ingredient.id}>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {recipe.missedIngredients.map((ingredient) => (
                      <li key={ingredient.id}>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{recipe.likes}</td>
                <td>
                  <button onClick={() => handleAddToFavorite(recipe)} className="btn btn-primary btn-sm">
                    <i className="fa-solid fa-heart"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
