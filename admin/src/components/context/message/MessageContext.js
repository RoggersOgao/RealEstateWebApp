import { createContext, useReducer } from "react";
import MessageReducer from "./MessageReducer";

const MessageContext = createContext()

export const MessageProvider = ({children})=>{

const initialState ={
    userMsg:[],
    singleMsg:{}
}
const [state,dispatch] = useReducer(MessageReducer, initialState)
    return <MessageContext.Provider value={
        {
            state,
            dispatch
        }
    }>
 {children}
    </MessageContext.Provider>
}

export default MessageContext