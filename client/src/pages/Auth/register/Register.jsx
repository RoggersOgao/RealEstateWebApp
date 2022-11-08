import React,{useState, useContext} from 'react'
import { FaEye, FaIdCard, FaPhone, FaUser } from 'react-icons/fa'
import "./register.scss"
import { FaEnvelope, FaPaperPlane, FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Alert from '../../../components/alerts/Alert';
import AlertContext from '../../../components/context/alerts/AlertContext';
function Register() {


    const [form, setForm] = useState([])
    // alert Context
    const {setAlert} = useContext(AlertContext)

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]:value
        })
    }




    let passwordErr
    if(form.password !== form.passwordRpt){      
            passwordErr = <div className='passwordError'>
            <FaExclamationCircle size={16} />
            no match!!
            </div>
    }else{
        passwordErr = (null)
    }



    // handle submit of data
    const ls = axios.create({
        baseURL:"http://localhost:5003/api/",
        headers:{
            "content-type":"application/json"
        }
    })

    const handleSubmit =async(e)=>{
        e.preventDefault()
        if(form.password !== form.passwordRpt){      
            passwordErr = <div className='passwordError'>
            <FaExclamationCircle size={16} />
            no match!!
            </div>
    }else{
        passwordErr = (null)
        const newData = {
            "username":form.firstName +" "+form.lastName,
            "email":form.email,
            "nationalID":form.nationalID,
            "phoneNumber":form.phoneNumber,
            "otherNumber":form.otherNumber,
            "password":form.password,
            "isAdmin":false
        }
        
        // postRegisterData(newData)
       
        try{
           const response = await ls.post("/auth/register", newData)
            window.location = "/login"
            console.log(response)
            setForm({})
        }catch(err){
            setAlert(err.response.data.error, 'error')
            // console.log()
        }
        

    }
    }
  return (
    <div className="register">

        <div className="registerContainer">
        <Alert />
        <form action="" className="registerForm" onSubmit={handleSubmit}>
            
            <div className="logoContainer">
                <div className="logo">
                    <img src={process.env.PUBLIC_URL  + "/images/logo.png"} alt="" />
                </div>
            </div>

             {/* name group */}

             <div className="nameGroup">
                   {/* firstName group */}

                   <div className="formgroup">
                    <label htmlFor="first"><FaUser />First Name*</label>
                    <input type="text" name="" id="first" placeholder='Roggers' value={form.firstName} onChange={(e)=>setField("firstName",e.target.value)} required/>
                </div>
                {/* lastName group */}

                <div className="formgroup">
                    <label htmlFor="last"><FaUser />Last Name*</label>
                    <input type="text" name="" id="last" placeholder='Ogao' value={form.lastName} onChange={(e)=>setField("lastName",e.target.value)} required/>
                </div>
             </div>
            {/* Email */}
            <div className="formgroupEmail">
                <label htmlFor="email"><FaEnvelope /> Email*</label>
                <input type="email" name="" id="email" placeholder='someone@example.com' value={form.email} onChange={(e)=>setField("email", e.target.value)}/>
            </div>
            {/* National ID */}

            <div className="formgroupNationalId">
                <label htmlFor="id"><FaIdCard /> National ID*</label>
                <input type="text" name="" id="id" placeholder='34.......75' value={form.nationalID} onChange={(e)=>setField("nationalID", e.target.value)}/>
            </div>

            {/* phone number group */}

            <div className="phoneNumberGroup">

                {/* primary number */}

                <div className="formgroup">
                    <label htmlFor="prn"><FaPhone />Phone Number*</label>
                    <input type="tel" name="" id="prn" placeholder='+2547..........' value={form.phoneNumber} onChange={(e)=>setField("phoneNumber", e.target.value)}/>
                </div>

                {/* other number */}

                <div className="formgroup">
                    <label htmlFor="othrn"> <FaPhone />Alt Number</label>
                    <input type="tel" name="" id="" placeholder='+2547..........' value={form.otherPhone} onChange={(e)=> setField("otherNumber", e.target.value)} />
                </div>
            </div>


            {/* password group */}

            <div className="passwordGroup">

                {/* password */}

                <div className="formgroup">
                    <label htmlFor="password"><FaEye /> Password*</label>
                    <input type="password" name="" id="password" onChange={(e)=> setField("password", e.target.value)} placeholder="*******"/>
                </div>

                {/* repeat password */}

                <div className="formgroup">
                    <label htmlFor="rpassword"> <FaEye />Repeat Password*</label>
                    <input type="password" name="" id="rpassword"   onChange={(e)=> setField("passwordRpt", e.target.value)} placeholder="*******"/>

                    <span>{passwordErr}</span>
                </div>
            </div>


            <div className="formgroupbtn">
                <div className="btnContainer">
                    <div className="btn">
                            <button type="submit">Register <FaPaperPlane /></button>
                    </div>
                </div>
            </div>

            <div className="formgroup">
                <div className="text">
                    <p>
                        Already have an account? <Link to="/login" className="link">Login</Link>
                    </p>
                </div>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Register