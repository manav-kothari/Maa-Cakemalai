import React, { useEffect } from "react";
import { CakeContainer } from "./CakeElements";
import AOS from "aos";
import "aos/dist/aos.css";
import CakeCardComponent from "./CakeCardComponent";
import Birthday from "../../images/birthday.png";
import Anniversary from "../../images/anniversary.jpg";
import Kids from "../../images/kids.jpg";
import Theme from "../../images/theme.jpg";
import Photo from "../../images/photo.jpg";
import BlackForest from "../../images/blackforest.jpg";
import BlueBerry from "../../images/blueberry.jpg";
import Choclate from "../../images/choclate.jpg";
import Butterscotch from "../../images/butterscotch.jpg";
import MixFruit from "../../images/mixfruit.jpg";
import Pineapple from "../../images/pineapple.jpg";
import Redvelvet from "../../images/redvelvet.jpg";
import WhiteChoclate from "../../images/whitechoclate.jpg";
import Vanilla from "../../images/vanilla.jpg";
import Rose from "../../images/rose.jpg";

const Cake = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <>
      <CakeContainer>
        <h1 data-aos="fade-zoom-in" className="heading">
          Shop by Category
        </h1>
        <div className="cards-list pb-4">
          <CakeCardComponent
            link="/cake/category/Birthday"
            Title="Birthday"
            Img={Birthday}
          />
          <CakeCardComponent
            link="/cake/category/Anniversary"
            Title="Anniversary"
            Img={Anniversary}
          />
          <CakeCardComponent
            link="/cake/category/Kids"
            Title="Kids"
            Img={Kids}
          />
          <CakeCardComponent
            link="/cake/category/Theme"
            Title="Theme"
            Img={Theme}
          />
          <CakeCardComponent
            link="/cake/category/Photo"
            Title="Photo"
            Img={Photo}
          />
        </div>
        <hr />
        <h1 data-aos="fade-zoom-in" className="heading">
          Shop by Flavor
        </h1>
        <div className="cards-list pb-4">
          <CakeCardComponent
            link="/cake/Black Forest"
            Title="Black Forest"
            Img={BlackForest}
          />
          <CakeCardComponent
            link="/cake/Blue Berry"
            Title="Blue Berry"
            Img={BlueBerry}
          />
          <CakeCardComponent
            link="/cake/Choclate"
            Title="Choclate"
            Img={Choclate}
          />
          <CakeCardComponent
            link="/cake/Butterscotch"
            Title="Butterscotch"
            Img={Butterscotch}
          />
          <CakeCardComponent
            link="/cake/Mix Fruit"
            Title="Mix Fruit"
            Img={MixFruit}
          />
          <CakeCardComponent
            link="/cake/Pineapple"
            Title="Pineapple"
            Img={Pineapple}
          />
          <CakeCardComponent
            link="/cake/Red Velvet"
            Title="Red Velvet"
            Img={Redvelvet}
          />
          <CakeCardComponent
            link="/cake/White Choclate"
            Title="White Choclate"
            Img={WhiteChoclate}
          />
          <CakeCardComponent
            link="/cake/Vanilla"
            Title="Vanilla"
            Img={Vanilla}
          />
          <CakeCardComponent link="/cake/Rose" Title="Rose" Img={Rose} />
        </div>
      </CakeContainer>
    </>
  );
};

export default Cake;
