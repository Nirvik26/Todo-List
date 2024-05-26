import React from "react";
import Navbar from "../../components/Navbar";
import styles from "./Landing.module.css";
import landing from "../../assests/landing.png";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <Navbar active={"home"} />
      <div className={styles.landing__wrapper}>
        <div className={styles.landing__text}>
          <h1>
            Schedule Your Tasks With <span className="primaryText">DoIt!</span>
          </h1>
          <Link to="/register" className="primaryBtn">
            Register
          </Link>
          <Link to="/login" className="secondaryBtn">
            Login
          </Link>
        </div>
      
      <div className={styles.landing__img}>
        <img src={landing} alt="landing" />
      </div>
    </div>
    </div>
  );
}

export default Landing;
