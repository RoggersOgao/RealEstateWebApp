import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import "./footer.scss"
import {Link} from 'react-router-dom'
function Footer() {

    const yearName = new Date().getFullYear()

  return (
    <div className="ftCont">
    <footer className="footer">
      <div className="titleRow">
    
    
    
      </div>
        <div className="footerContainer">
        
{/* first row */}

{/* declaring a list */}
<ul className="firstRowUl">
          {/* logo */}
    <div className="img">
    <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="" />
    </div>
    
    {/* location */}
    <li  className="group">
        <div className="group__location">
            <img src={process.env.PUBLIC_URL + "/icons/location.png"} alt="" />
            <p>Location: Nairobi, Kenya</p>
        </div>
    </li>
    {/* email */}
    <li className="group">
        <div className="group__email">
            <img src={process.env.PUBLIC_URL + "/icons/mail.png"} alt="" />
            <p>Email: roggersog@gmail.com</p>
        </div>
    </li>
    {/* phone number */}
    <li className="group">
        <div className="group__phone">
            <img src={process.env.PUBLIC_URL + "/icons/phone.png"} alt="" />
            <p>Phone: 0700601885</p>
        </div>
    </li>
    {/* icons */}
    <li className="group">
        <div className="group__icons">
            <FaFacebookF className="icons"/>
            <FaInstagram className="icons"/>
            <FaTwitter className="icons"/>
        </div>
    </li>
</ul>



{/* second row */}

<ul className="secondRowUl">
    {/* second row title */}
    <div className="title">
            Useful Links
        </div>
    
    {/* home link */}
    <li>
        <div className='home'>
            <Link to="/" className="link">Home</Link>
        </div>
    </li>
    <li>
        <div className="about">
            <Link to="/about" className="link">About Us</Link>
        </div>
    </li>
    <li>
        <div className='terms'>
            <Link to="/terms" className="link">Terms of Use</Link>
        </div>
    </li>
    <li>
        <div className="policy">
            <Link to="/privacy" className="link">Privacy Policy</Link>
        </div>
    </li>
</ul>

{/* third row */}

<ul className="thirdRowUl">
    {/* third row title */}
    <div className="title1">
            Newsletter
        </div>
    <li>
        <form action="" className="form">
            <div className="formgroup">
            <input type="email" name="" id="" placeholder="Someone@example.com" required/>
            <button type="submit" className="newsletterBtn">Subscrbe</button>
            </div>
        </form>
    </li>
    <li className="text">Subscribe to our newsletter and get updates</li>
</ul>

        </div>
    </footer>

<div className="footerToolTips">
    <div className="footerToolTips__left">
        <Link to="/terms" className='link'>Terms of Use</Link>

        <Link to="/privacy" className='link'>Privacy Policy</Link>
    </div>
    <div className="footerToolTips__right">
        Copyright&copy;{yearName}INTELLISIRN
    </div>
</div>
    </div>
  )
}

export default Footer