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

export  const searchProperty = async (text) => {
    const params = new URLSearchParams({
        q: text
    })
    // const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/api/listings?${params}`,{
    //     headers: {
    //         Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    //     }
    // })

    // const {items} = await response.json()
// http://localhost:5003/api/listings?post=6353b6ea545958dbabee879b

    const response = await ls.get(`/api/listings?post=${params}`)

   return response.data.items
  
}

