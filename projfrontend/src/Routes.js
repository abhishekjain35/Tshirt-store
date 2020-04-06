import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from './admin/AddCategory';
import ManageCategory from './admin/ManageCategory';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/signup" exact component={Signup}></Route>
                <Route path="/signin" exact component={Signin}></Route>
                <PrivateRoute
                    path="/user/dashboard"
                    exact
                    component={UserDashBoard}
                />
                <AdminRoute
                    path="/admin/dashboard"
                    exact
                    component={AdminDashBoard}
                />
                <AdminRoute
                    path="/admin/create/category"
                    exact
                    component={AddCategory}
                />
                <AdminRoute
                    path="/admin/categories"
                    exact
                    component={ManageCategory}
                />
                <AdminRoute
                    path="/admin/create/product"
                    exact
                    component={AddProduct}
                />
                <AdminRoute
                    path="/admin/products"
                    exact
                    component={ManageProducts}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
