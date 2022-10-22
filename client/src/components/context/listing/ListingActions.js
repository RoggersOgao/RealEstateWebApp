import axios from 'axios'

const ls = axios.create({
    baseURL:"http://localhost:5003/",
    headers:{
        "content-type":"application/json"
    }
})


export const fetchListing = async() => {
    const response = await ls.get("/api/listings")

    return response
}

export const fetchSingleListing = async(id)=> {
    const response = await ls.get(`/api/listings/${id}`)
    return response
}

