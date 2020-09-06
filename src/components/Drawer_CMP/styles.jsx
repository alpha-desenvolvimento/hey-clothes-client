import styled from "styled-components";
import { fontSize } from "../../styles/typography";

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

export const DrawerBody = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1100;

  overflow-y: auto;
  width: 80%;
  height: 100%;
  background: #c4c4c4;
  padding: 2rem;

  form {
    label {
      font-size: ${fontSize.h6}em;
    }
    input {
      font-size: ${fontSize.h5}em;
      padding: 0.5rem 1rem;
    }
    button {
      display: block;
      padding: 1.5rem 2rem;
      margin: 3rem auto;
      width:100%;
      max-width: 300px;
    }
  }
`;
