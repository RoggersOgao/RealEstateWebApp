import React from "react";
import "./skeleton.scss";
const Skeleton = ({ type }) => {
    const COUNTER = 5;
  const PropertySkeleton = () => (
    <div className="cardSkel">
      <div className="cardSkel__left"></div>
      <div className="cardSkel__right">
        <div className="top">
          <div className="text"></div>
          <div className="text"></div>
        </div>
        <div className="middle">
          <div className="middle__title"></div>
          <div className="middle__location"></div>
          <div className="middle__others">
            <div className="shower"></div>
            <div className="bedroom"></div>
            <div className="size"></div>
          </div>
        </div>
        <div className="bottomcardSkel">
          <div className="bottomcardSkel__left">
            <div className="text"></div>
            <div className="text"></div>
          </div>
          <div className="bottomcardSkel__right">
            <div className="m"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (type=== "feed") return  Array(COUNTER).fill(<PropertySkeleton />);
};

export default Skeleton;
