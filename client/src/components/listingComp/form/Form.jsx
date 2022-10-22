import "./form.scss";
import Dropdown from "../../dropdown/Dropdown";
import axios from "axios";
function Form({
  setField,
  features,
  setFeatures,
  handleSubmit,
  handleFileEvent,
  fileLimit,
  setFile
}) {
  const feat = (e, index) => {
    const data = [...features];

    index = data.indexOf(e.currentTarget.value);

    if (index === -1) {
      data.push(e.currentTarget.value);
    } else {
      data.splice(index, 1);
    }

    setFeatures(data, ...data);
  };

  // console.log(features)

  return (
    <div className="listingForm">
      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* 
rent /sale group
*/}
        <div className="radioGroup">
          <label htmlFor="" className="title">
            Sell/Rent<span>*</span>
          </label>

          {/* groups for the custom radio buttons */}
          <div className="groups">
            {/* group 1 */}
            <div className="groups--group1">
              <input
                type="radio"
                name="radioSales"
                id="radioSales"
                value="For Sale"
                className="inputRadioS"
                onChange={(e) => setField("propertyState", e.target.value)}
              />
              <label htmlFor="radioSales" className="sell">
                Sell
              </label>
            </div>

            {/* group 2 */}
            <div className="groups--group2">
              <input
                type="radio"
                name="radioSales"
                id="radioSales1"
                value="For Rent"
                className="inputRadioR"
                onChange={(e) => setField("propertyState", e.target.value)}
              />
              <label htmlFor="radioSales1" className="rent">
                Rent
              </label>
            </div>
          </div>
        </div>

        {/* end of the radio group */}

        {/* name and location group */}

        <div className="nameLocationGroup">
          <div className="formgroup">
            <label htmlFor="name">
              <img src={process.env.PUBLIC_URL + "/icons/office.png"} alt="" />
              Name<span>*</span>
            </label>
            <input
              type="text"
              name=""
              id="name"
              placeholder="eg. La villa"
              onChange={(e) => setField("propertyName", e.target.value)}
            />
          </div>
          <div className="formgroup">
            <label htmlFor="location" className="locationDrop">
              <img
                src={process.env.PUBLIC_URL + "/icons/locationListing.png"}
                alt=""
              />
              Location<span>*</span>
            </label>
            <Dropdown
              type="location"
              select={(option) => setField("location", option)}
            />
          </div>
        </div>

        {/* end of name and location form group */}

        {/* type of property Form group*/}

        <div className="typeOfPropertyFormGroup">
          <label htmlFor="" className="title">
            Type of Property<span>*</span>
          </label>
          <div className="icons">
            <div className="group">
              <div className="group__icon">
                <img
                  src={process.env.PUBLIC_URL + "/icons/apartment.png"}
                  alt=""
                  className="imgIcons--first"
                />
              </div>
              <div className="group__text--first">apartment</div>
              <input
                type="radio"
                name="property"
                id="property1"
                value="apartment"
                onChange={(e) => setField("propertyType", e.target.value)}
              />
              <label htmlFor="property1" className="label1"></label>
            </div>
            <div className="group">
              <div className="group__icon">
                <img
                  src={process.env.PUBLIC_URL + "/icons/office.png"}
                  alt=""
                  className="imgIcons"
                />
              </div>
              <div className="group__text">Office</div>
              <input
                type="radio"
                name="property"
                id="property2"
                value="office"
                onChange={(e) => setField("propertyType", e.target.value)}
              />
              <label htmlFor="property2" className="label2"></label>
            </div>
            <div className="group">
              <div className="group__icon">
                <img
                  src={process.env.PUBLIC_URL + "/icons/Building.png"}
                  alt=""
                  className="imgIcons"
                />
              </div>
              <div className="group__text">Condominium</div>
              <input
                type="radio"
                name="property"
                id="property3"
                value="condominium"
                onChange={(e) => setField("propertyType", e.target.value)}
              />
              <label htmlFor="property3" className="label3"></label>
            </div>
            <div className="group">
              <div className="group__icon">
                <img
                  src={process.env.PUBLIC_URL + "/icons/Home.png"}
                  alt=""
                  className="imgIcons"
                />
              </div>
              <div className="group__text">House</div>
              <input
                type="radio"
                name="property"
                id="property4"
                value="home"
                onChange={(e) => setField("propertyType", e.target.value)}
              />
              <label htmlFor="property4" className="label4"></label>
            </div>
          </div>
        </div>

        {/* End of type of property  */}

        {/* description formgroup */}

        <div className="descriptionFormGroup">
          <label htmlFor="desc">
            Description<span>*</span>
          </label>
          <textarea
            name=""
            id="desc"
            cols="20"
            rows="10"
            placeholder="Write something ..."
            onChange={(e) => setField("description", e.target.value)}
          ></textarea>
        </div>

        {/* bedroom bathroom ..... */}

        <div className="othersGroup">
          <div className="left">
            {/* bedrooms */}
            <div className="bedroomsGroup">
              <label htmlFor="bed">
                <img src={process.env.PUBLIC_URL + "/icons/bed.png"} alt="" />
                Bedrooms<span>*</span>
              </label>
              <input
                type="number"
                name=""
                id="bed"
                min={0}
                max={8}
                onChange={(e) => setField("bedrooms", e.target.value)}
              />
            </div>
            {/* bathrooms */}
            <div className="bathroomsGroup">
              <label htmlFor="bathroom">
                <img
                  src={process.env.PUBLIC_URL + "/icons/shower.png"}
                  alt=""
                />
                Bathrooms<span>*</span>
              </label>
              <input
                type="number"
                name=""
                id="bathroom"
                min={0}
                max={8}
                onChange={(e) => setField("bathrooms", e.target.value)}
              />
            </div>
            {/* property size */}
            <div className="bathroomsGroup">
              <label htmlFor="propertySize">
                <img src={process.env.PUBLIC_URL + "/icons/ruler.png"} alt="" />
                Property Size<span>*</span>
              </label>
              <input
                type="number"
                name=""
                id="propertySize"
                min={0}
                max={750000}
                onChange={(e) =>
                  setField("propertySize", e.target.value)
                }
              />
            </div>

            {/* price */}
            <div className="bathroomsGroup">
              <label htmlFor="price">
                <img src={process.env.PUBLIC_URL + "/icons/money.png"} alt="" />
                Price<span>*</span>
              </label>
              <input
                type="number"
                name=""
                id="price"
                min={0}
                max={75000000}
                onChange={(e) => setField("price", e.target.value)}
              />
            </div>
          </div>
          <div className="right">
            {/* address textarea */}

            <div className="addressFormgroup">
              <label htmlFor="address">
                <img
                  src={process.env.PUBLIC_URL + "/icons/addressBook.png"}
                  alt=""
                />
                Address<span>*</span>
              </label>
              <textarea
                name=""
                id="address"
                placeholder="write something..."
                onChange={(e) => setField("address", e.target.value)}
              ></textarea>
            </div>

            {/* offer choices  */}
            <div className="offerGroup">
              <label htmlFor="" className="title">
                <img src={process.env.PUBLIC_URL + "/icons/offer.png"} alt="" />
                Offer<span>*</span>
              </label>

              {/* groups for the custom radio buttons */}
              <div className="groups">
                {/* group 1 */}
                <div className="groups--group1">
                  <input
                    type="radio"
                    name="radioOffer"
                    id="radioOffer"
                    value="Yes"
                    className="inputRadioS"
                    onChange={(e) => setField("offer", e.target.value)}
                  />
                  <label htmlFor="radioOffer" className="yes">
                    Yes
                  </label>
                </div>

                {/* group 2 */}
                <div className="groups--group2">
                  <input
                    type="radio"
                    name="radioOffer"
                    id="radioOffer1"
                    value="No"
                    className="inputRadioR"
                    onChange={(e) => setField("offer", e.target.value)}
                  />
                  <label htmlFor="radioOffer1" className="no">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* end of others */}

        {/* features sections*/}

        {/* images upload section drag and drop feature 
 maximum number of images to be uploaded can be upto 6 images

 objectives
 */}

        <div className="featuresGroup">
          <div className="left">
            <label htmlFor="" className="title">
              More Features
            </label>
            <div className="formgroup">
              <div className="featuresGroupC">
                {/* Pool */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="pool"
                    value="Pool"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="pool" className="poolBox"></label>
                  <label htmlFor="pool" className="poolText">
                    Pool
                  </label>
                </div>
                {/* Granite counter tops */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="counterTops"
                    value="Granite Counter Tops"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="counterTops" className="poolBox"></label>
                  <label htmlFor="counterTops" className="poolText">
                    Granite Counter Tops
                  </label>
                </div>
                {/* walk in closets */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="closets"
                    value="Walk-in Closets"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="closets" className="poolBox"></label>
                  <label htmlFor="closets" className="poolText">
                    Walk-in Closets
                  </label>
                </div>
                {/* Balcony */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="Balcony"
                    value="Balcony"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="Balcony" className="poolBox"></label>
                  <label htmlFor="Balcony" className="poolText">
                    Balcony
                  </label>
                </div>
                {/* Tennis Court */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="court"
                    value="Tennis Court"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="court" className="poolBox"></label>
                  <label htmlFor="court" className="poolText">
                    Tennis Court
                  </label>
                </div>
                {/* Washer /dryer */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="dryer"
                    value="Washer/Dryer"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="dryer" className="poolBox"></label>
                  <label htmlFor="dryer" className="poolText">
                    Washer/Dryer
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="middle">
            <div className="formgroup">
              <div className="featuresGroupC">
                {/* fitness center */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="fitness"
                    value="Fitness Center"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="fitness" className="poolBox"></label>
                  <label htmlFor="fitness" className="poolText">
                    Fitness Center
                  </label>
                </div>
                {/* modern kitchen */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="kitchen"
                    value="Modern Kitchen"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="kitchen" className="poolBox"></label>
                  <label htmlFor="kitchen" className="poolText">
                    Modern Kitchen
                  </label>
                </div>
                {/* wifi */}{" "}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="wifi"
                    value="Wifi"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="wifi" className="poolBox"></label>
                  <label htmlFor="wifi" className="poolText">
                    Wifi
                  </label>
                </div>
                {/* Elevator */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="elevator"
                    value="Elevator"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="elevator" className="poolBox"></label>
                  <label htmlFor="elevator" className="poolText">
                    Elevator
                  </label>
                </div>
                {/* laundry machines */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="laundry"
                    value="Laundry Machine"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="laundry" className="poolBox"></label>
                  <label htmlFor="laundry" className="poolText">
                    Laundry Machine
                  </label>
                </div>
                {/* club house */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="clubHouse"
                    value="Club House"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="clubHouse" className="poolBox"></label>
                  <label htmlFor="clubHouse" className="poolText">
                    Club House
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="formgroup">
              <div className="featuresGroupC">
                {/* spa */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="spa"
                    value="Spa"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="spa" className="poolBox"></label>
                  <label htmlFor="spa" className="poolText">
                    Spa
                  </label>
                </div>
                {/* parking */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="parking"
                    value="Parking"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="parking" className="poolBox"></label>
                  <label htmlFor="parking" className="poolText">
                    Parking
                  </label>
                </div>
                {/* Ac and heating */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="ac"
                    value="AC & Heating"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="ac" className="poolBox"></label>
                  <label htmlFor="ac" className="poolText">
                    AC & Heating
                  </label>
                </div>
                {/* dishwasher */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="dishWasher"
                    value="Dishwasher"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="dishWasher" className="poolBox"></label>
                  <label htmlFor="dishWasher" className="poolText">
                    Dishwasher
                  </label>
                </div>
                {/* pet Friendly */}

                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="pet"
                    value="Pet Friendly"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="pet" className="poolBox"></label>
                  <label htmlFor="pet" className="poolText">
                    Pet Friendly
                  </label>
                </div>
                {/* Storage Units */}
                <div className="groupCheck">
                  <input
                    type="checkbox"
                    name=""
                    id="storage"
                    value="Storage Units"
                    onChange={(e) => feat(e)}
                  />
                  <label htmlFor="storage" className="poolBox"></label>
                  <label htmlFor="storage" className="poolText">
                    Storage Units
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* images */}
        <div className="imagesGroup">
          <label htmlFor="file" className="file">
            <img src={process.env.PUBLIC_URL + "/icons/images.png"} alt="" />
            Images
          </label>
          <div className="group">
            <input
              type="file"
              name="photos"
              id="file"
              multiple
              onChange={(e) => {
                handleFileEvent(e);
                setFile(e.target.files);
              }}
              disabled={fileLimit}
            />
            <label htmlFor="file" className="uploadText">
              Upload
            </label>
            <label htmlFor="file" className="uploadImg">
              <img src={process.env.PUBLIC_URL + "/icons/upload.png"} alt="" />
            </label>
          </div>

          <div className="text">
            <p>supported files jpg, jpeg, png</p>
            <p>
              You can upload upto six images <br />
              The first image will be used as the cover
            </p>
          </div>
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Form;
