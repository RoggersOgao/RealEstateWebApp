const LoginReducer = (state, action) => {

    switch(action.type){

        case "USER_DATA":
            return{
                ...state,
                user: action.payload
            }
        case "ISLOADING":
            return{
                isLoading:action.payload
            } 
        case "ALL_USERS_DATA":
            return{
                ...state,
                allUsers:action.payload
            }
        case "LOGOUT":
            return{
                user:null
            }
        default:
            return state
    }
}

export default LoginReducer