import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";

import { FiLogOut, FiShoppingCart, FiUser, FiBook } from "react-icons/fi";

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
            <LinkText>Produtos</LinkText>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/u">
            <FiUser />
            <LinkText>Usuarios</LinkText>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/c">
            <FiBook />
            <LinkText>Gerenciar</LinkText>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink onClick={HerokuServer.Auth.logoff} to="/">
            <FiLogOut />
            <LinkText>Sair</LinkText>
          </NavLink>
        </NavItem>
      </NavItemsWrapper>
    </Nav>
  );
};

export default NavBar;
export { Main };
