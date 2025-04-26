import React from "react";
import "../App.css";
import AuthPage from "./AuthPage";

const Homepage = () => {
  return (
    <>
      <h1
        className="text-3xl exoFont font-bold text-red-500 underline text-center"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        {" "}
        <AuthPage />
      </h1>{" "}
    </>
  );
};

export default Homepage;
