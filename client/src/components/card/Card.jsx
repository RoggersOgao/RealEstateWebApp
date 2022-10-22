import React, { useState, useEffect, useRef } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./card.scss";

function Card({ listing, handleHeartClick }) {
  // handlemodal image popup
  const modalRef = useRef();
  const [imgModal, setImgModal] = useState(false);
  const [img, setImg] = useState("");
  const handleZoomOut = (img) => {
    setImg(img);
    setImgModal(true);
  };

  useEffect(() => {
    const handler = (e) => {
      try {
        const modal = modalRef.current.contains(e.target);

        if (!modal) {
          setImgModal(false);
        }
      } catch (err) {}
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const createdAt = new Date(listing.createdAt).toDateString();


  const IL = "http://localhost:5003/images/"

  return (
    <>
      <div className="card">
        <div className="card__left">
          <img
            src={IL + `${listing.img[0]}`}
            alt=""
            className="card__left--img"
          />
          <div className="card__left--group">
            <div className="link1" onClick={() => handleZoomOut(listing.img[0])}>
              <img src={process.env.PUBLIC_URL + "/icons/zoomOut.png"} alt="" />
            </div>
            <div className="link2" onClick={() => handleHeartClick(listing)}>
              <img src={process.env.PUBLIC_URL + "/icons/heart.png"} alt="" />
            </div>
          </div>
        </div>
        <div className="card__right">
          <div className="top">
            <div className="top__group">
              <img src={process.env.PUBLIC_URL + "/icons/user.png"} alt="" />
              <p>{listing.username}</p>
            </div>
            <div className="top__group">
              <img src={process.env.PUBLIC_URL + "/icons/update.png"} alt="" />
              <p>{createdAt}</p>
            </div>
          </div>
          <div className="middle">
            <div className="middle__title">
              <Link to={`/listing/${listing._id}`} className="link">
                {listing.propertyName}
              </Link>
            </div>
            <div className="middle__location">{listing.location}</div>
            <div className="middle__others">
              <div className="shower">
                <img
                  src={process.env.PUBLIC_URL + "/icons/shower.png"}
                  alt=""
                />
                <p>{listing.bathrooms}</p>
              </div>
              <div className="bedroom">
                <img src={process.env.PUBLIC_URL + "/icons/bed.png"} alt="" />
                <p>{listing.bedrooms}</p>
              </div>
              <div className="size">
                <img src={process.env.PUBLIC_URL + "/icons/ruler.png"} alt="" />
                <p>{Number(listing.propertySize).toLocaleString()} Sqr ft</p>
              </div>
            </div>
          </div>
          <div className="bottomCard">
            <div className="bottomCard__left">
              <div className="type">{listing.propertyState}</div>
              <div className="rating">{listing.rating}</div>
            </div>
            <div className="bottomCard__right">
              <p>Ksh {Number(listing.price).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {imgModal && (
        <div className="imageModal">
          <div className="container" ref={modalRef}>
            <div className="imgCont">
              <img
                src={IL + `${img}`}
                alt=""
                className="imgM"
              />
            </div>
            <div className="icons" onClick={() => setImgModal(false)}>
              <FaTimesCircle className="icon" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
