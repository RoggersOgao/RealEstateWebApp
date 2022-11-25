import React,{useEffect, useContext} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import userRows from '../../../data';
import { propertyColumns } from '../../../data';
import { Link } from 'react-router-dom';
import "./propertiesDatatable.scss"
import ListingContext from '../../context/listing/ListingContext';
import { fetchListing } from '../../context/listing/ListingActions';
function PropertiesDatatable() {

  const {state, dispatch, handleDelete , handleEdit} = useContext(ListingContext)

  const properties = state.listingData

    const handleChildren = (e) =>{
        e.stopPropagation()
      }
        const actionColumns = {
            field: 'action',
            headerName: 'Actions',
            width:170,
            renderCell:()=>{
                return(
                    <div className="container">
                        <div className="actionsContainer">
                            <Link to='' className="actionsContainer__view" onClick={handleChildren}><FaEdit size={14}/></Link>
                            <Link to='' className="actionsContainer__delete" onClick={handleChildren} ><FaTrashAlt size={14}/></Link>
                            
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