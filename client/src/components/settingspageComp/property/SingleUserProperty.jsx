import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { fetchPropertyByUser } from '../../context/listing/ListingActions'
import ListingContext from '../../context/listing/ListingContext'
import Pagination from '../../pagination/Pagination'
import Card from './userPropertyCard/Card'
function SingleUserProperty({id}) {

    const {state, dispatch} = useContext(ListingContext)
    const [isLoading, setIsLoading] = useState(false)
    const[currentPage, setCurrentPage] = useState( JSON.parse(localStorage.getItem("page")) || 1 );
    let itemsPerPage = 5
    const [pageLimits, setPageLimits] = useState(5);
    const [minPageLimit, setMinPageLimit] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(5);

    useEffect(()=>{

        const myProperty = async() => {
            setIsLoading(true)
            const response = await fetchPropertyByUser(id)

            dispatch({
                type:"USER_PROPERTIES", 
                payload:response.data
            })
            setIsLoading(false)
        }
myProperty()
    },[])

    const listing = state.userProperties


    const indexOfLastItem = currentPage*itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = listing.slice(indexOfFirstItem, indexOfLastItem)
  return (
    <>
      {listing.map((item, index)=>(   
          <div className="userProperties" key={index}>
        {isLoading ? "loading...." :
        <Card listing={item}/>
        }
    </div>

    ))}

<Pagination 
                dataList={listing} 
                currentPage={currentPage} 
                itemsPerPage={itemsPerPage} 
                setCurrentPage={setCurrentPage}
                maxPageLimit={maxPageLimit}
                minPageLimit={minPageLimit}
                pageLimits = {pageLimits}
                setPageLimits={setPageLimits}
                setMinPageLimit ={setMinPageLimit}
                setMaxPageLimit={setMaxPageLimit}
                />
    </>
  )
}

export default SingleUserProperty