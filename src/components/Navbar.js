import {useState} from "react"

import {BsGear} from "react-icons/bs"
import {Nav, Navbar, Collapse} from "react-bootstrap"
import Settings from "./SettingsDropDown"


const NavigationBar = ({user}) => (
    <Navbar className="navBar">
        <nav className = "logo">FinSight</nav>
        <nav className="ms-auto">
            {user
            ? <Settings user={user} />
            : null}
        </nav>
    </Navbar>
)

export default NavigationBar