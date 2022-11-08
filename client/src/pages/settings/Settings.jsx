import React, { useContext, useState } from "react";
import "./settings.scss";
import LoginContext from "../../components/context/auth/loginContext/LoginContext";
import Nav from "../../components/nav/NavTop";
import NavBottom from "../../components/nav/NavBottom";
import axios from 'axios'
import {
  FaArrowLeft,
  FaBell,
  FaBookDead,
  FaBuilding,
  FaChartArea,
  FaCube,
  FaExclamationCircle,
  FaEye,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import UserInfo from "../../components/settingspageComp/userInfo/UserInfo";
import Footer from "../../components/footer/Footer";
import SingleUserProperty from "../../components/settingspageComp/property/SingleUserProperty";
import Analytics from "../../components/settingspageComp/analytics/Analytics";
import Notification from "../../components/settingspageComp/notification/Notification";
import Alert from "../../components/alerts/Alert";
import AlertContext from "../../components/context/alerts/AlertContext";
function Settings() {
  const [resourceType, setResourceType] = useState("userInfo");
  const { state } = useContext(LoginContext);
  const {setAlert} = useContext(AlertContext)
  const [form, setForm] = useState([]);
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  let passwordErr;
  if (form.password !== form.passwordRpt) {
    passwordErr = (
      <div className="passwordError">
        <FaExclamationCircle size={16} />
        no match!!
      </div>
    );
  } else {
    passwordErr = null;
  }

  const lsR = axios.create({
    baseURL: "http://localhost:5003/",
    headers: {
      authorization: "Bearer " + state.user.accessToken,
    },
  });
  const handleUpdatePassword = async(e) => {
    e.preventDefault()
    try{
      await lsR.put(`/api/users/${state.user.id}`, form)
      setAlert("Succss", "success")
  }catch(error){
    setAlert(error, 'error')
  }
  }
  const { email, nationalID, otherNumber, phoneNumber, profile, username, id } =
    state.user;

  const IL = "http://localhost:5003";
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
              <img
                src={IL + `/images/${profile}`}
                alt=""
                className="settingsTopImg"
              />
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
          {resourceType === "userInfo" && (
            <UserInfo />
          )}
          {resourceType === "analytics" && (
            <div><Analytics id={id}/></div>
          )}
          {resourceType === "properties" && (
            <div><SingleUserProperty id ={id}/></div>
          )}
          {resourceType === "notifications" && (
            <>
            <div><Notification /></div>
            <div><Notification /></div>
            <div><Notification /></div>
            </>
          )}
        </section>
      </div>
      {resourceType === "userInfo" && (
      <div className="setting__bottom">
        <div className="updatePasswordSection">
          <div className="link">
            <FaCube className="icon" /> Reset Password: <span>{username}</span>
          </div>
        </div>

        {/* password group */}
        <form className="passwordForm" onSubmit={handleUpdatePassword}>
          <div className="passwordGroup">
            <div className="formgroup">
              <label htmlFor="password">
                <FaEye />
                Update Password*
              </label>
              <input
                type="password"
                name=""
                id="password"
                onChange={(e) => setField("password", e.target.value)}
                placeholder="*******"
              />
            </div>

            <div className="formgroup">
              <label htmlFor="rpassword">
                {" "}
                <FaEye />
                Repeat Password*
              </label>
              <input
                type="password"
                name=""
                id="rpassword"
                onChange={(e) => setField("passwordRpt", e.target.value)}
                placeholder="*******"
              />

              <span>{passwordErr}</span>
            </div>
            
            <div className="formgroup">
            <div className="passwordGroupContainer">
              <div className="buttonContainer">
                <button type="submit">Reset Password</button>
              </div>
            </div>
            </div>

          </div>
        </form>
      </div>
      )}

      <Footer />
    </div>
  );
}

export default Settings;
