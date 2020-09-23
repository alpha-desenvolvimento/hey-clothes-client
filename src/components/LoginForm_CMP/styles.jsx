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

  box-shadow: 8px 8px 6px 0px rgba(50, 50, 50, 0.1);
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);

  & > h3 {
    text-align: right;
    color: #131313;
    opacity: 0.4;
  }
`;

export const Label = styled.label`
  text-align: left;
  display: block;
  margin-top: 20px;
  color: #131313;
  font-size: 2.4rem;
  font-weight: 700;

  opacity: 0.4;
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  background: none;
  outline: none;
  resize: none;

  font-family: "Montserrat", sans-serif;
  font-size: 3.6rem;
  color: #131313;
  opacity: 0.8;

  padding: 1rem;

  border: 0;
  border-bottom: 2px solid ${(props) => (props.error ? "#bf165099" : "#131313")};

  transition: all 0.3s;

  &:focus {
    border-bottom: 2px solid
      ${(props) => (props.error ? "#802038cc" : "#131313")};
    opacity: 1;
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
  display: block;
  /*TextDecoration já começa setado mas com a cor transparente
  para permitir animação */
  text-decoration: underline 1px #13131300;
  margin: 4rem auto 0;

  text-align: center;
  color: #131313;
  font-size: ${fontSize.p}rem;

  transition: all 0.4s ease;

  &:hover {
    text-decoration: underline 1px #131313cc;
  }
`;
