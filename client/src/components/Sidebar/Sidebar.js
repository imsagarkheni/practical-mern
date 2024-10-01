import React from "react";
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import "./sidebar.css";
import {useDispatch} from "react-redux";
import Error from "../Error/Error";
import Dashboard from "../Dashboard/Dashboard";
import {removeToken} from "../auth/authSlice";
import MyRecipe from "../Dashboard/MyRecipe";

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeToken());
    navigate("/");
  };

  return (
    <div className="sidebar-container">
      <div className="left-panel">
        <div className="sidebar-header">
          <h1 className="logo">Recipe</h1>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" activeclassname="active" className="sidebar-link">
            <i className="fas fa-home"></i>
            <span className="link-text">Dashboard</span>
          </NavLink>
        </nav>
        <nav className="sidebar-nav">
          <NavLink to="/myrecipes" className="sidebar-link">
            <i className="fas fa-utensils"></i>
            <span className="link-text">My Recipes</span>
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            <i className="fa-solid fa-right-from-bracket"></i> &nbsp;
            <span className="button-text">Logout</span>
          </button>
        </div>
      </div>

      <div className="right-panel">
        <div className="page-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myrecipes" element={<MyRecipe />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
