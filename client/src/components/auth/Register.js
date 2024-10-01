import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registration } from "./authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    password2: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.password2) {
        alert("Passwords do not match. Please try again.");
        return;
      }
      const response = await dispatch(registration(formData)).unwrap();
      if (response.data?.IsSuccess) {
        navigate("/");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-10 col-md-6 col-lg-4">
        <form onSubmit={handleRegister}>
          <h3 className="mb-4 text-center">Sign Up</h3>

          <div className="form-outline mb-4">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="text"
              name="mobileNo"
              className="form-control"
              placeholder="Mobile Number"
              value={formData.mobileNo}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              name="password2"
              className="form-control"
              placeholder="Confirm Password"
              value={formData.password2}
              onChange={handleInputChange}
            />
          </div>

          <button className="btn btn-success btn-block" type="submit">
            Register
          </button>

          <p className="mt-3 text-center">
            Already have an account?
            <NavLink to="/" className="link-success">
              Sign In
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
