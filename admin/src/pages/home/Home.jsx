import React from 'react'
import { FaCube, FaHashtag, FaIdCard, FaMailchimp, FaPhone } from 'react-icons/fa'
import SideNav from '../../components/sidenav/SideNav'
import Header from '../../components/topHeader/Header'
import LoginContext from '../../components/context/loginContext/LoginContext'
import { useContext } from 'react'
import "./home.scss"
import StatCard from '../../components/homeComp/statCard/StatCard'
import Progress from '../../components/homeComp/progress/Progress'
import UserChart from '../../components/homeComp/usersChart/UserChart'
import { Link } from 'react-router-dom'
import LatestPropertyTable from '../../components/homeComp/lpropertyTable/LatestPropertyTable'
import Footer from '../../components/footer/Footer'
function Home() {

  const {state} = useContext(LoginContext)
  const IL = "http://localhost:5003"
  return (
    <div className="home">
      <div className="home__nav">
        <Header />
      </div>

<div className="home__container">
        <div className="home__main">
          <div className="left">
        <SideNav />
          </div>
          <div className="right">

        <div className="right__header">
          <div className="top">
            <FaCube className='icon'/> 
            USERNAME: <FaHashtag />
            {state.user.username}
          </div>
          <div className="bottom">
            <div className="bottom__link">
              Information
            </div>
          </div>
        </div>
        <div className="body">
          <div className="body__left">
            <div className="profileContainer">
              <div className="top">
                <img src={IL + `/images/${state.user.profile}`} alt="" srcset="" />
              </div>
              <div className="bottom">
                <div className="role">
                  <FaHashtag />: Super Admin
                </div>
                <div className="name">
                  {state.user.username}
                </div>
                <div className="mail">
                  Email: {state.user.email}
                </div>
                <div className="phone">
                  <div className="phone--1">Phone: {state.user.phoneNumber}</div>
                  <div className="phone--1">Alt Phone: {state.user.otherNumber}</div>
                </div>

              </div>
            </div>
          </div>
          <div className="body__right">
            {/* right side of the body will contain basic stats of whats happening */}

            <div className="statcard">
              <div className="home">
              <StatCard type="home"/>
              </div>
              <div className="condominium">
              <StatCard type="condominium"/>
              </div>
              <div className="office">
              <StatCard type="office"/>
              </div>
              <div className="apartment">
              <StatCard type="apartment"/>
              </div>  
            </div>

            <div className="progrsChart">
              <div className="left">
                <Progress />
              </div>
              <div className="right">
                <UserChart />
                <div className="pictureContainer">
                  <div className="img">
                  <img src={process.env.PUBLIC_URL + "/images/search.jpg"} alt="" />
                  </div>
                  <div className="left">
                    <div className="text">
                    <div className="text--1">
                    Find Users
                    </div>
                    <div className="text--1">
                    Easily
                    </div>
                    </div>
                    <div className="button">
                    <Link to='/' className='link'><button>List Users</button></Link>
                    
                    </div>
                  </div>
                  <div className="right"></div>
                </div>
              </div>
            </div>

            <div className="usersTable">
              <div className="usersTable__title">
                Latest Properties
              </div>
              <div className="usersTable__body">
                <LatestPropertyTable />
                <div className="banner">
                  <div className="text">
                    <div className="text--1">
                      Manage Your
                    </div>
                    <div className="text--1">
                      Properties With Ease
                    </div>
                  </div>
                  <div className="button">
                  <Link to="/" className="link"><button>  Get Started</button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
          
          <div className="footer">
          <Footer />
          </div>
          </div>
          </div>
        </div>

    </div>
  )
}

export default Home