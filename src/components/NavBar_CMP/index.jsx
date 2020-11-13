import React from "react";

import { FiLogOut, FiArchive, FiUsers, FiBook } from "react-icons/fi";

import {
  NavBar as Nav,
  NavItemsWrapper,
  NavItem,
  NavLink,
  LinkText,
  Main,
} from "./styles";

const NavBar = () => {
  function logoff(){
    window.localStorage.removeItem("section");
    window.location.reload(false);
  }

  return (
    <Nav>
      <NavItemsWrapper>
        <NavItem>
          <NavLink to="/p">
            <FiArchive />
            <LinkText>Produtos</LinkText>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/u">
            <FiUsers />
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
          <NavLink onClick={logoff} to="/">
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
