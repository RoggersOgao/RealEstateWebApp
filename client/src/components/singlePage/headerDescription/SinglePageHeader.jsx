import React,{useState, useRef, useEffect, useContext} from "react";
import { FaBuilding, FaCalendar, FaEnvelope, FaKey, FaMoneyBill, FaPaperclip, FaPaperPlane, FaPhoneAlt, FaStar, FaTimes, FaTrophy, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./singlePageHeader.scss";
import axios from 'axios'
import LoginContext from "../../context/auth/loginContext/LoginContext";
function SinglePageHeader({
  propertyName,
  propertyType,
  propertyState,
  userId,
  location,
  createdAt,
  bedrooms,
  bathrooms,
  description,
  features,
  img,
  _id,
  rating,
  price,
  username,
})
 {

    const {state} = useContext(LoginContext) 

    const created = new Date(createdAt).toDateString()


    // modal Form state
    const [openModal, setOpenModal] = useState(false)
    const contactRef = useRef()

useEffect(()=>{

  const handler = (e) => {

    try{
      const formArea = contactRef.current.contains(e.target)
  
      if(!formArea){
        setOpenModal(false)
      }

    }catch(error){}
  }


  document.addEventListener("mousedown", handler)


  return () => {
document.removeEventListener("mousedown",handler)
  }
},[])




// manage the form data


const [form, setForm] = useState([])


const setField = (field,value)=>{
  setForm({
    ...form,
    [field]:value
  })
}


// form to handleSubmit

const ms = axios.create({
  baseURL:"http://localhost:5003/api/",
  headers:{
    authorization: "Bearer "+state.user.accessToken
  }
})
const handleSubmit = async(e) => {
    e.preventDefault()

    const newForm = {
      "username":form.username,
      "email":form.email,
      "userId":userId,
      "propertyId":_id,
      "phoneNumber":state.user.phoneNumber,
      "otherNumber":state.user.otherNumber,
      "profile":state.user.profile,
      "message":form.message
    }

    try{
      const response = await ms.post("http://localhost:5003/api/messages", newForm)
      setForm([])
      console.log("success")
    }catch(err){
      
    }

}

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
        <div className="right--button contact" onClick={()=>setOpenModal(true)} >
            <Link to="" className="link">
            <FaPhoneAlt className="icon"/>
               Contact Me </Link>
        </div>
        </div>
      </div>


{openModal && (
      <div className="sPageHeader__modal">

        <div className="formContainer" ref={contactRef}>
      <form action="" className="form" onSubmit={handleSubmit}>
        <div className="close" onClick={()=>setOpenModal(false)}>
          <FaTimes />
        </div>
        <div className="formgroup">
          <label htmlFor=""><FaUser />Name</label>
          <input type="text" name="" id="" value={form.username || ""} onChange={(e)=>setField("username", e.target.value)}/>
        </div>
        <div className="formgroup">
          <label htmlFor=""><FaEnvelope /> Email</label>
          <input type="email" name="" id=""value={form.email || ""} onChange={(e)=>setField("email", e.target.value)} />
        </div>
        <div className="formgroup">
          <label htmlFor=""><FaPaperclip />Description</label>
          <textarea name="" id="" cols="30" rows="10" value={form.message || ""} onChange={(e)=>setField("message", e.target.value)}></textarea>
        </div>

        <div className="formgroup">
          <div className="btngroup">
            <button type="submit">Send Message <FaPaperPlane /></button>
          </div>
        </div>
      </form>

        </div>
      </div>

)}
    </div>
  );
}

export default SinglePageHeader;
