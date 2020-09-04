import styled from "styled-components";

export const Title = styled.h4`
  text-align: center;
`;

export const Button = styled.button`
  margin-top: 20px;
  margin-left: auto;
  display: block;
  width: 15rem;
  font-size: 1.563em;
  padding: 0.4em;
  border-radius: 5px;
  border: 1px solid #00000061;
`;

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

  background: #00000047;
`;

export const ModalBody = styled.div`
  position: absolute;
  z-index: 1100;
  width: 40vw;
  max-width: 400px;
  /* height: 100%; */
  background: #c4c4c4;
  padding: 2rem;
  max-height: 400px;
  margin: 0 auto;
  top: 15vh;
  left: 0;
  right: 0;
`;

export const ModalContent = styled.div`
  max-height: 35vh;
  overflow-y: auto;
  margin: 2em auto;
  width: 100%;
`;
