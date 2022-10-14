import React, { useState, useContext} from 'react'
import "./login.scss"
import {FaEnvelope, FaEye, FaPaperPlane} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import LoginContext from '../../../components/context/auth/loginContext/LoginContext';
import Alert from '../../../components/alerts/Alert';
import AlertContext from '../../../components/context/alerts/AlertContext';
function Login() {

    //alert context 

    const {setAlert} = useContext(AlertContext)
    const {dispatch,state} = useContext(LoginContext)
    const [form, setForm] = useState({})
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]:value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await ps.post("/login", {
                "email":form.email || "",
                "password":form.password || "",     
            })
            dispatch({
                type:"USER_DATA",
                payload:response.data
            })
             window.location = "/"
             setForm({})
         }catch(err){
             setAlert(err.response.data.error, 'error')
             // console.log()
         }
    }

//refresh token from loginActions
 
 const axiosJWT = axios.create()
 const ps = axios.create({
    baseURL:"http://localhost:5003/api/auth/",
    headers: {
        "content-type":"application/json",
        "Access-Control-Allow-Origin":"*",
    }
})
 const refreshToken = async() => {
     try{
         const response = await ps.post("/refresh", {"token": state.user.refreshToken})
        dispatch({
            type:"USER_DATA",
            payload:{
                ...state.user,
                "accessToken":response.data.accessToken,
                "refreshToken":response.data.refreshToken,
            }
        })
        return response
     }
     catch(err){
         
     }
 }


 


 axiosJWT.interceptors.request.use(
    async(config) => {
        let currentDate = new Date()
        const decodedToken = jwt_decode(state.user.accessToken);
        if(decodedToken.exp * 1000 < currentDate.getTime()){
          const data =  await refreshToken()
          config.headers["authorization"] = "Bearer " + data.accessToken
        }
        return config;
        
    },(error) => {
        return Promise.reject(error)
    }
)


  return (
    <div className="login">
                <Alert />
        <div className="loginContainer">
            <form action="" className="loginForm" onSubmit={handleSubmit}>
                <div className="logoContainer">
                <div className="logo">
                    <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt=""/>
                </div>
                </div>
                <div className="formgroup">
                    <label htmlFor="email">
                        <FaEnvelope  className='icons'/>
                        Email
                    </label>
                    <input type="email" name="" id="email" placeholder='someone@example.com' value ={form.email || ""}onChange={(e)=>setField("email",e.target.value)}/>
                </div>
                <div className="formgroup">
                    <label htmlFor="password">
                        <FaEye  className='icons'/>
                        Password
                    </label>
                    <input type="password" name="" id="password" onChange={(e)=>setField("password",e.target.value)} value={form.password || ""} placeholder ="********"/>
                </div>

                <div className="formgroup">
                    <div className="btnCont">
                    <div className="btngroup">
                        <button type="submit">Login <FaPaperPlane className="icons"/></button>
                    </div>
                    </div>
                </div>

                <div className="formgroup">
                    <div className="textgroup">
                        Don't have an account yet register here <Link to ="/register" className='link'>Register</Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login