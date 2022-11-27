import { createContext, useReducer, useEffect, useContext } from "react";
import ListingReducer from "./ListingReducer";
import axios from 'axios'
import { handleEdit } from "./ListingActions";
const ListingContext = createContext()

export const ListingProvider = ({children}) => {

const initialState = {
    listingData:[],
    singleProperty:JSON.parse(localStorage.getItem("singlePage")) || {},
    likedData:JSON.parse(localStorage.getItem("cart")) || [],
    userProperties: [],

    // edit
    editListingItem:JSON.parse(localStorage.getItem("editItem")) || {},
    edit: false
}
const [state, dispatch] = useReducer(ListingReducer, initialState)

useEffect(()=> {
localStorage.setItem("singlePage", JSON.stringify(state.singleProperty))
localStorage.setItem("cart", JSON.stringify(state.likedData))
localStorage.setItem("editItem", JSON.stringify(state.editListingItem))
}, [state])




    return <ListingContext.Provider value={{
        state,
        dispatch,
        handleEdit
    }}>

        {children}
    </ListingContext.Provider>
}

export default ListingContext