import React, { useState } from "react";
import "./property.scss";
import { FaAngleRight, FaAngleLeft, FaFacebook, FaEnvelope, FaTwitter, FaPinterest, FaWhatsapp, FaTelegram, FaPlus, FaStar, FaArrowLeft, FaShareAlt } from "react-icons/fa";
import {Link} from 'react-router-dom'
import Nav from "../nav/NavTop";
import NavBottom from "../nav/NavBottom";
function Property({ property }) {
  const {
    propertyName,
    propertyType,
    propertyState,
    location,
    createdAt,
    bedrooms,
    bathrooms,
    description,
    features,
    img,
    rating,
    price,
    username,
  } = property;

  // initialize a state to store the slide number
  const [currentSlide, setCurrentSlide] = useState(0);
  const [open, setOpen] = useState(true);

  const handleClick = (way) => {
    way === "left"
      ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 5)
      : setCurrentSlide(currentSlide < img.length - 1 ? currentSlide + 1 : 0);
  };

  console.log(currentSlide);
  const IL = "http://localhost:5003/images/";
  return (
    <>
    <div className="home">
    <div className="home__nav">
      <div className="home__nav--top">
            <Nav />
      </div>
      <div className="home__nav--bottom">
             <NavBottom />
      </div>
      </div>
      </div>
    <div className="property">

    {/* back button and other icons for aesthetics which i will add functionallity much later is i decide */}

    <div className="propertyIcons">
      <div className="propertyIcons__back">
      <Link to="/" className="propertyIcons__back--link">
         <FaArrowLeft className="icon" />
        back</Link>
      </div>
      <div className="propertyIcons__share">
        <FaShareAlt className="iconShare" />
      </div>
    </div>

      <div
        className="property__slider"
        style={{ left: `-${currentSlide * 100}vw` }}
      >
        {img.map((item, index) => (
          <>
            {open && (
              <div className="slider" key={index}>
                <div className="slider__container">
                  <div className="item">
                    <img src={IL + item} alt="" />
                    <FaAngleLeft
                      className="iconLeft"
                      onClick={() => handleClick("left")}
                    />
                    <FaAngleRight className="iconRight" onClick={handleClick} />
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>


{/* 
Simple description of the property

*/}

<div className="property__Text">
  <div className="name">
  {propertyName}
  </div>
  <div className="moreText">
    <div className="state">
      {propertyState}
    </div>
    <div className="rating">
      <FaStar className="icon"/> 4
    </div>
  </div>
</div>

    </div>

      {/* 
share icons
area

*/}
      <div className="propertyShare">
        <div className="propertyShare--button Facebook">
          <FaFacebook className="icon" />
          Facebook
        </div>
        <div className="propertyShare--button Email">
          <FaEnvelope className="icon" />
          Email
        </div>
        <div className="propertyShare--button Twitter">
          <FaTwitter className="icon" />
          Twitter
        </div>
        <div className="propertyShare--button Pinterest">
          <FaPinterest className="icon" />
          Pinterest
        </div>
        <div className="propertyShare--button Whatsapp">
          <FaWhatsapp className="icon" />
          Whatsapp
        </div>
        <div className="propertyShare--button Telegram">
          <FaTelegram className="icon" />
          Telegram
        </div>
        <div className="propertyShare--button plus">
          <FaPlus className="icon" />
          More
        </div>
      </div>

      </>
  );
}

export default Property;
