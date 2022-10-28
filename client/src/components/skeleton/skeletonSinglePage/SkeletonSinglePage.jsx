import React from 'react'
import NavSkeletonBottom from '../navSkeleton/NavSkeletonBottom'
import NavSkeletonTopskel from '../navSkeleton/NavSkeletonTopskel'
import SinglePageHeaderSkel from '../singlepageHeaderSkel/SinglePageHeaderSkel'
import "./skeleton.scss"
function SkeletonSinglePage() {
  return (
    <div className="propertyskel">
    <div className="propertyskel__nav">
      <div className="propertyskel__nav--top">
            <NavSkeletonTopskel />
      </div>
      <div className="propertyskel__nav--bottom">
             <NavSkeletonBottom />
      </div>
      </div>
      <div className="propertyskel__header">
      
      
      </div>

  {/* 
share icons
area

*/}
  <div className="propertyskelShare">
    <div className="propertyskelShare--button Facebook">

    </div>
    <div className="propertyskelShare--button Email">

    </div>
    <div className="propertyskelShare--button Twitter">

    </div>
    <div className="propertyskelShare--button Pinterest">

    </div>
    <div className="propertyskelShare--button Whatsapp">

    </div>
    <div className="propertyskelShare--button Telegram">

    </div>
    <div className="propertyskelShare--button plus">

    </div>
  </div>

  <div className="propertyskelDescriptionBody">
    <div className="top">
    <div className="propertyskelDescriptionBody__left">
      
      {/* for this section i will use css grid to achieve a classy image gallery */}

      <div className="images">

        <div className="images--1">
        </div>
        <div className="images--2">
        
        </div>
        <div className="images--3">
        
        </div>
        <div className="images--4">
       
        </div>
        <div className="images--5">
        
        </div>
      </div>
    </div>
    <div className="propertyskelDescriptionBody__right">
    
        {/* header */}
        <SinglePageHeaderSkel />

     
    </div>
    </div>
  </div>
    <div className="bottomP">

      {/* comments */}

    {/* <Comments />    */}


      {/* google maps implementaion will be here  */}

    </div>

    {/* i might do the footer too have a skeleton tooo */}

{/* <Footer /> */}
      
</div>
  )
}

export default SkeletonSinglePage