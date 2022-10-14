import React, {useEffect, useState, useRef, useContext} from 'react'
import {Link} from 'react-router-dom'
import {FaHome, FaInfoCircle, FaPhoneAlt, FaPlusCircle, FaTimes} from 'react-icons/fa'
import "./navBottom.scss"
import ListingContext from '../context/listing/ListingContext'
import {motion, AnimatePresence} from 'framer-motion'
import Cart from '../home/cartData/Cart'
function NavBottom() {

  const {state} = useContext(ListingContext)
   
  let user = false
if(state.user === null){
    user = (false)
}else{
    user = (true)
}
    const [menuOn, setMenuOn] = useState(false)
    const [cardPanel, setCardPanel] = useState(false)
    const menuRef = useRef()
    const cartRef = useRef()
    const [color, setColor] = useState(JSON.parse(localStorage.getItem("page")) || false)

    const handleScroll = () => {
      
     if(window.pageYOffset >=100){
      setColor(true)
     }else{
      setColor(false)
     }
    }

    
    useEffect(()=>{

      localStorage.setItem("page",JSON.stringify(false))
        let handler = (e)=>{
          try{
            const el2 = menuRef.current.contains(e.target)
            if(!el2) {
              setMenuOn(false)
            }
          }
          catch(err){
          }
          
        }

        let handler1 = (e) =>{
          try{
            const el1 = cartRef.current.contains(e.target)
            if(!el1) {
              setCardPanel(false)
            }
          }
          catch(err){

          }
        }

        window.addEventListener("scroll", handleScroll)
        document.addEventListener("mousedown",handler)
        document.addEventListener("mousedown",handler1)
  
        return () => {
          document.removeEventListener("mousedown", handler)
          document.removeEventListener("mousedown", handler1)
          window.removeEventListener("scroll", handleScroll)
        }
        
      },[menuRef, cartRef])
  return (
    <div className={color ? "bottom activeColor" : "bottom"}>
    <div className="bottom__logo">
            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="" srcSet="" className='logo'/>
    </div>

    <nav className='bottom__nav'>
            
        <ul>
            <li className="ISnavLink"><Link to='/'  className="navLink">Home</Link></li>
            <li className="ISnavLink"><Link to='/about'  className="navLink">About Us</Link></li>
            <li className="ISnavLink"><Link to='/contact'  className="navLink">Contact Us</Link></li>

            <div ref={cartRef} className="cartSectionDiv ISnavLink">
            <li className="heartIcon" onClick={()=>setCardPanel(!cardPanel)}><Link to=''  className="navLink">
                <img src={process.env.PUBLIC_URL + "/icons/heart.png"} alt="" />
                {state.likedData.length > 0 && (
                <span>{state.likedData.length}</span>
                )}
                </Link>
            </li>
                <AnimatePresence>
                {cardPanel && (
                 
                <div className="cardContainerBar">
                  <div className="data">
                  {state.likedData.map((items, index)=>(
                    <div key={index}>
                      <Cart cart={items} key={index}/>
                    </div>
                  ))}
                  </div>
                </div>

                )}
                </AnimatePresence>
                </div>
                {user && 
                    <li className="ISnavLink lastChild"><Link to='/listing'  className="navLink">Add Listing</Link></li>
                }
        </ul>
        
        <div className="menubar" onClick={()=>setMenuOn(!menuOn)}>
                <span></span>
                <span></span>
                <span></span>
        </div>

    {menuOn && (
      <AnimatePresence>
        <div className="container" ref={menuRef}>
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        >
        <div className='activeContainer'>
        <div className="menubarActive" onClick={()=>setMenuOn(!menuOn)}>
                <FaTimes />
        </div>
        <li className="ISnavLinkActive"><Link to='/'  className="navLink"><FaHome size={20}/>Home</Link></li>
        <li className="ISnavLinkActive"><Link to='/about'  className="navLink"><FaInfoCircle size={21}/>About Us</Link></li>
        <li className="ISnavLinkActive"><Link to='/contact'  className="navLink"><FaPhoneAlt size={19}/>Contact Us</Link></li>
        {user && 
        <li className="ISnavLinkActive"><Link to='/listing'  className="navLink"><FaPlusCircle size={21}/>Add Listing</Link></li>
        }
        </div>
        </motion.div>
        </div>
        </AnimatePresence>
    )}
    </nav>
</div>
  )
}

export default NavBottom