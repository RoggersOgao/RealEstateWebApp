import React, {useState, useEffect, useRef} from 'react'
import { FaAngleDown, FaAngleUp, FaAsymmetrik } from 'react-icons/fa'
import "./dropdown.scss"
function Dropdown({type, select}) {
const [choose, setChoose] = useState('Choose')

const [click, setClick] = useState(false)

const menuRef = useRef()
    const handleClick = (e) => {
        // e.preventDefault()
        setClick(!click)
      }
    useEffect(()=>{
        let handler = (e)=>{
          try{
            const dropdownArea = menuRef.current.contains(e.target)
            if(!dropdownArea) {
              setClick(false)
            }
          }catch(err){
            
          }
        }
        document.addEventListener("mousedown",handler)
  
        return () => {
          document.removeEventListener("mousedown", handler)
        }
        
      },[menuRef])
      let data
      switch(type){
        case "allProperties":
          data={
            options:["All","For Rent","For Sale"],
            img:"landScape.png"
          }
        break
        case "location":
          data={
            options:["Nairobi","Machakos", "Kikuyu", "Nakuru", "Karen", "Kahawa West"],
            img:"location.png"
          }
        break
        case "typeOfProperty":
          data = {
            options:["All","Office", "Apartment", "Condominium", "Home"],
            img:"options.png"
          }
        break
        default:
      }
  return (


    
    <div className="container" ref={menuRef} >

    <div className="dcont" >
  <div onClick={handleClick} className="dropdownContainer"> 
  <div className="cont">
  <img src={process.env.PUBLIC_URL + `/icons/${data.img}`} alt="" />
  {choose} 
  </div>

    <div className="iconCont">
      <FaAngleUp />
      <FaAngleDown />
    </div>
  </div>
  {click && (
    <ul className= "dropdownlist">
      {data.options.map((option,index)=>(
    <li className='listItem' key={index} onClick={(e)=>{
      setClick(false)
      select(option)
      setChoose(option)
  }}> <FaAsymmetrik />{option}</li>
      ))}
    
  </ul>
  )}
  </div>

    </div>
  )
}

export default Dropdown