import React, { useState, useEffect } from "react";
import Cards from "./Card";
import { loadCart } from "../helper/cartHelper";
import Paymentr from "../paymentr";
import { Col, Container, Row } from "react-bootstrap";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h1 className="my-1 mb-2 py-1 headingalt">Review Cart Items:</h1>
        {products.map((product, index) => (
          <Cards
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  return (
    <Container style={{ backgroundColor: "#f8f8f8" }}>
      <Row className="text-center p-0 mx-1">
        <Col sm={12} md={6} lg={6} xl={5} className="p-0 ">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <>
              <h4 className="my-2 mt-3 p-2">
                <strong>No products here yet...</strong>
              </h4>
              <a href="/store">
                {" "}
                <button className="btn-danger btn">Start Shopping</button>
              </a>
            </>
          )}
        </Col>
        <Col sm={12} md={6} lg={6} xl={7}>
          <Paymentr products={products} setReload={setReload} />
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
