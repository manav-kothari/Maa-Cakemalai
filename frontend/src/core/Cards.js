import React, { useState } from "react";
import { Card } from "react-bootstrap";
import ImageHelper from "../helper/ImageHelper";

const Cards = () => {
  return (
    <Card className="rounded bg-white cards ">
      <ImageHelper style={{ border: "none" }} product={product} />
      <Card.Body className="card-body px-3 py-1 ">
        {getARedirect(redirect)}
        <Card.Title as="h5" className="text-dark mt-1 m-0 p-0 headingpro">
          {product.name}
        </Card.Title>
        <div className="m-0 p-0">{product.description}</div>
        <Card.Text className="mb-1" as="h6">
          ₹{product.price}
        </Card.Text>
      </Card.Body>
      <div
        style={{ backgroundColor: "#000" }}
        className="btn btn-block text-white mx-2 mb-2"
      >
        Buy Now
      </div>
    </Card>
  );
};

export default Cards;
