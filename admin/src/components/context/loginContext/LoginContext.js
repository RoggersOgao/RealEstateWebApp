import {createContext, useReducer,useEffect} from 'react'
import LoginReducer from './LoginReducer'
const LoginContext = createContext()

export const LoginProvider = ({children}) => {

    const initialState = {
        user:JSON.parse(localStorage.getItem("user")) || null,
        isLoading:false,
        allUsers:[]
    }

    const [state, dispatch] = useReducer(LoginReducer, initialState)

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])


    return <LoginContext.Provider value={{
        state,
        dispatch,
    }}>

        {children}
    </LoginContext.Provider>
}

export default LoginContext