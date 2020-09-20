import styled from "styled-components";
import { mediaQuery } from "../../styles/global";

export const Table = styled.table`
  display: block;
  padding: 5rem 1.6rem;
  tr {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    th,
    td {
      text-align: left;
      width: 100%;
      margin-bottom: 2rem;
      width: 49%;
    }

    td {
      position: relative;

      border-bottom: 1px solid rgb(0 0 0 / 0.3);
      padding: 0.5rem 1rem 0.3rem;

      .icon {
        position: absolute;
        right: 0.3rem;
        top: 1rem;
        cursor: pointer;
      }
    }
  }
  tr th {
    padding-left: 3rem;
  }
`;

export const CardContainer = styled.section`
  padding: 5rem 1.6rem;

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

  & > * > * > svg {
    margin-left: 1rem;
    color: ${(props) => (props.active == 1 ? "green" : "red")};
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
`;
