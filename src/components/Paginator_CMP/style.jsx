import styled from "styled-components";
import { fontSize } from "../../styles/typography";
import { mediaQuery } from "../../styles/global";

export const Main = styled.main`
  width: 80%;
  /*Não pode ser 100% se não fica por baixo do botão de create no mobile */
  display: flex;
  justify-content: center;

  width: 100%;
`;

export const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
  font-size: ${fontSize.h6}rem;
  cursor: pointer;
`;

export const PageNumber = styled.div`
  cursor: pointer;
  display: inline-flex;

  align-items: center;
  justify-content: center;

  margin: 0 1rem;
  width: 3rem;
  height: 3rem;
  padding: 0.4rem;
  border-radius: 50%;

  font-size: ${fontSize.h6}rem;
  color: ${({ currentPage }) => (currentPage ? "#74A3F2" : "131313cc")};
`;
