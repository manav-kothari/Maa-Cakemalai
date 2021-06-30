import React, { useEffect } from "react";
import { FaDirections } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactCardComponent = ({ Title = "Title" }) => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <>
      <div data-aos="fade-right" className="box-item">
        <div className="box">
          <div
            className="box-front text-center"
            style={{
              backgroundImage: `url(
                https://images.pexels.com/photos/2174069/pexels-photo-2174069.jpeg?cs=srgb&dl=pexels-irina-iriser-2174069.jpg&fm=jpg
                )`,
            }}
          >
            <div className="inner color-white">
              <h3 className="box-header">{Title}</h3>
              <p>A short sentence describing this callout is.</p>
              <p>Number</p>
              <button className="box-button">
                Get Direction <FaDirections />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCardComponent;
