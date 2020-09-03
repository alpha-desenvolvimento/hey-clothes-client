import React from 'react';

import { FiCoffee, FiHome } from "react-icons/fi";
import { NavBar as Nav, NavItemsWrapper, NavItem, NavLink, LinkText} from './styles';

const NavBar = () => {
    return(
    <Nav>
        <NavItemsWrapper>
            <NavItem>
                <NavLink>
                    <FiHome />
                    <LinkText>INICIO</LinkText>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink>
                    <FiCoffee />
                    <LinkText>LALALALA</LinkText>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink>
                    <FiCoffee />
                    <LinkText>LALALALA</LinkText>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink>
                    <FiCoffee />
                    <LinkText>LALALALA</LinkText>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink>
                    <FiCoffee />
                    <LinkText>LALALALA</LinkText>
                </NavLink>
            </NavItem>
        </NavItemsWrapper>
    </Nav>
    )
}

export default NavBar