import React, {useContext, useState} from 'react'
import "./sideNav.scss"
import {FaBuilding, FaCube, FaSignOutAlt, FaToolbox, FaUserFriends} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import LoginContext from '../context/loginContext/LoginContext'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
function SideNav() {

    const{state, dispatch} = useContext(LoginContext)
    const [home, setHome] = useState(false)
    const [propertyIcon, setPropertyIcon] = useState(false)
    const [userText, setUserText] = useState(false)
    const [settingText, setSettingText] = useState(false)
    const [logoutText, setLogoutText] = useState(false)


    const ag = axios.create({
        baseURL: "http://localhost:5003/api/auth/",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + state.user.accessToken,
        },
      });
    // handle logout function
    const handleLogout = async () => {
    
        try {
          await ag.post("/logout", {
            token: state.user.refreshToken,
          });
          localStorage.clear();
          dispatch({
            type: "LOGOUT",
          });
          window.location.replace("/login");
        } catch (err) {
          console.log(err);
        }
        let currentDate = new Date();
        const decodedToken = jwt_decode(state.user.accessToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          localStorage.clear();
          dispatch({
            type: "LOGOUT",
          });
        } else {
          
        }
      };
  return (
    <div className="sidenav">
        <div className="sidenav__container">
            <div className="homeGroup">
            <Link to="/" className="link" onMouseEnter={()=>setHome(true)} onMouseLeave={()=>setHome(false)}><FaCube className='icons'/></Link>
            {home && (
                <div className="text">Home</div>
            )}
            </div>
            <div className="users">
            <Link to="/users" className="link"><FaUserFriends className='icons' onMouseEnter={()=>setUserText(true)} onMouseLeave={()=>setUserText(false)}/></Link>
            {userText && (
                <div className="text">Users</div>
            )}
            </div>
            <div className="propertyGroup">
            <Link to="/properties" className="link"><FaBuilding className='icons'onMouseEnter={()=>setPropertyIcon(true)} onMouseLeave={()=>setPropertyIcon(false)}/></Link>
                {propertyIcon && (
                    <div className="text">Property</div>
                )}
            </div>
            <div className="settingsGroup">
            <Link to="/settings" className="link"><FaToolbox className='icons'onMouseEnter={()=>setSettingText(true)} onMouseLeave={()=>setSettingText(false)}/></Link>
                {settingText && (
                    <div className="text">Settings</div>
                )}
            </div>

            <div className="logoutGroup" onClick={handleLogout}>
            <Link to="" className="link"><FaSignOutAlt className='icons' onMouseEnter={()=>setLogoutText(true)} onMouseLeave={()=>setLogoutText(false)}/></Link>
                    {logoutText && (
                        <div className="text">Logout</div>
                    )}
            </div>

        </div>
    </div>
  )
}

export default SideNav