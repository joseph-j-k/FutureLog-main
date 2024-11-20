import './List.css'
import Header from '../../Components/header/Header'
import Navbar from '../../Components/navbar/Navbar'


 const List = () => {
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
          <h1 className="lsTitle">Search</h1>
          <label>Destination</label>
             
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
         
           
              </div>
          <div className="listResult">
            </div>
           
            </div>
          </div>
    </div>
  )
}
export default List
