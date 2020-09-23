import styled from "styled-components";
import { mediaQuery } from "../../styles/global";

const btnSize = "5rem";
export const Button = styled.button`
  position: fixed;
  bottom: 9rem;
  right: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  height: ${btnSize};
  width: ${btnSize};

  border-radius: 100%;
  border: 0;

  color: #ffffff;
  background-color: #131313bb;

  cursor: pointer;

  transition: all 0.2s ease-in;
  will-change: opacity box-shadow;

  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &:hover,
  &:focus {
    opacity: 0.9;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }

  &:active {
    opacity: 1;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }

  ${mediaQuery[0]} {
    bottom: 4.8rem;
    right: 4.8rem;
  }
`;
