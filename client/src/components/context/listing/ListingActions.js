import axios from 'axios'

const ls = axios.create({
    baseURL:"http://localhost:5001/",
    headers:{
        "content-type":"application/json"
    }
})


export const fetchListing = async() => {
    const response = await ls.get("/listing")

    return response
}

export const fetchSingleListing = async(id)=> {
    const response = await ls.get(`/listing/${id}`)
    return response
}
