import React from "react";
import carousel1 from "../../../img/carousel1.jpg";
import carousel2 from "../../../img/carousel2.jpg";
import "../../../App.css";
import "./AboutUs.css";

const About = () => {
  console.log("AboutUs");
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={carousel1} alt="" />
      </div>
      {/* <div className="about-section-image-container">
        <img src={carousel2} alt="" />
      </div> */}
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Food Is An Important Part Of A Balanced Diet
        </h1>
        <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
        <p className="primary-text">
          Non tincidunt magna non et elit. Dolor turpis molestie dui magnis
          facilisis at fringilla quam.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            {/* <BsFillPlayCircleFill /> Watch Video */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
