import React from 'react'
import "./photos.scss"
import ListingContext from '../../context/listing/ListingContext'
import { useContext } from 'react'
function Photos() {
    const {state} = useContext(ListingContext)


    let Arr = []
    state.listingData.map((item,index)=>(
        <div key={index}>
            {Arr.push(item.propertyType)}
        </div>
    ))
    
    
  return (
    <div className="photos">
        <div className="photos__1">
            <img src={process.env.PUBLIC_URL + "/images/mountains.jpg"} alt="" />
            <div className="group">
            <div className="title">Villas</div>
            <div className="text">{Arr.filter(x => x === "villa").length} properties</div>
            </div>
        </div>
        <div className="photos__2">
            <img src={process.env.PUBLIC_URL + "/images/chairs.jpg"} alt="" />
            <div className="group">
            <div className="title">Offices</div>
            <div className="text">{Arr.filter(x => x === "office").length} properties</div>
            </div>
        </div>
        <div className="photos__3">
            <img src={process.env.PUBLIC_URL + "/images/furniture.jpg"} alt="" />
            <div className="group">
            <div className="title">Homes</div>
            <div className="text">{Arr.filter(x => x === "home").length} properties</div>
            </div>
        </div>
        <div className="photos__4">
            <img src={process.env.PUBLIC_URL + "/images/livingRoom.jpg"} alt="" />
            <div className="group">
            <div className="title">Apartments</div>
            <div className="text">{Arr.filter(x => x === "apartment").length} properties</div>
            </div>
        </div>
        <div className="photos__5">
            <img src={process.env.PUBLIC_URL + "/images/bed.jpg"} alt="" />
            <div className="group">
            <div className="title">Condominiums</div>
            <div className="text">{Arr.filter(x => x === "condominium").length} properties</div>
            </div>
        </div>
    </div>
  )
}

export default Photos