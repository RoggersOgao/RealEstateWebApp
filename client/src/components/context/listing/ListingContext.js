import { createContext, useReducer, useEffect } from "react";
import ListingReducer from "./ListingReducer";
const ListingContext = createContext()

export const ListingRepository = ({children}) => {

const initialState = {
    listingData:[],
    singleProperty:JSON.parse(localStorage.getItem("singlePage")) || {},
    likedData:JSON.parse(localStorage.getItem("cart")) || []
}
const [state, dispatch] = useReducer(ListingReducer, initialState)

useEffect(()=> {
localStorage.setItem("singlePage", JSON.stringify(state.singleProperty))
localStorage.setItem("cart", JSON.stringify(state.likedData))
}, [state])

    return <ListingContext.Provider value={{
        state,
        dispatch
    }}>

        {children}
    </ListingContext.Provider>
}

export default ListingContext