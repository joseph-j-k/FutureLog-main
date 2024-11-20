import Featured from "../../Components/featured/Featued";
import FeaturedProperties from "../../Components/FeaturedProperties/featuredProperties";
import Footer from "../../Components/footer/Footer";
import Header from "../../Components/header/Header";
import MailList from "../../Components/mailList/MailList";
import PropertyList from "../../Components/propertyList/PropertyList";
import AgentList from "../../Components/AgentList/AgentList";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";

const Home = () => {
  return (  
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <h1 className="homeTitle">List Of Colleges</h1>
        <Featured/>
        <h1 className="homeTitle">Our Agents</h1>
        <AgentList/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
