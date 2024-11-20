import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = () => {
  return (
    <div className="searchItem">
      <img src={"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">tower</h1>
        <span className="siDistance">m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">studio.bathroom</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
         <div className="siRating">
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">$123</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          
          <button className="siCheckButton">See availability</button>
    
        </div>
      </div>
    </div>
  );
};

export default SearchItem;