import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateCategory, getaCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    category: "",
    loading: false,
    error: "",
    categoryId: "",
    createdCategory: "",
    getaRedirect: false,
  });

  const { name, categoryId, loading, error, createdCategory } = values;

  const preload = (categoryId) => {
    getaCategory(categoryId).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          categoryId: categoryId,
        });
      }
    });
  };

  useEffect(() => {
    setValues({ ...values, loading: true });
    preload(match.params.categoryId); // eslint-disable-next-line
  }, []);

  //TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateCategory(user._id, token, { name }, categoryId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          error: "",
          name: "",
          loading: false,
          createdCategory: data.name,
        });
      }
    });
  };

  const handleChange = (event) => {
    setValues({ ...values, error: "", name: event.target.value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3 "
      style={{ display: createdCategory ? "" : "none" }}
    >
      <h4 className="text-capitalize">
        {createdCategory} Updated successfully!
      </h4>
    </div>
  );

  const errorMessage = () => {
    if (error) {
      return <h4 className="alert alert-danger text-center">{error}</h4>;
    }
  };

  const loadingMessage = () => {
    return (
      <div className="aler alert-info text-center blink_me p-4 my-4">
        <h2>Loading...</h2>
      </div>
    );
  };

  const updateCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead text-center">Enter the category name:</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="Ex. Summer"
          />
          <button
            onClick={onSubmit}
            className="btn btn-md btn-outline-success btn-block"
          >
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="page">
      {loading ? (
        loadingMessage()
      ) : (
        <>
          <div className="p-3">
            <Link to="/admin/categories" className="btn btn-md btn-dark mb-3">
              Go Back
            </Link>
          </div>
          <div className="container">
            <h4 className="text-dark text-center">Update the Category</h4>
            <div className="row text-white rounded">
              <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {updateCategoryForm()}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateCategory;
