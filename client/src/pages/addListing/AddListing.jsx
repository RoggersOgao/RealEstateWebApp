import React, { useState, useContext } from "react";
import Footer from "../../components/footer/Footer";
import Form from "../../components/listingComp/form/Form";
import NavBottom from "../../components/nav/NavBottom";
import Nav from "../../components/nav/NavTop";
import "./addListing.scss";
import LoginContext from "../../components/context/auth/loginContext/LoginContext";
import axios from "axios";
import AlertContext from "../../components/context/alerts/AlertContext";
import Alert from "../../components/alerts/Alert";

function AddListing() {
  const { state } = useContext(LoginContext);

  const {setAlert} = useContext(AlertContext)
  const [form, setForm] = useState({});
  const [features, setFeatures] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [file, setFile] = useState(null);

  const MAX_COUNT = 6;
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };
  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploads = [];

    if (file) {
      const data = new FormData();

      for (let i = 0; i < file.length; i++) {
        data.append("file", file[i]);
      }

      try {

        const lsR = axios.create({
          baseURL: "http://localhost:5003/",
          headers: {
            authorization: "Bearer " + state.user.accessToken,
          },
        });

        if(!form.propertyName || !form.location || !form.propertyType || !form.address || !form.bedrooms || !form.bathrooms){
          setAlert("All fields are required!!", "error")
        }else{
          const response = await lsR.post(
            "http://localhost:5003/api/upload",
            data
          );
          response.data.map(
            (item, index) => (
              uploads.push(item.filename)
            )
          );
          
        }

        

        //  working code for adding to the listing
        const newForm = {
          ...form,
          username: state.user.username,
          userId: state.user.id,
          features: features,
          img: uploads,
        };

        console.log(newForm)
        try {
          const listingResponse = await lsR.post("/api/listings", newForm);
          console.log(listingResponse);
          if(listingResponse.status === 200){
            setAlert("Uploaded Successfully",'success')
          }

          setForm({})

        } catch (error) {
          setAlert(error.response.data.err, 'error')
        }
      } catch (error) {
        setAlert(error, 'error')
      }
    }
  };

  return (
    <div className="listing">
      <div className="listing__nav">
        <Nav />
      </div>
      <NavBottom />
      <div className="listing__heading">
      <Alert />
        <img src={process.env.PUBLIC_URL + "/images/listing.png"} alt="" />
        <div className="text">
          <div className="text__title">
            Want <br /> to <span>Sell</span>?
          </div>
          <div className="text__description">
            We offer the best services in town
          </div>
        </div>
      </div>
      
      <Form
        setField={setField}
        features={features}
        setFeatures={setFeatures}
        handleSubmit={handleSubmit}
        handleFileEvent={handleFileEvent}
        fileLimit={fileLimit}
        setFile={setFile}
      />
      
      <Footer />
      
    </div>
  );
}

export default AddListing;
