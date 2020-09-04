import React from 'react';

import { FiCoffee, FiHome } from "react-icons/fi";
import { NavBar as Nav, NavItemsWrapper, NavItem, NavLink, LinkText, Main} from './styles';

const NavBar = () => {
    return(
    <Nav>
        <NavItemsWrapper>
            <NavItem>
                <NavLink to="/Home">
                    <FiHome />
                    <LinkText>INICIO</LinkText>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/Mock">
                    <FiCoffee />
                    <LinkText>Mock</LinkText>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/Products">
                    <FiCoffee />
                    <LinkText>Products</LinkText>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/">
                    <FiCoffee />
                    <LinkText>/</LinkText>
                </NavLink>
            </NavItem>
        </NavItemsWrapper>
    </Nav>
    )
}

export default NavBar
export { Main }