import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  background: ${(props) => (props.primary ? "#f2f2f2" : "#C4C4C4")};
  color: ${(props) => (props.primary ? "#1B1B1B" : "#4C4C4C")};

  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  vertical-align: middle;

  padding: 0.4rem 2rem;
  margin: 0.8rem;
  border-radius: 4rem;
  border: 0;
  outline: 0;
  min-width: 6.4rem;

  font-weight: 500;
  font-size: 3.6rem;
  letter-spacing: 0.5rem;
  text-decoration: none;
  text-transform: uppercase;

  transition: all 0.2s ease-in;
  will-change: opacity box-shadow;

  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &:hover,
  &:focus {
    opacity: 0.8;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }

  &:active {
    opacity: 1;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
`;
