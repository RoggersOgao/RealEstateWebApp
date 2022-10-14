import React from 'react'
import "./details.scss"
function Details() {
  return (
    <div className="detailsContainer">
      <div className="detailsImage">  
    <div className="details">
        {/* first group */}
        <div className="details__group">
        <div className="details__group--topImage">
                <img src={process.env.PUBLIC_URL + "/images/livingRoom.jpg"} alt="" />
        </div>
        <div className="details__group--number">01</div>
        <div className="details__group--text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. In temus consectetur metus.
        </div>
        </div>

        {/* second group */}
        <div className="details__group">
        <div className="details__group--topImage">
                <img src={process.env.PUBLIC_URL + "/images/mountains.jpg"} alt="" />
        </div>
        <div className="details__group--number">02</div>
        <div className="details__group--text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. In temus consectetur metus.
        </div>
        </div>

        {/* third group */}

        <div className="details__group">
        <div className="details__group--topImage">
                <img src={process.env.PUBLIC_URL + "/images/mountains.jpg"} alt="" />
        </div>
        <div className="details__group--number">03</div>
        <div className="details__group--text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. In temus consectetur metus.
        </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Details