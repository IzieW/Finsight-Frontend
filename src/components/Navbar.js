import { useState } from "react";

import { BsGear } from "react-icons/bs";
import { Nav, Navbar, Collapse } from "react-bootstrap";
import Settings from "./SettingsDropDown";

const NavigationBar = ({ user, setForecasts, setUser }) => (
  <Navbar className="navBar">
    <nav className="logo">FinSight</nav>
    <nav className="ms-auto">{user ? <Settings user={user} setUser={setUser} setForecasts={setForecasts}/> : null}</nav>
  </Navbar>
);

export default NavigationBar;
