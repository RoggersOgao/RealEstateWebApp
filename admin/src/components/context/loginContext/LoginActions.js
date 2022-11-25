import axios from 'axios'


const us = axios.create({
    baseURL:"http://localhost:5003/api"
})

export const fetchAllUsers = async() => {
    const response = await us.get("/users")
    return response
}