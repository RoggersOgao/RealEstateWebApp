import React, { useContext, useState } from "react";
import "./settings.scss";
import LoginContext from "../../components/context/auth/loginContext/LoginContext";
import Nav from "../../components/nav/NavTop";
import NavBottom from "../../components/nav/NavBottom";
import {
  FaArrowLeft,
  FaBell,
  FaBookDead,
  FaBuilding,
  FaChartArea,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import UserInfo from "../../components/settingspageComp/userInfo/UserInfo";
function Settings() {
  const [resourceType, setResourceType] = useState("userInfo");
  const { state } = useContext(LoginContext);

  const { email, nationalID, otherNumber, phoneNumber, profile, username } =
    state.user;
  return (
    <div className="settting">
      <div className="setting__nav">
        <div className="setting__nav--top">
          <Nav />
        </div>
        <div className="setting__nav--bottom">
          <NavBottom />
        </div>
      </div>
      <div className="setting__top">
        <div className="setting__top--left">
          <div className="back">
            <Link to="/" className="link">
              <FaArrowLeft className="icon" />
              back
            </Link>
          </div>
          <div className="imgContainer">
            {profile ? (
              <img src="" alt="" />
            ) : (
              <div className="settingsProfile">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        <div className="setting__top--right">
          <div className="top">
            {username}
            <div className="textuser">user</div>
            <div className="textemail">{email}</div>
          </div>
          <div className="middle">
            <div className="middle__container">
              <FaUser className="icon" /> Profile
            </div>
          </div>
          <div className="bottomprofile">
            <div className="left">
              {nationalID}
              <div className="text">Kenya</div>
            </div>
            <div className="middle">
              {phoneNumber}
              <div className="text">Kenya</div>
            </div>
            <div className="right">
              {otherNumber}
              <div className="text">Kenya</div>
            </div>
          </div>
        </div>
      </div>
      <div className="setting__middle">
        <div className="setting__middle--btngroup">
          <button
            className={resourceType === "userInfo" && "active"}
            onClick={() => {
              setResourceType("userInfo");
            }}
          >
            <FaBookDead /> User Information{" "}
          </button>
          <button
            className={resourceType === "analytics" && "active"}
            onClick={() => setResourceType("analytics")}
          >
            <FaChartArea /> Analytics{" "}
          </button>
          <button
            className={resourceType === "properties" && "active"}
            onClick={() => setResourceType("properties")}
          >
            <FaBuilding /> Properties{" "}
          </button>
          <button
            className={resourceType === "notifications" && "active"}
            onClick={() => setResourceType("notifications")}
          >
            <FaBell /> Notifications <span>1</span>
          </button>
        </div>

        <section className="section1">
          {resourceType === "userInfo" && <UserInfo />}
          {resourceType === "analytics" && (
            <div>Analytical information will be here</div>
          )}
          {resourceType === "properties" && (
            <div> The user uploaded properties will be displayed here</div>
          )}
          {resourceType === "notifications" && (
            <div> Contact notifications will be displayed here!!</div>
          )}
        </section>
      </div>
      <div className="setting__bottom"></div>
    </div>
  );
}

export default Settings;
