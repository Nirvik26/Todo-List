import React, { useState } from "react";
import styles from "./Login.module.css";
import login from "../../assests/login.png";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";

function Login() {
  const { username, setUsername } = useState("");
  const { password, setPassword } = useState("");
  const handleSubmit = () => {
    console.log("login");
  };
  return (
    <div>
      <div className={styles.login__card}>
        <img src={login} alt=".." />
        <h4>Login</h4>
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
          New User? <Link to="/register">Register</Link>
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

export default Login;
