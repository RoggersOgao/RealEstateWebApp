import React, { useState, useContext } from "react";
import "./userInfo.scss";
import {
  FaEnvelope,
  FaPaperPlane,
  FaExclamationCircle,
  FaUpload,
  FaCube,
} from "react-icons/fa";
import { FaEye, FaIdCard, FaPhone, FaUser } from "react-icons/fa";
import AlertContext from "../../context/alerts/AlertContext";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginContext from "../../context/loginContext/LoginContext";
import { useEffect } from "react";
import { fetchUser } from "../../context/listing/ListingActions";
import Alert from "../../alerts/Alert";
function UserInfo() {
  const { state, dispatch } = useContext(LoginContext);
  const [form, setForm] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setForm({
      ...form,
      firstName: state.user.username.split(" ")[0],
      lastName: state.user.username.split(" ")[1],
      email: state.user.email,
      nationalID: state.user.nationalID,
      phoneNumber: state.user.phoneNumber,
      otherNumber: state.user.otherNumber,
      profile: state.user.profile,
    });

    const users = async () => {
      try{
        setLoading(true)
        const response = await fetchUser(state.user.id);
        setLoading(false)

      }catch(err){}
      
    };
    users();
  }, []);

  // // alert Context
  const { setAlert } = useContext(AlertContext);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  // handle submit of data
  const ls = axios.create({
    baseURL: "http://localhost:5003/api/",
    headers: {
      "content-type": "application/json",
    },
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

      
        const data = new FormData();
        data.append("file", file);
        const lsR = axios.create({
          baseURL: "http://localhost:5003/",
          headers: {
            authorization: "Bearer " + state.user.accessToken,
          },
        });
          if (file) {
            const response = await lsR.post(
              "http://localhost:5003/api/upload",
              data
            );
            let profileFile = "";
            response.data.map((item) => (profileFile = item.filename));

            const newData = {
              username: form.firstName + " " + form.lastName,
              email: form.email,
              nationalID: form.nationalID,
              phoneNumber: form.phoneNumber,
              otherNumber: form.otherNumber,
              profile: profileFile,
            };
            try{
                const response = await lsR.put(`/api/users/${state.user.id}`, newData)
                setAlert("Succss", "success")
            }catch(error){
                setAlert(error, 'error')
            }
          }else {
            const newData = {
              username: form.firstName + " " + form.lastName,
              email: form.email,
              nationalID: form.nationalID,
              phoneNumber: form.phoneNumber,
              otherNumber: form.otherNumber,
              profile: "",
            };

            try{
                const response = await lsR.put(`/api/users/${state.user.id}`, newData)
                setAlert("Succss", "success")
            }catch(error){
              setAlert(error, 'error')
            }
          }
      
  };

  const IL = "http://localhost:5003";
  return (
    <div className="userInfo">
    <Alert />
      <div className="userInfo__container">
        <div className="left">
          <div className="left__image">
            {state.user.profile ? (
              <img
                src={IL + `/images/${state.user.profile}`}
                alt=""
                className="formImage"
              />
            ) : (
              <div className="settingsProfile">
                {state.user.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="formgroup">
            <input
              type="file"
              name=""
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="labelsgroup">
              <label htmlFor="file" className="uploadIcon">
                <FaUpload className="icon" /> Upload File
              </label>
            </div>
          </div>
        </div>
        <div className="right">
          <form action="" className="userInfoForm" onSubmit={handleSubmit}>
            {/* name group */}

            <div className="nameGroup">
              {/* firstName group */}

              <div className="formgroup">
                <label htmlFor="first">
                  <FaUser />
                  First Name*
                </label>
                <input
                  type="text"
                  name=""
                  id="first"
                  placeholder="Roggers"
                  value={form.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  required
                />
              </div>
              {/* lastName group */}

              <div className="formgroup">
                <label htmlFor="last">
                  <FaUser />
                  Last Name*
                </label>
                <input
                  type="text"
                  name=""
                  id="last"
                  placeholder="Ogao"
                  value={form.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  required
                />
              </div>
            </div>
            {/* Email */}
            <div className="formgroupEmail">
              <label htmlFor="email">
                <FaEnvelope /> Email*
              </label>
              <input
                type="email"
                name=""
                id="email"
                placeholder="someone@example.com"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
              />
            </div>
            {/* National ID */}

            <div className="formgroupNationalId">
              <label htmlFor="id">
                <FaIdCard /> National ID*
              </label>
              <input
                type="text"
                name=""
                id="id"
                placeholder="34.......75"
                value={form.nationalID}
                onChange={(e) => setField("nationalID", e.target.value)}
              />
            </div>

            {/* phone number group */}

            <div className="phoneNumberGroup">
              {/* primary number */}

              <div className="formgroup">
                <label htmlFor="prn">
                  <FaPhone />
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name=""
                  id="prn"
                  placeholder="+2547.........."
                  value={form.phoneNumber}
                  onChange={(e) => setField("phoneNumber", e.target.value)}
                />
              </div>

              {/* other number */}

              <div className="formgroup">
                <label htmlFor="othrn">
                  {" "}
                  <FaPhone />
                  Alt Number
                </label>
                <input
                  type="tel"
                  name=""
                  id=""
                  placeholder="+2547.........."
                  value={form.otherNumber}
                  onChange={(e) => setField("otherNumber", e.target.value)}
                />
              </div>
            </div>


            <div className="formgroupbtn">
              <div className="btnContainer">
                <div className="btn">
                  <button type="submit">
                    Update Details <FaPaperPlane />
                  </button>
                </div>
              </div>
              
            </div>
          </form>
        </div>
      </div>    
    </div>
  );
}

export default UserInfo;
