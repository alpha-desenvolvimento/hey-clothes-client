import React from 'react';

import { FiCoffee } from "react-icons/fi";
import { NavBar as Nav, NavItemsWrapper, NavItem} from './styles';

const NavBar = () => {
    return(
    <Nav>
        <NavItemsWrapper>
            <NavItem>
                <FiCoffee />
            </NavItem>
            <NavItem>
                <FiCoffee />
            </NavItem>
            <NavItem>
                <FiCoffee />
            </NavItem>
            <NavItem>
                <FiCoffee />
            </NavItem>
        </NavItemsWrapper>
    </Nav>
    )
}

export default NavBar