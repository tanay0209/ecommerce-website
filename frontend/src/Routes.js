import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashboard from './user/UserDashBoard';
import AdminDashboard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';

export default function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path='/'
          element={<Home />}
        />
        <Route
          exact
          path='/signup'
          element={<Signup />}
        />
        <Route
          exact
          path='/signin'
          element={<Signin />}
        />
        <Route
          path='/cart'
          exact
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path='/user/dashboard'
          exact
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin/dashboard'
          exact
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path='/admin/create/category'
          exact
          element={
            <AdminRoute>
              <AddCategory />
            </AdminRoute>
          }
        />

        <Route
          path='/admin/categories'
          exact
          element={
            <AdminRoute>
              <ManageCategories />
            </AdminRoute>
          }
        />

        <Route
          path='/admin/products'
          exact
          element={
            <AdminRoute>
              <ManageProducts />
            </AdminRoute>
          }
        />

        <Route
          path='/admin/create/product'
          exact
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path='/admin/product/update/:productId'
          exact
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}
