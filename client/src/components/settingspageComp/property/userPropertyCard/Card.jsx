import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaTimesCircle, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./card.scss";

function Card({ listing }) {
  // handlemodal image popup
  const modalRef = useRef();
  const cardRef = useRef();
  const [imgModal, setImgModal] = useState(false);
  const [img, setImg] = useState("");
  const [cardActions, setCardActions] = useState(false)
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
        }else{
          setImgModal(true)
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


  // handling mouse events

  const handleEnter=(e)=>{
    setCardActions(true)
  }

  const handleLeave=(e)=>{
    setCardActions(false)
  }
  return (
    <>
      <div className="card" ref={cardRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>


{/* section for the buttons used in Actions */}

{cardActions && (
  <div className="propertyActions">
    <div className="propertyActions__top"><FaEdit /></div>
    <div className="propertyActions__bottom"><FaTrash /></div>
  </div>
) }

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
