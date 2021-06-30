import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import React from "react";
import { AdminDashboardContainer } from "./AdminDashboardElements";

const AdminDashboard = () => {
  return (
    <AdminDashboardContainer>
      <Link className="btn btn-md btn-light mb-1 mx-3" to="/myprofile">
        Go Back
      </Link>
      <div className="card bg-dark col-sm-9 col-md-8 offset-sm-2">
        <h4 className="my-4 card-header text-white text-center bg-danger p-3">
          Admin Dashboard
        </h4>
        <ul className="list-group ">
          <Button
            style={{ border: "none" }}
            className=" list-group-item p-3 my-3 bg-dark"
          >
            <Link
              to="/admin/products"
              className="rounded nav-link text-light text-center bg-success"
            >
              <h2>Products</h2>
            </Link>
          </Button>
          <Button
            style={{ border: "none" }}
            className=" list-group-item p-3 my-3 bg-dark"
          >
            <Link
              to="/admin/categories"
              className="rounded nav-link text-light text-center bg-success"
            >
              <h2>Category</h2>
            </Link>
          </Button>
          {/* <Button
            style={{ border: "none" }}
            className="list-group-item p-3 my-3 bg-dark"
          >
            <Link
              to="/admin/flavors"
              className="rounded nav-link text-light text-center bg-success"
            >
              <h2>Cake Flavor</h2>
            </Link>
          </Button> */}
        </ul>
      </div>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
