import styled from "styled-components";
import { mediaQuery } from "../../styles/global";
import { NavLink as RouterLink } from "react-router-dom";

export const LinkText = styled.span`
  font-size: 1.6rem;
  display: none;
  margin-left: 1.6rem;
`;

export const NavBar = styled.nav`
  position: fixed;
  z-index: 1000;
  bottom: 0;
  width: 100vw;
  height: 8rem;

  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);

  transition: width 200ms ease;
  overflow: hidden;

  ${mediaQuery[0]} {
    width: 8rem;
    height: 100vh;

    &:hover {
      width: 24rem;
    }

    &:hover ${LinkText} {
      display: block;
    }
  }
`;

export const NavItemsWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;

  ${mediaQuery[0]} {
    flex-direction: column;
  }
`;

export const NavItem = styled.li`
  width: 100%;

  &:last-child {
    margin-top: auto;
  }
`;

export const NavLink = styled(RouterLink)`
  cursor: pointer;
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  vertical-align: middle;

  height: 8rem;

  font-size: 2rem;
  text-decoration: none;
  color: #3b3b3b;
  opacity: 0.8;

  transition: 200ms ease-in-out;

  &:hover {
    filter: grayscale(0%) opacity(1);
    color: #131313;
    opacity: 1;
    text-decoration: underline 2px #131313;
  }

  & > svg {
    font-size: 4rem;
    min-width: 4rem;
    margin: 0 0 0 2rem;
  }
`;

export const Main = styled.main`
  /* Este componente é um Wrapper que considera a largura e altura da NavBar e deve ser usado sempre que a Nav for usada */
  min-height: 100vh;
  padding: 1rem;
  margin-bottom: 8rem;
  ${mediaQuery[0]} {
    margin-left: 8rem;
    margin-bottom: 0;
  }
`;
