import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { mediaQuery } from "../../styles/global";

export const CardsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  width: 100%;
  height: 100%;

  padding: 2.4rem;

  ${mediaQuery[0]} {
    flex-direction: row;

    padding: 4.8rem;
  }
`;

export const NavCard = styled(NavLink)`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: auto;

  padding: 2.4rem;
  margin: 1rem auto;
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);

  transition: all 200ms ease-in-out;

  text-decoration: none;
  color: #000;

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 10px 0 hsla(0, 0%, 0%, 0.4);
  }

  & > h5 {
    font-weight: 400;
    opacity: 0.7;
  }

  ${mediaQuery[0]} {
    width: 45%;

    padding: 4.8rem;
  }
`;
