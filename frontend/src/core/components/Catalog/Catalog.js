import React, { useEffect } from "react";
import { CatalogContainer } from "./CatalogElements";
import CatalogCardComponent from "./CatalogCardComponent";
import Cake from "../../images/cake.jpg";
import Sweet from "../../images/sweet.jpg";
import Puff from "../../images/puff.jpg";
import Khaari from "../../images/khari.jpg";
import Toast from "../../images/toast.jpg";
import CreamRoll from "../../images/creamroll.jpg";
import Cookies from "../../images/cookies.jpg";
import Bread from "../../images/bread.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Catalog = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <CatalogContainer>
      <h1 data-aos="fade-zoom-in" className="heading">
        Catalog
      </h1>
      <div className="cards-list">
        <CatalogCardComponent link="/cake" Title="Cake" Img={Cake} />
        <CatalogCardComponent
          link="/store/filter/Cookies"
          Title="Cookies"
          Img={Cookies}
        />
        <CatalogCardComponent
          link="/store/filter/Puff"
          Title="Puff"
          Img={Puff}
        />
        <CatalogCardComponent
          link="/store/filter/Khaari"
          Title="Khaari"
          Img={Khaari}
        />
        <CatalogCardComponent
          link="/store/filter/Toast"
          Title="Toast"
          Img={Toast}
        />
        <CatalogCardComponent
          link="/store/filter/Cream Roll"
          Title="Cream Roll"
          Img={CreamRoll}
        />
        <CatalogCardComponent
          link="/store/filter/Sweet"
          Title="Sweet"
          Img={Sweet}
        />
        <CatalogCardComponent
          link="/store/filter/Bread"
          Title="Bread"
          Img={Bread}
        />
      </div>
    </CatalogContainer>
  );
};

export default Catalog;
