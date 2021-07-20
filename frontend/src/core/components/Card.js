import React from "react";
import { Card } from "react-bootstrap";
import ImageHelper from "../helper/ImageHelper";
import { toast } from "react-toastify";

// import { Redirect } from "react-router-dom";

import { addItemToCart, removeItemFromCart } from "../helper/cartHelper";

const Cards = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  // const [redirect, setRedirect] = useState(false); // eslint-disable-next-line
  // const [count, setCount] = useState(product.count);

  const addToCart = () => {
    addItemToCart(product, () => toast.info(`${product.name} added to cart!`));
  };

  // const getARedirect = (redirect) => {
  //   if (redirect) {
  //     return <Redirect to="/cart" />;
  //   }
  // };
  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <div
          style={{ backgroundColor: "#000" }}
          className="btn btn-block text-white mx-2 mb-2"
          onClick={addToCart}
        >
          Add to Cart
        </div>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <div
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          style={{ backgroundColor: "#bc1823" }}
          className="btn btn-block text-white mx-2 mb-2 "
        >
          Remove from Cart
        </div>
      )
    );
  };
  return (
    <>
      <Card className="rounded bg-white cards my-3">
        <ImageHelper style={{ border: "none" }} product={product} />
        <Card.Body className="card-body px-3 py-1 ">
          {/* {getARedirect(redirect)} */}
          <Card.Title as="h5" className="text-dark mt-1 m-0 p-0 headingpro">
            {product.name}
          </Card.Title>
          <div className="m-0 p-0">{product.description}</div>
          <Card.Text className="mb-1" as="h6">
            ₹{product.price}
          </Card.Text>
        </Card.Body>
        {showAddToCart(addtoCart)}
        {showRemoveFromCart(removeFromCart)}
      </Card>
    </>
  );
};

export default Cards;
