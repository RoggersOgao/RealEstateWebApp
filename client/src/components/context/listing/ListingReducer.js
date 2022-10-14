const ListingReducer = (state, action) => {

    switch(action.type){

        case "LISTING_DATA":
            return {
                ...state,
                listingData: action.payload
            }
        case "LIKED_DATA":
            return{
                ...state,
                likedData:action.payload
            }
        case "SINGLE_PROPERTY":
            return{
                ...state,
                singleProperty:action.payload
            }
            default:
            return state
    }
}

export default ListingReducer