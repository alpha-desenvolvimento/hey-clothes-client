import styled from "styled-components";
import colors from "../../styles/colors";
import { mediaQuery } from "../../styles/global";

export const Img = styled.img`
  display: block;
  margin: 0 auto;
  width: 90%;
  max-width: 250px;
`;

export const Main = styled.main`
  background: #f2f2f2;
  width: 100vw;
  height: 100vh;
  padding: 2.4rem;

  ${mediaQuery[1]} {
    padding: 4.8rem;
  }
`;
