import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & > * {
    margin: 2rem auto;
  }
`;

export const Input = styled.input`
  max-width: 48rem;
`;

export const Label = styled.label`
  font-size: 2.4rem;
`;
