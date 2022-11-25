import React from 'react'
import { FaCube } from 'react-icons/fa'
import PropertiesDatatable from '../../components/properties/propertiesDatatable/PropertiesDatatable'
import SideNav from '../../components/sidenav/SideNav'
import Header from '../../components/topHeader/Header'
import "./properties.scss"
function Properties() {
  return (
    <div className="properties">

        <div className="properties__nav">
            <Header />
        </div>

        <div className="properties__main">
            <div className="left">
                <SideNav />
            </div>
            <div className="right">
            <div className="right__header">
          <div className="top">
            <FaCube className='icon'/> 
            PROPERTIES TABLE
          </div>
          <div className="bottom">
            <div className="bottom__link">
              Information
            </div>

          </div>
        </div>
            <div className="right__main">
                <PropertiesDatatable />
            </div>
            </div>
        </div>
    </div>
  )
}

export default Properties