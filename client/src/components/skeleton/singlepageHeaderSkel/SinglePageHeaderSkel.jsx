import React from "react";
import "./singlePageHeaderSkel.scss";
function SinglePageHeaderSkel() {
  return (
    <div className="sPageHeaderSkel">
      <div className="sPageHeaderSkel__title">
        <div className="name"></div>
        <div className="username"></div>
      </div>

      <div className="sPageHeaderSkel__description">
        <div className="description"></div>
        <div className="otherfeatures">
          <div className="location">
            <div className="location__title"></div>
            <div className="text"></div>
          </div>
          <div className="bedrooms">
            <div className="bedrooms__title"></div>
            <div className="text"></div>
          </div>
          <div className="bathrooms">
            <div className="bathrooms__title"></div>
            <div className="text"></div>
          </div>
        </div>
      </div>

      {/* more options in the description area */}

      <div className="sPageHeaderSkel__moreOptions">
        <div className="left">
          <div className="left--button state"></div>
          <div className="left--button type"></div>
          <div className="left--button rating"></div>
          <div className="left--button created"></div>
          <div className="left--button price"></div>
        </div>
        <div className="right">
          <div className="right--button contact"></div>
        </div>
      </div>
    </div>
  );
}

export default SinglePageHeaderSkel;
