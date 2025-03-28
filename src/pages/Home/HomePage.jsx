import { useState, useEffect } from "react";
import "./HomePage.css";
// import logo svg
import logo from "../../assets/launchpad_logo.svg";
// import cluster svg
import coder from "../../assets/coder_tab.svg";
import maker from "../../assets/maker_tab.svg";
import manager from "../../assets/manager_tab.svg";
import creative from "../../assets/creative_tab.svg";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner"; // Import the Spinner component

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (remove this in production)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home">
      {loading ? (
        <Spinner />
      ) : (
        <div className="home_container">
          <img className="logo" src={logo} alt="LaunchPad Kerala logo" />
          <div className="cluster">
            <div className="cluster_container">
              <Link to="/leaderboard/coder" className="tab_link">
                <img className="cluster_tab" src={coder} alt="Coders" />
              </Link>
            </div>
            <div className="cluster_container">
              <Link to="/leaderboard/maker" className="tab_link">
                <img className="cluster_tab" src={maker} alt="Makers" />
              </Link>
            </div>
            <div className="cluster_container">
              <Link to="/leaderboard/manager" className="tab_link">
                <img className="cluster_tab" src={manager} alt="Managers" />
              </Link>
            </div>
            <div className="cluster_container">
              <Link to="/leaderboard/creative" className="tab_link">
                <img className="cluster_tab" src={creative} alt="Creative" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
