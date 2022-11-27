import React, {useEffect, useContext} from 'react'
import './usersDatatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { userColumns } from '../../../data';
import { Link } from 'react-router-dom';
import LoginContext from '../../context/loginContext/LoginContext';
import { fetchAllUsers } from '../../context/loginContext/LoginActions';
import axios from 'axios'
function UsersDatatable() {
  const {state:{user}} = useContext(LoginContext)
  const {state, dispatch, handleEdit} = useContext(LoginContext)
      
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
        await ls.delete(`/users/${id}`)
        const a = state.allUsers.filter(
            (item)=> item.id !== id
        )
        dispatch({
            type:"USER_DATA",
            payload:a
        })
    }
}
  const users = state.allUsers

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
                        <Link to={`/users/u_ed`} className="actionsContainer__view" onClick={(e)=>{handleChildren(e); dispatch({type:"EDIT_USER", payload:handleEdit(params.row)})}}><FaEdit size={14}/></Link>
                        <Link to='' className="actionsContainer__delete" onClick={(e)=>{handleChildren(e); handleDelete(params.row._id)}} ><FaTrashAlt size={14}/></Link>
                        
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