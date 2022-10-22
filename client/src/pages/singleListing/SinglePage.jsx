import React,{useContext, useEffect} from 'react'
import "./singlePage.scss"
import {useParams} from 'react-router-dom'
import { fetchSingleListing } from '../../components/context/listing/ListingActions'
import ListingContext from '../../components/context/listing/ListingContext'
import Property from '../../components/singlePage/Property'
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

  console.log(state.singleProperty)
  return (
    <div className="property">
      <Property property={state.singleProperty} />
    </div>
  )
}

export default SinglePage