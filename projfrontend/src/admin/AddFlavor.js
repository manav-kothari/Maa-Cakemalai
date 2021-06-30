import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { createFlavor } from "./helper/adminapicall";

const AddFlavor = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const successMessage = () => {
    if (success) {
      return (
        <h4 className="alert alert-success text-center">
          Flavor created successfully!
        </h4>
      );
    }
  };
  const errorMessage = () => {
    if (error) {
      return (
        <h4 className="alert alert-danger align-center">
          Failed! to create Flavor
        </h4>
      );
    }
  };

  const myFlavorForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead text-center">Enter the flavor name:</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handlechange}
            value={name}
            autoFocus
            required
            placeholder="Ex. Cake"
          />
          <button
            onClick={onSubmit}
            className="btn btn-md btn-outline-success btn-block"
          >
            Create Flavor
          </button>
        </div>
      </form>
    );
  };

  const goBack = () => {
    return (
      <Link className="btn btn-md btn-dark my-2" to="/admin/dashboard">
        Go Back
      </Link>
    );
  };

  const handlechange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createFlavor(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  return (
    <div className="page">
      <div className="p-3">{goBack()}</div>
      <div className="container p-4">
        <h4 className="text-dark text-center">Create a new Flavor</h4>
        <div className="row bg-light rounded ">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {errorMessage()}
            {myFlavorForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFlavor;
