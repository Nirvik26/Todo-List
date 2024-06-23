import React, { useEffect, useState } from "react";
import logo from "../assests/landing.png";
import avatar from "../assests/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import { getUserDetails } from "../util/GetUser";


function Navbar({ active }) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const userDetails = getUserDetails();
    setUser(userDetails);
  }, []);

  const handleLogout = () => {
   localStorage.removeItem('toDoAppUser');
   navigate('/login');
  };

  const items = [
    {
      key: "1",
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];

  return (
    <header>
      <nav>
        <div className="logo_wrappper">
          {/* <img src={logo} alt="logo" /> */}
          <h4>DoIT!</h4>
        </div>
        <ul className="navigation-menu">
          <li>
            <Link to="/" className={active === "home" && "activeNav"}>
              Home
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/todolist"
                className={active === "myTask" && "activeNav"}
              >
                myTask
              </Link>
            </li>
          )}

          {user ? (
            <Dropdown menu={{ items }} placement="bottom" arrow>
              <div className="userInfoNav">
                <img src={avatar} alt="User Avatar" />
                <span>
                  {user.firstName
                    ? `Hello, ${user.firstName} ${user.lastName}`
                    : user.username}
                </span>
              </div>
            </Dropdown>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
