import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import { Table, Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";
import { getMyOrders } from "../helper/userapicalls";

const UserOrders = ({ match }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState("");

  const pageNumber = match.params.pageNumber || 1;

  const { user, token } = isAuthenticated();

  const preload = (pageNumber) => {
    getMyOrders(user._id, token, pageNumber).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setOrders(data.orders);
        console.log(data);

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
            <Link to="/myprofile" className="btn btn-md btn-dark mb-3">
              Go Back
            </Link>
            <div className="container">
              <h3 className="text-dark text-center p-2 headingalt">
                My Orders :
              </h3>
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
                  <th>Product(s)</th>
                  <th>Amount</th>
                  <th>Instruction</th>
                  <th>Branch</th>
                  <th>Timestamp</th>
                  <th>Order ID</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>

              <tbody className="text-center text-dark">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      {order.products.map((product, index) => {
                        return (
                          <a
                            href={`/product/${product._id}`}
                            className="text-dark "
                          >
                            <u>{product.name}</u> |{" "}
                          </a>
                        );
                      })}
                    </td>
                    <td>₹{order.amount / 100}</td>
                    <td>{order.instruction}</td>
                    <td>{order.branch}</td>
                    <td>{order.createdAt}</td>
                    <td>{order._id}</td>
                    <td>{order.transaction_id}</td>
                    <td>{order.user._id}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {pages > 1 && (
            <div className="center ">
              <Pagination className="my-4 font-weight-bold " pagination>
                <div className="">
                  <LinkContainer to={`/myprofile/orders/page/${page - 1}`}>
                    <Pagination.Item
                      disabled={page === 1}
                      className=" text-capitalize font-weight-bold "
                    >
                      <HiArrowCircleLeft size="50px" className="text-dark" />
                    </Pagination.Item>
                  </LinkContainer>
                </div>
                <h3 className="mt-3 mx-3">
                  <strong>
                    {page}/{pages}
                  </strong>
                </h3>
                <div className="">
                  <LinkContainer to={`/myprofile/orders/page/${page + 1}`}>
                    <Pagination.Item
                      disabled={page === pages}
                      className=" text-capitalize font-weight-bold "
                    >
                      <HiArrowCircleRight size="50px" className="text-dark" />
                    </Pagination.Item>
                  </LinkContainer>
                </div>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserOrders;
