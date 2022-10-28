import React,{useState, useContext, useEffect} from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import ListingContext from '../../context/listing/ListingContext'
import "./list.scss"
import { fetchListing } from '../../context/listing/ListingActions'
import Card from '../../card/Card';
import Pagination from '../../pagination/Pagination'
import Dropdown from '../../dropdown/Dropdown';
import Skeleton from '../../skeleton/Skeleton'



function List() {

   

    // calling the Listing context
    const {state, dispatch} = useContext(ListingContext)
    // 
    const[currentPage, setCurrentPage] = useState( JSON.parse(localStorage.getItem("page")) || 1 );
    let itemsPerPage = 5
    const [pageLimits, setPageLimits] = useState(5);
    const [minPageLimit, setMinPageLimit] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(5);

    const [form, setForm] = useState({});

    
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]:value
        }
        )
    }

    // cart data
    const [cart, setCart] = useState([])

    const handleHeartClick = (item, index) => {
        const data = [...cart]
    
        index = data.indexOf(item)

        //add the item and don't repeat it again
    if(index === -1){
      data.push(item)
    }
    setCart(data, ...data)
    dispatch({
        type:"LIKED_DATA",    
        payload:cart
    })
    }



    const [bedrooms, setBedrooms] = useState(0)
    const [bathrooms, setBathrooms] = useState(0)


    
    const handleMinusBedrooms = () => {
        setBedrooms(bedrooms - 1)
    }
    const handleAddBedrooms = () => {
        setBedrooms(bedrooms + 1)
    }

    const handleMinusBathrooms = () => {
        setBathrooms(bathrooms - 1)
    }
    const handleAddBathrooms = () => {
        setBathrooms(bathrooms + 1)
    }
   
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{

        localStorage.setItem("page",JSON.stringify(currentPage))
        const data = async()=> {
            setIsLoading(true)
            const response = await fetchListing()

            dispatch({
                type:"LISTING_DATA",
                payload: await response.data
            })
            setIsLoading(false)

        }
        data()

    },[dispatch, currentPage, form])
    
    let data = state.listingData
    //render the pages


    // filter whatever the user searches either in lowercase or uppercase
if(form.searchParams){
    data = state.listingData.filter((item)=>item.propertyName.toLowerCase().includes(form.searchParams))
}

// filter Property type
if(form.propertyState === "For Rent"){
    data = data.filter((item)=> item.propertyState === "For Rent")
}else if(form.propertyState === "For Sale"){
    data = data.filter((item)=> item.propertyState === "For Sale")
}else{
    data = data.filter((item)=> item.propertyState === "For Sale" || "For Rent")
}
// type of the property
if(form.propertyType === "Office"){
    data = data.filter((item)=> item.propertyType === "office")
}else if (form.propertyType === "Home"){
    data = data.filter((item) => item.propertyType === "home")
}else if (form.propertyType === "Condominium"){
    data = data.filter((item) => item.propertyType === "condominium")
}else if (form.propertyType === "Apartment"){
    data = data.filter((item) => item.propertyType === "apartment")
}else{
    data = data.filter((item) => item.propertyType === "home" || "apartment" || "condominium" || "office")
}


// location of the property
if(form.location){
    data = data.filter((item)=> item.location === form.location)
}

// number of bedrooms
if(bedrooms){
    data = data.filter((item)=>item.bedrooms === bedrooms)
}

//  number of bathrooms
if(bathrooms){
    data = data.filter((item)=>item.bathrooms === bathrooms)
}


// features function to store the checkboxes in an array
const [features, setFeatures] = useState([])
const[rangeD, setRangeD] = useState(0)

const feat = (e, index)=>{
    const data = [...features]
    
    index = data.indexOf(e.currentTarget.value)

    if(index === -1){
      data.push(e.currentTarget.value)
    }
    else{
      data.splice(index,1)
    }

    setFeatures(data, ...data)
}

// filter statement to check range values

if(rangeD){
    data = data.filter((item) => item.price <= rangeD)
}
// console.log(features)

// const checkboxData = data.map((item, index)=>{  
//     const a = item.features.filter((item)=> item === features.find((item)=> item))
//     })


// filtering an array of selected items that were stored in the features function

const checkboxData = data.filter((item) => item.features.find((item) => item === features.find((item) => item))) 
if(checkboxData.length > 0){
    data = checkboxData
}
    

    const indexOfLastItem = currentPage*itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)


    // function to check the state of the range input
