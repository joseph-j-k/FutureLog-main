import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div
      className="homeContainerAdmin"
      style={{
        backgroundColor: "#344955",
        height: "190vh",
        borderRadius: "20px",
        border:'2px solid coral',
      }}
    >
      <div className="widgets">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </div>
      <div className="charts">
        <Featured />
        <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
      </div>
      <div className="listContainer">
        <div className="listTitle">Our Users</div>
        <Table />
      </div>
    </div>
  );
};

export default Home;
