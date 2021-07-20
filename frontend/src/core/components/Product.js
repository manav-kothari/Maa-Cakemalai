import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { getaProduct } from "../helper/coreapicalls";
import ImageHelper from "../helper/ImageHelper";
import { Col, Container } from "react-bootstrap";

const Product = ({ match }) => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const productId = match.params.productId;

  const loadProduct = (productId) => {
    getaProduct(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        setLoading(false);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    loadProduct(productId);
  }, [productId]);
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
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
        <div className="mt-4 col-md-6 offset-sm-3 alert alert-info text-center blink_me">
          Loading...
        </div>
      )
    );
  };

  return (
    <>
      {loading ? (
        <>{loadingMessage()}</>
      ) : error ? (
        errorMessage()
      ) : (
        <Col sm={12} md={6} lg={4} xl={4} className="page text-center mx-auto">
          <Container>
            <Card className="rounded bg-white cards my-4 p-0 mx-auto">
              <ImageHelper style={{ border: "none" }} product={product} />
              <Card.Body className="card-body px-3 p-0 ">
                <Card.Title
                  as="h5"
                  className="text-dark mt-1 m-0 p-0 headingpro"
                >
                  {product.name}
                </Card.Title>
                <div className="m-0 p-0">{product.description}</div>
                <Card.Text className="mb-1" as="h6">
                  ₹{product.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      )}
    </>
  );
};

export default Product;
