import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { Table, Pagination } from "react-bootstrap";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import { LinkContainer } from "react-router-bootstrap";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";

const ManageProducts = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState("");

  const pageNumber = match.params.pageNumber || 1;

  const { user, token } = isAuthenticated();

  const preload = (pageNumber) => {
    getProducts(pageNumber).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data.products);
        setPage(data.page);
        setPages(data.pages);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    preload(pageNumber);
  }, [pageNumber]);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        preload();
        setLoading(false);
      }
    });
  };

  const loadingMessage = () => {
    return (
      <div className="aler alert-info text-center blink_me p-4 my-4">
        <h2>Loading...</h2>
      </div>
    );
  };
  const errorMessage = () => {
    if (error) {
      return (
        <h4 className="alert alert-danger align-center text-center">
          Operation Failed!
        </h4>
      );
    }
  };

  return (
    <>
      {loading ? (
        loadingMessage()
      ) : error ? (
        errorMessage()
      ) : (
        <div className="page2">
          <div className="p-3">
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
              Go Back
            </Link>
            <div className="container">
              <h3 className="text-dark text-center p-2">All Products :</h3>
            </div>
            <Table
              striped
              bordered
              responsive
              hover
              variant="light"
              className="table-sm text-dark"
            >
              <thead className="">
                <tr className="text-center">
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>UPDATE</th>
                  <th>DELETE</th>
                </tr>
              </thead>

              <tbody className="text-center text-dark">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>₹{product.price}</td>
                    <td>
                      <Link
                        className="btn btn-success"
                        to={`/admin/product/update/${product._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure?")) {
                            deleteThisProduct(product._id);
                            setLoading(true);
                          }
                        }}
                        className="btn btn-danger text-center"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {pages > 1 && (
            <Pagination className="my-4 font-weight-bold center" pagination>
              <div className="text-dark">
                <LinkContainer to={`/admin/products/page/${page - 1}`}>
                  <Pagination.Item
                    disabled={page === 1}
                    className=" text-capitalize font-weight-bold "
                  >
                    <HiArrowCircleLeft classname="text-dark" size="50px" />
                  </Pagination.Item>
                </LinkContainer>
              </div>
              <h3 className="my-3 mx-3">
                {page}/{pages}
              </h3>
              <div className="text-dark">
                <LinkContainer to={`/admin/products/page/${page + 1}`}>
                  <Pagination.Item
                    disabled={page === pages}
                    className=" text-capitalize font-weight-bold "
                  >
                    <HiArrowCircleRight classname="text-dark" size="50px" />
                  </Pagination.Item>
                </LinkContainer>
              </div>
            </Pagination>
          )}
        </div>
      )}
    </>
  );
};

export default ManageProducts;
