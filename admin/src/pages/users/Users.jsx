import React from 'react'
import { FaCube } from 'react-icons/fa'
import SideNav from '../../components/sidenav/SideNav'
import Header from '../../components/topHeader/Header'
import UsersDatatable from '../../components/users/usersDatatable/UsersDatatable'
import "./users.scss"
function Users() {
  return (
    <div className="users">

        <div className="users__nav">
            <Header />
        </div>

        <div className="users__main">
            <div className="left">
                <SideNav />
            </div>
            <div className="right">
            <div className="right__header">
          <div className="top">
            <FaCube className='icon'/> 
            USERS TABLE
          </div>
          <div className="bottom">
            <div className="bottom__link">
              Information
            </div>

          </div>
        </div>
            <div className="right__main">
                <UsersDatatable />
            </div>
            </div>
        </div>
    </div>
  )
}

export default Users