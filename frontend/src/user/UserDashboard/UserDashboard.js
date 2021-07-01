import React from "react";
import { Link } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth/helper/index";
import { Button } from "react-bootstrap";
import { cartEmpty } from "../../core/helper/cartHelper";

import { UserDashboardContainer } from "./UserDashboardElemnts";
const UserDashBoard = () => {
  return (
    <UserDashboardContainer>
      <div className="card bg-dark col-sm-9 col-md-8 offset-sm-2">
        <h4 className="my-4 card-header text-white text-center bg-danger p-3">
          My Dashboard
        </h4>
        <ul className="list-group ">
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <>
              {" "}
              <Button
                style={{ border: "none" }}
                className=" list-group-item p-3 my-3 bg-dark"
              >
                <Link
                  to="/myprofile/orders"
                  className="rounded nav-link text-light text-center bg-success"
                >
                  <h2>My Orders</h2>
                </Link>
              </Button>{" "}
              <Button
                style={{ border: "none" }}
                className="list-group-item p-3 my-3 bg-dark"
              >
                <Link
                  to="/myprofile/account"
                  className="rounded nav-link text-light text-center bg-success"
                >
                  <h2>Account Setting</h2>
                </Link>
              </Button>
              <Button
                style={{ border: "none" }}
                className="list-group-item my-3 p-3 bg-dark"
              >
                <Link
                  onClick={() => {
                    cartEmpty(() => {});
                    signout(() => {});
                  }}
                  to="/"
                  className="rounded nav-link text-dark text-center bg-warning"
                >
                  <h2>Logout</h2>
                </Link>
              </Button>
            </>
          )}{" "}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <>
              {" "}
              <Button
                style={{ border: "none" }}
                className="list-group-item p-3 my-3 bg-dark"
              >
                <Link
                  to="/admin/allorders"
                  className="rounded nav-link text-light text-center bg-success"
                >
                  <h2>All Orders</h2>
                </Link>
              </Button>
              <Button
                style={{ border: "none" }}
                className=" list-group-item p-3 my-3 bg-dark"
              >
                <Link
                  to="/admin/dashboard"
                  className="rounded nav-link text-light text-center bg-success"
                >
                  <h2>Admin Dashboard</h2>
                </Link>
              </Button>{" "}
              <Button
                style={{ border: "none" }}
                className="list-group-item p-3 my-3 bg-dark"
              >
                <Link
                  to="/myprofile/account"
                  className="rounded nav-link text-light text-center bg-success"
                >
                  <h2>Account Setting</h2>
                </Link>
              </Button>
              <Button
                style={{ border: "none" }}
                className="list-group-item my-3 p-3 bg-dark"
              >
                <Link
                  onClick={() => {
                    cartEmpty(() => {});
                    signout(() => {});
                  }}
                  to="/"
                  className="rounded nav-link text-dark text-center bg-warning"
                >
                  <h2>Logout</h2>
                </Link>
              </Button>
            </>
          )}
          {!isAuthenticated() && (
            <>
              <h1 className="heading">
                Please ---{" "}
                <Link to="/signin" className="text-dark font-weight-bold">
                  <p className="btn-info btn btn mt-1"> Sign In</p>
                </Link>
              </h1>
            </>
          )}
        </ul>
      </div>
    </UserDashboardContainer>
  );
};

export default UserDashBoard;
