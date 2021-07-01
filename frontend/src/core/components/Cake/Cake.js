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
          <CakeCardComponent Title="Birthday" Img={Birthday} />
          <CakeCardComponent Title="Anniversary" Img={Anniversary} />
          <CakeCardComponent Title="Kids" Img={Kids} />
          <CakeCardComponent Title="Theme" Img={Theme} />
          <CakeCardComponent Title="Photo" Img={Photo} />
        </div>
        <hr />
        <h1 data-aos="fade-zoom-in" className="heading">
          Shop by Flavor
        </h1>
        <div className="cards-list pb-4">
          <CakeCardComponent Title="Black Forest" Img={BlackForest} />
          <CakeCardComponent Title="Blue Berry" Img={BlueBerry} />
          <CakeCardComponent Title="Choclate" Img={Choclate} />
          <CakeCardComponent Title="Butterscotch" Img={Butterscotch} />
          <CakeCardComponent Title="Mix Fruit" Img={MixFruit} />
          <CakeCardComponent Title="Pineapple" Img={Pineapple} />
          <CakeCardComponent Title="Redvelvet" Img={Redvelvet} />
          <CakeCardComponent Title="White Choclate" Img={WhiteChoclate} />
          <CakeCardComponent Title="Vanilla" Img={Vanilla} />
          <CakeCardComponent Title="Rose" Img={Rose} />
        </div>
      </CakeContainer>
    </>
  );
};

export default Cake;
