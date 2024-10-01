import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../utilities/Pagination";
import { getMyFavoriteListThunk, useFavoriteRecipe, removeRecipeThunk } from "./recipeSlice";
import { useNavigate } from "react-router-dom";
import { fetchPageNumbers } from "../utilities/paginationFunction";

const MyRecipe = () => {
  const dispatch = useDispatch();
  const recipeData = useFavoriteRecipe();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = recipeData?.totalPages || 0;
  const [pageNumberList, setPageNumberList] = useState([]);


  const fetchMyFavoriteRacipe = async () => {
    const payload = {
      page: currentPage,
      limit: pageLimit,
      search: searchTerm,
    };
    await dispatch(getMyFavoriteListThunk(payload)).unwrap();
  };

  useEffect(() => {
    fetchMyFavoriteRacipe();
  }, [currentPage, pageLimit, searchTerm]);

  useEffect(() => {
    setPageNumberList(fetchPageNumbers(totalPages, currentPage, 9));
  }, [totalPages, currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleLimitChange = (e) => {
    setPageLimit(Number(e.target.value));
    setCurrentPage(1);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };


  const handleRemoveRecipe = async(recipeId) => {
    const response = await dispatch(removeRecipeThunk({recipeId: recipeId}));
    if (response) {
      fetchMyFavoriteRacipe();
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h3>My Favorite Recipe</h3>
      </div>

      <div className="row justify-content-between align-items-center mb-2">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search recipes..."
          />
        </div>
        <div className="col-md-4">
          
        </div>
        <div className="col-md-2">
          <select
            className="form-control"
            value={pageLimit}
            onChange={handleLimitChange}
          >
            {[5, 10, 20, 50, 100].map((limit) => (
              <option key={limit} value={limit}>{`${limit} per page`}</option>
            ))}
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
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {recipeData?.docs?.length === 0 ? (
            <tr style={{ textAlign: "center" }}>
              <td colSpan="7">No data found</td>
            </tr>
          ) : (
            recipeData?.docs?.map((recipe, index) => (
              <tr key={recipe._id}>
                <td>{index + 1}</td>
                <td>{recipe.title}</td>
                <td>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{ width: "100px", height: "auto" }}
                  />
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
                  <button
                    onClick={() => handleRemoveRecipe(recipe._id)}
                    className="btn btn-primary"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageNumberList={pageNumberList}
        changePage={changePage}
      />
    </div>
  );
};

export default MyRecipe;
