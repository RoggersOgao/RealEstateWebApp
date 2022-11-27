import React, { useContext, useState, useEffect } from "react";
import "./editProperty.scss";
import ListingContext from "../../../components/context/listing/ListingContext";
import Header from "../../../components/topHeader/Header";
import SideNav from "../../../components/sidenav/SideNav";
import { FaCube } from "react-icons/fa";
import { fetchSingleListing } from "../../../components/context/listing/ListingActions";
import axios from 'axios'
import LoginContext from "../../../components/context/loginContext/LoginContext";
function EditProperty() {
  const{state:{user}} = useContext(LoginContext)
  const { state, dispatch } = useContext(ListingContext);
  const [imageHeader, setImageHeader] = useState("image1");
  const [loading, setLoading] = useState(false);
  
  console.log(state.edit);

  const [form, setForm] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const ls = axios.create({
    baseURL: "http://localhost:5003/api/",
    headers:{
        authorization: "Bearer "+ user.accessToken,
        'content-type': 'application/json'
    }
})
  useEffect(() => {
    // all form contents here
    if(state.edit == true){
      setForm({
        ...form,
        propertyName:state.editListingItem.item.propertyName,
        bathrooms:state.editListingItem.item.bathrooms,
        bedrooms:state.editListingItem.item.bedrooms,
        description:state.editListingItem.item.description,
        features:state.editListingItem.item.features,
        img:state.editListingItem.item.img,
        location:state.editListingItem.item.location,
        price:state.editListingItem.item.price,
        propertySize:state.editListingItem.item.propertySize,
        propertyType:state.editListingItem.item.propertyType,
        propertyState:state.editListingItem.item.propertyState,
        
      })
    }
  }, [state]);
  
  const IL = "http://localhost:5003";

  let date
  if(state.edit === false){  
  }else{
    date = new Date(state.editListingItem.item.createdAt)
    date = date.toDateString()
  }


  //handle update function

  const properties = state.listingData

  console.log(properties)
// const handleUpdate = async (id, newFeed) => {

//   const response = await ls.put(`/listings/${id}`, newFeed)
//       //getting the data
      
//       if (response.status === 200){
//           const a = state.listingData.map((item)=>(
//               item.id === id ? {...item, ...response}: item
//             )) 
  
//             dispatch({
//               type:"LISTING_DATA",
//               payload:a.data
//             })

//             // window.location = "/properties"
//       }



  // }

  const handleSubmit =async(e) => {
    e.preventDefault()
    dispatch({
      type:"LISTING_DATA",
      payload:form
    })

    if(state.edit === true){
      // handleUpdate(state.editListingItem.item._id, form)
      const response = await ls.put(`/listings/${state.editListingItem.item._id}`, form)
      console.log(response)
    }else{
      const response = await ls.post("/listings", form)
      console.log(response)
    } 
  }

  return (
    <div className="propEdit">
      <div className="propEdit__nav">
        <Header />
      </div>

      <div className="propEdit__main">
        <div className="left">
          <SideNav />
        </div>
        <div className="right">
          <div className="right__header">
            <div className="top">
              <FaCube className="icon" />
              PROPERTIES EDIT PAGE
            </div>
            <div className="bottom">
              <div className="bottom__link">Info</div>
            </div>
          </div>
          <div className="con">
          <form action="" className="right__main" onSubmit={handleSubmit}>
            <div className="right__main--left">
              <div className="top">
                <div className="bigImage">
                  {imageHeader === "image1" && (
                    <img
                      src={IL + `/images/${state.editListingItem.item.img[0]}`}
                      alt=""
                    />
                  )}
                  {imageHeader === "image2" && (
                    <>
                      {state.editListingItem.item.img[1] ? (
                        <img
                          src={
                            IL + `/images/${state.editListingItem.item.img[1]}`
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          src={process.env.PUBLIC_URL + "/images/city.jpg"}
                          alt=""
                        />
                      )}
                    </>
                  )}
                  {imageHeader === "image3" && (
                    <>
                      {state.editListingItem.item.img[2] ? (
                        <img
                          src={
                            IL + `/images/${state.editListingItem.item.img[2]}`
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          src={process.env.PUBLIC_URL + "/images/city.jpg"}
                          alt=""
                        />
                      )}
                    </>
                  )}
                  {imageHeader === "image4" && (
                    <>
                      {state.editListingItem.item.img[3] ? (
                        <img
                          src={
                            IL + `/images/${state.editListingItem.item.img[3]}`
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          src={process.env.PUBLIC_URL + "/images/city.jpg"}
                          alt=""
                        />
                      )}
                    </>
                  )}
                  {imageHeader === "image5" && (
                    <>
                      {state.editListingItem.item.img[4] ? (
                        <img
                          src={
                            IL + `/images/${state.editListingItem.item.img[4]}`
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          src={process.env.PUBLIC_URL + "/images/city.jpg"}
                          alt=""
                        />
                      )}
                    </>
                  )}
                  {imageHeader === "image6" && (
                    <>
                      {state.editListingItem.item.img[5] ? (
                        <img
                          src={
                            IL + `/images/${state.editListingItem.item.img[5]}`
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          src={process.env.PUBLIC_URL + "/images/city.jpg"}
                          alt=""
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
                
              <div className="bottom">
                <div className="img">
                  {state.editListingItem.item.img[0] ? (
                    <div className="img__formgroup">
                      <img
                        src={
                          IL + `/images/${state.editListingItem.item.img[0]}`
                        }
                        alt=""
                        onClick={() => setImageHeader("image1")}
                      />
                      <div className="group">
                        <label htmlFor="img1">Edit</label>
                        <input type="file" name="" id="img1" />
                      </div>
                    </div>
                  ) : (
                    <div className="img__formgroup">
                      <img
                        src={process.env.PUBLIC_URL + "/images/city.jpg"}
                        alt=""
                        onClick={() => setImageHeader("image1")}
                      />
                      <div className="group">
                        <label htmlFor="img1">Edit</label>
                        <input type="file" name="" id="img1" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="img">
                  {state.editListingItem.item.img[1] ? (
                    <div className="img__formgroup">
                      <img
                        src={
                          IL + `/images/${state.editListingItem.item.img[1]}`
                        }
                        alt=""
                        onClick={() => setImageHeader("image2")}
                      />
                      <div className="group">
                        <label htmlFor="img2">Edit</label>
                        <input type="file" name="" id="img2" />
                      </div>
                    </div>
                  ) : (
                    <div className="img__formgroup">
                      <img
                        src={process.env.PUBLIC_URL + "/images/city.jpg"}
                        alt=""
                        onClick={() => setImageHeader("image2")}
                      />
                      <div className="group">
                        <label htmlFor="img2">Edit</label>
                        <input type="file" name="" id="img2" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="img">
                  {state.editListingItem.item.img[2] ? (
                    <div className="img__formgroup">
                      <img
                        src={
                          IL + `/images/${state.editListingItem.item.img[2]}`
                        }
                        alt=""
                        onClick={() => setImageHeader("image3")}
                      />
                      <div className="group">
                        <label htmlFor="img3">Edit</label>
                        <input type="file" name="" id="img3" />
                      </div>
                    </div>
                  ) : (
                    <div className="img__formgroup">
                      <img
                        src={process.env.PUBLIC_URL + "/images/city.jpg"}
                        alt=""
                        onClick={() => setImageHeader("image3")}
                      />
                      <div className="group">
                        <label htmlFor="img3">Edit</label>
                        <input type="file" name="" id="img3" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="img">
                  {state.editListingItem.item.img[3] ? (
                    <div className="img__formgroup">
                      <img
                        src={
                          IL + `/images/${state.editListingItem.item.img[3]}`
                        }
                        alt=""
                        onClick={() => setImageHeader("image4")}
                      />
                      <div className="group">
                        <label htmlFor="img4">Edit</label>
                        <input type="file" name="" id="img4" />
                      </div>
                    </div>
                  ) : (
                    <div className="img__formgroup">
                      <img
                        src={process.env.PUBLIC_URL + "/images/city.jpg"}
                        alt=""
                        onClick={() => setImageHeader("image4")}
                      />
                      <div className="group">
                        <label htmlFor="img4">Edit</label>
                        <input type="file" name="" id="img4" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="img">
                  {state.editListingItem.item.img[4] ? (
                    <div className="img__formgroup">
                      <img
                        src={
                          IL + `/images/${state.editListingItem.item.img[4]}`
                        }
                        alt=""
                        onClick={() => setImageHeader("image5")}
                      />
                      <div className="group">
                        <label htmlFor="img5">Edit</label>
                        <input type="file" name="" id="img5" />
                      </div>
                    </div>
                  ) : (
                    <div className="img__formgroup">
                      <img
                        src={process.env.PUBLIC_URL + "/images/city.jpg"}
                        alt=""
                        onClick={() => setImageHeader("image5")}
                      />
                      <div className="group">
                        <label htmlFor="img5">Edit</label>
                        <input type="file" name="" id="img5" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="img">
                  {state.editListingItem.item.img[5] ? (
                    <div className="img__formgroup">
                      <img
                        src={
                          IL + `/images/${state.editListingItem.item.img[5]}`
                        }
                        alt=""
                        onClick={() => setImageHeader("image6")}
                      />
                      <div className="group">
                        <label htmlFor="img6">Edit</label>
                        <input type="file" name="" id="img6" />
                      </div>
                    </div>
                  ) : (
                    <div className="img__formgroup">
                      <img
                        src={process.env.PUBLIC_URL + "/images/city.jpg"}
                        alt=""
                        onClick={() => setImageHeader("image6")}
                      />
                      <div className="group">
                        <label htmlFor="img6">Edit</label>
                        <input type="file" name="" id="img6" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="right__main--right">
              <div className="rightPropertyContainer">
                <div className="rightPropertyContainer__nameGroup">
                  <label htmlFor="propertyName" className="top">
                    Property:
                  </label>
                  <div className="bottom">
                    <div className="bottom__formgroup">
                      <input type="text" name="" id="propertyName" value={form.propertyName} onChange={(e)=>setField("propertyName",e.target.value)}/>
                    </div>
                  </div>
                </div>
                <div className="rightPropertyContainer__descGroup">
                  <label htmlFor="propertyDesc" className="top">Description:</label>
                  <div className="bottom">
                    <textarea name="" id="propertyDesc" rows="10" value={form.description} onChange={(e)=>setField("description", e.target.value)}></textarea>
                  </div>
                </div>
                <div className="rightPropertyContainer__featureGroup">
                  <div className="top">Features:</div>
                  <div className="bottom">
                    <div className="bottomCont">
                      {state.editListingItem.item.features.map(
                        (item, index) => (
                          <div key={index} className="tableRowFeatures">
                            <div className="item">{item}</div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="rightPropertyContainer__locationGroup">
                  <label htmlFor="location" className="top">Location:</label>
                  <div className="bottom">
                    <input type="text" name="" id="location" value={form.location} onChange={(e)=>setField("location",e.target.value)}/>
                  </div>
                </div>
                <div className="rightPropertyContainer__priceGroup">
                  <label htmlFor="price" className="top">Price:</label>
                  <div className="bottom">
                    <input type="number" name="" id="price" value={form.price} onChange={(e)=>setField("price",e.target.value)} />
                  </div>
                </div>
                <div className="rightPropertyContainer__sizeGroup">
                  <label htmlFor="propertySize" className="top">Property Size:</label>
                  <div className="bottom">
                    <input type="number" name="" id="propertySize" value={form.propertySize}  onChange={(e)=>setField("propertySize",e.target.value)}/>
                  </div>
                </div>
                <div className="rightPropertyContainer__pstateGroup">
                  <div className="top">For Rent/For Sale:</div>
                  <div className="bottom">
                    {state.editListingItem.item.propertyState}
                  </div>
                </div>
                <div className="rightPropertyContainer__typeGroup">
                  <div className="top">Property Type:</div>
                  <div className="bottom">
                    {state.editListingItem.item.propertyType}
                  </div>
                </div>
                <div className="rightPropertyContainer__ratingGroup">
                  <div className="top">Rating:</div>
                  <div className="bottom">
                    {state.editListingItem.item.rating} / 10{" "}
                    <i>out of 5 reviews</i>
                  </div>
                </div>
                <div className="rightPropertyContainer__createdGroup">
                  <div className="top">Uploaded on:</div>
                  <div className="bottom">{date}</div>
                </div>
              </div>
              <div className="buttongroupsubmitPropertyPage">
              <div className="con">
                <button type="submit">Update</button>
              </div>
            </div>
            </div>

            
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProperty;
