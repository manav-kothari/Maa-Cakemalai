import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { SigninContainer } from "./SigninElements";
import { signin, authenticate, isAuthenticated } from "../../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Signin Failed!"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/myprofile" />;
      }
    }
    if (isAuthenticated()) return <Redirect to="/" />;
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="mt-4 col-md-6 offset-sm-3 alert alert-info text-center blink_me">
          Loading...
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="mt-4 col-md-6 offset-sm-3 alert alert-danger text-center"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const signInForm = () => {
    return (
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={3}>
          <form>
            <div className="form-group my-1">
              <label className="text-light ">Email:</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
                placeholder="Enter Email"
              />
            </div>

            <div className="form-group">
              <label className="text-light my-2">Password:</label>
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
                Sign in
              </button>
            </Row>
            <Row className="justify-content-md-center text-center">
              <p className="mx-auto offset-sm-3 text-info col-md-12 col-sm-12">
                <strong className="bg-dark px-2 py-1">New Customer?</strong>
                <Link to="/signup" className="btn btn-danger btn-sm">
                  Register
                </Link>
              </p>
            </Row>
          </form>
        </Col>
      </Row>
    );
  };

  return (
    <SigninContainer className="px-4 py-3">
      <container>
        <h1 className="text-center text-light headingalt">Sign In</h1>

        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
      </container>
    </SigninContainer>
  );
};

export default Signin;
