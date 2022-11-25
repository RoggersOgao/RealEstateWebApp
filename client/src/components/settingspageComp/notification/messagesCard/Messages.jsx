import React, {useState, useEffect} from 'react'
import { FaAngleRight, FaEllipsisV, FaEnvelope, FaTags, FaTrash} from 'react-icons/fa'
import "./messages.scss"
import {Link, useNavigate} from 'react-router-dom'
function Messages({item}) {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const date = new Date(item.createdAt)

    const mon = months[date.getMonth()]

    // making the actions icons appear on mouseover event

    const [showActionIcons, setShowActionIcons] = useState(false)



    const navi = useNavigate()
    const handleClickMessage = () => {
        navi(`/messages/vm/${item._id}`)
    }
    const handleClickChild = event =>{
        event.stopPropagation();
    }
    
  return (
    <div className="messages" onMouseEnter={()=>setShowActionIcons(true)} onMouseLeave={()=>setShowActionIcons(false)} onClick={()=>handleClickMessage()}>
        <div className="messages__cont">
            <div className="left">
                <div className="icons">
                <div className="icons--icon"><FaEllipsisV /></div>
                <div className="icons--icon1" onClick={handleClickChild}><FaTags /></div>
                <div className="icons--icon"><FaAngleRight /></div>
                </div>
                <div className="username">
                    {item.username}
                </div>
            </div>
            <div className="middle">
            <div className="messageContainer">
                {item.message}
            </div>
            </div>
            <div className="right">
                {!showActionIcons && (
                    <>
                    {mon + " " + date.getDate()}
                    </>
                )}

                {showActionIcons && (
                    <div className="iconsContainer">
                    <div className="icon" onClick={handleClickChild}><FaTrash /></div>
                    <div className="icon" onClick={handleClickChild}><FaEnvelope /></div>
                </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Messages