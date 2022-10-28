import React,{useEffect, useContext, useState} from 'react'
import "./singlePage.scss"
import {useParams} from 'react-router-dom'
import { fetchSingleListing } from '../../components/context/listing/ListingActions'
import ListingContext from '../../components/context/listing/ListingContext'
import Property from '../../components/singlePage/Property'
import SkeletonSinglePage from '../../components/skeleton/skeletonSinglePage/SkeletonSinglePage'
function SinglePage() {

  const {state,dispatch} = useContext(ListingContext)

  const params = useParams()

  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=> {
    const fetchSingleProperty = async()=>{
      setIsLoading(true)
      const response = await fetchSingleListing(params.propertyId)

      dispatch({
        type:"SINGLE_PROPERTY",
        payload:response.data
      })
      setIsLoading(false)
    }

    fetchSingleProperty()
  },[dispatch, params.propertyId])
  
  return (
    <div className="property">
      {isLoading ? <SkeletonSinglePage /> :(
        <Property property={state.singleProperty} />
      )}
    </div>
  )
}

export default SinglePage