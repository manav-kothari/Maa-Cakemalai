import React, { useEffect } from "react";
import ContactCardComponent from "./ContactCardComponent";
import { ContactContainer } from "./ContactElements";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <ContactContainer>
      <h1 data-aos="fade-zoom-in" className="heading">
        Our Branches
      </h1>
      <div className="box-container">
        <ContactCardComponent />
        <ContactCardComponent />
        <ContactCardComponent />
      </div>
    </ContactContainer>
  );
};

export default Contact;
