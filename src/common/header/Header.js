import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import LoginRegisterModel from "../Model/Model";

import "./Header.css";

function LoginButton(props) {
  return (
    <Button variant="contained" onClick={props.onClick}>
      Login
    </Button>
  );
}

function LogoutButton(props) {
  return (
    <Button variant="contained" onClick={props.onClick}>
      LogOut
    </Button>
  );
}

function LoginControl({ openModal }) {
  const [isLoggedIn, setLogged] = useState(false);

  const handleLoginClick = () => {
    openModal();
    setLogged(true);
  };

  const handleLogoutClick = () => {
    setLogged(false);
  };

  let button;
  if (isLoggedIn) {
    button = <LogoutButton onClick={handleLogoutClick} />;
  } else {
    button = <LoginButton onClick={handleLoginClick} />;
  }

  return <div>{button}</div>;
}

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div id="header">
      <div className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="nav">
          {/* 
        1.This button should always be displayed in the header when a user clicks on a released movie, whether they are logged in or not.

        2.When a user is not logged in, clicking the Book Show button would open the modal that would ask them to log in/register on the application. 
        If the user is logged in, then it would open the Book Show page, which you can find in the ‘bookshow’ folder, which is present in the ‘screens’ folder. 
        (The code for BookShow is already provided to you. You just need to integrate that with the Book Show button.) 
        */}
          <Button variant="contained" color="primary">
            Book Show
          </Button>
          {/* button should be displayed base on the variable ie. login or logout from the access token */}
          <LoginControl openModal={openModal} />
        </div>
      </div>
      <LoginRegisterModel showModal={showModal} openModal={openModal} />
    </div>
  );
};

export default Header;
