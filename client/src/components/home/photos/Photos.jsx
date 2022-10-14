import React from 'react'
import "./photos.scss"
function Photos() {
  return (
    <div className="photos">
        <div className="photos__1">
            <img src={process.env.PUBLIC_URL + "/images/mountains.jpg"} alt="" />
            <div className="group">
            <div className="title">Villas</div>
            <div className="text">2 properties</div>
            </div>
        </div>
        <div className="photos__2">
            <img src={process.env.PUBLIC_URL + "/images/chairs.jpg"} alt="" />
            <div className="group">
            <div className="title">Offices</div>
            <div className="text">4 properties</div>
            </div>
        </div>
        <div className="photos__3">
            <img src={process.env.PUBLIC_URL + "/images/furniture.jpg"} alt="" />
            <div className="group">
            <div className="title">Homes</div>
            <div className="text">4 properties</div>
            </div>
        </div>
        <div className="photos__4">
            <img src={process.env.PUBLIC_URL + "/images/livingRoom.jpg"} alt="" />
            <div className="group">
            <div className="title">Apartments</div>
            <div className="text">2 properties</div>
            </div>
        </div>
        <div className="photos__5">
            <img src={process.env.PUBLIC_URL + "/images/bed.jpg"} alt="" />
            <div className="group">
            <div className="title">Condominiums</div>
            <div className="text">3 properties</div>
            </div>
        </div>
    </div>
  )
}

export default Photos