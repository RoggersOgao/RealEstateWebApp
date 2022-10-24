import React from "react";
import { FaBuilding, FaCalendar, FaKey, FaMoneyBill, FaPhoneAlt, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./singlePageHeader.scss";
function SinglePageHeader({
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
})
 {

    const created = new Date(createdAt).toDateString()
  return (
    <div className="sPageHeader">
      <div className="sPageHeader__title">
        <div className="name">{propertyName}</div>
        <div className="username">Posted By: {username}</div>
      </div>

      <div className="sPageHeader__description">
        <div className="description">{description}</div>
        <div className="otherfeatures">
          <div className="location">
            <div className="location__title">
              <img
                src={process.env.PUBLIC_URL + "/icons/location.png"}
                alt=""
              />
              Location
            </div>
            <div className="text">
            {location}
            </div>
          </div>
          <div className="bedrooms">
            <div className="bedrooms__title">
              <img src={process.env.PUBLIC_URL + "/icons/bed.png"} alt="" />
              Bedrooms
            </div>
            <div className="text">
            {bedrooms}
            </div>
          </div>
          <div className="bathrooms">
            <div className="bathrooms__title">
              <img src={process.env.PUBLIC_URL + "/icons/shower.png"} alt="" />
              Bathrooms
            </div>
            <div className="text">
            {bathrooms}
            </div>
          </div>
        </div>
      </div>


      {/* more options in the description area */}

      <div className="sPageHeader__moreOptions">
        <div className="left">
        <div className="left--button state">
            <FaKey className="icon"/>
            {propertyState}
        </div>
        <div className="left--button type">
            <FaBuilding className="icon"/>
            {propertyType}
        </div>
        <div className="left--button rating">
            <FaStar className="icon"/>
            {rating}
        </div>
        <div className="left--button created">
            <FaCalendar className="icon"/>
            {created}
        </div>
        <div className="left--button price" >
            <FaMoneyBill className="icon"/>
            {price}
        </div>
        </div>

        <div className="right">
        <div className="right--button contact" >
            <Link to="" className="link">
            <FaPhoneAlt className="icon"/>
               Contact Me </Link>
        </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePageHeader;
