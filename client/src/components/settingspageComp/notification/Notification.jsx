import React,{useState, useContext, useEffect} from 'react'
import "./notification.scss"
import { fetchMessageSent } from '../../context/message/MessageActions'
import MessageContext from '../../context/message/MessageContext'
import Messages from './messagesCard/Messages'
function Notification({id}) {
const [isLoading, setIsLoading] = useState(false)
const {state, dispatch} = useContext(MessageContext)
    useEffect(()=>{
        const myMessages = async() => {
            setIsLoading(true)
            const response = await fetchMessageSent(id)

            dispatch({
                type:"USER_MESSAGES", 
                payload:response.data
            })
            setIsLoading(false)
        }
        myMessages()
    },[dispatch])


    const IL = "http://localhost:5003"
  return (
    
    <div className="notifications">
      {isLoading ? "Loading..." : (
        <>
        {state.userMsg.map((item,index)=>(
          <div key={index}>
              <Messages item={item}/>
          </div>
        ))} 
        </>
      )}
    </div>
  )
}

export default Notification