const handleRange = (e) =>{
    setRangeD(Number(e.target.value))
}




   return (
    <div className="list">
        <div className="list__left">
            <div className="form">

                {/* 
                search input
                */}
                <div className="formgroup">
                    <input type="text" name="" id="" placeholder='Search...' value={form.searchParams || ''} onChange={(e)=>{setField("searchParams", e.target.value)}}/>
                </div>

                {/* 
                all properties dropdown
                */}
                <div className="formgroup">
                    <label htmlFor="">For Rent/Sale</label>
                    <Dropdown type={"allProperties"}
                    value = {form.propertyState || ''}
                    select={(value)=>setField("propertyState", value)}/>
                </div>
                {/* `
                property Type 
                ` */}
                <div className="formgroup">
                    <label htmlFor="">Type of Property</label>
                    <Dropdown type={"typeOfProperty"}
                    value = {form.propertyType || ''}
                    select={(value)=>setField("propertyType", value)}/>
                </div>
                {/* 
                Location dropdown
                */}
                <div className="formgroup">
                    <label htmlFor="">Location</label>
                    <Dropdown type={"location"} 
                    value={form.location || ''}
                    select={(value)=>setField("location", value)}/>
                </div>
                {/* 
                bedrooms 
                */}
                <div className="formgroup">
                    <label htmlFor="">Bedrooms</label>
                    <div className="group">
                        <button 
                        disabled={bedrooms <=0 ? true: false}
                        className="minus" onClick={(e)=>handleMinusBedrooms(e)}><FaMinus /></button>
                        <div className="number">{bedrooms}</div>
                        
                        <button 
                        className="plus" onClick={(e)=>handleAddBedrooms(e)}><FaPlus /></button>
                    </div>
                </div>

                {/* 
                bathrooms
                */}

                <div className="formgroup">
                    <label htmlFor="" className='bathroomsLabel'>Bathrooms</label>
                    <div className="group">
                        <button 
                        disabled={bathrooms <=0 ? true: false}
                        className="minus" onClick={(e)=>handleMinusBathrooms(e)}><FaMinus /></button>
                        <div className="number">{bathrooms}</div>
                        <button
                        className="plus" onClick={(e)=>handleAddBathrooms(e)}><FaPlus /></button>
                    </div>
                </div>


                {/*
                slider
                
                */}


                <div className="formgroup">
                    <label htmlFor="price" className="price">Price</label>
                    <input type="range" name="" id="price" min="0" max="75000000" step={5000}  onChange={(e)=>handleRange(e)} className="slider" />

                        <label htmlFor="" className='rangeData'>Ksh: {rangeD.toLocaleString()}</label>
                    
                </div>
                {/* 
                more features
                */}

                <div className="formgroup">
                    <label htmlFor="">More Features</label>

                   <div className="featuresGroup">
                   <div className="groupCheck">
                        <input type="checkbox" name="" id="pool" value="pool" onChange={(e)=> feat(e)} />
                        <label htmlFor="pool" className="poolBox"></label>
                        <label htmlFor="pool" className="poolText">Pool</label>
                    </div>
                    <div className="groupCheck">
                        <input type="checkbox" name="" id="elevator" value="Elevator" onChange={(e)=> feat(e)}/>
                        <label htmlFor="elevator" className="poolBox"></label>
                        <label htmlFor="elevator" className="poolText">Elevator</label>
                    </div>
                    <div className="groupCheck">
                        <input type="checkbox" name="" id="laundry" value="Laundry Machine" onChange={(e)=> feat(e)}/>
                        <label htmlFor="laundry" className="poolBox"></label>
                        <label htmlFor="laundry" className="poolText">Laundry Machine</label>
                    </div>
                    <div className="groupCheck">
                        <input type="checkbox" name="" id="clubHouse" value="Club House" onChange={(e)=> feat(e)}/>
                        <label htmlFor="clubHouse" className="poolBox"></label>
                        <label htmlFor="clubHouse" className="poolText">Club House</label>
                    </div>
                    <div className="groupCheck">
                        <input type="checkbox" name="" id="spa" value="Spa" onChange={(e)=> feat(e)}/>
                        <label htmlFor="spa" className="poolBox"></label>
                        <label htmlFor="spa" className="poolText">Spa</label>
                    </div>
                    <div className="groupCheck">
                        <input type="checkbox" name="" id="parking" value="Parking" onChange={(e)=> feat(e)}/>
                        <label htmlFor="parking" className="poolBox"></label>
                        <label htmlFor="parking" className="poolText">Parking</label>
                    </div>
                    <div className="groupCheck">
                        <input type="checkbox" name="" id="ac" value="AC & Heating" onChange={(e)=> feat(e)}/>
                        <label htmlFor="ac" className="poolBox"></label>
                        <label htmlFor="ac" className="poolText">AC & Heating</label>
                    </div>
                   </div>
                </div>
            </div>
        </div>
        <div className="list__right">
            
            {isLoading ? <Skeleton type="feed"/> :(
            <div className="list__right--card"> 
                {currentItems.map((item,index)=>(
                    
                    <Card listing={item} key={index} handleHeartClick={handleHeartClick} />
                    
                ))}
            </div>

            )}
                <Pagination 
                dataList={data} 
                currentPage={currentPage} 
                itemsPerPage={itemsPerPage} 
                setCurrentPage={setCurrentPage}
                maxPageLimit={maxPageLimit}
                minPageLimit={minPageLimit}
                pageLimits = {pageLimits}
                setPageLimits={setPageLimits}
                setMinPageLimit ={setMinPageLimit}
                setMaxPageLimit={setMaxPageLimit}
                />
        </div>
    </div>
  )
}

export default List