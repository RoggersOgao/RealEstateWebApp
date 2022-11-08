import { useEffect, useState, useContext, useRef } from "react";
import "./nav.scss";
import LoginContext from "../context/auth/loginContext/LoginContext";
import { Link } from "react-router-dom";
import { FaTools, FaUser } from "react-icons/fa";
import axios from "axios";
import jwt_decode from "jwt-decode";
function Nav() {
  const { state, dispatch } = useContext(LoginContext);

  let user = false;
  if (state.user === null) {
    user = false;
  } else {
    user = true;
  }

  const [offsetY, setOffsetY] = useState(0);

  const [profileMenu, setProfileMenu] = useState(false);

  const profileRef = useRef();

  const handleScroll = () => setOffsetY(window.pageYOffset);

  let color = false;
  if (offsetY >= 100) {
    color = true;
  } else {
    color = false;
  }

  useEffect(() => {
    let handler = (e) => {
      try {
        const el1 = profileRef.current.contains(e.target);
        if (!el1) {
          setProfileMenu(false);
        }
      } catch (err) {}
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("mousedown", handler);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const lg = axios.create({
    baseURL: "http://localhost:5003/api/auth/",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + state.user.accessToken,
    },
  });
  // handle logout function
  const handleLogout = async () => {

    try {
      await lg.post("/logout", {
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
    <div className="nav">
      <div className={color ? "top activeTop" : "top"}>
        <div className="top__left">
          <div className="top__left--ISTextIcon">
            <div className="top__left--ISTextIcon--icon">
              <img
                src={process.env.PUBLIC_URL + "/icons/mailOutline.png"}
                alt=""
              />
            </div>
            <div className="top__left--ISTextIcon--text">
              roggersog@gmail.com
            </div>
          </div>
          <div className="top__left--ISTextIcon">
            <div className="top__left--ISTextIcon--icon">
              <img
                src={process.env.PUBLIC_URL + "/icons/phoneOutline.png"}
                alt=""
              />
            </div>
            <div className="top__left--ISTextIcon--text">+254700601885</div>
          </div>
        </div>
        <div className="top__right">
          <div className="top__right--ISTextIcon">
            <div className="top__right--ISTextIcon--icon">
              <img
                src={process.env.PUBLIC_URL + "/icons/language.png"}
                alt=""
              />
            </div>
            <div className="top__right--ISTextIcon--text">ENG</div>
          </div>
          {user ? (
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
          ) : (
            <div className="top__right--ISTextIcon">
              <div className="top__right--ISTextIcon--icon">
                <img
                  src={process.env.PUBLIC_URL + "/icons/signIn.png"}
                  alt=""
                  className="iconSignIn"
                />
              </div>
              <div className="top__right--ISTextIcon--textSignIn">
                <Link to="/login" className="link">
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
