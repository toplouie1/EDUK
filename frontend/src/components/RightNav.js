import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Button from "@mui/material/Button";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Ul = styled.ul`
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: rgb(247 247 247);
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 25px;
    right: 0;
    height: 100vh;
    width: 240px;
    padding-top: 3.5rem;
    transition: 0.3s ease-in-out;
    z-index: 20;
  }
`;

export default function RightNav({ open, logText, setLogText }) {
  const [dropdown, setDropdown] = useState(false);

  const onMouseClick = () => {
    setDropdown(true);
  };
  const onMouseUnclick = () => {
    setDropdown(false);
  };
  const logOut = () => {
    localStorage.clear();
    setLogText("Log In");
  };
  //get userId from local storage
  const userId = localStorage.getItem("userId");

  //user data from local storage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <Ul open={open} className="navLinks">
      <li
        className="eachLi mainLi "
        onClick={dropdown ? onMouseUnclick : onMouseClick}
      >
        <Link to="/resources">
          Resources <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon>
        </Link>
        {dropdown && <Dropdown />}
      </li>
      <li className="eachLi mainLi">
        <Link to="/about">About</Link>
      </li>
      <li className="eachLi mainLi">
        {userInfo && userInfo.is_admin && !isNaN(userId) ? (
          <Link to={`/users/${userId}`}>Admin Page</Link>
        ) : (
          <Link to={`/users/${userId}`}>Dashboard</Link>
        )}
      </li>
      <li className="eachLi mainLi">
        <Link to="/mentors/create">Mentors</Link>
      </li>
      <div className="loginIcon">
        {localStorage.getItem("userId") ? (
          <Link to="/">
            <Button variant="outlined" size="medium" onClick={logOut}>
              {logText}
            </Button>
          </Link>
        ) : (
          <Link to="/users/login">
            <Button variant="outlined" size="medium">
              {logText}
            </Button>
          </Link>
        )}
      </div>
    </Ul>
  );
}
