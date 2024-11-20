import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faGraduationCap,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = ({ type }) => {
  const navigate = useNavigate();
  
  const handleClick = async () => {
    navigate("/User/AgentList");
  };
  const handleViewClick = async () => {
    navigate("/User/bookingView");
  };
  const handleComplaintClick = async () => {
    navigate("/User/Compliant");
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active" onClick={handleClick}>
            <FontAwesomeIcon icon={faGraduationCap} />
            <span>Agent</span>
          </div>
          <div className="headerListItem active" onClick={handleViewClick}>
            <FontAwesomeIcon icon={faGraduationCap} />
            <span>Bookings</span>
          </div>
          <div className="headerListItem active" onClick={handleComplaintClick}>
            <FontAwesomeIcon icon={faGraduationCap} />
            <span>Compliant</span>
          </div>
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faGraduationCap} />
            <span>Engineering</span>
          </div>
        </div>
        {/* Rest of your component */}
      </div>
    </div>
  );
};

export default Header;
