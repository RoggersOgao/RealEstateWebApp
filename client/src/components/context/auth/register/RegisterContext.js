import { createContext, useReducer } from "react";
import RegisterReducer from "./RegisterReducer";
const RegisterContext = createContext()

export const RegisterProvider = ({children}) => {

    const initialState = {
        // registerFormData: {}
    }


    const [state, dispatch] = useReducer(RegisterReducer, initialState)

    return <RegisterContext.Provider value={{
        state,
        dispatch
    }}>

        {children}
    </RegisterContext.Provider>
}

export default RegisterContext