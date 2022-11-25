import { createContext, useReducer, useEffect } from "react";
import ListingReducer from "./ListingReducer";
import axios from 'axios'
import LoginContext from "../auth/loginContext/LoginContext";
import { useContext } from "react";
const ListingContext = createContext()
export const ListingRepository = ({children}) => {
    
const {state:{user}} = useContext(LoginContext)
const initialState = {
    listingData:[],
    singleProperty:JSON.parse(localStorage.getItem("singlePage")) || {},
    likedData:JSON.parse(localStorage.getItem("cart")) || [],
    userProperties: [],
}
const [state, dispatch] = useReducer(ListingReducer, initialState)

useEffect(()=> {
localStorage.setItem("singlePage", JSON.stringify(state.singleProperty))
localStorage.setItem("cart", JSON.stringify(state.likedData))
}, [state])


 // handleDelete
//  console.log(user)

 const handleDelete = async (id) => {
    const dl = axios.create({
        baseURL:"http://localhost:5003/api/",
        headers:{
            authorization: "Bearer "+user.accessToken
        }
    })
    if (window.confirm('Are you sure you want to delete?')) {
      await dl.delete(`/listings/${id}`)

      dispatch({
        type:'USER_PROPERTIES',
        payload:state.userProperties.filter((item)=>item.id !== id)
      })

      window.location("/settings")
    }
  }
    return <ListingContext.Provider value={{
        state,
        dispatch,
        handleDelete

    }}>

        {children}
    </ListingContext.Provider>
}

export default ListingContext