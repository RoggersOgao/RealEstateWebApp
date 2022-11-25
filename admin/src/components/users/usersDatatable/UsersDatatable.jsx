import React, {useEffect, useContext} from 'react'
import './usersDatatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { userColumns } from '../../../data';
import { Link } from 'react-router-dom';
import LoginContext from '../../context/loginContext/LoginContext';
import { fetchAllUsers } from '../../context/loginContext/LoginActions';
function UsersDatatable() {
  const {state, dispatch, handleDelete , handleEdit} = useContext(LoginContext)
      
  useEffect(()=> {
    
    const fetchUserData = async() => {
      const response = await fetchAllUsers()

      dispatch({
        type:'ALL_USERS_DATA',
        payload:response.data
      })
    }
    fetchUserData()

    
  },[dispatch])

  const users = state.allUsers

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
        rows={users}
        columns={userColumns.concat(actionColumns)}
        getRowId={(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}

export default UsersDatatable