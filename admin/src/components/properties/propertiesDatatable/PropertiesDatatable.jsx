import React,{useEffect, useContext, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
// import userRows from '../../../data';
import { propertyColumns } from '../../../data';
import { Link } from 'react-router-dom';
import "./propertiesDatatable.scss"
import ListingContext from '../../context/listing/ListingContext';
import { fetchListing } from '../../context/listing/ListingActions';
import axios from 'axios'
import LoginContext from '../../context/loginContext/LoginContext';
function PropertiesDatatable() {

  const{state:{user}} = useContext(LoginContext)
  const {state, dispatch, handleEdit} = useContext(ListingContext)
  const [loading, setLoadiing ] = useState(false)

  const ls = axios.create({
    baseURL: "http://localhost:5003/api",
    headers:{
        authorization: "Bearer "+ user.accessToken,
        'content-type': 'application/json'
    }
})
  // function to handle deleting of properties
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")){
        await ls.delete(`/listings/${id}`)
        const a = state.listingData.filter(
            (item)=> item.id !== id
        )
        dispatch({
            type:"LISTING_DATA",
            payload:a
        })
    }
}
  useEffect(()=>{
    const fetchAllProperties = async()=>{
      setLoadiing(true)
      const response = await fetchListing()

      dispatch({
        type:"LISTING_DATA",
        payload:response.data
      })
      setLoadiing(false)
    }
    fetchAllProperties()

  },[dispatch])

  const properties = state.listingData

    const handleChildren = (e) =>{
        e.stopPropagation()
      }
        const actionColumns = {
            field: 'action',
            headerName: 'Actions',
            width:170,
            renderCell:(params)=>{
                return(
                    <div className="container">
                        <div className="actionsContainer">
                            <Link to={`/properties/p_ed/`} className="actionsContainer__view" onClick={(e)=>{handleChildren(e); dispatch({type:"EDIT_PROPERTY", payload:handleEdit(params.row)})}}><FaEdit size={14}/></Link>
                            <div className="actionsContainer__delete" onClick={(e)=>{handleChildren(e); handleDelete(params.row._id)}} ><FaTrashAlt size={14}/></div>      
                        </div>
                    </div>
                )
            }
    
        }
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
      
        className='datagridDark'
        rows={properties}
        columns={propertyColumns.concat(actionColumns)}
        getRowId={(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}

export default PropertiesDatatable