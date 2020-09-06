import styled from "styled-components";
import { fontSize } from "../../styles/typography";

const textSize = {
  big: fontSize.h4,
  medium: fontSize.h5,
  regular: fontSize.h6,
  small: fontSize.p,
};

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  /* font-size: 3.6rem; */
`;

export const Label = styled.label`
  /* font-size: 2.4rem; */
  padding-left: 1.5rem;
  font-size: ${textSize.medium}em;
  margin-top: calc(${textSize.small}em / 2.5);
`;

export const IdText = styled.span`
  /* font-size: ${fontSize.p}em;*/
  font-size: ${textSize.small}em;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: ${textSize.small}em;
`;

export const PhotoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ProductPhoto = styled.img`
  width: 20rem;
  font-size: ${textSize.small}em;
`;
