import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import { Row, Col } from "react-bootstrap";
import { isAuthenticated } from "../auth/helper/index";
import { getUser } from "./helper/userapicalls";

const UserAccount = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    success: false,
  });

  const { user, token } = isAuthenticated();

  const preload = () => {
    getUser(user._id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          name: data.name,
          email: data.email,
          loading: false,
        });
      }
    });
  };

  useEffect(() => {
    setValues({ ...values, loading: true });
    preload(match.params.userId);
    // eslint-disable-next-line
  }, []);

  const { name, email, password, error, loading, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            loading: false,
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const updateForm = () => {
    return (
      <Row className=" justify-content-md-center">
        <Col xs={12} md={6} lg={3}>
          <form>
            <div className="form-group">
              <label className="text-dark">Name:</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                placeholder="Enter Name"
                value={name}
              />
            </div>
            <div className="form-group my-2">
              <label className="text-dark">Email:</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                placeholder="Enter Email"
                value={email}
              />
            </div>

            <div className="form-group my-2">
              <label className="text-dark">Password:</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
                placeholder="Enter Password"
              />
            </div>
            <Row className="justify-content-md-center mx-1">
              <button
                onClick={onSubmit}
                className="text-center col-md-12 col-sm-12 submitbtn my-4 mx-auto"
              >
                Update
              </button>
            </Row>
          </form>
        </Col>
      </Row>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-center mt-3 ">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Account updated successfully.
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row mt-3">
        <div className=" col-md-6 offset-sm-3 text-center ">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="row mt-3">
          <div className="col-md-6 offset-sm-3 text-center ">
            <div className="alert alert-info blink_me">Loading...</div>
          </div>
        </div>
      )
    );
  };

  return (
    <div className="px-4 py-3 page">
      <h1 className="headingalt text-center text-dark">
        Update Account Details
      </h1>
      {loadingMessage()}
      {successMessage()}
      {errorMessage()}
      {updateForm()}
    </div>
  );
};

export default UserAccount;
