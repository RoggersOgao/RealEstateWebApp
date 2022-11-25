import React, { useEffect, useContext, useState } from "react";
import "./propertyInMessage.scss";
import { fetchSingleListing } from "../../../../context/listing/ListingActions";
import ListingContext from "../../../../context/listing/ListingContext";
function PropertyInMessage({ id }) {
  const { state, dispatch } = useContext(ListingContext);
  const [loading, setLoading] = useState(false)

  const [imageHeader, setImageHeader] = useState("image1");
  useEffect(() => {
    setLoading(true)
    if(id){
      const fetchPropertyById = async(id) => {
        const response = await fetchSingleListing(id);
  
        dispatch({
          type: "SINGLE_PROPERTY",
          payload: response.data,
        });
  
        setLoading(false)
      };
      fetchPropertyById(id);
    }

  }, [dispatch, id]);

  const IL = "http://localhost:5003";
  let date
  if(state.singleProperty === null){  
  }else{
    date = new Date(state.singleProperty.createdAt)
    date = date.toDateString()
  }
  return (
    <div className="propertyInMessage">

{!state.singleProperty ? (
  <div className="messageExist">
    nothing
  </div>
):(
  <div>
  {loading ? "Loading...":(
    <div className="propertyInMessage__cont">
    <div className="propertyInMessage__cont--left">
      <div className="top">
        <div className="bigImage">
          {imageHeader === "image1" && (
            <img
              src={IL + `/images/${state.singleProperty.img[0]}`}
              alt=""
            />
          )}
          {imageHeader === "image2" && (
            <>
              {state.singleProperty.img[1] ? (
                <img
                  src={IL + `/images/${state.singleProperty.img[1]}`}
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
              {state.singleProperty.img[2] ? (
                <img
                  src={IL + `/images/${state.singleProperty.img[2]}`}
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
              {state.singleProperty.img[3] ? (
                <img
                  src={IL + `/images/${state.singleProperty.img[3]}`}
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
              {state.singleProperty.img[4] ? (
                <img
                  src={IL + `/images/${state.singleProperty.img[4]}`}
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
              {state.singleProperty.img[5] ? (
                <img
                  src={IL + `/images/${state.singleProperty.img[5]}`}
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
          {state.singleProperty.img[1] ? (
            <img
              src={IL + `/images/${state.singleProperty.img[1]}`}
              alt=""
              onClick={() => setImageHeader("image2")}
            />
          ) : (
            <img
              src={process.env.PUBLIC_URL + "/images/city.jpg"}
              alt=""
              onClick={() => setImageHeader("image2")}
            />
          )}
        </div>
        <div className="img">
          {state.singleProperty.img[2] ? (
            <img
              src={IL + `/images/${state.singleProperty.img[2]}`}
              alt=""
              onClick={() => setImageHeader("image3")}
            />
          ) : (
            <img
              src={process.env.PUBLIC_URL + "/images/city.jpg"}
              alt=""
              onClick={() => setImageHeader("image3")}
            />
          )}
        </div>
        <div className="img">
          {state.singleProperty.img[3] ? (
            <img
              src={IL + `/images/${state.singleProperty.img[3]}`}
              alt=""
              onClick={() => setImageHeader("image4")}
            />
          ) : (
            <img
              src={process.env.PUBLIC_URL + "/images/city.jpg"}
              alt=""
              onClick={() => setImageHeader("image4")}
            />
          )}
        </div>
        <div className="img">
          {state.singleProperty.img[4] ? (
            <img
              src={IL + `/images/${state.singleProperty.img[4]}`}
              alt=""
              onClick={() => setImageHeader("image5")}
            />
          ) : (
            <img
              src={process.env.PUBLIC_URL + "/images/city.jpg"}
              alt=""
              onClick={() => setImageHeader("image5")}
            />
          )}
        </div>
        <div className="img">
          {state.singleProperty.img[5] ? (
            <img
              src={IL + `/images/${state.singleProperty.img[5]}`}
              alt=""
              onClick={() => setImageHeader("image6")}
            />
          ) : (
            <img
              src={process.env.PUBLIC_URL + "/images/city.jpg"}
              alt=""
              onClick={() => setImageHeader("image6")}
            />
          )}
        </div>
      </div>
    </div>
    <div className="propertyInMessage__cont--right">
      {/* begginning of the right side of the plane */}

      {/* contents include the description of the property */}

      <div className="propertyContainerMessage">

        <div className="propertyContainerMessage__nameGroup">
            <div className="top">Property: </div>
            <div className="bottom">{state.singleProperty.propertyName}</div>
        </div>
        <div className="propertyContainerMessage__descGroup">
            <div className="top">Description</div>
            <div className="bottom">{state.singleProperty.description}</div>
        </div>
        <div className="propertyContainerMessage__featureGroup">
            <div className="top">Features:</div>
            <div className="bottom">
            <div className="bottomCont">
                      {state.singleProperty.features.map((item,index)=>(
                        <div key={index} className="tableRowFeatures">
                            <div className="item">{item}</div>
                        </div>
                      ))}
                    </div>
            </div>
        </div>
        <div className="propertyContainerMessage__locationGroup">
            <div className="top">Location:</div>
            <div className="bottom">{state.singleProperty.location}</div>
        </div>
        <div className="propertyContainerMessage__priceGroup">
            <div className="top">Price:</div>
            <div className="bottom">{state.singleProperty.price}</div>
        </div>
        <div className="propertyContainerMessage__sizeGroup">
            <div className="top">Property Size:</div>
            <div className="bottom">{state.singleProperty.propertySize}</div>
        </div>
        <div className="propertyContainerMessage__pstateGroup">
            <div className="top">For Rent/For Sale:</div>
            <div className="bottom">{state.singleProperty.propertyState}</div>
        </div>
        <div className="propertyContainerMessage__typeGroup">
            <div className="top">Property Type:</div>
            <div className="bottom">{state.singleProperty.propertyType}</div>
        </div>
        <div className="propertyContainerMessage__ratingGroup">
            <div className="top">Rating</div>
            <div className="bottom">{state.singleProperty.rating} / 10  <i>out of 5 reviews</i></div>
        </div>
        <div className="propertyContainerMessage__createdGroup">
            <div className="top">Uploaded on:</div>
            <div className="bottom">{date}</div>
        </div>
      </div>
    </div>
  </div>
 )}
 </div>
)}
     
    </div>


  );
}

export default PropertyInMessage;
