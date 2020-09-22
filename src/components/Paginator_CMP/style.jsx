import styled from "styled-components";
import { fontSize } from "../../styles/typography";
import { colors } from "../../styles/colors";

const secondary = colors.tertiary.rgb;

export const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.h6}rem;
  background-color: rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, 0.7);
  margin: 0 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  cursor: pointer;

  &.current-page {
    background-color: rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, 1);
  }
`;
