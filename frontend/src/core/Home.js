import React from "react";
import "../styles.css";
import { Hero } from "./components";
import { Catalog, Contact } from "./components";

const Home = () => {
  return (
    <>
      <Hero />
      <Catalog />
      <Contact />
    </>
  );
};

export default Home;
