import React,{useState} from 'react'
import Footer from '../../components/footer/Footer'
import Form from '../../components/listingComp/form/Form'
import NavBottom from '../../components/nav/NavBottom'
import Nav from '../../components/nav/NavTop'
import "./addListing.scss"
function AddListing() {

  const [form, setForm] = useState({})
  const [features, setFeatures] = useState([])

  const setField = (field,value) => {
    setForm({
      ...form,
      [field]:value
    })
  }
console.log(features)
  console.log(form)
  return (
    <div className="listing">
      <div className="listing__nav">
      <Nav />
      </div>
      <NavBottom />
      <div className="listing__heading">
        <img src={process.env.PUBLIC_URL +"/images/listing.png"} alt=""/>
        <div className="text">
          <div className="text__title">
            Want <br /> to <span>Sell</span>?
          </div>
          <div className="text__description">
            We offer the best services in town
          </div>
        </div>
      </div>

      <Form setField={setField} features={features} setFeatures={setFeatures}/>
      <Footer />
    </div>
  )
}

export default AddListing