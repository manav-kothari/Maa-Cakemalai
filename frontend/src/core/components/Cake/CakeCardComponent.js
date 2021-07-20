import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const CakeCardComponent = ({ link = "", Title = "Title", Img = "" }) => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <Link to={link}>
      <div data-aos="fade-up" className="cate_card 1 rounded-circle">
        <div class="cate_card_image">
          <img aria-hidden src={Img} alt="Cake image" />
        </div>
        <div class="cate_card_title title-white">
          <p>{Title}</p>
        </div>
      </div>
    </Link>
  );
};

export default CakeCardComponent;
