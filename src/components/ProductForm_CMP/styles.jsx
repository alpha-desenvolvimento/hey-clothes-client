import styled from "styled-components";
import { fontSize } from "../../styles/typography";

const textSize = {
  big: fontSize.h4,
  medium: fontSize.h5,
  regular: fontSize.h6,
  small: fontSize.p,
};

const mockImage =
  "https://www.creativefabrica.com/wp-content/uploads/2018/11/Clean-clothes-icon-by-rudezstudio-580x386.jpg";

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
  justify-content: flex-start;

  width: 100%;
`;

export const ProductPhotoWrapper = styled.figure`
  height: 20rem;
  width: 48%;
  font-size: ${textSize.small}em;
  margin: 0.4rem;

  & > input {
    width: 100%;
  }
`;

export const ProductPhoto = styled.div`
  background-image: ${({ imageUrl }) =>
    imageUrl ? `url("${imageUrl}")` : `url("${mockImage}")`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  border-radius: 1rem;
  margin: 0.4rem;

  height: 16rem;
  width: auto;
`;
