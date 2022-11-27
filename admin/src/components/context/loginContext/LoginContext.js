import {createContext, useReducer,useEffect} from 'react'
import LoginReducer from './LoginReducer'
import axios from 'axios'
import { handleEdit } from './LoginActions'
const LoginContext = createContext()

export const LoginProvider = ({children}) => {

    const initialState = {
        user:JSON.parse(localStorage.getItem("user")) || null,
        isLoading:false,
        allUsers:[],
        //edit
        editUser:{} || JSON.parse(localStorage.getItem("editUsr")),
        edit:false,
    }

    const [state, dispatch] = useReducer(LoginReducer, initialState)

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
        localStorage.setItem("editUsr",JSON.stringify(state.editUser))
    },[state.user])

    
    return <LoginContext.Provider value={{
        state,
        dispatch,
        handleEdit
    }}>

        {children}
    </LoginContext.Provider>
}

export default LoginContext