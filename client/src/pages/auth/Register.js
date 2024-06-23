import React, { useState } from "react";
import styles from "./Register.module.css";
import login from "../../assests/login.png";
import { Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../util/GetError";
import AuthServices from "../../services/authServices";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = {
        firstName,
        lastName,
        username,
        password,
      };
      console.log(data);
      const response = await AuthServices.registerUser(data);
      console.log(response.data);
      setLoading(false);
      message.success("Registered successfully!!!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      message.error(getErrorMessage(error));
      setLoading(false);
    }
  };
  return (
    <div>
      <div className={styles.login__card}>
        <img src={login} alt=".." />
        <h2>Register</h2>
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
          Existing User? <Link to="/login">Login</Link>
        </div>
        <Button
          loading={loading}
          type="primary"
          size="large"
          disabled={!username || !password}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default Register;
