import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import { SigninContainer } from "./Signin/SigninElements";
import { Row, Col } from "react-bootstrap";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    success: false,
  });

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

  const signUpForm = () => {
    return (
      <Row className=" justify-content-md-center">
        <Col xs={12} md={6} lg={3}>
          <form>
            <div className="form-group">
              <label className="text-light">Name:</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                placeholder="Enter Name"
                value={name}
              />
            </div>
            <div className="form-group my-2">
              <label className="text-light">Email:</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                placeholder="Enter Email"
                value={email}
              />
            </div>

            <div className="form-group my-2">
              <label className="text-light">Password:</label>
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
                Sign up
              </button>
            </Row>
            <Row className="justify-content-md-center text-center">
              <p className="mx-auto offset-sm-3 text-info col-md-12 col-sm-12">
                <strong className="bg-dark px-2 py-1 ">
                  Already a Customer?
                </strong>
                <Link
                  to="/signin"
                  className="btn btn-danger btn-sm text-center "
                >
                  Sign In
                </Link>
              </p>
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
            Account created successfully. Please{" "}
            <Link to="/signin" className="text-dark font-weight-bold">
              <p className="btn-info btn-sm btn my-1"> Sign In</p>
            </Link>
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
    <SigninContainer className="px-4 py-3">
      <h1 className="headingalt text-center text-light">Sign Up</h1>
      {loadingMessage()}
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </SigninContainer>
  );
};

export default Signup;
