import styled from 'styled-components';

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


    width: 80%;
    height:100%;
    background: #c4c4c4;
    padding: 2rem;
`