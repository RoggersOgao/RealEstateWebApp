import React from 'react'
import { useEffect, useState } from 'react'
import { fetchMessage } from '../../../context/message/MessageActions'
import {Link, useParams} from 'react-router-dom'
import MessageContext from '../../../context/message/MessageContext'
import { useContext } from 'react'
import "./messagePage.scss"
import { FaAngleLeft, FaCalendar, FaCube, FaEnvelopeOpen, FaEye, FaHashtag, FaPrint, FaReply, FaTrash } from 'react-icons/fa'
import PropertyInMessage from './propertyInMessage/PropertyInMessage'
import Footer from '../../../footer/Footer'
import Header from '../../../topHeader/Header'
import SideNav from '../../../sidenav/SideNav'
function MessagePage() {
  const {state, dispatch} = useContext(MessageContext)
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [showPrint,setShowPrint] = useState(false)
  const [viewProperty, setViewProperty] = useState(false)
  const [hideText, setHideText] = useState(false)
  useEffect(()=>{

    setIsLoading(true)
    const fetchSingleMessage = async()=>{
      const response = await fetchMessage(params.msgId)
      dispatch({
        type:"SINGLE_MESSAGE",
        payload:response.data
      })
      setIsLoading(false)
    }
    fetchSingleMessage()
  },[dispatch, params.msgId])

  const IL = "http://localhost:5003"

  const sentDate = new Date(state.singleMsg.createdAt)
  console.log(state.singleMsg)
  

  return (
    <div className="messagePage">
      <div className="messagePage__nav">
      <Header />
    </div>
<div className="messagePage__cont">


    <div className="left">
      <SideNav />
    </div>
    <div className="right">
      <div className="messagePage">
         {/* here is where i am */}
      {isLoading ? "Loading...":(

<div className="messagePage__Container">

  <div className="messagePage__Container--topHeader">
    <div className="section1">
      <div className="section1__id">Msg ID:<FaHashtag />: {state.singleMsg._id}</div>
      <div className="section1__phone">
        {state.singleMsg.phoneNumber}
      </div>
    </div>
    <div className="section2">
      <div className="section2__sentOn">
        <p className="text">
          <FaCalendar /> Sent on</p>
        <div className="date">{sentDate.toDateString()}</div>
        
      </div>
      <div className="section2__actionIcons">
        <div className="iconCont">
          <div className="icon" onMouseEnter={()=>setShowPrint(true)} onMouseLeave={()=>setShowPrint(false)}>
          <FaPrint />
          </div>
          {showPrint && (
          <div className="text">
            print
          </div>
            )}
        </div>
        <div className="iconCont"> <Link to="/settings" className='link'><FaAngleLeft /> back</Link></div>

      </div>
    </div>
    
  </div>

  <div className="messagePage__Container--body">
    <div className="topPart">
      <div className="topPart__left">
        <img src={IL + `/images/${state.singleMsg.profile}`} alt="" />
      </div>
      <div className="topPart__right">
        <div className="topPart__right--name">
        <div className="text">sent by :</div>
          <div className="name">{state.singleMsg.username}</div>
        </div>
        <div className="date">
          {sentDate.toDateString()}
        </div>
      </div>
    </div>
    <div className="headerContent">
      <div className="left">
        Message From: <span><FaHashtag />{state.singleMsg.email}</span>
      </div>
      <div className="right">
        <div className="icon"><FaReply /></div>
        <div className="icon"><FaPrint /></div>
        <div className="icon"><FaEnvelopeOpen /></div>
        <div className="icon"><FaTrash /></div>
        
      </div>
    </div>

    <div className="bodyContentMessages">
      <div className="bodyContentMessages__title">
        Message Content
      </div>
      <div className="bodyContentMessages__body">
        <p>{state.singleMsg.message}</p>
        <div className="text">Message</div>
      </div>
    </div>

    <div className="bodyContentMessagesPropertyDescription">
      <div className="bodyContentMessagesPropertyDescription__header">
        <div className="text">
            <FaCube className='box'/><span>Property Description:</span> <FaHashtag className='icon'/> {state.singleMsg.propertyId}
        </div>
        <div className="viewIcon" onClick={()=>{setViewProperty(!viewProperty); setHideText(!hideText)}}>
          <FaEye /> {hideText ? "hide":"view"}
        </div>
      </div>
      <div className="bodyContentMessagesPropertyDescription__container">
        
          {viewProperty && (
        // <PropertyInMessage id={state.singleMsg.propertyId}/>
        <div className="p">djfkljda</div>
          )}
        
      </div>
    </div>
  </div>
</div>

  )}

<Footer />
      </div>
    </div>
   
    </div>
    </div>
  )
}

export default MessagePage