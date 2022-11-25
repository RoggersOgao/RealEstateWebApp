import React, {useContext} from 'react'
import "./comments.scss"
import LoginContext from '../../context/auth/loginContext/LoginContext'
function Comments() {

    const {state}  = useContext(LoginContext)
    const IL = "http://localhost:5003"

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

            {/* rating checkboxes */}

    <div className="radiGroup">
            <div className="formgroup">
                    <input type="radio" name="rating" id="rating1" value={1} />
                    <label htmlFor="rating1">1</label>
            </div>
            <div className="formgroup">
                    <input type="radio" name="rating" id="rating2" value={2} />
                    <label htmlFor="rating2">2</label>
            </div>
            <div className="formgroup">
                    <input type="radio" name="rating" id="rating3" value={3} />
                    <label htmlFor="rating3">3</label>
            </div>
            <div className="formgroup">
                    <input type="radio" name="rating" id="rating4" value={4} />
                    <label htmlFor="rating4">4</label>
            </div>
            <div className="formgroup">
                    <input type="radio" name="rating" id="rating5" value={5} />
                    <label htmlFor="rating5">5</label>
            </div>
            <div className="formgroup">
                    <input type="radio" name="rating" id="rating6" value={6} />
                    <label htmlFor="rating6">6</label>
            </div>
            <div className="formgroup">
                    <input type="radio" name="rating" id="rating7" value={7} />
                    <label htmlFor="rating7">7</label>
            </div>
            <div className="formgroup">
                    <input type="radio" name="rating" id="rating8" value={8} />
                    <label htmlFor="rating8">8</label>
            </div><div className="formgroup">
                    <input type="radio" name="rating" id="rating9" value={9} />
                    <label htmlFor="rating9">9</label>
            </div><div className="formgroup">
                    <input type="radio" name="rating" id="rating10" value={10}/>
                    <label htmlFor="rating10">10</label>
            </div>


    </div>


            <div className="formgroup">
                <div className="formgroup__left">

{state.user.profile ? (
<img src={IL + `/images/${state.user.profile}`} alt="" />
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