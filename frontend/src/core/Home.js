import React from "react";
import { API } from "../backend";
import "../styles.css";
import { Hero } from "./components";
import { Catalog, Contact } from "./components";

const Home = () => {
  console.log(API);
  return (
    <>
      <Hero />
      <Catalog />
      <Contact />
    </>
  );
};

export default Home;
