//creating an alert context

import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";

//initialize the alert context

const AlertContext = createContext()

//create the provider

export const AlertProvider = ({children})=>{

    //initialize the state for the reducer

    const initializeState = null

    const [state, dispatch] = useReducer(alertReducer, initializeState)


    //function to set and alert

    const setAlert = (mesg,type) => {
        dispatch({
            type:'SET_ALERT',
            payload: {mesg, type}
        })
//REMOVE ALERT AFTER 3 SECONDS
        setTimeout(()=>dispatch({
            type:'REMOVE_ALERT'
        }),8000)
    }
    return <AlertContext.Provider value={{
        alert:state,
        setAlert,
    }}>
        {children}
    </AlertContext.Provider>
}

export default AlertContext