import React from 'react'
import {useContext} from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import AlertContext from '../context/alerts/AlertContext'
import "./alert.scss"
function Alert() {
    const {alert} = useContext(AlertContext)
    
    
  return ( alert !== null && (
    <div className="alertContainer">
        <div className="margin"></div>
        {alert.type === 'error' &&(
            <div className="alertError">
                <p className="textError">
                    <FaTimesCircle /> &nbsp;
                    {alert.mesg}
                </p>

            </div>
        )}
        {alert.type === 'success' &&(
            <div className="alertSuccess">
                <p className="textSuccess">
                    <FaTimesCircle /> &nbsp;
                    {alert.mesg}
                </p>

            </div>
        )}   
    </div>
  )
  )
}

export default Alert