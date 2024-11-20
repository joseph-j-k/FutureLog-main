import { useParams } from "react-router-dom";
import Featured from "../../Components/featured/Featued";
import FeaturedProperties from "../../Components/FeaturedProperties/featuredProperties";
import Footer from "../../Components/footer/Footer";
import Header from "../../Components/header/Header";
import MailList from "../../Components/mailList/MailList";
import PropertyList from "../../Components/propertyList/PropertyList";
import "./courseView.css";

const CourseView = () => {
  const {Id} = useParams()
  return (  
    <div>
      <Header/>
      <div className="homeContainer">
        <h1 className="homeTitle">List of Courses</h1>
        <FeaturedProperties Id={Id}/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default CourseView;