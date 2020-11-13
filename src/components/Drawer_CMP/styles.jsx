import styled from "styled-components";
import { fontSize } from "../../styles/typography";
import { mediaQuery } from "../../styles/global";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1100;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 2.4rem;

  background: #00000090;
`;
export const CloseIcon = styled.h5`
  text-align: right;

  svg {
    cursor: pointer;
  }
`;
export const DrawerBody = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1110;

  overflow-y: auto;
  width: 90%;
  height: 100%;
  background: #F2f2f2;
  padding: 2rem;

  ${mediaQuery[0]} {
    width: 60rem;
  }
`;
