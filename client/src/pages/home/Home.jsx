import React, {useContext, useState} from 'react'
import Nav from '../../components/nav/NavTop'
import Header from '../../components/home/header/Header';
import "./home.scss"
import Photos from '../../components/home/photos/Photos';
import NavBottom from '../../components/nav/NavBottom';
import List from '../../components/home/list/List';
import Details from '../../components/home/details/Details';
import Footer from '../../components/footer/Footer';
import LoginContext from '../../components/context/auth/loginContext/LoginContext';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
function Home() {


  const {state, dispatch} = useContext(LoginContext)
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
   <div className="home">
    <div className="home__nav">
      <div className="home__nav--top">
            <Nav />
      </div>
      <div className="home__nav--bottom">
             <NavBottom />
      </div>
    </div>
    <div className="home__header">
    <Header />
    </div>
    <Photos />
    <List />
    <Details />

    <Footer />
   </div>
  )
}

export default Home