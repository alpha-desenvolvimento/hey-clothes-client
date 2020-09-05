import React from "react";

import {
  FiCoffee,
  FiHome,
  FiLogOut,
  FiShoppingCart,
  FiUser,
  FiSettings,
} from "react-icons/fi";

import {
  NavBar as Nav,
  NavItemsWrapper,
  NavItem,
  NavLink,
  LinkText,
  Main,
} from "./styles";

import HerokuServer from "../../API/HerokuServer";

  
const NavBar = () => {
  return (
    <Nav>
      <NavItemsWrapper>
        <NavItem>
          <NavLink to="/p">
            <FiShoppingCart />
            <LinkText>Products</LinkText>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/p">
            <FiUser />
            <LinkText>Users</LinkText>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/p">
            <FiSettings />
            <LinkText>Config</LinkText>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink onClick={HerokuServer.Auth.logoff} to="/">
            <FiLogOut />
            <LinkText>Logoff</LinkText>
          </NavLink>
        </NavItem>
      </NavItemsWrapper>
    </Nav>
  );
};

export default NavBar;
export { Main };
