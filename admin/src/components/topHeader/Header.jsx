import React,{useContext, useRef, useEffect, useState} from 'react'
import "./header.scss"
import {FaLanguage, FaUser, FaTools, FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import axios from "axios";
import jwt_decode from "jwt-decode";
import LoginContext from '../context/loginContext/LoginContext';
function Header() {

    const {state, dispatch} = useContext(LoginContext)
    let user = false;
    if (state.user === null) {
      user = false;
    } else {
      user = true;
    }
  
    const [profileMenu, setProfileMenu] = useState(false);
  
    const profileRef = useRef();
  
    useEffect(() => {
      let handler = (e) => {
        try {
          const el1 = profileRef.current.contains(e.target);
          if (!el1) {
            setProfileMenu(false);
          }
        } catch (err) {}
      };
      window.addEventListener("mousedown", handler);
      return () => {
        window.removeEventListener("mousedown", handler);
      };
    }, []);
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
    
    
      const IL = "http://localhost:5003"
  return (
    <div className="header">
        <div className="left">
          <div className="img">
            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="" />
          </div>

            <div className="search">
              <div className="area">
                <form action="">
                  <input type="search" name="" id="" placeholder='search'/>
                </form>
              </div>
              <FaSearch className='icon'/>
            </div>
        </div>
        <div className="right">
            {/* language */}
            <div className="language">
                Eng
                <FaLanguage className='icon'/>
            </div>
            <div className="profile">
              <div className="profile__name">
                {state.user.username}
              </div>
            {user && (
            <div ref={profileRef}>
              <div
                className="profileContainer"
                onClick={() => setProfileMenu(!profileMenu)}
              >
                {state.user.profile ? (
                  <img src={IL + `/images/${state.user.profile}`} alt="" className="profileImg"/>
                ) : (
                  <div
                    className="profileAnottation"
                    style={{ backgroundColor: "grey" }}
                  >
                    {state.user.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {profileMenu && (
                <div className="profileContainerItems">
                  <ul className="itemsContainer">
                    <div className="logo">
                      <img
                        src={process.env.PUBLIC_URL + "/images/logo.png"}
                        alt=""
                      />
                    </div>

                    <div className="listUser">
                      <div className="cont">
                        <FaUser />
                        {state.user.username}
                      </div>
                    </div>

                    <li className="list">
                      <Link to="/settings" className="link">
                        <FaTools /> Settings
                      </Link>
                    </li>
                    {/* log out function to declared */}
                    <li className="list" onClick={handleLogout}>
                      <div className="list__signout">
                        <img
                          src={process.env.PUBLIC_URL + "/icons/signIn.png"}
                          alt=""
                          className="signoutIcon"
                        />
                        Logout
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
            </div>
        </div>
    </div>
  )
}

export default Header