import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Sidebar from '../components/Sidebar/Sidebar';
import Register from '../components/auth/Register';
import RequireAuth from '../components/utilities/RequireAuth';
import Login from '../components/auth/Login';

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<RequireAuth />}>
          <Route path="*" element={<Sidebar />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
