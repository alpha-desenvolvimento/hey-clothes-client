import styled from "styled-components";
import { Link } from "react-router-dom";

import { mediaQuery } from "../../styles/global";

export const Wrapper = styled.div`
  padding: 2.4rem;
  min-height: 100vh;
  width: 100%;

  ${mediaQuery[1]} {
    padding: 4.8rem;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
`;

export const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;

  text-decoration: none;
  color: #131313;

  font-size: 2.4rem;

  & > svg {
    margin-left: 1rem;
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  height: 100%;

  margin-top: 12rem;

  text-align: right;

  ${mediaQuery[1]} {
    flex-direction: row;

    & > * {
      width: 50%;
    }
  }

  & > * {
    justify-content: space-around;
    display: flex;
    flex-direction: column;
  }

  & > * > section > h1 {
    font-size: 12rem;
  }

  & > * > section > h3 {
    margin: -2rem 2rem;
  }

  & > * > div {
    flex-direction: column;
    display: flex;
    height: 4.8rem;
  }

  & > * > div > * {
    display: inline-flex;
    align-items: center;
    margin-top: 1.2rem;

    text-decoration: none;
    color: #131313;

    font-size: 2.4rem;
  }

  & > * > div > * > svg {
    margin-right: 1.2rem;
  }
`;
