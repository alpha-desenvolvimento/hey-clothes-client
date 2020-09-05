import styled from "styled-components";

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
  background-color: #a2cc8c;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
`;
