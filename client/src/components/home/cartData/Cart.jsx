import React from 'react'
import "./cart.scss"
import { FaTimes } from 'react-icons/fa';
import {Link} from 'react-router-dom'
function Cart({cart}) {
  return (
    <div className="cart">
        <div className="cart__left">
            <img src={process.env.PUBLIC_URL + `${cart.img}`} alt="" className='cart__left--img'/>
            <div className="card__left--group">
                <div className="link1" >
                    <FaTimes className="closeIcon"/>
                </div>
            </div>
        </div>
        <div className="cart__right">
            <div className="top">
                <div className="top__group">
                    <img src={process.env.PUBLIC_URL + "/icons/user.png"} alt="" />
                    <p>{cart.username}</p>
                </div>
                <div className="top__group">
                    <img src={process.env.PUBLIC_URL + "/icons/update.png"} alt="" />
                    <p>{cart.date}</p>
                </div>
            </div>
            <div className="middle">
                <div className="middle__title">
                <Link to="/" className='link'>
                    {cart.propertyName}
                </Link>
                </div>
                <div className="middle__location">
                    {cart.location}
                </div>
                <div className="middle__others">
                    <div className="shower">
                        <img src={process.env.PUBLIC_URL + "/icons/shower.png"} alt="" />
                        <p>{cart.bathrooms}</p>
                    </div>
                    <div className="bedroom">
                    <img src={process.env.PUBLIC_URL + "/icons/bed.png"} alt="" />
                    <p>{cart.bedrooms}</p>
                    </div>
                    <div className="size">
                    <img src={process.env.PUBLIC_URL + "/icons/ruler.png"} alt="" />
                    <p>{Number(cart.propertySize).toLocaleString()} Sqr ft</p>
                    </div>
                </div>
            </div>
            <div className="bottomCart">
                <div className="bottomCart__left">
                    <div className="type">
                        {cart.propertyType}
                    </div>
                    <div className="rating">
                        {cart.rating}
                    </div>
                </div>
                <div className="bottomCart__right">
                    <p>Ksh  {Number(cart.price).toLocaleString()}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart