import styled from "styled-components";
import { mediaQuery } from "../../styles/global";

export const CardContainer = styled.section`
  padding: 12rem 1.6rem 5rem;

  display: flex;
  flex-flow: wrap column;

  width: 100%;
  height: 100%;

  ${mediaQuery[0]} {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
    grid-gap: 1rem;
  }
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: auto;

  padding: 2.4rem;
  margin: 1rem auto;
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  opacity: ${(props) => (props.active == 1 ? "1" : "0.8")};

  transition: all 200ms ease-in-out;

  text-decoration: none;
  color: #000;

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 10px 0 hsla(0, 0%, 0%, 0.4);
  }

  ${mediaQuery[0]} {
    padding: 1.6rem 2.4rem;
  }
`;

export const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: auto;

  & > * {
    display: flex;
    align-items: center;
  }
`;

export const CardText = styled.span`
  font-size: ${(props) => (props.primary ? "3.2rem" : "1.6rem")};
  color: ${(props) => (props.primary ? "#000000d0" : "#00000080")};

  & > svg {
    color: ${(props) =>
      props.greyscale
        ? (props) => (props.primary ? "#000000d0" : "#00000080")
        : props.active == 1
        ? "green"
        : "red"};
    margin: ${(props) =>
      props.svg == "right" ? "0 0 0 .4rem" : "0 .4rem 0 0"};
  }
`;
