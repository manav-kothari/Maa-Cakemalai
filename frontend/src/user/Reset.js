import React, { useState } from "react";
import { Link } from "react-router-dom";
import { resetpassword } from "../auth/helper";
import { SigninContainer } from "./Signin/SigninElements";
import { Row, Col } from "react-bootstrap";

const Reset = () => {
  const [values, setValues] = useState({
    email: "manavkothari777@gmail.com",
    error: "",
    loading: false,
    success: false,
  });

  const { email, error, loading, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    resetpassword({ email })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            email: "",
            error: "",
            loading: false,
            success: true,
          });
        }
      })
      .catch(console.log("Error"));
  };

  const resetForm = () => {
    return (
      <Row className=" justify-content-md-center">
        <Col xs={12} md={6} lg={3}>
          <form>
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

            <Row className="justify-content-md-center mx-1">
              <button
                onClick={onSubmit}
                className="text-center col-md-12 col-sm-12 submitbtn my-4 mx-auto"
              >
                Reset Password
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
            Password reset link sent successfully. Please check your email
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
      {resetForm()}
    </SigninContainer>
  );
};

export default Reset;
