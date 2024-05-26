import React, { useState } from "react";
import styles from "./Register.module.css";
import login from "../../assests/login.png";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";

function Register() {
  const { username, setUsername } = useState("");
  const { password, setPassword } = useState(""); 
  const { firstName, setFirstName } = useState(""); 
  const { lastName, setLastName } = useState(""); 
  const handleSubmit = () => {
    console.log("Register");
  };
  return (
    <div>
      <div className={styles.login__card}>
        <img src={login} alt=".." />
        <h4>Login</h4>
        <div className={styles.input__inline__wrapper}>
          <Input
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.input__inline__wrapper}>
          <Input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.input__wrapper}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.input__wrapper}>
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.input__info}>
          Existing User? <Link to="/login">Register</Link>
        </div>
        <Button
          type="primary"
          size="large"
          disabled={!username || !password}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Register;
