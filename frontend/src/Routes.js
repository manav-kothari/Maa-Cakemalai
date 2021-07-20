import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import { Catalog, Contact, Navbar, Footer } from "./core/components";
import Signin from "./user/Signin/Signin";
import Signup from "./user/Signup";
import Reset from "./user/Reset";
import ScrollToTop from "./core/components/ScrollToTop";
import Cake from "./core/components/Cake/Cake";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashboard/UserDashboard";
import AdminDashboard from "./user/AdminDashboard/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import AdminProduct from "./user/AdminDashboard/AdminProduct";
import AdminCategory from "./user/AdminDashboard/AdminCategory";
import AdminFlavor from "./user/AdminDashboard/AdminFlavor";
import ManageCategory from "./admin/ManageCategories";
import UpdateCategory from "./admin/UpdateCategory";
import AddProduct from "./admin/AddProduct";
import AddFlavor from "./admin/AddFlavor";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Store from "./core/Store";
import ManageFlavor from "./admin/ManageFlavor";
import UpdateFlavor from "./admin/UpdateFlavor";
import Cart from "./core/components/Cart";
import AllOrders from "./user/AdminDashboard/AllOrders";
import Product from "./core/components/Product";
import UserOrders from "./user/UserDashboard/UserOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserAccount from "./user/UserAccount";
const Routes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <a href="/cart">
        {" "}
        <ToastContainer
          className="text-center"
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </a>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/resetpassword" exact component={Reset} />
        <Route path="/shop" exact component={Catalog} />
        <Route path="/store" exact component={Store} />
        <Route path="/store/page/:pageNumber" exact component={Store} />
        <Route path="/store/filter/:categoryName" exact component={Store} />
        <Route
          path="/store/sort/:sortBy/:sortByOrder"
          exact
          component={Store}
        />
        <Route
          path="/store/filter/:categoryName/sort/:sortBy/:sortByOrder"
          exact
          component={Store}
        />
        <Route
          path="/store/filter/:categoryName/sort/:sortBy/:sortByOrderpage/:pageNumber"
          exact
          component={Store}
        />
        <Route
          path="/store/filter/:categoryName/page/:pageNumber"
          exact
          component={Store}
        />
        <Route
          path="/store/sort/:sortBy/:sortByOrder/page/:pageNumber"
          exact
          component={Store}
        />
        <Route
          path="/store/filter/:categoryName/sort/:sortBy/:sortByOrder/page/:pageNumber"
          exact
          component={Store}
        />
        <Route path="/contact" exact component={Contact} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cake" exact component={Cake} />
        <Route path="/cake/category/:cakeCategory" exact component={Store} />
        <Route path="/cake/:cakeFlavor" exact component={Store} />
        <Route path="/myprofile" exact component={UserDashboard} />
        <PrivateRoute path="/myprofile/orders" exact component={UserOrders} />
        <PrivateRoute
          path="/myprofile/orders/page/:pageNumber"
          exact
          component={UserOrders}
        />
        <PrivateRoute path="/myprofile/account" exact component={UserAccount} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/products" exact component={AdminProduct} />
        <AdminRoute path="/admin/allorders" exact component={AllOrders} />
        <AdminRoute
          path="/admin/allorders/page/:pageNumber"
          exact
          component={AllOrders}
        />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute
          path="/admin/products/page/:pageNumber"
          exact
          component={ManageProducts}
        />
        <AdminRoute path="/admin/categories" exact component={AdminCategory} />
        <AdminRoute
          path="/admin/manage/products"
          exact
          component={ManageProducts}
        />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path="/admin/manage/categories"
          exact
          component={ManageCategory}
        />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />
        <AdminRoute path="/admin/flavors" exact component={AdminFlavor} />
        <AdminRoute path="/admin/create/flavor" exact component={AddFlavor} />
        <AdminRoute
          path="/admin/manage/flavors"
          exact
          component={ManageFlavor}
        />{" "}
        <AdminRoute
          path="/admin/flavor/update/:flavorId"
          exact
          component={UpdateFlavor}
        />
        <Route path="/cart" exact component={Cart} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
