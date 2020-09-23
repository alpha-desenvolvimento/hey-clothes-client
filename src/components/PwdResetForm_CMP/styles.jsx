import styled from "styled-components";
import { fontSize } from "../../styles/typography";
import { colors } from "../../styles/colors";

export const Wrapper = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.div`
  padding: 2rem;
  border-radius: 1rem;
  background-color: #f8f8f8;
  box-shadow: 8px 8px 6px 0px rgba(50, 50, 50, 0.1);
`;

export const Label = styled.label`
  text-align: left;
  display: block;
  margin-top: 20px;
  color: #0d0d0d;
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
  // color: #f2f2f299;

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

export const ErrorMessage = styled.span`
  font-size: ${fontSize.p}rem;
  margin: 2rem 0rem 1rem;
  display: block;
  background-color: ${colors.tertiary.hex};
  padding: 1rem;
  text-align: center;
  display: none;

  &.show {
    display: block;
  }
`;

export const ForgotPwdText = styled.a`
  width: auto;
  display: block;
  text-align: center;
  margin: 4rem auto 0;
  text-decoration: none;
  color: #f2f2f2;
  font-size: ${fontSize.p}rem;
`;
