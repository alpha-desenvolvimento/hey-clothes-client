import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  font-size: 3.6rem;
`;

export const Label = styled.label`
  font-size: 2.4rem;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 1.6rem;
`;

export const PhotoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ProductPhoto = styled.img`
  width: 20rem;
  margin: 1.5rem;
`;
