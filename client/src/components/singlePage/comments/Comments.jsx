import React, {useContext} from 'react'
import "./comments.scss"
import LoginContext from '../../context/auth/loginContext/LoginContext'
function Comments() {

    const {state}  = useContext(LoginContext)

    // generate a random color if profile is not available

    function generateRandomColor(){
        let maxVal = 0xFFFFFF; // 16777215
        let randomNumber = Math.random() * maxVal; 
        randomNumber = Math.floor(randomNumber);
        randomNumber = randomNumber.toString(16);
        let randColor = randomNumber.padStart(6, 0);   
        return `#${randColor.toUpperCase()}`
    }

  return (
    <div className="comments">
        <div className="comments__title">
           <span>1</span> Commments
        </div>

        {/* form input */}

        <form className="form">
            <div className="formgroup">
                <div className="formgroup__left">

{state.user.profile ? (
<img src="" alt="" />
): (
<div className="profileAnottation" style={{backgroundColor:`${generateRandomColor()}`}}>{state.user.username.charAt(0).toUpperCase()}</div>
)}
                </div>
                <div className="formgroup__right">
               <div>
               <input type="text" name="" id="" placeholder='Add a comment'/>  
               <div className="underline"></div>  
                <div className="buttongrp">
                    <button type="submit">Comment</button>
                </div>
                </div> 
                </div>
            </div>
        </form>
        <div className="comments__body">
            <div className="comments__body--top">
                <div className="name"></div>
            </div>
            <div className="comments__body--middle">
                <div className="left">

                </div>
                <div className="right"></div>
            </div>
            <div className="comments__body--bottom">

            </div>
        </div>
    </div>
  )
}

export default Comments