import { useState } from "react";
import {NavLink as ReactLink} from "react-router-dom";
import {Navbar, NavbarBrand, NavbarToggler, NavbarText, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";


const CustomNavBar =() =>{
    const [isOpen, setIsOpen] = useState(false)
    return(
        <div>
            <Navbar 
                color="dark" 
                dark
                expand="md"
                fixed="">
        <NavbarBrand tag={ReactLink} to = "/">
            MyBlogs
        </NavbarBrand>
        <NavbarToggler onClick={()=> setIsOpen(!isOpen)}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav 
            className="me-auto" 
            navbar
          >
            <NavItem>
              <NavLink tag={ReactLink} to = "/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to = "/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to = "/signup">
                Signup
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={ReactLink} to ="/services">
                  Services
                </DropdownItem>
                <DropdownItem>
                  Contact us
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Youtube
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Youtube</NavbarText>
        </Collapse>
      </Navbar>
        </div>
    )
}

export default CustomNavBar;