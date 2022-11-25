import React,{useContext, useEffect, useState} from 'react'
import "./statCard.scss"
import ListingContext from '../../context/listing/ListingContext'
import { fetchListing } from '../../context/listing/ListingActions'
function StatCard({type}) {
    const {state, dispatch} = useContext(ListingContext)
    const [isLoading, setIsLoading] = useState(false)



    useEffect(()=> {

        const fetchProps = async()=> {
            setIsLoading(true)
            const response = await fetchListing()

            dispatch({
                type:"LISTING_DATA",
                payload:response.data
            })

            setIsLoading(false)
        }

        fetchProps()
    },[dispatch])

    let Arr = []
    state.listingData.map((item,index)=>(
        <div key={index}>
            {Arr.push(item.propertyType)}  
        </div>
    ))

    let data
    switch(type){
        case "office":
            data = {
                name:"Office",
                count: Arr.filter(x => x === "office").length,
                img:process.env.PUBLIC_URL + "/icons/office.png",
                cls:"off"
            }
        break
        case "apartment":
            data = {
                name:"Apartments",
                count: Arr.filter(x => x === "apartment").length,
                img:process.env.PUBLIC_URL + "/icons/apartment.png",
                cls:"apt"
            }
        break
        case "condominium":
            data = {
                name:"Condominiums",
                count: Arr.filter(x => x === "condominium").length,
                img:process.env.PUBLIC_URL + "/icons/Building.png",
                cls:"cond"
            }
        break
        case "home":
            data = {
                name:"Homes",
                count: Arr.filter(x => x === "home").length,
                img:process.env.PUBLIC_URL + "/icons/Home.png",
                cls:"hom"
            }
        break

        default:
    }
  return (
    <div className="cont">
        {isLoading ? (
            <div className="skeletonCard"></div>
        ) :
        (
            <div className={`statCard ${data.cls}`}>
        <div className="statCard__left">
            <div className="top">{data.name}</div>
            <div className="bottom">{data.count}</div>
        </div>
        <div className="statCard__right">
            <img src={data.img} alt="" />
        </div>
    </div>
        )}
    </div>
  )
}

export default StatCard