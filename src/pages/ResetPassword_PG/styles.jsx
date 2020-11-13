import styled from "styled-components";
import colors from "../../styles/colors";
import { mediaQuery } from "../../styles/global";

const mainBgColor = `rgba(${colors.primary.rgb.r},${colors.primary.rgb.g},${colors.primary.rgb.b},0.3)`;

export const Img = styled.img`
  display: block;
  margin: 0 auto;
  width: 90%;
  max-width: 250px;
`;

export const ContainerInner = styled.div`
  width: 90%;
  max-width: 50rem;
  margin: 0 auto;

  button {
    margin: 1.5rem auto;
    display: block;
  }
`;

export const Main = styled.main`
  background: #f2f2f2;
  width: 100vw;
  height: 100vh;
  padding: 2.4rem;

  .form-wrapper {
    background-color: #625656;
    color: ${colors.white.hex};
  }

  h3 {
    text-align: left;
    margin-bottom: 5rem;
  }
  label {
    color: ${colors.white.hex};
  }

  ${mediaQuery[1]} {
    padding: 4.8rem;
  }
`;

export const Label = styled.label`
  text-align: left;
  display: block;
  margin-top: 20px;
  color: black !important;
  font-size: 1.6rem;
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  background: none;
  outline: none;
  resize: none;

  font-family: "Montserrat", sans-serif;
  font-size: 2.4rem;

  padding: 10px;

  border: 0;
  border-bottom: 2px solid
    ${(props) => (props.error ? "#bf165099" : "#f2f2f299")};

  transition: all 0.3s;

  &:focus {
    border-bottom: 2px solid
      ${(props) => (props.error ? "#802038cc" : "#f2f2f2cc")};
  }
`;

export const ErrorContainer = styled.div`
  padding: 1.5rem 0;
  text-align: center;
`;

export const LoaderContainer = styled.div`
  width: 100%;
  display: block;
  display: flex;
  margin-top: 3rem;
`;
export const Loader = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  border-radius: 50%;
  width: 8rem;
  height: 8rem;
  margin: 0 auto;
  animation: spin 5s linear infinite;
`;
