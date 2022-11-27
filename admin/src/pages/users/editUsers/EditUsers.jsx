import React, { useContext,useState, useEffect } from 'react'
import "./editUsers.scss"
import LoginContext from '../../../components/context/loginContext/LoginContext'
import Header from '../../../components/topHeader/Header'
import SideNav from '../../../components/sidenav/SideNav'
import { FaCube, FaPhone, FaPaperPlane, FaEnvelope, FaUser, FaIdCard, FaUpload } from 'react-icons/fa'
import AlertContext from '../../../components/context/alerts/AlertContext'
import Alert from '../../../components/alerts/Alert'
import axios from 'axios'
import { fetchUser } from '../../../components/context/listing/ListingActions'
function EditUsers() {
    const {state} = useContext(LoginContext)

    console.log(state.edit)
    console.log(state.editUser)
    const [form, setForm] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
      setForm({
        ...form,
        firstName: state.editUser.item.username.split(" ")[0],
        lastName: state.editUser.item.username.split(" ")[1],
        email: state.editUser.item.email,
        nationalID: state.editUser.item.nationalID,
        phoneNumber: state.editUser.item.phoneNumber,
        otherNumber: state.editUser.item.otherNumber,
        profile: state.editUser.item.profile,
      });
  
      const users = async () => {
        try{
          setLoading(true)
          const response = await fetchUser(state.editUser.item._id);
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
                  const response = await lsR.put(`/api/users/${state.editUser.item.id}`, newData)
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
                  const response = await lsR.put(`/api/users/${state.editUser.item.id}`, newData)
                  setAlert("Succss", "success")
              }catch(error){
                setAlert(error, 'error')
              }
            }
        
    };
  
    const IL = "http://localhost:5003";
  return (
    <div className="usrEdit">
        <div className="usrEdit__nav">
            <Header />
        </div>

        <div className="usrEdit__main">
            <div className="left">
                <SideNav />
            </div>
            <div className="right">
            <div className="right__header">
          <div className="top">
            <FaCube className='icon'/> 
            USERS EDIT PAGE
          </div>
          <div className="bottom">
            <div className="bottom__link">
              Info
            </div>

          </div>
        </div>
            <div className="right__main">
            <div className="userInfo">
    <Alert />
      <div className="userInfo__container">
        <div className="left">
          <div className="left__image">
            {state.editUser.item.profile ? (
              <img
                src={IL + `/images/${state.editUser.item.profile}`}
                alt=""
                className="formImage"
              />
            ) : (
              <div className="settingsProfile">
                {state.editUser.item.username.charAt(0).toUpperCase()}
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
            </div>
            </div>
        </div>
    </div>
  )
}

export default EditUsers