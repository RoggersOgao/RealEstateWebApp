const MessageReducer = (state,action)=>{

    switch(action.type){

        case "USER_MESSAGES":
            return{
                ...state,
                userMsg:action.payload
            }
        case "SINGLE_MESSAGE":
            return{
                ...state,
                singleMsg:action.payload
            }
        default:
            return state
    }
}

export default MessageReducer