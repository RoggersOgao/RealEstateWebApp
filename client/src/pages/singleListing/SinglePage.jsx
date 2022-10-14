import React,{useContext, useEffect} from 'react'
import "./singlePage.scss"
import {useParams} from 'react-router-dom'
import { fetchSingleListing } from '../../components/context/listing/ListingActions'
import ListingContext from '../../components/context/listing/ListingContext'
function SinglePage() {

  const {state,dispatch} = useContext(ListingContext)

  const params = useParams()

  useEffect(()=> {
    const fetchSingleProperty = async()=>{
      const response = await fetchSingleListing(params.propertyId)

      dispatch({
        type:"SINGLE_PROPERTY",
        payload:response.data
      })
    }

    fetchSingleProperty()
  },[dispatch, params.propertyId])

  const property=state.SinglePage
  return (
    <div className="property">
      {property}
    </div>
  )
}

export default SinglePage