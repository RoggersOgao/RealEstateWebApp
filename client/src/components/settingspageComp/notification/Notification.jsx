import React from 'react'
import "./notification.scss"
function Notification() {

    const IL = "http://localhost:5003"
  return (
    <div className="notifications">
        <div className="container">
            <div className="container__left">
                <img src={IL + "/images/1666976449342_dark-skinned-woman-closing-eyes-from-joy-pleasure-holding-palms-cheeks-smiling-broadly.jpg"} alt="" />
            </div>
            <div className="container__right">
                <div className="container__right--top">
                    <div className="left">
                    <div className="left__name">
                    Roggers Ogao
                    </div>
                    <div className="contact">
                    <div className="email">
                        roggersog@gmail.com
                    </div>
                    <div className="phone">
                        0700601885
                    </div>
                    </div>
                    </div>
                    <div className="right">
                    nov 8
                    </div>
                </div>
                <div className="container__right--bottom">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At consectetur corrupti, suscipit similique eum tempora earum autem aliquid ut itaque explicabo laudantium alias, non sunt labore? Soluta delectus nulla voluptatem.
                </div>
            </div>
        </div>
    </div>
  )
}

export default Notification