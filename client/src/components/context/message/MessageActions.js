
import axios from 'axios'


const msA = axios.create({
    baseURL:"http://localhost:5003/",
    headers:{
        "content-type":"application/json"
    }
})

export const fetchMessageSent = async(id)=>{
    const response = await msA.get(`/api/messages?u=${id}`)
    return response
}

export const fetchMessage = async(id) => {
    const response = await msA.get(`/api/messages/${id}`)
    return response
}