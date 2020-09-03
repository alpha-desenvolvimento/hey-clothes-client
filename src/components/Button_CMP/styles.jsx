import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  background: ${props => props.primary ? "#B8B8B8" : "#C4C4C4"};
  color: ${props => props.primary ? "#1B1B1B" : "#4C4C4C"};

  font-size: 2.4rem;
  margin: 2.4rem;
  padding: 0.6rem 1.6rem;
  border: 2px solid #B8B8B8;
  border-radius: 3px;

  transition: all 200ms ease-in-out;
  will-change: opacity;

  &:hover{
      opacity: .8;
  }
`;