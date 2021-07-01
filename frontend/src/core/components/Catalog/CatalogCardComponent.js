import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const CatalogCardComponent = ({ link = "", Title = "Title", Img = "" }) => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <Link to={link}>
      <div data-aos="fade-up" class="card1">
        <div class="card_image">
          <img aria-hidden src={Img} alt="catalog image" />
        </div>
        <div class="card_title title-white">
          <p>{Title}</p>
        </div>
      </div>
    </Link>
  );
};

export default CatalogCardComponent;
