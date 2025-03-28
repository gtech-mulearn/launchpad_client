import logo from "../../assets/launchpad_logo.svg";
import "./Leader.css";

function Leader() {
  return (
    <div className="leade_container">
      <div className="leader">
        <img className="logo" src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default Leader;
