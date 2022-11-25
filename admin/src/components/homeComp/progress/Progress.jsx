import React, { useEffect, useState } from 'react'
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import {FaAngleDown} from 'react-icons/fa'
import "./progress.scss"
import ListingContext from '../../context/listing/ListingContext';
import { useContext } from 'react';
import axios from 'axios'
function Progress() {

    const {state} = useContext(ListingContext)

    let Arr = []
    state.listingData.map((item,index)=>(
        <div key={index}>
            {Arr.push(item.propertyType)}
        </div>
    ))


    const [allusers, setAllusers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        const fetchUsers = async() => {
            setIsLoading(true)
            const response = await axios.get("http://localhost:5003/api/users")
            setAllusers(response.data)
            setIsLoading(false)
        }
        fetchUsers()
    },[])
    
  return (
    <div className="progressContainer">
        <div className="progressContainer__top">
            <div className="progressContainer__top--title">
                Total Properties
            </div>
            <div className="progressContainer__top--icon">
            <MoreVertIcon />
            </div>
        </div>
        <div className="progressContainer__bottom">
        <div className="progressContainer__bottom--chart">
            {isLoading ? (
                <div className="usersAmountLoading">
                <div className="dot"></div>
            </div>
            ) :(
                <CircularProgressbar value={Arr.length} text={Arr.length} strokeWidth={2}/>
            )}
        
        </div>
        <div className="progressContainer__bottom--title">Total Number of Users</div>
        <div className="progressContainer__bottom--amount">{isLoading ? (
            <div className="usersAmountLoading">
                <div className="dot"></div>
            </div>
        ) :(
            <CircularProgressbar value={allusers.length} text={allusers.length} strokeWidth={2}/>
        )}</div>
        
        </div>
    </div>
  )
}

export default Progress