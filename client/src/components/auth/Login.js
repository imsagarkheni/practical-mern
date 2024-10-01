import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInUser, useUser } from "./authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useUser();
  const token = user?.token || null;

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await dispatch(logInUser(userData)).unwrap();
      if (response.data?.Data) {
        setError(null);
        navigate("/dashboard");
      } else {
        setError(response.data?.Message || "Login failed");
      }
    } catch (error) {
      setError("Username or Password Incorrect");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div>
      <section className="vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <form onSubmit={handleSubmit} className="mt-4">
                <h4 className="mb-4">Sign In</h4>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={userData.email}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={userData.password}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your password"
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button className="btn btn-success w-100" type="submit">
                  Login
                </button>
                <p className="mt-3">
                  <NavLink to="/register" className="text-success">
                    Sign Up here
                  </NavLink>
                </p>
              </form>
            </div>
            <div className="col-md-6 d-none d-md-block">
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
