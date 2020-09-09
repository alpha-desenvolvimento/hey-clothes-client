import styled from "styled-components";

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 26rem;
  margin: 1rem auto;
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);

  transition: all 200ms ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 10px 0 hsla(0, 0%, 0%, 0.4);
  }
`;

export const CardImage = styled.div`
  background-image: ${(props) => `url("${props.img}")`};
  background-origin: content-box;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 18rem; /*Altura do pai - altura do CardDescription*/
  display: block;
  object-fit: cover;
  border-radius: 1rem 1rem 0 0;
`;

export const CardDescription = styled.div`
  height: 8rem; /*Altura do pai - altura do CardImage*/
  padding: 1rem 2rem;
  background-color: #c4c4c4;
  border-radius: 0 0 1rem 1rem;
`;

export const NameText = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: #000000d0;
`;

export const PriceText = styled.h3`
  font-size: 2.4rem;
  font-weight: 500;
  color: #00000090;
`;
