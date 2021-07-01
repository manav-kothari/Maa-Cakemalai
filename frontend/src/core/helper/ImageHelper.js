import React from "react";
import { Card } from "react-bootstrap";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://rimatour.com/wp-content/uploads/2017/09/No-image-found.jpg`;
  return (
    <div className="card-img-top embed-responsive-item">
      <Card.Img src={imageurl} key={imageurl} variant="top" />
    </div>
  );
};

export default ImageHelper;
