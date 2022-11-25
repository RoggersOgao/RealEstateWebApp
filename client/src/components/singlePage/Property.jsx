import React, { useState } from "react";
import "./property.scss";
import { FaAngleRight, FaAngleLeft, FaFacebook, FaEnvelope, FaTwitter, FaPinterest, FaWhatsapp, FaTelegram, FaPlus, FaStar, FaArrowLeft, FaShareAlt } from "react-icons/fa";
import {Link} from 'react-router-dom'
import Nav from "../nav/NavTop";
import NavBottom from "../nav/NavBottom";
import Footer from "../footer/Footer";
import SinglePageHeader from "./headerDescription/SinglePageHeader";
import Comments from "./comments/Comments";
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
    userId,
    _id,
    rating,
    price,
    username,
  } = property;

  // initialize a state to store the slide number
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [open, setOpen] = useState(true);

  const handleClick = (way) => {
    way === "left"
      ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : img.length - 1)
      : setCurrentSlide(currentSlide < img.length - 1 ? currentSlide + 1 : 0);
  };

  const IL = "http://localhost:5003/images/";
  return (
    <>
    
      <div className="property">
    <div className="property__nav">
      <div className="property__nav--top">
            <Nav />
      </div>
      <div className="property__nav--bottom">
             <NavBottom />
      </div>
      </div>
      <div className="property__header">
      <FaAngleLeft
                  className="iconLeft"
                  onClick={() => handleClick("left")}
                />
      <FaAngleRight className="iconRight" onClick={handleClick} />
      {img.map((item, index) => (
      <div key={index}>
          <div className={index === currentSlide ? "slide current": "slide"}>
            {index === currentSlide && (
              <div className="item">
                <img src={IL + item} alt="" />
              </div>
              )
            }
          </div>
      </div>
    ))}
      
      </div>

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
{/* -${currentSlide * 100})vw */}
  

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

  <div className="propertyDescriptionBody">
    <div className="top">
    <div className="propertyDescriptionBody__left">
      
      {/* for this section i will use css grid to achieve a classy image gallery */}

      <div className="images">

        <div className="images--1">
          {img[0] ? (
            <img src={IL + img[1]} alt="" />
          ):
          (
            <>
            <img src={process.env.PUBLIC_URL + "/images/city.jpg"} alt="" srcSet="" />
            <p>no image upload</p>
            </>
          )}
        </div>
        <div className="images--2">
        {img[1] ? (
            <img src={IL + img[2]} alt="" />
          ):
          (
            <>
            <img src={process.env.PUBLIC_URL + "/images/city.jpg"} alt="" srcSet="" />
            <p>no image upload</p>
            </>
          )}
        </div>
        <div className="images--3">
        {img[3] ? (
            <img src={IL + img[3]} alt="" />
          ):
          (
            <>
            <img src={process.env.PUBLIC_URL + "/images/city.jpg"} alt="" srcSet="" />
            <p>no image upload</p>
            </>
          )}
        </div>
        <div className="images--4">
        {img[3] ? (
            <img src={IL + img[4]} alt="" />
          ):
          (
            <>
            <img src={process.env.PUBLIC_URL + "/images/city.jpg"} alt="" srcSet="" />
            <p>no image upload</p>
            </>
          )}
        </div>
        <div className="images--5">
        {img[4] ? (
            <img src={IL + img[5]} alt="" />
          ):
          (
            <>
            <img src={process.env.PUBLIC_URL + "/images/city.jpg"} alt="" srcSet="" />
            <p>no image upload</p>
            </>
          )}
        </div>
      </div>
    </div>
    <div className="propertyDescriptionBody__right">
    
        {/* header */}
        <SinglePageHeader 
        propertyName ={propertyName}
        propertyType={propertyType}
        propertyState={propertyState}
        location={location}
        createdAt={createdAt}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        description={description}
        features={features}
        img={img}
        userId={userId}
        _id={_id}
        rating={rating}
        price={price}
        username={username}
        />

        {/* description with data */}


        {/* comments section */}


      {/* 
      comments section design and implementation will be here~~
      */}
    </div>
    </div>
  </div>
    <div className="bottomP">

      {/* comments */}

    <Comments />   


      {/* google maps implementaion will be here  */}

    </div>

<Footer />
      
</div>
   
      </>
  );
}

export default Property;
