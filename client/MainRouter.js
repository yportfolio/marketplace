import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import NewShop from "./shop/NewShop";
import MyShops from "./shop/MyShops";
import Shops from "./shop/Shops";
import Shop from "./shop/Shop";
import EditShop from "./shop/EditShop";
import NewProduct from "./product/NewProduct";
import EditProduct from "./product/EditProduct";
import Product from "./product/Product";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />

        <Route path="/shops/all" component={Shops} />
        <Route path="/shops/:shopId" component={Shop} />
        <Route path="/product/:productId" component={Product} />

        <PrivateRoute path="/seller/shops" component={MyShops} />
        <PrivateRoute path="/seller/shop/new" component={NewShop} />
        <PrivateRoute path="/seller/shop/edit/:shopId" component={EditShop} />
        <PrivateRoute
          path="/seller/:shopId/products/new"
          component={NewProduct}
        />
        <PrivateRoute
          path="/seller/:shopId/:productId/edit"
          component={EditProduct}
        />

        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} />
      </Switch>
    </div>
  );
};

export default MainRouter;
