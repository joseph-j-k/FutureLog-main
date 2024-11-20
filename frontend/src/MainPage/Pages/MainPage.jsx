import React from 'react';
import Footer from "../components/footer/footer";
import Header from "../components/Header/Header";
import Body from '../components/Body/Body';

const MainPage = () => {
  return (  
    <div>
      <Header/>
      <div className="homeContainer">
        <Body/>
        <Login />
        <Footer/>
      </div>
    </div>
  );
}

export default MainPage;