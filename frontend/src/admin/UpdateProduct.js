import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    loading,
    error,
    createdProduct,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      // console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category.name,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    setValues({ ...values, loading: true });
    preload(match.params.productId);
    // eslint-disable-next-line
  }, []);

  //TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            discountedPrice: "",
            photo: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} Updated successfully!</h4>
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

  const createProductForm = () => (
    <form>
      <span className="text-dark">Post photo:</span>
      <div className="form-group mb-2">
        <label className="btn btn-block btn-dark">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group my-2">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name (max: 32 charcters)"
          value={name}
        />
      </div>
      <div className="form-group my-2">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description (max: 2000 charcters)"
          value={description}
        />
      </div>
      <div className="form-group my-2">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Original Price"
          value={price}
        />
      </div>

      <div className="form-group my-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select Category</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group my-2">
        <select
          onChange={handleChange("flavor")}
          className="form-control"
          placeholder="Flavor"
        >
          <option>Select Cake Flavor</option>

          <option>Black Forest</option>
          <option>Blue Berry</option>
          <option>Butterscotch</option>
          <option>Choclate</option>
          <option>Mix Fruit</option>
          <option>Pineapple</option>
          <option>Red Velvet</option>
          <option>Rose</option>
          <option>Vanilla</option>
          <option>White Choclate</option>
        </select>
      </div>

      <div className="form-group my-2">
        <select
          onChange={handleChange("cakeCategory")}
          className="form-control"
          placeholder="Cake Category"
        >
          <option>Select Cake Category</option>

          <option>Anniversary</option>
          <option>Birthday</option>
          <option>Kids</option>
          <option>Photo</option>
          <option>Theme</option>
        </select>
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-md btn-outline-success mb-3"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <>
      {loading ? (
        loadingMessage()
      ) : (
        <div className="page">
          <div className="p-3">
            <Link
              to="/admin/manage/products"
              className="btn btn-md btn-dark mb-3"
            >
              Go Back
            </Link>
          </div>
          <div className="container">
            <h4 className="text-dark text-center">Update the Product</h4>
            <div className="row text-white rounded">
              <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {createProductForm()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
