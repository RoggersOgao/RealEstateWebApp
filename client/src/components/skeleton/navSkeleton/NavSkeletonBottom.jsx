import React, {useEffect, useState, useRef, useContext} from 'react'
import {Link} from 'react-router-dom'
import "./navSkeletonBottom.scss"
import ListingContext from '../../context/listing/ListingContext'
function NavSkeletonbottom() {

  const {state} = useContext(ListingContext)
   
  let user = false
if(state.user === null){
    user = (false)
}else{
    user = (true)
}
    const [menuOn, setMenuOn] = useState(false)
    const [cardPanel, setCardPanel] = useState(false)
    const cartRef = useRef()
    const [color, setColor] = useState(JSON.parse(localStorage.getItem("page")) || false)

    const handleScroll = () => {
      
     if(window.pageYOffset >=100){
      setColor(true)
     }else{
      setColor(false)
     }
    }
    useEffect(() => {

        window.addEventListener("scroll", handleScroll);
        return () => {
          window.addEventListener("scroll", handleScroll);
        };
      }, []);
    
  return (
    <div className={color ? "bottomSkel activeColor" : "bottomSkel"}>
    <div className="bottomSkel__logo">
    </div>

    <nav className='bottomSkel__nav'>
            
        <ul>
            <li className="ISnavLink"></li>
            <li className="ISnavLink"></li>
            <li className="ISnavLink"></li>

            <div ref={cartRef} className="cartSectionDiv ISnavLink">
            <li className="heartIcon" onClick={()=>setCardPanel(!cardPanel)}><Link to=''  className="navLink">
                </Link>
            </li>
                </div>
                {user && 
                    <li className="ISnavLink lastChild"><Link to='/listing'  className="navLink"></Link></li>
                }
        </ul>
        
        <div className="menubar" onClick={()=>setMenuOn(!menuOn)}>
                <span></span>
                <span></span>
                <span></span>
        </div>

    </nav>
</div>
  )
}

export default NavSkeletonbottom