import React from 'react'
import "./header.scss"
function Header() {
  return (
    <header>
        <div className="headerContainer">

            <div className="headerContainer__img">
                
            </div>
            <span className="left"></span>
                <div className="headerContainer__text">
                    <div className="container">
                    <div className="title">
                        find a <span>Home</span>
                    </div>
                    <div className="description">
                        <p>
                        100+ new apartments and homes with best modern designs for you and <br />
                        your loved ones.Fell free to choose from all the options available.
                        </p>
                    </div>

                    <div className="icons">
                        <div className="group">
                            <div className="group__icon">
                                <img src={process.env.PUBLIC_URL + "/icons/apartment.png"} alt="" className="imgIcons--first"/>                                    
                            </div>
                            <div className="group__text--first">apartment</div>
                        </div>
                        <div className="group">
                            <div className="group__icon">
                            <img src={process.env.PUBLIC_URL + "/icons/office.png"} alt="" className="imgIcons"/>
                            </div>
                            <div className="group__text">Office</div>
                        </div>
                        <div className="group">
                            <div className="group__icon">
                            <img src={process.env.PUBLIC_URL + "/icons/Building.png"} alt="" className="imgIcons"/>
                            </div>
                            <div className="group__text">Condominium</div>
                        </div>
                        <div className="group">
                            <div className="group__icon">
                            <img src={process.env.PUBLIC_URL + "/icons/Home.png"} alt="" className="imgIcons"/>
                            </div>
                            <div className="group__text">House</div>
                        </div>
                    </div>
                    </div>
                </div>

        </div>
    </header>
  )
}

export default Header