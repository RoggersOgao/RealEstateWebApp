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

export const fetchPropertyByUser = async(id)=>{
    const response = await ls.get(`/api/listings?u=${id}`)
    return response
}

export const fetchUser = async(id) => {
    const response = await ls.get(`/api/users/${id}`)
    return response
}
export  const searchProperty = async (text) => {
    const params = new URLSearchParams({
        q: text
    })

    const response = await ls.get(`/api/listings?post=${params}`)

   return response.data.items
  
}





